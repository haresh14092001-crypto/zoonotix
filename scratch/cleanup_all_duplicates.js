const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Clean up duplicate view-directory blocks
const comment = '<!-- DIRECTORY & FILTERS VIEW -->';
const marker = '<div class="view" id="view-directory">';

let pos = html.indexOf(marker);
if (pos !== -1) {
  const occurrences = [];
  let idx = html.indexOf(marker);
  while (idx !== -1) {
    occurrences.push(idx);
    idx = html.indexOf(marker, idx + 1);
  }
  
  if (occurrences.length > 1) {
    const viewAboutIdx = html.indexOf('<div class="view" id="view-about">');
    if (viewAboutIdx !== -1) {
      const firstCommentIdx = html.indexOf(comment);
      const replaceStart = firstCommentIdx !== -1 ? firstCommentIdx : occurrences[0];
      html = html.substring(0, replaceStart) + `\n${comment}\n` + html.substring(viewAboutIdx);
      console.log('Cleaned up duplicate view-directory blocks');
    }
  }
}

// 2. Clean up duplicate drawers blocks
// Drawers block starts with "<!-- Drawers, Modals & Floating Buttons -->"
const drawersComment = '<!-- Drawers, Modals & Floating Buttons -->';
let drawersIdx = html.indexOf(drawersComment);
const occurrencesDrawers = [];
while (drawersIdx !== -1) {
  occurrencesDrawers.push(drawersIdx);
  drawersIdx = html.indexOf(drawersComment, drawersIdx + 1);
}

if (occurrencesDrawers.length > 1) {
  console.log(`Found ${occurrencesDrawers.length} duplicate drawers blocks`);
  // Find the search overlay (which comes after all drawers)
  const searchOverlayIdx = html.indexOf('<div id="search-overlay"');
  if (searchOverlayIdx !== -1) {
    // Keep everything before the first drawers block, and everything after the last drawers block (from searchOverlayIdx onwards)
    html = html.substring(0, occurrencesDrawers[0]) + html.substring(searchOverlayIdx);
    console.log('Cleaned up duplicate drawers blocks');
  }
}

// 3. Clean up duplicate glossary blocks
const glossaryMarker = '<div class="about-card" id="about-glossary-section"';
let glossaryIdx = html.indexOf(glossaryMarker);
const occurrencesGlossary = [];
while (glossaryIdx !== -1) {
  occurrencesGlossary.push(glossaryIdx);
  glossaryIdx = html.indexOf(glossaryMarker, glossaryIdx + 1);
}

if (occurrencesGlossary.length > 1) {
  console.log(`Found ${occurrencesGlossary.length} duplicate glossary blocks`);
  // The about view ends with </div>\n</div>\n\n</main>
  const aboutEndIdx = html.indexOf('</div>\n</div>\n\n</main>');
  if (aboutEndIdx !== -1) {
    // Keep everything before the first glossary block, and everything after the last glossary block (from aboutEndIdx onwards)
    html = html.substring(0, occurrencesGlossary[0]) + html.substring(aboutEndIdx);
    console.log('Cleaned up duplicate glossary blocks');
  }
}

fs.writeFileSync('index.html', html);
console.log('index.html cleaned up successfully!');
