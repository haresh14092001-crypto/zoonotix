/**
 * EMERGENCY REPAIR SCRIPT
 * Repairs the about view which got corrupted.
 * Restores Phase Roadmap card, fixes about view, adds glossary section.
 */
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The about view should be:
// 1. section-title, section-desc
// 2. about-grid with 4 cards (Target Audience, Scope, Syllabus, Phase Roadmap)
// 3. Glossary card

// Find the about view start
const aboutViewStart = html.indexOf('<div class="view" id="view-about">');
if (aboutViewStart === -1) {
  console.error('FATAL: Cannot find about view!');
  process.exit(1);
}

// Find the search-overlay div that should come AFTER the about view and its </div></div>
const searchOverlayStart = html.indexOf('<div id="search-overlay"');
if (searchOverlayStart === -1) {
  console.error('FATAL: Cannot find search-overlay!');
  process.exit(1);
}

// Extract the current about view block (to understand what we have)
const currentAboutBlock = html.substring(aboutViewStart, searchOverlayStart);
console.log('Current about view length:', currentAboutBlock.length);
console.log('Current about view ends with:', JSON.stringify(currentAboutBlock.slice(-200)));

// Build the correct about view
const correctAboutView = `<div class="view" id="view-about">
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

`;

// Replace the broken about block with the correct one
html = html.substring(0, aboutViewStart) + correctAboutView + html.substring(searchOverlayStart);

fs.writeFileSync('index.html', html);
console.log('About view repaired successfully!');

// Verify
const finalHtml = fs.readFileSync('index.html', 'utf8');
console.log('\n--- VERIFY ---');
console.log('Has Phase Roadmap:', finalHtml.includes('Phase Roadmap'));
console.log('Has Glossary results list:', finalHtml.includes('id="glossary-results-list"'));
console.log('Has search-overlay after about:', finalHtml.indexOf('id="search-overlay"') > finalHtml.indexOf('id="view-about"'));
console.log('view-about has correct closing:', finalHtml.includes('</div>\n</div>\n\n</main>'));
