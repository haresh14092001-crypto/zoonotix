/**
 * FIXED FINAL TEST SUITE
 * Properly loads enrichment and SVG engine from the inline HTML script block.
 */
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let passed = 0;
let failed = 0;
const errors = [];

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL: ${testName}${details ? ' - ' + details : ''}`);
    failed++;
    errors.push({ test: testName, details });
  }
}

// --- LOAD DISEASES ---
let diseases = {};
try {
  const disMatch = html.match(/const diseases = (\{[\s\S]*?\n\};)/);
  if (disMatch) eval('diseases = ' + disMatch[1]);
} catch(e) { console.error('Could not load diseases:', e.message); }

// --- LOAD COLORMAP ---
let colorMap = {};
try {
  const cmMatch = html.match(/const colorMap = (\{[\s\S]*?\});/);
  if (cmMatch) eval('colorMap = ' + cmMatch[1]);
} catch(e) {}

// --- LOAD ENRICHMENT FROM INLINE SCRIPT ---
let diseaseEnrichment = {};
try {
  // Extract the diseaseEnrichment object directly from HTML
  const enrichStart = html.indexOf('const diseaseEnrichment = {');
  const enrichEndMarker = 'window.diseaseEnrichment = diseaseEnrichment;';
  const enrichEnd = html.indexOf(enrichEndMarker) + enrichEndMarker.length;
  const enrichCode = html.substring(enrichStart, enrichEnd)
    .replace('window.diseaseEnrichment = diseaseEnrichment;', '');
  eval(enrichCode);
} catch(e) {
  console.error('Could not eval diseaseEnrichment:', e.message.substring(0, 100));
}

// --- LOAD SVG ENGINE FROM INLINE SCRIPT ---
let svgEngine = {};
try {
  const svgStart = html.indexOf('const svgEngine = {');
  const svgEndMarker = 'window.svgEngine = svgEngine;';
  const svgEnd = html.indexOf(svgEndMarker) + svgEndMarker.length;
  const svgCode = html.substring(svgStart, svgEnd)
    .replace('window.svgEngine = svgEngine;', '');
  eval(svgCode);
} catch(e) {
  console.error('Could not eval svgEngine:', e.message.substring(0, 100));
}

const expectedDiseases = {
  bacterial: ['anthrax', 'brucellosis', 'leptospirosis', 'tuberculosis', 'salmonellosis', 'plague', 'qfever', 'listeriosis', 'glanders', 'campylobacteriosis', 'pasteurellosis', 'melioidosis'],
  viral: ['rabies', 'nipah', 'kyasanur', 'jencephalitis', 'rift_valley', 'influenza', 'hendravirus', 'monkeypox', 'hantavirus', 'creutzfeldt'],
  fungal: ['dermatophytosis', 'cryptococcosis', 'aspergillosis', 'sporotrichosis'],
  parasitic: ['toxoplasmosis', 'echinococcosis', 'leishmaniasis', 'cysticercosis', 'schistosomiasis', 'cryptosporidiosis', 'giardiasis', 'visceral_larva', 'trichinellosis'],
  prion: ['bse', 'scrapie', 'cwd']
};

console.log('\n=================================================');
console.log('ZOONOTIX FINAL TEST SUITE v2');
console.log('=================================================\n');

// GROUP 1: HTML STRUCTURE
console.log('--- GROUP 1: HTML STRUCTURE ---');
assert(!html.includes('```'), 'No markdown fences in HTML');
assert(html.includes('class="view active" id="view-home"'), 'Home view is active on load');
assert(html.includes('id="view-list"'), 'Disease list view exists');
assert(html.includes('id="view-ency"'), 'Encyclopedia view exists');
assert(html.includes('id="view-directory"'), 'Directory view exists');
assert(html.includes('id="view-about"'), 'About view exists');
assert(html.includes('id="cat-grid"'), 'Category grid element present');
assert(html.includes('id="ency-content"'), 'Encyclopedia content container present');
assert(html.includes('id="disease-list-container"'), 'Disease list container present');
assert(html.includes('</main>'), '</main> tag present');

