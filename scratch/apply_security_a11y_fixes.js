const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Accessibility: Add role="button" and tabindex="0" to cat-cards
html = html.replace(/<div class="cat-card" onclick="([^"]+)">/g, '<div class="cat-card" role="button" tabindex="0" onclick="$1" onkeydown="if(event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); $1; }">');

// 2. Accessibility: Add role="button" and tabindex="0" to list-cards (in JS template)
html = html.replace(/<div class="disease-card" onclick="([^"]+)">/g, '<div class="disease-card" role="button" tabindex="0" onclick="$1" onkeydown="if(event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); $1; }">');
html = html.replace(/<div class="dir-disease-item" onclick="([^"]+)">/g, '<div class="dir-disease-item" role="button" tabindex="0" onclick="$1" onkeydown="if(event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); $1; }">');

// 3. Accessibility: Add href to a tags missing it.
html = html.replace(/<a class="nav-btn" onclick="([^"]+)">/g, '<a class="nav-btn" href="javascript:void(0)" onclick="$1">');

// 4. Security: Add escapeHTML function
const escapeHtmlFunc = `
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])
  );
}
`;
if (!html.includes('function escapeHTML')) {
  html = html.replace('<script>', '<script>\n' + escapeHtmlFunc);
}

// 5. Security: Sanitize user input in template strings
html = html.replace(/\$\{q\}/g, '${escapeHTML(q)}');
html = html.replace(/\$\{query\}/g, '${escapeHTML(query)}');
html = html.replace(/'" \+ query \+ "'/g, '\'" + escapeHTML(query) + "\'');

fs.writeFileSync('index.html', html);
console.log('index.html patched');

let buildHtml = fs.readFileSync('scratch/build_index_html.js', 'utf8');
buildHtml = buildHtml.replace(/<div class="disease-card" onclick="([^"]+)">/g, '<div class="disease-card" role="button" tabindex="0" onclick="$1" onkeydown="if(event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); $1; }">');
buildHtml = buildHtml.replace(/<div class="dir-disease-item" onclick="([^"]+)">/g, '<div class="dir-disease-item" role="button" tabindex="0" onclick="$1" onkeydown="if(event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); $1; }">');
fs.writeFileSync('scratch/build_index_html.js', buildHtml);
console.log('scratch/build_index_html.js patched');
