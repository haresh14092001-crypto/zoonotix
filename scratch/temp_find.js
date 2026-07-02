const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const divsAsButtons = (html.match(/<div[^>]*onclick[^>]*>/g) || []).filter(d => !d.includes('role="button"') && !d.includes('tabindex="0"') && !d.includes('role="presentation"'));
console.log('Missing divs:', divsAsButtons);
