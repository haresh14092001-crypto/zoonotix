const fs = require('fs');

const htmlContent = fs.readFileSync('index.html', 'utf8');
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
const htmlCss = styleMatch ? styleMatch[1] : '';
const extCss = fs.readFileSync('assets/css/ze-ui.css', 'utf8');

function getSelectors(css) {
    // Strip comments
    const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const selectors = [];
    const re = /([^{}]+)\s*\{[^{}]*\}/g;
    let match;
    while ((match = re.exec(cleanCss)) !== null) {
        const selectorText = match[1].trim();
        // Split multiple selectors separated by comma
        selectorText.split(',').forEach(s => {
            const cleanSel = s.trim().replace(/\s+/g, ' ');
            if (cleanSel && !selectors.includes(cleanSel)) {
                selectors.push(cleanSel);
            }
        });
    }
    return selectors;
}

const htmlSel = getSelectors(htmlCss);
const extSel = getSelectors(extCss);

console.log(`HTML CSS has ${htmlSel.length} selectors.`);
console.log(`EXT CSS has ${extSel.length} selectors.`);

console.log("\n--- Selectors in HTML but NOT in External CSS ---");
htmlSel.forEach(s => {
    if (!extSel.includes(s)) {
        console.log(`- ${s}`);
    }
});

console.log("\n--- Selectors in External CSS but NOT in HTML ---");
extSel.forEach(s => {
    if (!htmlSel.includes(s)) {
        console.log(`- ${s}`);
    }
});
