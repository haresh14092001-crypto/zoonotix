/**
 * EMERGENCY STRUCTURAL REPAIR
 * The about view and search overlay HTML got corrupted.
 * This script replaces everything from the about view opening
 * through to the first <script> tag, restoring the correct HTML structure.
 */
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Identify start of about view
const aboutViewStart = html.indexOf('<div class="view" id="view-about">');
// Identify start of <script> block (which is correct and intact)
const scriptStart = html.indexOf('<script>\n');

if (aboutViewStart === -1) {
  console.error('Cannot find view-about!');
  process.exit(1);
}
if (scriptStart === -1) {
  console.error('Cannot find script block!');
  process.exit(1);
}

console.log('About view starts at char:', aboutViewStart);
console.log('Script starts at char:', scriptStart);

// The correct HTML section between about view and the script block
const correctSection = `<div class="view" id="view-about">
<div class="section-title">About ZoonotiX</div>
<p class="section-desc">This interactive module was designed as a Phase 1 prototype for a veterinary public health educational tool aligned to the BVSc &amp; AH curriculum of Indian universities (VCSI / ICAR guidelines).</p>
<div class="about-grid">
<div class="about-card">
<h3>Target Audience</h3>
<p>Final-year (UG Year III) veterinary students enrolled in the BVSc &amp; AH programme at Indian veterinary colleges under ICAR/VCSI syllabus. Designed as a supplementary reference for Veterinary Public Health &amp; Epidemiology (VPH &amp; E) coursework.</p>
</div>
<div class="about-card">
<h3>Scope &amp; Purpose</h3>
<p>Covers zoonotic diseases of established importance in the Indian context including OIE-notifiable diseases, NVBDCP-priority pathogens, and emerging infections relevant to South Asia. Each entry functions as a concise encyclopedia article.</p>
</div>
<div class="about-card">
<h3>Syllabus Alignment</h3>
<ul class="syllabus-list">
<li>Veterinary Public Health &amp; Epidemiology</li>
<li>Veterinary Microbiology &amp; Immunology</li>
<li>Veterinary Parasitology</li>
<li>Animal Husbandry &amp; Extension</li>
<li>OIE / WHO / NVBDCP priority zoonoses</li>
</ul>
</div>
<div class="about-card">
<h3>Phase Roadmap</h3>
<ul class="syllabus-list">
<li>Phase 1 - Static disease encyclopedia (current)</li>
<li>Phase 2 - AI-powered Q&amp;A per disease</li>
<li>Phase 3 - Case-based learning scenarios</li>
<li>Phase 4 - Assessment &amp; MCQ module</li>
<li>Phase 5 - Mobile app (iOS / Android)</li>
</ul>
</div>
<div class="about-card" id="about-glossary-section" style="grid-column: 1 / -1; margin-top:16px;">
  <h3>Veterinary Zoonoses Glossary</h3>
  <p style="margin-bottom:16px;">Search key epidemiological, public health, and microbiological terms used in this reference manual.</p>
  <div class="search-bar" style="margin-bottom:16px;">
    <span class="search-icon" aria-hidden="true"><svg class="icon icon-search" aria-hidden="true"><use href="assets/icons/ze-icons.svg#search"></use></svg></span>
    <input type="text" id="glossary-search-input" placeholder="Search glossary terms..." oninput="searchGlossary(this.value)">
  </div>
  <div class="quick-facts" id="glossary-results-list" style="max-height:400px;overflow-y:auto;gap:12px;border: 1px solid var(--border);padding:12px;border-radius:10px;"></div>
</div>
</div>
</div>

</main>

<div id="search-overlay" class="search-overlay" hidden aria-hidden="true" role="dialog" aria-label="Search diseases" aria-modal="true" tabindex="-1">
\t<div class="search-panel" role="document">
\t\t<button class="close-search" id="close-search-btn" aria-label="Close search">
\t\t\t<svg class="icon" aria-hidden="true"><use href="assets/icons/ze-icons.svg#arrow-left"></use></svg>
\t\t</button>
\t\t<div class="search-bar" style="margin:0 0 12px">
\t\t\t<span class="search-icon" aria-hidden="true"><svg class="icon"><use href="assets/icons/ze-icons.svg#search"></use></svg></span>
\t\t\t<input id="overlay-search-input" type="search" placeholder="Search diseases, agents, keywords..." aria-label="Search diseases" autocomplete="off">
\t\t</div>
\t\t<ul id="search-suggestions" class="search-suggestions" role="listbox" aria-label="Search suggestions"></ul>
\t</div>
</div>

<button id="floating-search-btn" class="floating-search-btn" aria-label="Open search" aria-controls="search-overlay" aria-expanded="false">
\t<svg class="icon" aria-hidden="true" focusable="false"><use href="assets/icons/ze-icons.svg#search"></use></svg>
</button>

<div id="reading-progress" class="reading-progress" aria-hidden="true"></div>

`;

// Replace the corrupted section
html = html.substring(0, aboutViewStart) + correctSection + html.substring(scriptStart);

fs.writeFileSync('index.html', html);
console.log('Emergency repair applied!');

// Verify
const finalHtml = fs.readFileSync('index.html', 'utf8');
const checks = {
  'Has Phase Roadmap card': finalHtml.includes('Phase Roadmap'),
  'Has glossary results list': finalHtml.includes('id="glossary-results-list"'),
  'Has search overlay': finalHtml.includes('id="search-overlay"'),
  'Has overlay-search-input': finalHtml.includes('id="overlay-search-input"'),
  'Has floating-search-btn': finalHtml.includes('id="floating-search-btn"'),
  'Has reading-progress': finalHtml.includes('id="reading-progress"'),
  'Has </main>': finalHtml.includes('</main>'),
  'About view before script': finalHtml.indexOf('id="view-about"') < finalHtml.indexOf('<script>'),
};
let allOk = true;
for (const [label, result] of Object.entries(checks)) {
  console.log(`  ${result ? '✅' : '❌'} ${label}`);
  if (!result) allOk = false;
}
console.log(allOk ? '\n🎉 Repair successful!' : '\n⚠️ Some checks failed.');
