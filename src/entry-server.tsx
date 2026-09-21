import { renderToString } from 'react-dom/server';
import { Site } from './Root';

export { pages, notFoundPage, siteOrigin, replaceMetadata, escapeHtml } from './site';

export function render(path: string) {
  return renderToString(<Site path={path} />);
}