// GROUP 2: NAVIGATION
console.log('\n--- GROUP 2: NAVIGATION ---');
assert(html.includes("onclick=\"showCategory('bacterial')\""), 'Bacterial card onclick');
assert(html.includes("onclick=\"showCategory('viral')\""), 'Viral card onclick');
assert(html.includes("onclick=\"showCategory('fungal')\""), 'Fungal card onclick');
assert(html.includes("onclick=\"showCategory('parasitic')\""), 'Parasitic card onclick');
assert(html.includes("onclick=\"showCategory('prion')\""), 'Prion card onclick');
assert(html.includes("function showView("), 'showView defined');
assert(html.includes("function showCategory("), 'showCategory defined');
assert(html.includes("function showDisease("), 'showDisease defined');
assert(html.includes("showView('ency')"), 'showView(ency) called');
assert(html.includes("showView('list')"), 'showView(list) called');

// GROUP 3: DISEASES DATABASE
console.log('\n--- GROUP 3: DISEASES DATABASE ---');
const allDiseaseIds = Object.values(expectedDiseases).flat();
assert(Object.keys(diseases).length === 5, 'diseases has 5 categories');
for (const [cat, ids] of Object.entries(expectedDiseases)) {
  const catDiseases = diseases[cat] || [];
  assert(catDiseases.length === ids.length, `${cat}: ${ids.length} diseases`);
  ids.forEach(id => {
    const found = catDiseases.find(d => d.id === id);
    assert(!!found, `${id} exists in ${cat}`);
  });
}

// GROUP 4: ENRICHMENT DATABASE
console.log('\n--- GROUP 4: ENRICHMENT DATABASE ---');
const enrichedCount = Object.keys(diseaseEnrichment).length;
console.log(`  Loaded enrichment records: ${enrichedCount}/${allDiseaseIds.length}`);
assert(enrichedCount === 38, `All 38 diseases enriched (got ${enrichedCount})`);

// Spot check a few records
const spotCheck = ['anthrax', 'salmonellosis', 'rabies', 'echinococcosis', 'bse', 'cryptococcosis'];
spotCheck.forEach(id => {
  const rec = diseaseEnrichment[id];
  assert(!!rec, `${id}: enrichment record loaded`);
  if (rec) {
    assert(!!rec.definition, `${id}: has definition`);
    assert(!!rec.clinicalSigns?.animals?.acute, `${id}: has animal acute signs`);
    assert(Array.isArray(rec.diagnosis?.tests) && rec.diagnosis.tests.length > 0, `${id}: has diagnostic tests`);
    assert(Array.isArray(rec.treatment) && rec.treatment.length > 0, `${id}: has treatments`);
    assert(!!rec.lesionsDesc?.hallmark, `${id}: has hallmark lesion`);
    assert(Array.isArray(rec.references) && rec.references.length > 0, `${id}: has references`);
  }
});

// GROUP 5: SVG ENGINE
console.log('\n--- GROUP 5: SVG ENGINE ---');
assert(typeof svgEngine.drawTransmissionCycle === 'function', 'drawTransmissionCycle is function');
assert(typeof svgEngine.drawPathogenesisFlow === 'function', 'drawPathogenesisFlow is function');
assert(typeof svgEngine.drawOneHealthTriangle === 'function', 'drawOneHealthTriangle is function');
assert(typeof svgEngine.drawDiagnosticWorkflow === 'function', 'drawDiagnosticWorkflow is function');

// SVG rendering tests
const svgTestCases = [
  { cat: 'bacterial', id: 'salmonellosis' },
  { cat: 'viral', id: 'rabies' },
  { cat: 'parasitic', id: 'echinococcosis' },
  { cat: 'prion', id: 'bse' },
];
svgTestCases.forEach(tc => {
  const d = (diseases[tc.cat] || []).find(x => x.id === tc.id);
  const ext = diseaseEnrichment[tc.id];
  if (d && ext && typeof svgEngine.drawTransmissionCycle === 'function') {
    try {
      const svg = svgEngine.drawTransmissionCycle(d, ext);
      assert(svg.includes('<svg'), `${tc.id}: TransmissionCycle SVG renders`);
      const svg2 = svgEngine.drawPathogenesisFlow(d, ext);
      assert(svg2.includes('<svg'), `${tc.id}: PathogenesisFlow SVG renders`);
    } catch(e) {
      assert(false, `${tc.id}: SVG renders without error`, e.message.substring(0, 80));
    }
  } else {
    assert(false, `${tc.id}: Pre-conditions for SVG test met`, `d=${!!d}, ext=${!!ext}, engine=${typeof svgEngine.drawTransmissionCycle}`);
  }
});

