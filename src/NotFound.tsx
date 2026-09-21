export function NotFound() {
  return (
    <main id="main-content" className="profile not-found" tabIndex={-1}>
      <a className="back-link" href="/">← Alex Lohinov</a>
      <header className="case-intro">
        <p className="error-number" aria-hidden="true">404</p>
        <h1>This page took a wrong turn.</h1>
        <p className="case-summary">The link may be outdated, or the page may have moved. There’s still plenty to explore.</p>
      </header>
      <nav className="error-links" aria-label="Find your way back">
        <a href="/">Back to home <span aria-hidden="true">↗</span></a>
        <a href="/#selected-work">Explore selected work <span aria-hidden="true">→</span></a>
        <a href="/writings/how-i-use-codex">Read How I Use Codex <span aria-hidden="true">→</span></a>
      </nav>
    </main>
  );
}
