const fs = require('fs');

let html = fs.readFileSync('scratch/build_index_html.js', 'utf8');
if (!html.includes('.clinical-pearl')) {
  const styles = `
    .clinical-pearl { margin-top:12px; padding:12px; background:rgba(0,212,170,0.1); border-left:4px solid var(--accent); border-radius:4px; font-size:13px; }
    .pitfall { margin-top:12px; padding:12px; background:rgba(232,68,68,0.1); border-left:4px solid var(--viral); border-radius:4px; font-size:13px; }
  `;
  html = html.replace('</style>', styles + '\n</style>');
  fs.writeFileSync('scratch/build_index_html.js', html);
  console.log('Added CSS to build_index_html.js');
}

let html2 = fs.readFileSync('index.html', 'utf8');
if (!html2.includes('.clinical-pearl')) {
  const styles2 = `
    .clinical-pearl { margin-top:12px; padding:12px; background:rgba(0,212,170,0.1); border-left:4px solid var(--accent); border-radius:4px; font-size:13px; }
    .pitfall { margin-top:12px; padding:12px; background:rgba(232,68,68,0.1); border-left:4px solid var(--viral); border-radius:4px; font-size:13px; }
  `;
  html2 = html2.replace('</style>', styles2 + '\n</style>');
  fs.writeFileSync('index.html', html2);
  console.log('Added CSS to index.html');
}
