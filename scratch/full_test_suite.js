/**
 * ZOONOTIX COMPREHENSIVE TEST SUITE
 * Tests all navigation paths, disease rendering, and feature integrity
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

// Load all JS modules
const enrichmentCode = fs.readFileSync('scratch/zoonotix_content_enrichment.js', 'utf8');
const svgEngineCode = fs.readFileSync('scratch/zoonotix_svg_engine.js', 'utf8');

// Create a simulated browser environment
const { JSDOM } = (() => {
  try { return require('jsdom'); } catch(e) { return null; }
})() || {};

// Extract diseases database directly
let diseases = {};
try {
  const disMatch = html.match(/const diseases = (\{[\s\S]*?\}\s*\};)/);
  if (disMatch) eval('diseases = ' + disMatch[1]);
} catch(e) {}

// Extract colorMap
let colorMap = {};
try {
  const cmMatch = html.match(/const colorMap = (\{[\s\S]*?\});/);
  if (cmMatch) eval('colorMap = ' + cmMatch[1]);
} catch(e) {}

// Load enrichment
let diseaseEnrichment = {};
try {
  eval(enrichmentCode.replace('module.exports', '// module.exports').replace('window.diseaseEnrichment = diseaseEnrichment;', ''));
} catch(e) {}

// Load SVG engine
let svgEngine = {};
try {
  eval(svgEngineCode.replace('module.exports', '// module.exports').replace('window.svgEngine = svgEngine;', ''));
} catch(e) {}

console.log('\n=================================================');
console.log('ZOONOTIX FULL TEST SUITE');
console.log('=================================================\n');

// =====================================================
// GROUP 1: HTML STRUCTURE INTEGRITY
// =====================================================
console.log('--- GROUP 1: HTML STRUCTURE INTEGRITY ---');
assert(!html.includes('```'), 'No markdown fences in HTML');
assert(html.includes('<!DOCTYPE html>'), 'Doctype is present');
assert(html.includes('<html lang="en">'), 'HTML lang attribute');
assert(html.includes('class="view active" id="view-home"'), 'Home view is active on load');
assert(html.includes('id="view-list"'), 'Disease list view exists');
assert(html.includes('id="view-ency"'), 'Encyclopedia view exists');
assert(html.includes('id="view-directory"'), 'Directory view exists');
assert(html.includes('id="view-about"'), 'About view exists');
assert(html.includes('id="cat-grid"'), 'Category grid element present');
assert(html.includes('id="disease-list-container"'), 'Disease list container present');
assert(html.includes('id="ency-content"'), 'Encyclopedia content container present');
assert((html.match(/id="view-/g) || []).length >= 5, 'At least 5 view containers');

// =====================================================
// GROUP 2: NAVIGATION INTEGRITY
// =====================================================
console.log('\n--- GROUP 2: NAVIGATION INTEGRITY ---');
assert(html.includes("onclick=\"showCategory('bacterial')\""), 'Bacterial category card has onclick');
assert(html.includes("onclick=\"showCategory('viral')\""), 'Viral category card has onclick');
assert(html.includes("onclick=\"showCategory('fungal')\""), 'Fungal category card has onclick');
assert(html.includes("onclick=\"showCategory('parasitic')\""), 'Parasitic category card has onclick');
assert(html.includes("onclick=\"showCategory('prion')\""), 'Prion category card has onclick');
assert(html.includes("function showView("), 'showView function defined');
assert(html.includes("function showCategory("), 'showCategory function defined');
assert(html.includes("function showDisease("), 'showDisease function defined');
assert(html.includes("function goBackToList("), 'goBackToList function defined');
assert(html.includes("showView('ency')"), 'showView(ency) called inside showDisease');
assert(html.includes("showView('list')"), 'showView(list) called inside showCategory');

// =====================================================
// GROUP 3: DISEASES DATABASE COMPLETENESS
// =====================================================
console.log('\n--- GROUP 3: DISEASES DATABASE COMPLETENESS ---');
const expectedDiseases = {
  bacterial: ['anthrax', 'brucellosis', 'leptospirosis', 'tuberculosis', 'salmonellosis', 'plague', 'qfever', 'listeriosis', 'glanders', 'campylobacteriosis', 'pasteurellosis', 'melioidosis'],
  viral: ['rabies', 'nipah', 'kyasanur', 'jencephalitis', 'rift_valley', 'influenza', 'hendravirus', 'monkeypox', 'hantavirus', 'creutzfeldt'],
  fungal: ['dermatophytosis', 'cryptococcosis', 'aspergillosis', 'sporotrichosis'],
  parasitic: ['toxoplasmosis', 'echinococcosis', 'leishmaniasis', 'cysticercosis', 'schistosomiasis', 'cryptosporidiosis', 'giardiasis', 'visceral_larva', 'trichinellosis'],
  prion: ['bse', 'scrapie', 'cwd']
};

for (const [cat, ids] of Object.entries(expectedDiseases)) {
  const catDiseases = diseases[cat] || [];
  assert(catDiseases.length === ids.length, 
    `${cat}: correct disease count (${ids.length})`,
    `found ${catDiseases.length}`);
  ids.forEach(id => {
    const found = catDiseases.find(d => d.id === id);
    assert(!!found, `  ${id} disease entry exists in ${cat}`);
  });
}

// =====================================================
// GROUP 4: ENRICHMENT DATABASE COMPLETENESS
// =====================================================
console.log('\n--- GROUP 4: ENRICHMENT DATABASE COMPLETENESS ---');
const allDiseaseIds = Object.values(expectedDiseases).flat();
const enrichedIds = Object.keys(diseaseEnrichment);
console.log(`  Enrichment records: ${enrichedIds.length}/${allDiseaseIds.length}`);

allDiseaseIds.forEach(id => {
  const record = diseaseEnrichment[id];
  assert(!!record, `${id} has enrichment record`);
  if (record) {
    assert(!!record.definition, `  ${id}.definition exists`);
    assert(!!record.etiology, `  ${id}.etiology exists`);
    assert(!!record.clinicalSigns, `  ${id}.clinicalSigns exists`);
    assert(!!record.clinicalSigns?.animals, `  ${id}.clinicalSigns.animals exists`);
    assert(!!record.clinicalSigns?.humans, `  ${id}.clinicalSigns.humans exists`);
    assert(!!record.diagnosis, `  ${id}.diagnosis exists`);
    assert(Array.isArray(record.diagnosis?.tests) && record.diagnosis.tests.length > 0, `  ${id}.diagnosis.tests is array`);
    assert(Array.isArray(record.treatment) && record.treatment.length > 0, `  ${id}.treatment is array`);
    assert(!!record.lesionsDesc?.hallmark, `  ${id}.lesionsDesc.hallmark exists`);
    assert(!!record.control?.farm, `  ${id}.control.farm exists`);
    assert(Array.isArray(record.references) && record.references.length > 0, `  ${id}.references is array`);
  }
});

// =====================================================
// GROUP 5: SVG ENGINE INTEGRITY
// =====================================================
console.log('\n--- GROUP 5: SVG ENGINE INTEGRITY ---');
assert(typeof svgEngine.drawTransmissionCycle === 'function', 'drawTransmissionCycle is a function');
assert(typeof svgEngine.drawPathogenesisFlow === 'function', 'drawPathogenesisFlow is a function');
assert(typeof svgEngine.drawOneHealthTriangle === 'function', 'drawOneHealthTriangle is a function');
assert(typeof svgEngine.drawDiagnosticWorkflow === 'function', 'drawDiagnosticWorkflow is a function');

// Test SVG rendering for 3 diseases across categories
const testCases = [
  { cat: 'bacterial', id: 'salmonellosis' },
  { cat: 'viral', id: 'rabies' },
  { cat: 'parasitic', id: 'echinococcosis' },
  { cat: 'prion', id: 'bse' },
];
testCases.forEach(tc => {
  const d = (diseases[tc.cat] || []).find(x => x.id === tc.id);
  const ext = diseaseEnrichment[tc.id];
  if (d && ext) {
    try {
      const svg1 = svgEngine.drawTransmissionCycle(d, ext);
      assert(svg1.includes('<svg'), `${tc.id}: TransmissionCycle SVG renders`);
      const svg2 = svgEngine.drawPathogenesisFlow(d, ext);
      assert(svg2.includes('<svg'), `${tc.id}: PathogenesisFlow SVG renders`);
      const svg3 = svgEngine.drawOneHealthTriangle(d, ext);
      assert(svg3.includes('<svg'), `${tc.id}: OneHealthTriangle SVG renders`);
    } catch(e) {
      assert(false, `${tc.id}: SVG engine throws no errors`, e.message);
    }
  } else {
    assert(false, `${tc.id}: Test data exists for SVG test`, `d=${!!d}, ext=${!!ext}`);
  }
});

// =====================================================
// GROUP 6: FEATURE FUNCTIONS PRESENT
// =====================================================
console.log('\n--- GROUP 6: FEATURE FUNCTIONS ---');
const requiredFunctions = [
  'function searchDiseases(',
  'function toggleBookmark(',
  'function renderDirectory(',
  'function toggleFilter(',
  'function clearAllFilters(',
  'function setDirectoryTab(',
  'function searchGlossary(',
  'function toggleSectionCollapse(',
  'function expandAllSections(',
  'function collapseAllSections(',
  'function toggleClinicalTab(',
  'function postRenderEncy(',
  'function renderRelatedDiseases(',
  'function renderPaginationNav(',
  'function trackView(',
  'function updateBookmarkButtonUI(',
  'function setupScrollSpy(',
];
requiredFunctions.forEach(fn => {
  assert(html.includes(fn), `Function: ${fn.replace('function ', '').replace('(', '')}`);
});

// =====================================================
// GROUP 7: CRITICAL UI ELEMENTS
// =====================================================
console.log('\n--- GROUP 7: CRITICAL UI ELEMENTS ---');
assert(html.includes('id="toc-drawer"'), 'TOC Drawer element present');
assert(html.includes('id="drawer-overlay"'), 'Drawer overlay element present');
assert(html.includes('id="glossary-tooltip"'), 'Glossary tooltip element present');
assert(html.includes('id="back-to-top-btn"'), 'Back-to-top button present');
assert(html.includes('id="mobile-toc-btn"'), 'Mobile TOC FAB present');
assert(html.includes('id="dir-disease-list"'), 'Directory disease list present');
assert(html.includes('id="dir-alphabet-picker"'), 'Alphabet picker present');
assert(html.includes('id="dir-search-input"'), 'Directory search input present');
assert(html.includes('id="glossary-results-list"'), 'Glossary results list present');
assert(html.includes('id="bookmark-count-badge"'), 'Bookmark count badge present');

// =====================================================
// GROUP 8: DISEASE DATA FIELD VALIDATION
// =====================================================
console.log('\n--- GROUP 8: DISEASE DATA FIELD VALIDATION ---');
const requiredFields = ['id', 'name', 'aka', 'agent', 'badge', 'hosts', 'reservoir', 'vector', 'spread', 'incubation', 'mortality', 'humanRisk', 'danger', 'geography', 'indianContext', 'keywords', 'quickfacts'];
let fieldErrors = 0;
for (const [cat, catDiseases] of Object.entries(diseases)) {
  catDiseases.forEach(d => {
    requiredFields.forEach(field => {
      if (!d[field] && d[field] !== 0) {
        fieldErrors++;
        if (fieldErrors <= 10) console.log(`  ⚠️  ${d.id} is missing field: ${field}`);
      }
    });
  });
}
assert(fieldErrors === 0, `All diseases have required fields`, `${fieldErrors} missing fields`);

// =====================================================
// SUMMARY
// =====================================================
console.log('\n=================================================');
console.log(`RESULTS: ${passed} PASSED | ${failed} FAILED`);
console.log('=================================================');
if (failed > 0) {
  console.log('\nFailed tests:');
  errors.forEach(e => console.log(`  - ${e.test}${e.details ? ': ' + e.details : ''}`));
}
if (failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED!');
}
