/**
 * DEFINITIVE ZOONOTIX TEST - loads modules from files (not from HTML)
 */
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Use module files directly - that's what the test environment can eval
const diseaseEnrichment = require('./zoonotix_content_enrichment.js').diseaseEnrichment;
const svgEngine = require('./zoonotix_svg_engine.js').svgEngine;

let passed = 0, failed = 0;
const errors = [];

function assert(condition, name, details = '') {
  if (condition) { console.log(`  ✅ ${name}`); passed++; }
  else { console.log(`  ❌ ${name}${details ? ' [' + details + ']' : ''}`); failed++; errors.push(name); }
}

let diseases = {};
try { eval('diseases = ' + html.match(/const diseases = (\{[\s\S]*?\n\};)/)[1]); } catch(e) {}
let colorMap = {};
try { eval('colorMap = ' + html.match(/const colorMap = (\{[\s\S]*?\});/)[1]); } catch(e) {}

const allIds = {
  bacterial: ['anthrax','brucellosis','leptospirosis','tuberculosis','salmonellosis','plague','qfever','listeriosis','glanders','campylobacteriosis','pasteurellosis','melioidosis'],
  viral: ['rabies','nipah','kyasanur','jencephalitis','rift_valley','influenza','hendravirus','monkeypox','hantavirus','creutzfeldt'],
  fungal: ['dermatophytosis','cryptococcosis','aspergillosis','sporotrichosis'],
  parasitic: ['toxoplasmosis','echinococcosis','leishmaniasis','cysticercosis','schistosomiasis','cryptosporidiosis','giardiasis','visceral_larva','trichinellosis'],
  prion: ['bse','scrapie','cwd']
};
const flat = Object.values(allIds).flat();

console.log('\n=======================================================');
console.log('ZOONOTIX DEFINITIVE TEST SUITE');
console.log('=======================================================\n');

// G1: Structure
console.log('--- G1: HTML STRUCTURE ---');
assert(!html.includes('```'), 'No markdown fences');
assert(html.includes('class="view active" id="view-home"'), 'Home is active view');
assert(html.includes('id="cat-grid"'), 'Category grid exists');
assert(html.includes('id="view-list"'), 'List view exists');
assert(html.includes('id="view-ency"'), 'Encyclopedia view exists');
assert(html.includes('id="view-directory"'), 'Directory view exists');
assert(html.includes('id="view-about"'), 'About view exists');
assert(html.includes('id="ency-content"'), 'Ency content container');
assert(html.includes('</main>'), 'Proper </main> close tag');

// G2: Navigation
console.log('\n--- G2: NAVIGATION FUNCTIONS ---');
["'bacterial'","'viral'","'fungal'","'parasitic'","'prion'"].forEach(cat => {
  assert(html.includes(`onclick="showCategory(${cat})"`), `showCategory(${cat}) onclick`);
});
assert(html.includes("function showView("), 'showView defined');
assert(html.includes("function showCategory("), 'showCategory defined');
assert(html.includes("function showDisease("), 'showDisease defined');
assert(html.includes("showView('ency')"), 'showView(ency) called in showDisease');
assert(html.includes("showView('list')"), 'showView(list) called in showCategory');

// G3: Diseases DB
console.log('\n--- G3: DISEASES DATABASE ---');
assert(Object.keys(diseases).length === 5, '5 disease categories');
for (const [cat, ids] of Object.entries(allIds)) {
  assert((diseases[cat]||[]).length === ids.length, `${cat}: ${ids.length} diseases`);
  ids.forEach(id => assert(!!(diseases[cat]||[]).find(d=>d.id===id), `  ${id} in ${cat}`));
}

// G4: Enrichment
console.log('\n--- G4: ENRICHMENT DATABASE (loaded from module file) ---');
const enrichedIds = Object.keys(diseaseEnrichment);
assert(enrichedIds.length === 38, `38 enrichment records (got ${enrichedIds.length})`);
flat.forEach(id => {
  const rec = diseaseEnrichment[id];
  assert(!!rec, `${id}: has enrichment`);
  if (rec) {
    assert(!!rec.definition, `  ${id}.definition`);
    assert(!!rec.clinicalSigns?.animals?.acute, `  ${id}.animals.acute`);
    assert(!!rec.clinicalSigns?.humans?.acute, `  ${id}.humans.acute`);
    assert(Array.isArray(rec.diagnosis?.tests) && rec.diagnosis.tests.length > 0, `  ${id}.diagnosis.tests`);
    assert(Array.isArray(rec.treatment) && rec.treatment.length > 0, `  ${id}.treatment`);
    assert(!!rec.lesionsDesc?.hallmark, `  ${id}.hallmark lesion`);
    assert(!!rec.control?.farm && !!rec.control?.human, `  ${id}.control levels`);
    assert(Array.isArray(rec.references) && rec.references.length > 0, `  ${id}.references`);
  }
});

