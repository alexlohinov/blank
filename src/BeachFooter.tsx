import { useEffect, useRef, useState } from 'react';
import { createBeachScene } from './beachScene';

export function BeachFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = createBeachScene(canvas);
    if (!scene) return;
    let visible = false;
    let frame = 0;
    let previous = 0;

    const tick = (now: number) => {
      if (previous === 0) previous = now;
      if (now - previous >= 1000 / 24) {
        elapsed.current += Math.min((now - previous) / 1000, 0.1);
        previous = now;
        scene.draw(elapsed.current);
      }
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      window.cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !reducedMotion && !document.hidden) frame = window.requestAnimationFrame(tick);
    };
    const redraw = () => {
      scene.resize();
      scene.draw(elapsed.current);
    };
    const resize = new ResizeObserver(redraw);
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(canvas);
    const theme = window.matchMedia('(prefers-color-scheme: dark)');
    theme.addEventListener('change', redraw);
    document.addEventListener('visibilitychange', sync);
    redraw();

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      theme.removeEventListener('change', redraw);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [reducedMotion]);

  return (
    <footer className="beach-footer" aria-label="By the sea">
      <canvas ref={canvasRef} className="beach-canvas" aria-hidden="true" />
    </footer>
  );
}
