const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let buildScript = fs.readFileSync('scratch/build_index_html.js', 'utf8');

let fixCount = 0;
const fixes = [];

function fix(description, find, replace, target) {
  target = target || 'html';
  const content = (target === 'html') ? html : buildScript;
  if (!content.includes(find)) {
    fixes.push({ description: description, status: 'NOT FOUND' });
    return;
  }
  const updated = content.split(find).join(replace);
  if (target === 'html') {
    html = updated;
  } else {
    buildScript = updated;
  }
  fixCount++;
  fixes.push({ description: description, status: 'FIXED' });
}

// BUG 1: Triple duplicate DIRECTORY comments
fix(
  'Remove triple duplicate DIRECTORY comments',
  '<!-- DIRECTORY & FILTERS VIEW -->\n<!-- DIRECTORY & FILTERS VIEW -->\n<!-- DIRECTORY & FILTERS VIEW -->\n<div class="view" id="view-directory">',
  '<!-- DIRECTORY & FILTERS VIEW -->\n<div class="view" id="view-directory">'
);

// BUG 2: Duplicate ency-back-btn ID (static wrapper has one, dynamic template has one)
fix(
  'Remove duplicate ency-back-btn ID from static wrapper button',
  '<button class="back-btn" id="ency-back-btn" onclick="goBackToList()">',
  '<button class="back-btn" onclick="goBackToList()">'
);

// BUG 3: humanConnection crash in index.html fallback object
fix(
  'Fix humanConnection key in index.html fallback onehealth object',
  'onehealth: { humanConnection: "Zoonotic exposure.", animalConnection: "Domestic host cycles.", envConnection: "Fomite/soil interfaces." },',
  'onehealth: { human: "Zoonotic exposure.", animal: "Domestic host cycles.", environment: "Fomite/soil interfaces." },'
);

// BUG 4: humanConnection crash in index.html template
fix(
  'Fix humanConnection.split crash in index.html revision card',
  '${ext.onehealth.humanConnection.split(\' \').slice(0, 4).join(\' \')}...',
  '${(ext.onehealth.human || ext.onehealth.humanConnection || \'Zoonotic exposure.\').split(\' \').slice(0, 4).join(\' \')}...'
);

// BUG 5: humanConnection crash in build script fallback
fix(
  'Fix humanConnection key in build_index_html.js fallback',
  'onehealth: { humanConnection: "Zoonotic exposure.", animalConnection: "Domestic host cycles.", envConnection: "Fomite/soil interfaces." },',
  'onehealth: { human: "Zoonotic exposure.", animal: "Domestic host cycles.", environment: "Fomite/soil interfaces." },',
  'build'
);

// BUG 6: humanConnection crash in build script template
fix(
  'Fix humanConnection.split crash in build_index_html.js revision card',
  "\\${ext.onehealth.humanConnection.split(' ').slice(0, 4).join(' ')}...",
  "\\${(ext.onehealth.human || ext.onehealth.humanConnection || 'Zoonotic exposure.').split(' ').slice(0, 4).join(' ')}...",
  'build'
);

// BUG 7: d.spread.split crash - spread can be undefined
fix(
  'Fix d.spread.split crash in HTML revision card',
  "${d.spread.split(' ').slice(0, 3).join(' ')}",
  "${(d.spread || d.vector || 'Direct contact').split(' ').slice(0, 3).join(' ')}"
);
fix(
  'Fix d.spread.split crash in build script revision card',
  "\\${d.spread.split(' ').slice(0, 3).join(' ')}",
  "\\${(d.spread || d.vector || 'Direct contact').split(' ').slice(0, 3).join(' ')}",
  'build'
);

// BUG 8: ext.etiology.split crash  
fix(
  'Fix ext.etiology.split crash in HTML revision card',
  "${ext.etiology.split(';')[0]}",
  "${(ext.etiology || d.agent || 'Unknown agent').split(';')[0]}"
);
fix(
  'Fix ext.etiology.split crash in build script',
  "\\${ext.etiology.split(';')[0]}",
  "\\${(ext.etiology || d.agent || 'Unknown agent').split(';')[0]}",
  'build'
);

// BUG 9: ext.lesionsDesc.hallmark.split crash
fix(
  'Fix lesionsDesc.hallmark.split crash in HTML',
  "${ext.lesionsDesc.hallmark.split(' ').slice(0, 5).join(' ')}...",
  "${(ext.lesionsDesc && ext.lesionsDesc.hallmark ? ext.lesionsDesc.hallmark.split(' ').slice(0, 5).join(' ') : 'Tissue changes noted')}..."
);
fix(
  'Fix lesionsDesc.hallmark.split crash in build script',
  "\\${ext.lesionsDesc.hallmark.split(' ').slice(0, 5).join(' ')}...",
  "\\${(ext.lesionsDesc && ext.lesionsDesc.hallmark ? ext.lesionsDesc.hallmark.split(' ').slice(0, 5).join(' ') : 'Tissue changes noted')}...",
  'build'
);

// BUG 10: ext.control.farm.split crash
fix(
  'Fix control.farm.split crash in HTML',
  "${ext.control.farm.split(' ').slice(0, 4).join(' ')}...",
  "${(ext.control && ext.control.farm ? ext.control.farm.split(' ').slice(0, 4).join(' ') : 'Biosecurity measures')}..."
);
fix(
  'Fix control.farm.split crash in build script',
  "\\${ext.control.farm.split(' ').slice(0, 4).join(' ')}...",
  "\\${(ext.control && ext.control.farm ? ext.control.farm.split(' ').slice(0, 4).join(' ') : 'Biosecurity measures')}...",
  'build'
);