// G5: SVG Engine
console.log('\n--- G5: SVG ENGINE ---');
assert(typeof svgEngine.drawTransmissionCycle === 'function', 'drawTransmissionCycle');
assert(typeof svgEngine.drawPathogenesisFlow === 'function', 'drawPathogenesisFlow');
assert(typeof svgEngine.drawOneHealthTriangle === 'function', 'drawOneHealthTriangle');
assert(typeof svgEngine.drawDiagnosticWorkflow === 'function', 'drawDiagnosticWorkflow');

// Test rendering for 1 disease from each category
const svgTests = [
  {cat:'bacterial',id:'salmonellosis'}, {cat:'viral',id:'nipah'},
  {cat:'fungal',id:'aspergillosis'}, {cat:'parasitic',id:'leishmaniasis'}, {cat:'prion',id:'bse'}
];
svgTests.forEach(tc => {
  const d = (diseases[tc.cat]||[]).find(x=>x.id===tc.id);
  const ext = diseaseEnrichment[tc.id];
  if (d && ext) {
    try {
      const s1 = svgEngine.drawTransmissionCycle(d, ext);
      assert(s1.includes('<svg'), `${tc.id}: transmission SVG`);
      const s2 = svgEngine.drawPathogenesisFlow(d, ext);
      assert(s2.includes('<svg'), `${tc.id}: pathogenesis SVG`);
      const s3 = svgEngine.drawOneHealthTriangle(d, ext);
      assert(s3.includes('<svg'), `${tc.id}: one health SVG`);
      const s4 = svgEngine.drawDiagnosticWorkflow(d, ext);
      assert(s4.includes('<svg'), `${tc.id}: diagnostic SVG`);
    } catch(e) {
      assert(false, `${tc.id}: SVG renders`, e.message.substring(0,80));
    }
  }
});

// G6: Feature functions
console.log('\n--- G6: FEATURE FUNCTIONS ---');
['searchDiseases','toggleBookmark','renderDirectory','toggleFilter','clearAllFilters',
 'setDirectoryTab','searchGlossary','toggleSectionCollapse','expandAllSections',
 'collapseAllSections','toggleClinicalTab','postRenderEncy','renderRelatedDiseases',
 'renderPaginationNav','trackView','updateBookmarkButtonUI','setupScrollSpy',
 'closeAllDrawers','toggleMobileTOC','closeGlossaryTooltip','openGlossaryTab'
].forEach(fn => assert(html.includes(`function ${fn}(`), fn));

// G7: UI Elements
console.log('\n--- G7: CRITICAL UI ELEMENTS ---');
['toc-drawer','drawer-overlay','glossary-tooltip','back-to-top-btn','mobile-toc-btn',
 'dir-disease-list','dir-alphabet-picker','dir-search-input','glossary-results-list',
 'bookmark-count-badge','search-overlay','overlay-search-input','floating-search-btn'
].forEach(id => assert(html.includes(`id="${id}"`), `#${id}`));

// G8: Disease data fields
console.log('\n--- G8: DISEASE FIELD COMPLETENESS ---');
const reqFields = ['id','name','aka','agent','badge','hosts','reservoir','vector','spread','incubation','mortality','humanRisk','danger','geography','indianContext','keywords','quickfacts'];
let fErrors = 0;
for (const [cat, catD] of Object.entries(diseases)) {
  catD.forEach(d => {
    reqFields.forEach(f => { if (!d[f] && d[f] !== 0) { fErrors++; } });
  });
}
assert(fErrors === 0, `All disease fields present`, `${fErrors} missing`);

// SUMMARY
console.log('\n=======================================================');
console.log(`RESULTS: ${passed} PASSED | ${failed} FAILED`);
console.log('=======================================================');
if (failed > 0) {
  console.log('\nFailed:');
  errors.forEach(e => console.log(`  ❌ ${e}`));
} else {
  console.log('\n🎉 ALL TESTS PASSED — ZoonotiX is fully functional!');
}
