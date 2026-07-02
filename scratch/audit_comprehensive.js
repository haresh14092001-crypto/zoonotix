const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const buildScript = fs.readFileSync('scratch/build_index_html.js', 'utf8');

const report = {
  accessibility: [],
  security: [],
  performance: [],
  techDebt: [],
  scientific: []
};

// Accessibility Audit
const buttonWithoutAria = (indexHtml.match(/<button[^>]*>/g) || []).filter(b => !b.includes('aria-label') && !b.includes('title') && b.includes('icon'));
if (buttonWithoutAria.length > 0) report.accessibility.push(`Found ${buttonWithoutAria.length} icon buttons missing aria-label.`);

const divsAsButtons = (indexHtml.match(/<div[^>]*onclick[^>]*>/g) || []).filter(d => !d.includes('role="button"') && !d.includes('tabindex="0"') && !d.includes('role="presentation"'));
if (divsAsButtons.length > 0) report.accessibility.push(`Found ${divsAsButtons.length} clickable divs missing role="button" and tabindex="0".`);

const aTagsWithoutHref = (indexHtml.match(/<a\s[^>]*>/g) || []).filter(a => !a.includes('href'));
if (aTagsWithoutHref.length > 0) report.accessibility.push(`Found ${aTagsWithoutHref.length} <a> tags missing href.`);

// Security Audit
const innerHtmlUses = (indexHtml.match(/\.innerHTML\s*=/g) || []).length;
if (innerHtmlUses > 0) report.security.push(`Found ${innerHtmlUses} usages of .innerHTML (potential XSS risk).`);

const evalUses = (indexHtml.match(/eval\(/g) || []).length;
if (evalUses > 0) report.security.push(`Found ${evalUses} usages of eval() (critical XSS risk).`);

// Performance & Architecture Audit
report.performance.push(`index.html size: ${(indexHtml.length / 1024).toFixed(2)} KB.`);
if (indexHtml.length > 300000) report.performance.push('index.html exceeds 300KB - large monolith pattern detected.');

const inlineStyles = (indexHtml.match(/style="[^"]+"/g) || []).length;
report.techDebt.push(`Found ${inlineStyles} inline style attributes. Consider moving to CSS classes.`);

// Technical Debt: Duplicate IDs
const ids = Array.from(indexHtml.matchAll(/id="([^"]+)"/g)).map(m => m[1]);
const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
const uniqueDuplicates = [...new Set(duplicates)];
if (uniqueDuplicates.length > 0) {
  report.techDebt.push(`Found ${uniqueDuplicates.length} duplicate IDs: ${uniqueDuplicates.join(', ')}`);
}

// Log Report
console.log('=== ZOONOTIX PHASE 6.5 AUDIT ===');
console.log('\n--- ACCESSIBILITY ---');
report.accessibility.forEach(i => console.log('❌ ' + i));
console.log('\n--- SECURITY ---');
report.security.forEach(i => console.log('❌ ' + i));
console.log('\n--- PERFORMANCE & ARCHITECTURE ---');
report.performance.forEach(i => console.log('⚠️ ' + i));
console.log('\n--- TECHNICAL DEBT ---');
report.techDebt.forEach(i => console.log('⚠️ ' + i));
