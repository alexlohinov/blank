import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import { Site } from './Root';
import { legacyDestination } from './legacy';
import './styles.css';

const legacy = legacyDestination(window.location.hash);
if (legacy) {
  window.location.replace(legacy);
} else {
  const root = document.getElementById('root')!;
  const app = <Site path={window.location.pathname} />;
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
