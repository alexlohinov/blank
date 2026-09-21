import { useEffect, useState, type ReactNode } from 'react';
import { links, sections } from './content';
import { CodexArticle } from './CodexArticle';
import { PascalCaseStudy } from './PascalCaseStudy';
import { AccordCaseStudy } from './AccordCaseStudy';
import { resolveSection } from './legacy';
import { NotFound } from './NotFound';
import { getPage, notFoundPage } from './site';

function Contact({ name, children }: { name: string; children: ReactNode }) {
  const href = links[name];
  if (name === 'email' && href) return <CopyEmail email={href.replace(/^mailto:/, '')} />;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <span className="contact-label">{children}</span>;
}

function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copy() {
    setDismissed(false);
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }

  const message = status === 'copied' ? 'Copied!' : status === 'error' ? 'Copy failed' : 'Copy';
  return (
    <span className="email-copy" data-feedback={status !== 'idle'} data-dismissed={dismissed}>
      <button type="button" className="contact-label email-button" aria-label={`Copy email address ${email}`} aria-describedby="email-tooltip" onClick={copy} onPointerEnter={() => setDismissed(false)} onFocus={() => setDismissed(false)} onKeyDown={(event) => { if (event.key === 'Escape') setDismissed(true); }}>
        Email
      </button>
      <span id="email-tooltip" className="email-tooltip" role="tooltip">{message}</span>
      <span className="sr-only" role="status">{status === 'copied' ? 'Email address copied.' : status === 'error' ? `Could not copy. Email address: ${email}` : ''}</span>
    </span>
  );
}

export function App({ path }: { path: string }) {
  const page = getPage(path);

  useEffect(() => {
    let frame = 0;
    const scrollToSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        let id: string;
        try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
        const resolved = resolveSection(page.path, id);
        if (resolved !== id) {
          window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${resolved}`);
          id = resolved;
        }
        if (!id) return;
        const target = document.getElementById(id);
        target?.scrollIntoView();
        target?.focus({ preventScroll: true });
      });
    };
    scrollToSection();
    window.addEventListener('hashchange', scrollToSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, [page.path]);

  if (page === notFoundPage) return <NotFound />;
  if (page.path === '/work/pascal') return <PascalCaseStudy />;
  if (page.path === '/work/accord') return <AccordCaseStudy />;
  if (page.path === '/writings/how-i-use-codex') return <CodexArticle />;

  return (
    <main id="main-content" className="profile home-profile" tabIndex={-1}>
      <section className="intro" aria-labelledby="profile-name">
        <h1 id="profile-name">Alex Lohinov</h1>
        <div className="bio">
          <p><span>I’m a product designer based in Lithuania with 4 years of experience across B2B SaaS, mobile apps, and websites.</span></p>
          <p><span>I design complex workflows and design systems, and build working prototypes with React and AI tools. Available for Product Designer roles.</span></p>
          <p><span>You can find me on </span><Contact name="linkedin">LinkedIn</Contact><span>, </span><Contact name="github">GitHub</Contact><span>, </span><Contact name="x">X</Contact><span> or reach me via </span><Contact name="email">Email</Contact><span>.</span></p>
        </div>
      </section>
      {sections.map(({ id, title, entries }) => (
        <section key={id} className="section" aria-labelledby={id}>
          <h2 id={id}>{title}</h2>
          <ul className="entries">
            {entries.map(({ name, detail, image, href }) => {
              const content = <>
                <span className="entry-brand">
                  {image && <img src={image} width="20" height="20" alt="" />}
                  <span>{name}</span>
                </span>
                <span className={`entry-meta${detail ? ' has-detail' : ''}`}>
                  {detail && <span className="entry-detail">{detail}</span>}
                  {href && <span className="entry-arrow" aria-hidden="true">→</span>}
                </span>
              </>;
              const external = href?.startsWith('https://');
              return <li key={name}>{href ? <a className="entry" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a> : <span className="entry" aria-disabled="true">{content}</span>}</li>;
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
