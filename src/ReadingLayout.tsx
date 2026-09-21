import { useEffect, useRef, useState, type ReactNode } from 'react';

export type TocItem = { id: string; label: string; children?: TocItem[] };

function flattenItems(items: TocItem[]): TocItem[] {
  return items.flatMap(item => [item, ...flattenItems(item.children ?? [])]);
}

function TocList({ items, route, active, onNavigate }: { items: TocItem[]; route: string; active: string; onNavigate: () => void }) {
  return <ul className="toc-tree">{items.map(item => (
    <li key={item.id}>
      <a href={`${route}#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        onNavigate();
        window.requestAnimationFrame(() => {
          window.location.hash = item.id;
          const target = document.getElementById(item.id);
          target?.scrollIntoView();
          target?.focus({ preventScroll: true });
        });
      }}>{item.label}</a>
      {item.children && <TocList items={item.children} route={route} active={active} onNavigate={onNavigate} />}
    </li>
  ))}</ul>;
}

export function ReadingLayout({ route, items, children, wide = false }: { route: string; items: TocItem[]; children: ReactNode; wide?: boolean }) {
  const [active, setActive] = useState(items[0].id);
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hoverSuppressed = useRef(false);
  const desktopHover = () => window.matchMedia(`(min-width: ${wide ? 1480 : 1121}px) and (hover: hover)`).matches;
  const close = () => { hoverSuppressed.current = true; setExpanded(false); };
  const lines = flattenItems(items);
  const childIds = new Set(items.flatMap(item => flattenItems(item.children ?? []).map(child => child.id)));

  useEffect(() => {
    const headings = flattenItems(items).map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => node !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= (parseFloat(getComputedStyle(heading).scrollMarginTop) || 0) + 8) current = heading;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        const focusedHeading = headings.find(heading => heading === document.activeElement && heading.getBoundingClientRect().top >= 0 && heading.getBoundingClientRect().top < window.innerHeight);
        current = focusedHeading ?? headings.at(-1) ?? current;
      }
      if (current) setActive(current.id);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items]);

  return (
    <div className={`reading-layout${wide ? ' reading-layout-wide' : ''}`}>
      <aside className="reading-nav" data-open={expanded}
        onPointerEnter={() => { if (desktopHover() && !hoverSuppressed.current) setExpanded(true); }}
        onPointerLeave={(event) => { hoverSuppressed.current = false; if (desktopHover() && !event.currentTarget.contains(document.activeElement)) setExpanded(false); }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
        onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); close(); toggleRef.current?.focus(); } }}>
        <button ref={toggleRef} className="toc-toggle" type="button" aria-label="On this page" aria-expanded={expanded} aria-controls="reading-toc" onClick={() => setExpanded(!expanded)}>
          <span className="toc-mobile-label">On this page <span aria-hidden="true">{expanded ? '−' : '+'}</span></span>
          <span className="toc-lines" aria-hidden="true">{lines.map(item => <span key={item.id} className={`toc-line${childIds.has(item.id) ? ' toc-line-child' : ''}`} data-active={active === item.id} />)}</span>
        </button>
        <nav id="reading-toc" aria-label="On this page" data-expanded={expanded}>
          <p className="toc-label">On this page</p>
          <TocList items={items} route={route} active={active} onNavigate={close} />
        </nav>
      </aside>
      <main id="main-content" tabIndex={-1}>
        <article className="profile case-study reading-content" aria-labelledby={items[0].id}>{children}</article>
      </main>
    </div>
  );
}
