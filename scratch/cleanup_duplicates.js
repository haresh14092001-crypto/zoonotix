const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find all view-directory blocks and replace them with a single comment
// Each block starts with <!-- DIRECTORY & FILTERS VIEW -->
// and ends with some specific markup, or we can use regex to find
// the entire block from <div class="view" id="view-directory"> to </div>
// since we know there are 5 of them.

const comment = '<!-- DIRECTORY & FILTERS VIEW -->';
const marker = '<div class="view" id="view-directory">';

let pos = html.indexOf(marker);
if (pos !== -1) {
  // We want to find the first occurrence of view-directory
  // and the last occurrence of it.
  // Actually, let's find the closing of the 5th view-directory.
  // Let's count how many times it occurs.
  const occurrences = [];
  let idx = html.indexOf(marker);
  while (idx !== -1) {
    occurrences.push(idx);
    idx = html.indexOf(marker, idx + 1);
  }
  
  console.log(`Found ${occurrences.length} occurrences of view-directory`);
  
  if (occurrences.length > 1) {
    // Find the end of the last occurrence block
    // The next view is id="view-about"
    const viewAboutIdx = html.indexOf('<div class="view" id="view-about">');
    if (viewAboutIdx !== -1) {
      // Replace the entire block from the first occurrence of the comment (or marker) to viewAboutIdx
      const firstCommentIdx = html.indexOf(comment);
      const replaceStart = firstCommentIdx !== -1 ? firstCommentIdx : occurrences[0];
      
      html = html.substring(0, replaceStart) + `\n${comment}\n` + html.substring(viewAboutIdx);
      fs.writeFileSync('index.html', html);
      console.log('Cleaned up duplicate view-directory blocks from index.html');
    }
  }
}
