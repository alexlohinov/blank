import { StrictMode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { App } from './App';
import { getPage } from './site';
import { BeachFooter } from './BeachFooter';

export function Site({ path }: { path: string }) {
  return (
    <StrictMode>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <App path={path} />
      <BeachFooter />
      <Analytics />
      <SpeedInsights route={getPage(path).path} />
    </StrictMode>
  );
}
