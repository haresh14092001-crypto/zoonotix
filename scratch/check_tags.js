const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Parse HTML tags to find unclosed divs or other structural issues
let pos = 0;
let tags = [];
const re = /<\/?([a-z1-6-]+)(?:\s+[a-z-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*(\/?)>/gi;

let match;
while ((match = re.exec(html)) !== null) {
  const tag = match[1].toLowerCase();
  const isClose = match[0].startsWith('</');
  const isSelfClosing = match[2] === '/' || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tag);
  
  if (!isSelfClosing) {
    if (isClose) {
      if (tags.length === 0) {
        console.log(`Unexpected closing tag </${tag}> at char ${match.index}`);
      } else {
        const last = tags.pop();
        if (last.tag !== tag) {
          console.log(`Mismatched closing tag </${tag}> at char ${match.index}, expected </${last.tag}> (opened at char ${last.index})`);
        }
      }
    } else {
      tags.push({ tag, index: match.index });
    }
  }
}

console.log('Open tags remaining:', tags.map(t => `${t.tag} (char ${t.index})`));
