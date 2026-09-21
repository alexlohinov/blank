import { mkdir, writeFile } from 'node:fs/promises';

// Editable vector masters. Export each at 1200 × 630 to its matching PNG.
const cards = [
  { name: 'home', label: 'PRODUCT DESIGNER', lines: ['Alex Lohinov'], description: 'Thoughtful interfaces. Working ideas.', footer: 'B2B SaaS · Mobile apps · Websites', motif: 'home' },
  { name: 'pascal', label: 'SELECTED WORK / PASCAL', lines: ['A Quiet Space to Think'], description: 'A local space for thoughts, without distractions.', footer: 'Note-taking app design · Alex Lohinov', motif: 'home' },
  { name: 'accord', label: 'SELECTED WORK / ACCORD', lines: ['Making Business Data', 'Feel Simple'], description: 'A clear, considered CRM for small teams.', footer: 'CRM design case study · Alex Lohinov', motif: 'accord' },
  { name: 'how-i-use-codex', label: 'WRITINGS / DESIGN & BUILDING', lines: ['How I Use Codex'], description: 'From design to something you can use.', footer: 'Websites · Prototypes · My own app', motif: 'codex' },
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
await mkdir('public/og', { recursive: true });
for (const card of cards) {
  const motif = card.motif === 'accord'
    ? '<rect x="906" y="224" width="192" height="152" rx="10" fill="none" stroke="#303030" stroke-width="3"/><path d="M906 262h192M906 300h192M906 338h192M966 262v114" fill="none" stroke="#303030" stroke-width="2"/><path d="M924 243h62M984 281h88M984 319h64M984 357h78" stroke="#303030" stroke-width="3" stroke-linecap="round"/>'
    : card.motif === 'codex'
      ? '<path d="M970 246l-40 40 40 40M1030 246l40 40-40 40M1014 226l-28 120" fill="none" stroke="#303030" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<rect x="918" y="218" width="164" height="150" rx="12" fill="none" stroke="#303030" stroke-width="3"/><path d="M918 254h164M944 282h76M944 304h110M944 326h90" fill="none" stroke="#303030" stroke-width="3" stroke-linecap="round"/><circle cx="936" cy="236" r="3" fill="#303030"/><circle cx="948" cy="236" r="3" fill="#303030"/>';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fafaf9"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="72" y="98" fill="#707070" font-size="16" letter-spacing="2">${escape(card.label)}</text>
    ${card.lines.map((line, index) => `<text x="68" y="${card.lines.length === 1 ? 288 : 250 + index * 78}" fill="#212121" font-size="64" font-weight="500" letter-spacing="-3">${escape(line)}</text>`).join('')}
    <text x="72" y="${card.lines.length === 1 ? 344 : 384}" fill="#707070" font-size="23">${escape(card.description)}</text>
    <path d="M72 508h1056" stroke="#dededb"/>
    <text x="72" y="555" fill="#707070" font-size="17">${escape(card.footer)}</text>
    <text x="1128" y="555" text-anchor="end" fill="#212121" font-size="17">lohinov.com</text>
  </g>
  ${motif}
</svg>`;
  await writeFile(`public/og/${card.name}.svg`, svg);
}
console.log('Generated SVG masters in public/og/.');