// BUG 11: d.hosts.join crash
fix(
  'Fix d.hosts.join crash in HTML epidemiology section',
  "${d.hosts.join(', ')}",
  "${Array.isArray(d.hosts) ? d.hosts.join(', ') : (d.hosts || 'Multiple species')}"
);
fix(
  'Fix d.hosts.join crash in build script',
  "\\${d.hosts.join(', ')}",
  "\\${Array.isArray(d.hosts) ? d.hosts.join(', ') : (d.hosts || 'Multiple species')}",
  'build'
);

// BUG 12: ext.diagnosis.tests[0] crash
fix(
  'Fix ext.diagnosis.tests[0].test crash in HTML',
  "${ext.diagnosis.tests[0].test}",
  "${ext.diagnosis.tests && ext.diagnosis.tests.length > 0 ? ext.diagnosis.tests[0].test : 'PCR'}"
);
fix(
  'Fix ext.diagnosis.tests[0].test crash in build script',
  "\\${ext.diagnosis.tests[0].test}",
  "\\${ext.diagnosis.tests && ext.diagnosis.tests.length > 0 ? ext.diagnosis.tests[0].test : 'PCR'}",
  'build'
);

// BUG 13: Disease number shows "09" correctly but "010" for idx >= 9  
fix(
  'Fix disease number display (01-09 then 10, 11... not 010)',
  '<div class="disease-num">0${i+1}</div>',
  '<div class="disease-num">${String(i+1).padStart(2, \'0\')}</div>'
);

// BUG 14: Missing body tag
if (!html.includes('<body')) {
  fix(
    'Add missing body tag',
    '<main>',
    '<body>\n<main>'
  );
}

// BUG 15: Missing closing body tag
if (!html.includes('</body>')) {
  fix(
    'Add missing closing body tag',
    '</html>',
    '</body>\n</html>'
  );
}

// BUG 16: Missing PWA / SEO meta tags
if (!html.includes('theme-color')) {
  fix(
    'Add PWA and SEO meta tags',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n<meta name="theme-color" content="#0b0f1a">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n<meta name="description" content="ZoonotiX — A comprehensive veterinary zoonotic disease encyclopedia for BVSc students. Covers 38 zoonoses with clinical signs, epidemiology, diagnosis and treatment.">\n<meta name="keywords" content="zoonotic diseases, veterinary, BVSc, salmonella, rabies, anthrax, brucellosis, zoonosis, India">'
  );
}

// BUG 17: Missing aria-label on home search input
fix(
  'Add aria-label to home search input',
  'id="search-input" placeholder="Search diseases..." oninput="searchDiseases(this.value)"',
  'id="search-input" placeholder="Search diseases..." aria-label="Search all zoonotic diseases" autocomplete="off" oninput="searchDiseases(this.value)"'
);

// BUG 18: Category cards missing keyboard accessibility
var cats = ['bacterial', 'viral', 'fungal', 'parasitic', 'prion'];
cats.forEach(function(cat) {
  fix(
    'Make ' + cat + ' category card keyboard accessible',
    'data-cat="' + cat + '" onclick="showCategory(\'' + cat + '\')"',
    'data-cat="' + cat + '" role="button" tabindex="0" aria-label="Browse ' + cat + ' zoonoses" onclick="showCategory(\'' + cat + '\')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){showCategory(\'' + cat + '\');}"'
  );
});

// BUG 19: Add skip navigation link
if (!html.includes('skip-nav') && !html.includes('Skip to main content')) {
  fix(
    'Add skip-to-content link for screen readers',
    '<header',
    '<a href="#main-content" style="position:absolute;left:-9999px;top:4px;width:1px;height:1px;overflow:hidden;background:var(--accent);color:#000;padding:8px 16px;border-radius:4px;font-weight:600;z-index:9999;text-decoration:none;" onfocus="this.style.left=\'50%\';this.style.transform=\'translateX(-50%)\';this.style.width=\'auto\';this.style.height=\'auto\';" onblur="this.style.left=\'-9999px\';this.style.width=\'1px\';this.style.height=\'1px\';">Skip to main content</a>\n<header'
  );
  fix(
    'Add id to main for skip link target',
    '<main>',
    '<main id="main-content">'
  );
}

// BUG 20: Missing aria-label on floating search button
fix(
  'Improve floating search button aria-label',
  'id="floating-search-btn"',
  'id="floating-search-btn" aria-label="Open search" aria-haspopup="dialog"'
);

// BUG 21: Disease cards in showCategory template need keyboard + aria
fix(
  'Add keyboard accessibility to disease cards in showCategory',
  'onclick="showDisease(\'' + "${cat}" + "', '${d.id}')\">",
  'role="button" tabindex="0" aria-label="View ${d.name}" onclick="showDisease(\'' + "${cat}" + "', '${d.id}')" + "\" onkeydown=\"if(event.key==='Enter'||event.key===' '){showDisease('" + "${cat}" + "','${d.id}');}\">"
);

// Write all fixed files
fs.writeFileSync('index.html', html);
fs.writeFileSync('scratch/build_index_html.js', buildScript);

console.log('\n=== ENGINEERING FIX REPORT ===\n');
fixes.forEach(function(f) {
  var icon = f.status === 'FIXED' ? '✅' : '⚠️ ';
  console.log(icon + ' [' + f.status + '] ' + f.description);
});
console.log('\n' + fixCount + ' fixes applied successfully to index.html and build_index_html.js.');