// GROUP 6: FEATURE FUNCTIONS
console.log('\n--- GROUP 6: FEATURE FUNCTIONS ---');
const requiredFunctions = [
  'function searchDiseases(', 'function toggleBookmark(', 'function renderDirectory(',
  'function toggleFilter(', 'function clearAllFilters(', 'function setDirectoryTab(',
  'function searchGlossary(', 'function toggleSectionCollapse(', 'function expandAllSections(',
  'function collapseAllSections(', 'function toggleClinicalTab(', 'function postRenderEncy(',
  'function renderRelatedDiseases(', 'function renderPaginationNav(', 'function trackView(',
  'function updateBookmarkButtonUI(', 'function setupScrollSpy(', 'function closeAllDrawers(',
  'function toggleMobileTOC(', 'function closeGlossaryTooltip(', 'function openGlossaryTab(',
];
requiredFunctions.forEach(fn => {
  assert(html.includes(fn), `${fn.replace('function ', '').replace('(', '')}`);
});

// GROUP 7: CRITICAL UI ELEMENTS
console.log('\n--- GROUP 7: CRITICAL UI ELEMENTS ---');
assert(html.includes('id="toc-drawer"'), 'TOC Drawer');
assert(html.includes('id="drawer-overlay"'), 'Drawer overlay');
assert(html.includes('id="glossary-tooltip"'), 'Glossary tooltip');
assert(html.includes('id="back-to-top-btn"'), 'Back-to-top button');
assert(html.includes('id="mobile-toc-btn"'), 'Mobile TOC FAB');
assert(html.includes('id="dir-disease-list"'), 'Directory disease list');
assert(html.includes('id="dir-alphabet-picker"'), 'Alphabet picker');
assert(html.includes('id="dir-search-input"'), 'Directory search input');
assert(html.includes('id="glossary-results-list"'), 'Glossary results list');
assert(html.includes('id="bookmark-count-badge"'), 'Bookmark count badge');
assert(html.includes('id="search-overlay"'), 'Search overlay');
assert(html.includes('id="overlay-search-input"'), 'Search overlay input');
assert(html.includes('id="floating-search-btn"'), 'Floating search button');

// GROUP 8: DISEASE DATA FIELDS
console.log('\n--- GROUP 8: DISEASE FIELD VALIDATION ---');
const requiredFields = ['id', 'name', 'aka', 'agent', 'badge', 'hosts', 'reservoir', 'vector', 'spread', 'incubation', 'mortality', 'humanRisk', 'danger', 'geography', 'indianContext', 'keywords', 'quickfacts'];
let fieldErrors = 0;
for (const [cat, catDiseases] of Object.entries(diseases)) {
  catDiseases.forEach(d => {
    requiredFields.forEach(field => {
      if (!d[field] && d[field] !== 0) {
        fieldErrors++;
        if (fieldErrors <= 5) console.log(`  ⚠️  ${d.id} missing: ${field}`);
      }
    });
  });
}
assert(fieldErrors === 0, `All diseases have required fields`, `${fieldErrors} missing fields`);

// GROUP 9: ENRICHMENT FIELD COMPLETENESS
console.log('\n--- GROUP 9: ENRICHMENT FIELDS VALIDATION ---');
const requiredEnrichFields = ['definition', 'etiology', 'taxonomy', 'vetImportance', 'publicHealthImportance',
  'riskGroups', 'envSurvival', 'pathogenesis', 'clinicalSigns', 'lesionsDesc', 'diagnosis', 'treatment', 'control',
  'publicHealth', 'onehealth', 'references'];

let enrichFieldErrors = 0;
for (const id of allDiseaseIds) {
  const rec = diseaseEnrichment[id];
  if (!rec) { enrichFieldErrors++; continue; }
  requiredEnrichFields.forEach(field => {
    if (!rec[field]) {
      enrichFieldErrors++;
      if (enrichFieldErrors <= 5) console.log(`  ⚠️  ${id} enrichment missing: ${field}`);
    }
  });
}
assert(enrichFieldErrors === 0, `All enrichment records complete`, `${enrichFieldErrors} missing fields`);

// SUMMARY
console.log('\n=================================================');
console.log(`FINAL RESULTS: ${passed} PASSED | ${failed} FAILED`);
console.log('=================================================');
if (failed > 0) {
  console.log('\nFailed tests:');
  errors.forEach(e => console.log(`  ❌ ${e.test}${e.details ? ': ' + e.details : ''}`));
}
if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
}
