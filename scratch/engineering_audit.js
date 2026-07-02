const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('=== ZoonotiX Engineering Audit ===\n');

// 1. Duplicate IDs
const idMatches = [...html.matchAll(/id="([^"]+)"/g)];
const ids = idMatches.map(m => m[1]);
const idCount = {};
ids.forEach(id => { idCount[id] = (idCount[id] || 0) + 1; });
const dupIds = Object.entries(idCount).filter(([k, v]) => v > 1);
console.log('=== DUPLICATE IDs ===');
if (dupIds.length === 0) console.log('  NONE');
dupIds.forEach(([id, count]) => console.log(`  "${id}": ${count}x`));

// 2. humanConnection references
const hcRefs = [...html.matchAll(/humanConnection/g)];
console.log('\n=== humanConnection references ===', hcRefs.length, 'occurrences');
if (hcRefs.length > 0) {
  const lines = html.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('humanConnection')) console.log(`  Line ${idx + 1}: ${line.trim().substring(0, 100)}`);
  });
}

// 3. Functions called in onclick but not defined
const onclickFns = [...html.matchAll(/onclick="([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g)].map(m => m[1]);
const uniqueOnclickFns = [...new Set(onclickFns)];
const definedFns = [...html.matchAll(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g)].map(m => m[1]);
const missingFns = uniqueOnclickFns.filter(fn => !definedFns.includes(fn));
console.log('\n=== MISSING FUNCTIONS (called in onclick but not defined) ===');
if (missingFns.length === 0) console.log('  NONE');
missingFns.forEach(fn => console.log(`  MISSING: ${fn}`));
console.log('  All onclick functions:', uniqueOnclickFns.join(', '));

// 4. .split() calls that could crash on undefined
const splitOnUndefined = [...html.matchAll(/\$\{([^}]*(?:\.split|\.map|\.filter|\.forEach)[^}]*)\}/g)];
console.log('\n=== Potentially unsafe .split/.map/.filter calls ===');
splitOnUndefined.slice(0, 20).forEach(m => {
  if (m[1].includes('undefined') || !m[1].includes('||')) {
    console.log(`  ${m[1].substring(0, 100)}`);
  }
});

// 5. Script count
const scriptCount = (html.match(/<script/g) || []).length;
console.log('\n=== Script tags ===', scriptCount);

// 6. Count major views
const viewIds = [...html.matchAll(/id="view-([^"]+)"/g)].map(m => m[1]);
console.log('\n=== Views found ===', viewIds.length, '->', viewIds.join(', '));

// 7. Check for broken href assets
const hrefMatches = [...html.matchAll(/href="([^"#]+)"/g)].map(m => m[1]);
const assetHrefs = hrefMatches.filter(h => !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('javascript'));
console.log('\n=== Local asset hrefs ===');
assetHrefs.forEach(h => {
  const exists = fs.existsSync(h);
  if (!exists) console.log(`  MISSING FILE: ${h}`);
});
if (assetHrefs.filter(h => !fs.existsSync(h)).length === 0) console.log('  All local href files exist');

// 8. Check for broken src assets  
const srcMatches = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
const localSrcs = srcMatches.filter(s => !s.startsWith('http'));
console.log('\n=== Local src assets ===');
localSrcs.forEach(s => {
  if (!fs.existsSync(s)) console.log(`  MISSING FILE: ${s}`);
});
if (localSrcs.filter(s => !fs.existsSync(s)).length === 0) console.log('  All local src files exist');

// 9. showView function check
const showViewCalls = [...html.matchAll(/showView\('([^']+)'\)/g)].map(m => m[1]);
const uniqueShowViews = [...new Set(showViewCalls)];
console.log('\n=== showView called with ===', uniqueShowViews.join(', '));
uniqueShowViews.forEach(v => {
  if (!html.includes(`id="view-${v}"`)) {
    console.log(`  MISSING VIEW: view-${v}`);
  }
});

// 10. Check showDisease is actually called from disease list cards
const diseaseBtnClicks = [...html.matchAll(/onclick="showDisease\(/g)].length;
const listCardClicks = [...html.matchAll(/onclick="showCategory\(/g)].length;
console.log('\n=== showDisease onclicks in HTML ===', diseaseBtnClicks);
console.log('=== showCategory onclicks in HTML ===', listCardClicks);

// 11. showCategory function
if (!definedFns.includes('showCategory')) {
  console.log('\n!!! CRITICAL: showCategory is NOT DEFINED but called in onclick !!!');
}
if (!definedFns.includes('showDisease')) {
  console.log('\n!!! CRITICAL: showDisease is NOT DEFINED but called in onclick !!!');
}

// 12. Check disease list rendering  
const renderListFn = html.includes('function renderDiseaseList') || html.includes('function renderList');
console.log('\n=== renderDiseaseList/renderList defined ===', renderListFn);

console.log('\n=== AUDIT COMPLETE ===');
