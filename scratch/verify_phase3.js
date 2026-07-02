const fs = require('fs');

console.log("==========================================");
console.log("ZOONOTIX PHASE 3 AUTOMATED TESTS");
console.log("==========================================\n");

// Read index.html to parse database and functions
const html = fs.readFileSync('index.html', 'utf8');

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

console.log("Running assertions inside script scope...");

// Test 1: Levenshtein Distance
assert(levDistance("rabies", "rabies") === 0, "Levenshtein identical strings");
assert(levDistance("rabies", "rabeis") === 2, "Levenshtein transpositions");
assert(levDistance("anthrax", "antrax") === 1, "Levenshtein deletion");
assert(levDistance("brucella", "brucellosis") === 4, "Levenshtein insertion/substitution (brucella -> brucellosis is 4)");

// Test 2: Fuzzy Matching Substring and Typos
assert(fuzzyMatch("Anthrax is caused by spores", "anthrax"), "Fuzzy match exact word");
assert(fuzzyMatch("Madt Cow Disease", "mad cow"), "Fuzzy match multiword typo-tolerant");
assert(fuzzyMatch("Weil's disease leptospirosis", "lepto"), "Fuzzy match prefix substring");
assert(fuzzyMatch("kyasanur forest monkey fever", "monky fecer"), "Fuzzy match double typo (lev dist <= 2)");

// Test 3: Pathogen Metadata Tagging
const testDisease = diseases.bacterial.find(d => d.id === 'anthrax');
assert(testDisease.group === 'bacterial', "Metadata dynamic inject group");
assert(testDisease.transmissionTypes.includes('meat-borne'), "Metadata transmission routes");
assert(testDisease.hostTypes.includes('cattle'), "Metadata hosts list");
assert(testDisease.tags.includes('notifiable'), "Metadata special tags");

// Test 4: Bookmarks Persistence
bookmarks = [];
toggleBookmark('anthrax');
assert(bookmarks.includes('anthrax'), "Bookmarks toggled addition");
toggleBookmark('anthrax');
assert(!bookmarks.includes('anthrax'), "Bookmarks toggled removal");

// Test 5: Reading History viewed list
readingHistory = [];
trackView('rabies');
trackView('nipah');
assert(readingHistory[0].id === 'nipah', "History tracking sets last viewed first");
assert(readingHistory[1].id === 'rabies', "History tracking retains previous views");

// Test 6: Related Content scoring
const relatedHTML = renderRelatedDiseases('bacterial', 'anthrax');
assert(relatedHTML.includes('Related Zoonoses'), "Related diseases returns template");
assert(relatedHTML.includes('bse') || relatedHTML.includes('brucellosis') || relatedHTML.includes('tuberculosis'), "Related diseases lists scoring matches");

// Test 7: Glossary Definitions
assert(glossary.zoonosis.term === "Zoonosis", "Glossary has term 'Zoonosis'");
assert(glossary.onehealth.term === "One Health", "Glossary has term 'One Health'");

if (failCount > 0) {
  process.exit(1);
}
`;

try {
  eval(jsCode + '\n' + assertionsCode);
  console.log("\n==========================================");
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
} catch (err) {
  console.error("FAIL during JS evaluation/assertions:", err);
  process.exit(1);
}
