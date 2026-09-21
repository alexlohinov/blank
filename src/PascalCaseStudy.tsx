import { ReadingLayout, type TocItem } from './ReadingLayout';
import { CaseImage } from './CaseImage';

const toc: TocItem[] = [
  { id: 'pascal-title', label: 'Pascal' },
  { id: 'pascal-problem', label: '01 / Problem' },
  { id: 'pascal-reasoning', label: '02 / Reasoning' },
  { id: 'pascal-decisions', label: '03 / Decisions', children: [
    { id: 'pascal-editor', label: 'Let the writing lead' },
    { id: 'pascal-navigation', label: 'Navigation at the edges' },
    { id: 'pascal-tools', label: 'Tools when needed' },
  ] },
  { id: 'pascal-solution', label: '04 / Solution', children: [
    { id: 'pascal-themes', label: 'One workspace, two themes' },
    { id: 'pascal-commands', label: 'A shorter path to actions' },
    { id: 'pascal-formatting', label: 'Structure without clutter' },
  ] },
  { id: 'pascal-impact', label: '05 / Impact' },
];

export function PascalCaseStudy() {
  return <ReadingLayout route="/work/pascal" items={toc} wide>
    <a className="back-link" href="/#selected-work">← Selected Work</a>
    <header className="case-intro">
      <p className="case-eyebrow">Pascal · Note-taking app design</p>
      <h1 id="pascal-title" tabIndex={-1}>A Quiet Space to Think</h1>
      <p className="case-summary">A local space for personal notes, designed to keep the interface quiet and the writing at the center.</p>
      <dl className="case-facts"><div><dt>Focus</dt><dd>Product & interface design</dd></div><div><dt>Purpose</dt><dd>Writing without distractions</dd></div><div><dt>Outcome</dt><dd>Note-taking app design</dd></div></dl>
    </header>
    <CaseImage project="pascal" file="editor-light" alt="Pascal’s light editor with a Research Brief note, a quiet sidebar, and two open document tabs." caption="Pascal / Light — a writing surface with supporting tools at the edges." cover />
    <section className="case-section" aria-labelledby="pascal-problem">
      <h2 id="pascal-problem" tabIndex={-1}><span className="case-section-number">01</span> Problem</h2>
      <p>Writing a thought down should not require managing an interface first. My starting point for Pascal was a local note-taking app where the page feels ready for whatever someone wants to say. The goal was to give personal writing enough space to develop without surrounding it with competing signals.</p>
      <p>A note-taking tool still needs navigation, search, and ways to structure a document. Removing those things would make the screen simpler, but could make the work harder. The challenge was deciding what deserves a permanent place and what can stay out of sight until it becomes useful.</p>
      <p>I approached this as a design problem rather than a claim about user research. I wanted the document to be the first thing someone notices, while the rest of the workspace remains understandable. Visual quiet was a way to support attention, not an excuse to make important controls difficult to find.</p>
    </section>
    <section className="case-section" aria-labelledby="pascal-reasoning">
      <h2 id="pascal-reasoning" tabIndex={-1}><span className="case-section-number">02</span> Reasoning</h2>
      <p>Obsidian was an inspiration for the idea of a local, personal space for notes. With Pascal, I focused on the interface around that idea: a familiar workspace that gives writing priority over configuration. This case presents that design direction, without making claims about storage implementation, file formats, or compatibility with other applications.</p>
      <p>I chose a restrained layout with three recognizable areas: navigation, open notes, and the document itself. Each has a different visual weight. The editor gets the most space, tabs keep nearby documents available, and the sidebar provides orientation without becoming the main event.</p>
      <p>The key tradeoff is between immediate access and persistent clutter. A control that is always visible is easy to discover, but it also asks for attention every time the screen is viewed. I used contextual menus to keep useful options available while reducing how much of the interface needs to be read during writing.</p>
    </section>
    <section className="case-section" aria-labelledby="pascal-decisions">
      <h2 id="pascal-decisions" tabIndex={-1}><span className="case-section-number">03</span> Decisions</h2>
      <h3 id="pascal-editor" tabIndex={-1}>Let the writing lead</h3>
      <p>The document sits in a generous content area with a clear title and a consistent reading width. Headings, paragraphs, lists, and tables create structure inside the note. The surrounding surfaces stay restrained so that the hierarchy comes primarily from the writing itself.</p>
      <p>I avoided giving every piece of interface information the same emphasis. Word and character counts sit quietly near the bottom, while document controls stay near the top edge. These details remain available without breaking up the text or competing with the next sentence.</p>
      <p>Readable typography is part of that balance. A limited set of text sizes establishes the difference between a title, a section heading, and supporting information. I used whitespace to separate ideas instead of adding decorative containers around every block. The page can contain several kinds of content while still feeling like one document.</p>
      <h3 id="pascal-navigation" tabIndex={-1}>Navigation at the edges</h3>
      <p>The sidebar separates general destinations from the list of notes. Search, References, Favorites, and Archives form one group; individual notes form another. A selected surface marks the current note, and small icons help distinguish items without introducing large decorative elements.</p>
      <p>Tabs provide another layer of orientation when more than one note is open. I kept their treatment compact and aligned with the workspace frame. This creates a visible relationship between the selected document and its content, while leaving the editor as the largest continuous surface.</p>
      <p>The sidebar also presents a deliberate compromise. Keeping it visible helps someone understand where they are, but takes space and introduces another set of labels. The command menu includes a Toggle Sidebar action as a direction for reducing that surrounding interface when writing becomes the main task. The provided screens show the navigation in its visible state.</p>
      <h3 id="pascal-tools" tabIndex={-1}>Tools when needed</h3>
      <p>The command menu combines note destinations with actions in separate, labelled groups. The formatting menu follows the same principle, organizing options under Style, Blocks, and Media. Grouping keeps a long set of possibilities readable without placing all of them permanently around the document.</p>
    </section>
    <section className="case-section" aria-labelledby="pascal-solution">
      <h2 id="pascal-solution" tabIndex={-1}><span className="case-section-number">04</span> Solution</h2>
      <h3 id="pascal-themes" tabIndex={-1}>One workspace, two themes</h3>
      <p>The resulting design presents a note as the center of a personal workspace. Someone can identify the current document, see nearby notes, and locate the supporting controls without leaving the page’s visual context. The example includes structured content to show how the editor handles more than a blank paragraph.</p>
      <p>Light and dark versions use the same layout and emphasis. Borders, selected surfaces, and secondary labels change with the palette, while positions remain familiar. The research brief shown here is demonstration content for the interface; its interview and research references do not describe work conducted for this project.</p>
      <CaseImage project="pascal" file="editor-dark" alt="Pascal’s dark editor showing the same Research Brief document, navigation groups, tabs, and word count." caption="Pascal / Dark — the same document hierarchy with adapted surfaces." />
      <h3 id="pascal-commands" tabIndex={-1}>A shorter path to actions</h3>
      <p>The command menu places a search field above two distinct groups. Notes appear first, followed by actions such as Create New Note, Settings, and Toggle Sidebar. This provides a compact interface for finding a destination or choosing a command, without turning the main screen into a toolbar.</p>
      <p>I designed both themes with the same spacing and grouping. The screenshots establish the menu’s visual structure; they do not demonstrate search behavior, keyboard shortcuts, or completed interactions. Those details would need to be explored and checked in a working prototype.</p>
      <CaseImage project="pascal" file="commands-light" alt="Light command menu with a search field, a Notes group, and an Actions group." caption="Command menu / Light — notes and actions share one entry point." />
      <CaseImage project="pascal" file="commands-dark" alt="Dark command menu showing the same note destinations and grouped actions." caption="Command menu / Dark — familiar organization across themes." />
      <h3 id="pascal-formatting" tabIndex={-1}>Structure without clutter</h3>
      <p>The formatting menu makes headings, lists, checklists, code blocks, quotations, and media options visible in a single organized panel. Text labels carry the meaning, with icons providing secondary cues. This lets the main editor remain visually quiet while still showing a clear direction for richer notes.</p>
      <p>I kept the labels explicit rather than asking icons to explain everything. Headings belong together, list types belong together, and media has its own group. The extra labels make the menu slightly taller, but reduce the amount of interpretation needed when looking for a specific kind of block.</p>
      <CaseImage project="pascal" file="formatting" alt="Light formatting menu divided into Style, Blocks, and Media, with headings, lists, code, quotations, and attachment options." caption="Formatting — document structure available in a contextual menu." />
    </section>
    <section className="case-section" aria-labelledby="pascal-impact">
      <h2 id="pascal-impact" tabIndex={-1}><span className="case-section-number">05</span> Impact</h2>
      <p>The outcome is a coherent interface direction: a quiet editor, secondary navigation, grouped contextual tools, and coordinated light and dark themes. Together, they express what I wanted Pascal to be: a place where the design supports a thought without continually interrupting it.</p>
      <p>The expected benefit is less visual competition during writing. This is an intention, not a measured improvement or a claim about a released application. A next step would be a prototype that lets people write a note, find another document, and apply formatting. I would look for interruptions, missed controls, and moments where hiding complexity creates extra effort.</p>
      <p>I would judge that next step by the continuity of the writing experience. Can someone return to a sentence after using a tool without having to reorient themselves? Are the available actions understandable when needed? Those questions would help determine whether the quiet appearance translates into a practical sense of focus.</p>
    </section>
    <footer className="article-footer"><p>Pascal · Product & interface design</p><a className="back-link" href="/#selected-work">← Back to Selected Work</a></footer>
  </ReadingLayout>;
}
