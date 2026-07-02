const fs = require('fs');

// Read the HTML style block content
const htmlContent = fs.readFileSync('index.html', 'utf8');
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
const htmlCss = styleMatch ? styleMatch[1] : '';

// Read the external CSS content
const extCss = fs.readFileSync('assets/css/ze-ui.css', 'utf8');

// Helper to normalize CSS by stripping whitespace and comments
function normalize(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\s+/g, ''); // remove all whitespace
}

const normHtmlCss = normalize(htmlCss);
const normExtCss = normalize(extCss);

console.log(`Normalized HTML CSS length: ${normHtmlCss.length}`);
console.log(`Normalized External CSS length: ${normExtCss.length}`);

if (normHtmlCss === normExtCss) {
    console.log("The CSS contents are identical!");
} else {
    console.log("The CSS contents are DIFFERENT.");
    
    // Find first difference
    let firstDiff = -1;
    const minLen = Math.min(normHtmlCss.length, normExtCss.length);
    for (let i = 0; i < minLen; i++) {
        if (normHtmlCss[i] !== normExtCss[i]) {
            firstDiff = i;
            break;
        }
    }
    if (firstDiff !== -1) {
        console.log(`First difference at character ${firstDiff}`);
        console.log(`HTML: ${normHtmlCss.substring(firstDiff, firstDiff + 100)}`);
        console.log(`EXT:  ${normExtCss.substring(firstDiff, firstDiff + 100)}`);
    }
}
