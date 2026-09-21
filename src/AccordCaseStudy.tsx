import { CaseImage } from './CaseImage';
import { ReadingLayout, type TocItem } from './ReadingLayout';

const toc: TocItem[] = [
  { id: 'accord-title', label: 'Accord' },
  { id: 'accord-problem', label: '01 / Problem' },
  { id: 'accord-reasoning', label: '02 / Reasoning' },
  { id: 'accord-decisions', label: '03 / Decisions', children: [
    { id: 'accord-navigation', label: 'A clear place for everything' },
    { id: 'accord-hierarchy', label: 'Useful information first' },
    { id: 'accord-controls', label: 'Controls in context' },
    { id: 'accord-themes', label: 'One system, two themes' },
  ] },
  { id: 'accord-solution', label: '04 / Solution', children: [
    { id: 'accord-companies', label: 'The companies workspace' },
    { id: 'accord-settings', label: 'Workspace settings' },
  ] },
  { id: 'accord-impact', label: '05 / Impact' },
];

export function AccordCaseStudy() {
  return (
    <ReadingLayout route="/work/accord" items={toc} wide>
      <a className="back-link" href="/#selected-work">← Selected Work</a>
      <header className="case-intro">
        <p className="case-eyebrow">Accord · CRM design</p>
        <h1 id="accord-title" tabIndex={-1}>Making Business Data Feel Simple</h1>
        <p className="case-summary">A modern CRM for small companies and teams, designed to make important information easy to find and everyday work easier to understand.</p>
        <dl className="case-facts"><div><dt>Focus</dt><dd>Product & interface design</dd></div><div><dt>Audience</dt><dd>Small companies & teams</dd></div><div><dt>Outcome</dt><dd>CRM interface design</dd></div></dl>
      </header>
      <CaseImage file="cover" alt="Accord’s white geometric symbol on a softly blurred floral background." caption="Accord — a quieter approach to customer relationship management." cover />

      <section className="case-section" aria-labelledby="accord-problem">
        <h2 id="accord-problem" tabIndex={-1}><span className="case-section-number">01</span> Problem</h2>
        <p>A CRM should help a team understand its relationships. For a small company, that means seeing who a business is, what makes it relevant, and where to focus next. My goal with Accord was to create a product that felt useful from the first screen and simple enough to become part of everyday work.</p>
        <p>The design challenge was balancing information with clarity. Company records can include domains, categories, employee counts, revenue, and addresses. Showing everything with equal emphasis creates a wall of data. Hiding too much makes comparison harder. I wanted the important information to be readable immediately, with the supporting details available in the same view.</p>
        <p>I treated simplicity as a question of hierarchy and predictable behavior. The interface needed to give each type of information a clear place, while keeping the path between records and the team’s everyday tools easy to understand.</p>
      </section>

      <section className="case-section" aria-labelledby="accord-reasoning">
        <h2 id="accord-reasoning" tabIndex={-1}><span className="case-section-number">02</span> Reasoning</h2>
        <p>I chose a table as the main structure for company records. A shared row and column layout lets someone compare the same attribute across several companies without opening each one. The challenge was making that density feel organized, especially when a record has several categories or a long address.</p>
        <p>Linear was a visual reference for this project. I was drawn to its restrained surfaces, compact navigation, and clear separation between the workspace and its content. I carried that direction into Accord through quiet borders, consistent spacing, and a small number of emphasis levels, adapting the layout to a CRM’s records and attributes.</p>
        <p>The guiding question was: what should someone notice first? My answer was the current workspace, the type of record they are viewing, and the identity of each company. Everything else needed to support that reading order.</p>
        <p>I also wanted to avoid making a small team learn a different visual language for each area. Repeated spacing, familiar labels, and a stable sidebar provide a common frame for the information. The tradeoff is a deliberately restrained interface: individual features receive less visual attention so the records themselves can carry more of the page.</p>
      </section>

      <section className="case-section" aria-labelledby="accord-decisions">
        <h2 id="accord-decisions" tabIndex={-1}><span className="case-section-number">03</span> Decisions</h2>
        <h3 id="accord-navigation" tabIndex={-1}>A clear place for everything</h3>
        <p>I separated the sidebar into Records and Tools. Companies, People, and Opportunities describe the relationships the team works with. Tasks, Meetings, and Notes describe supporting activities. This grouping gives the navigation a readable structure, rather than asking every item to compete in one uninterrupted list.</p>
        <p>The selected Companies item stays visibly highlighted. The workspace control sits above navigation, while Integrations and Help & Support sit at the bottom. That keeps the frequent destinations together and gives supporting actions a predictable place.</p>
        <h3 id="accord-hierarchy" tabIndex={-1}>Useful information first</h3>
        <p>The company name anchors each row, supported by a recognizable icon. Other attributes sit in consistent columns with quieter separators. Color is concentrated in the category labels, where it helps distinguish groups without turning the whole table into a set of competing signals.</p>
        <p>Every colored category also has a text label. The meaning remains explicit without relying on color alone. Longer values stay within the table’s column structure, preserving the overall scan pattern. This trades a little immediate detail for a more stable overview.</p>
        <p>That balance matters in a dense CRM. Large cards would give each company more breathing room, but make comparisons across several attributes less direct. I used compact rows instead, with alignment doing much of the organizational work. The table provides a consistent rhythm even when the content varies from one company to another.</p>
        <h3 id="accord-controls" tabIndex={-1}>Controls in context</h3>
        <p>Search companies appears in the page header. Filter and Display sit above the table, beside the current view. New has a consistent position in the upper-right corner. These placements distinguish finding a record, changing the view, and adding something new without introducing another navigation layer.</p>
        <h3 id="accord-themes" tabIndex={-1}>One system, two themes</h3>
        <p>I designed light and dark versions around the same hierarchy. The structure, labels, and positions remain consistent; surfaces, borders, and category treatments change with the theme. The workspace menu offers Light, Dark, and System together, keeping appearance preferences close to other workspace settings.</p>
        <CaseImage file="workspace" alt="Accord’s dark workspace with the workspace menu open, showing My Space, invitations, settings, and Light, Dark, and System theme choices." caption="Workspace context stays in the sidebar, with preferences grouped in one menu." />
      </section>

      <section className="case-section" aria-labelledby="accord-solution">
        <h2 id="accord-solution" tabIndex={-1}><span className="case-section-number">04</span> Solution</h2>
        <h3 id="accord-companies" tabIndex={-1}>The companies workspace</h3>
        <p>The resulting screen brings the company list and its supporting controls into one focused workspace. Someone arriving here can identify the current record type, scan company names, and compare attributes across rows. The table remains the main visual element, with navigation and controls framing it.</p>
        <p>For a person looking for a particular company, the search field offers a clear starting point. For someone reviewing the broader list, categories and aligned columns support comparison. Filter and Display are placed where a person would look to adjust what they see. These screens establish the interface for those tasks; they do not demonstrate every interaction or implementation state.</p>
        <CaseImage file="companies-light" alt="Accord Companies in the light theme: a company table with domains, colored category labels, employee counts, revenue, and addresses, alongside Records and Tools navigation." caption="Companies / Light — a structured overview with color reserved for categories." />
        <CaseImage file="companies-dark" alt="The same Accord Companies table in the dark theme, retaining the sidebar, column hierarchy, search, Filter, Display, and New controls." caption="Companies / Dark — the same hierarchy across a darker set of surfaces." />
        <h3 id="accord-settings" tabIndex={-1}>Workspace settings</h3>
        <p>The workspace menu brings together switching spaces, inviting people, settings, appearance, and logout. Separators group related actions, while the nested theme menu keeps the first level short. A checkmark makes the selected option visible without adding explanatory text to every row.</p>
        <p>I kept the light and dark menus structurally identical. This is a small detail, but it reinforces the broader principle behind Accord: the interface should feel familiar as the context changes.</p>
        <p>The theme examples also show how I approached emphasis. A selected row uses a contained surface change, while dividers quietly separate groups of actions. Neither needs a bright accent to explain the structure. Keeping those signals restrained leaves stronger colors available for meaningful information, such as the categories in the company table.</p>
        <CaseImage file="settings-light" alt="Close-up of Accord’s light workspace menu with a nested theme menu and a checkmark next to Light." caption="Workspace menu / Light — grouped actions and explicit selection feedback." />
        <CaseImage file="settings-dark" alt="Close-up of Accord’s workspace and theme menus on dark surfaces, showing consistent spacing and the same action groups." caption="Workspace menu / Dark — a consistent structure with adapted surface contrast." />
      </section>

      <section className="case-section" aria-labelledby="accord-impact">
        <h2 id="accord-impact" tabIndex={-1}><span className="case-section-number">05</span> Impact</h2>
        <p>The design brings company records, team tools, and workspace preferences into a consistent interface. The concrete outcome is a defined navigation structure, a clear hierarchy for dense business information, and coordinated light and dark treatments. Together, these decisions express the original goal: a CRM that feels straightforward to use.</p>
        <p>The intended benefit is less effort understanding where information lives and which controls belong to the current task. That is a design intention, not a measured business result. I am presenting the interface work here without claiming adoption, faster task completion, or improvements in sales performance.</p>
        <p>The next step would be to test the design with people in small teams: ask them to find a company, locate an attribute, and identify where they would manage a related task. I would watch for hesitation, unclear labels, and information that needs more room. Those observations would help assess whether the visual simplicity also translates into practical clarity.</p>
        <p>I would pay particular attention to the compromise between density and readability. If people repeatedly miss an attribute or confuse a navigation group, that would be a reason to reconsider the hierarchy. A calm appearance is valuable only when it helps someone understand the information in front of them.</p>
      </section>
      <footer className="article-footer"><p>Accord · Product & interface design</p><a className="back-link" href="/#selected-work">← Back to Selected Work</a></footer>
    </ReadingLayout>
  );
}
