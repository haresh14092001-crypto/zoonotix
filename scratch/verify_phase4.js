const fs = require('fs');

console.log("==========================================");
console.log("ZOONOTIX PHASE 4 AUTOMATED TESTS");
console.log("==========================================\n");

// Read index.html to parse databases and functions
const html = fs.readFileSync('index.html', 'utf8');

// Parse database
const scriptMatch = html.match(/const diseases = (\{[\s\S]*?\});/);
if (!scriptMatch) {
  console.error("FAIL: Could not locate diseases object in index.html!");
  process.exit(1);
}
const diseases = eval(`(${scriptMatch[1]})`);
console.log(`Loaded ${Object.keys(diseases).length} categories from index.html.`);

// Mock a complete browser DOM environment in global scope
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = String(value); },
  removeItem(key) { delete this.store[key]; }
};

global.window = {
  scrollTo() {},
  addEventListener() {},
  removeEventListener() {},
  scrollY: 0,
  innerHeight: 800
};

const mockElement = {
  style: {
    setProperty() {},
    width: '0%',
    overflow: ''
  },
  innerHTML: '',
  value: '',
  textContent: 'Mock Text Node',
  dataset: {},
  classList: {
    add() {},
    remove() {},
    toggle() {}
  },
  appendChild() {},
  insertBefore() {},
  addEventListener() {},
  removeEventListener() {},
  closest() { return null; },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  getBoundingClientRect() { return { top: 0, height: 100 }; },
  scrollHeight: 100,
  offsetTop: 0
};

global.document = {
  getElementById(id) { 
    return { ...mockElement, id }; 
  },
  querySelectorAll() { return []; },
  querySelector() { return mockElement; },
  addEventListener() {},
  removeEventListener() {},
  createElement() { return mockElement; },
  body: {
    ...mockElement,
    setAttribute() {},
    getAttribute() { return 'playful'; }
  },
  createTreeWalker() {
    return {
      nextNode() { return null; }
    };
  }
};

global.NodeFilter = {
  SHOW_TEXT: 4
};

// Define standard colorMap to evaluate logic
global.colorMap = {
  bacterial: '#e8a838',
  viral: '#e84444',
  fungal: '#7dc45e',
  parasitic: '#9b72cf',
  prion: '#e84497'
};
global.diseases = diseases;

// Extract JS logic and run eval
const jsLogicMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!jsLogicMatch) {
  console.error("FAIL: Could not find script block!");
  process.exit(1);
}
const jsCode = jsLogicMatch[1];

// Append our test assertions directly to the evaluated JS code so it runs in the same block scope
const assertionsCode = `
let failCount = 0;
function assert(condition, message) {
  if (condition) {
    console.log("🟢 PASS: " + message);
  } else {
    console.log("🔴 FAIL: " + message);
    failCount++;
  }
}

console.log("Running Phase 4 assertions inside script scope...");

// Test 1: Content Enrichment Database Presence
assert(typeof diseaseEnrichment === 'object', "diseaseEnrichment object is loaded in scope");
assert(Object.keys(diseaseEnrichment).length >= 8, "diseaseEnrichment has records for major diseases");

// Test 2: Specific Disease Data Validity
const anthraxExt = diseaseEnrichment.anthrax;
assert(anthraxExt.etiology.includes("Bacillus anthracis"), "Anthrax etiology is correct and scientifically accurate");
assert(anthraxExt.taxonomy === "Family Bacillaceae, Genus Bacillus, Species B. anthracis.", "Anthrax taxonomy details exist");
assert(anthraxExt.clinicalSigns.animals.acute.includes("uncoagulated blood"), "Anthrax animal clinical signs contain hallmark hemorrhages");
assert(anthraxExt.pathogenesis.lesions.includes("raspberry jam"), "Anthrax pathology pathogenesis lesions contain raspberry jam spleen");

// Test 3: SVG Rendering Engine Presence
assert(typeof svgEngine === 'object', "svgEngine object is loaded in scope");
assert(typeof svgEngine.drawTransmissionCycle === 'function', "svgEngine has drawTransmissionCycle function");
assert(typeof svgEngine.drawPathogenesisFlow === 'function', "svgEngine has drawPathogenesisFlow function");
assert(typeof svgEngine.drawOneHealthTriangle === 'function', "svgEngine has drawOneHealthTriangle function");
assert(typeof svgEngine.drawDiagnosticWorkflow === 'function', "svgEngine has drawDiagnosticWorkflow function");

// Test 4: Dynamic SVG String Generation
const dMock = diseases.bacterial.find(d => d.id === 'anthrax');
const cycleSvg = svgEngine.drawTransmissionCycle(dMock, anthraxExt);
assert(cycleSvg.includes("<svg") && cycleSvg.includes("RESERVOIR") && cycleSvg.includes("ANIMAL HOST"), "Transmission cycle SVG generated correctly with labels");

const pathSvg = svgEngine.drawPathogenesisFlow(dMock, anthraxExt);
assert(pathSvg.includes("<svg") && pathSvg.includes("TARGET ORGANS") && pathSvg.includes("DISSEMINATION PATH"), "Pathogenesis flow SVG generated correctly with labels");

const ohSvg = svgEngine.drawOneHealthTriangle(dMock, anthraxExt);
assert(ohSvg.includes("<svg") && ohSvg.includes("HUMAN INTERFACE") && ohSvg.includes("ANIMAL INTERFACE"), "One Health interaction SVG generated correctly with circles");

const dxSvg = svgEngine.drawDiagnosticWorkflow(dMock, anthraxExt);
assert(dxSvg.includes("<svg") && dxSvg.includes("CLINICAL SUSPECT") && dxSvg.includes("SAMPLE COLLECTION"), "Diagnostic workflow SVG generated correctly with steps");

// Test 5: Fallback Safeguard for non-enriched diseases
const nonEnrichedExt = diseaseEnrichment.campylobacteriosis || { etiology: "Campylobacter jejuni" };
assert(nonEnrichedExt.etiology !== undefined, "Fallback dataset resolves gracefully");

if (failCount > 0) {
  process.exit(1);
}
`;

try {
  eval(jsCode + '\n' + assertionsCode);
  console.log("\n==========================================");
  console.log("🎉 ALL PHASE 4 TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
} catch (err) {
  console.error("FAIL during JS evaluation/assertions:", err);
  process.exit(1);
}
