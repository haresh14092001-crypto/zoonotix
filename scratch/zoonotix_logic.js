// ==========================================
// PHASE 3 - ADVANCED NAVIGATION, SEARCH, FILTER & DISCOVERY
// ==========================================

// --- PATHOGEN METADATA MAPPING ---
const diseaseMetadata = {
  // Bacterial
  anthrax: {
    group: 'bacterial',
    transmission: ['direct-contact', 'airborne', 'meat-borne'],
    hosts: ['cattle', 'sheep', 'goat', 'horse', 'wildlife'],
    tags: ['notifiable', 'occupational']
  },
  brucellosis: {
    group: 'bacterial',
    transmission: ['direct-contact', 'milk-borne', 'airborne'],
    hosts: ['cattle', 'buffalo', 'sheep', 'goat', 'pig', 'dog'],
    tags: ['notifiable', 'occupational']
  },
  leptospirosis: {
    group: 'bacterial',
    transmission: ['water-borne', 'direct-contact'],
    hosts: ['dog', 'pig', 'cattle', 'wildlife'],
    tags: ['neglected', 'occupational']
  },
  tuberculosis: {
    group: 'bacterial',
    transmission: ['airborne', 'milk-borne'],
    hosts: ['cattle', 'buffalo', 'sheep', 'goat', 'pig'],
    tags: ['notifiable']
  },
  salmonellosis: {
    group: 'bacterial',
    transmission: ['food-borne', 'fomite'],
    hosts: ['poultry', 'pig', 'cattle', 'dog', 'cat', 'wildlife'],
    tags: ['neglected']
  },
  plague: {
    group: 'bacterial',
    transmission: ['vector-borne', 'airborne'],
    hosts: ['wildlife', 'dog', 'cat'],
    tags: ['notifiable', 'emerging']
  },
  qfever: {
    group: 'rickettsial', // Maps to both Bacterial and Rickettsial
    transmission: ['airborne', 'milk-borne', 'direct-contact'],
    hosts: ['cattle', 'sheep', 'goat'],
    tags: ['emerging', 'occupational']
  },
  listeriosis: {
    group: 'bacterial',
    transmission: ['food-borne', 'milk-borne'],
    hosts: ['cattle', 'sheep', 'goat', 'pig'],
    tags: ['emerging']
  },
  glanders: {
    group: 'bacterial',
    transmission: ['direct-contact', 'airborne'],
    hosts: ['horse', 'dog', 'cat'],
    tags: ['notifiable', 'occupational']
  },
  campylobacteriosis: {
    group: 'bacterial',
    transmission: ['food-borne', 'water-borne'],
    hosts: ['poultry', 'pig', 'cattle'],
    tags: []
  },
  pasteurellosis: {
    group: 'bacterial',
    transmission: ['direct-contact', 'airborne'],
    hosts: ['cattle', 'buffalo', 'pig'],
    tags: ['notifiable']
  },
  melioidosis: {
    group: 'bacterial',
    transmission: ['water-borne', 'direct-contact'],
    hosts: ['cattle', 'pig', 'wildlife'],
    tags: ['emerging', 'occupational']
  },

  // Viral
  rabies: {
    group: 'viral',
    transmission: ['direct-contact'],
    hosts: ['dog', 'cat', 'wildlife'],
    tags: ['notifiable', 'neglected']
  },
  nipah: {
    group: 'viral',
    transmission: ['direct-contact', 'airborne'],
    hosts: ['wildlife', 'pig'],
    tags: ['notifiable', 'emerging']
  },
  kyasanur: {
    group: 'viral',
    transmission: ['vector-borne'],
    hosts: ['wildlife'],
    tags: ['notifiable', 'emerging', 'occupational']
  },
  jencephalitis: {
    group: 'viral',
    transmission: ['vector-borne'],
    hosts: ['wildlife', 'pig'],
    tags: ['notifiable', 'emerging']
  },
  rift_valley: {
    group: 'viral',
    transmission: ['vector-borne', 'direct-contact', 'milk-borne'],
    hosts: ['sheep', 'goat', 'cattle', 'wildlife'],
    tags: ['notifiable', 'emerging']
  },
  influenza: {
    group: 'viral',
    transmission: ['airborne', 'direct-contact', 'fomite'],
    hosts: ['poultry', 'pig', 'wildlife'],
    tags: ['notifiable', 'emerging']
  },
  hendravirus: {
    group: 'viral',
    transmission: ['direct-contact'],
    hosts: ['wildlife', 'horse'],
    tags: ['notifiable', 'emerging', 'occupational']
  },
  monkeypox: {
    group: 'viral',
    transmission: ['direct-contact', 'airborne', 'fomite'],
    hosts: ['wildlife'],
    tags: ['notifiable', 'emerging']
  },
  hantavirus: {
    group: 'viral',
    transmission: ['airborne'],
    hosts: ['wildlife'],
    tags: ['emerging']
  },
  creutzfeldt: {
    group: 'viral', // Foot and Mouth Disease (FMD)
    transmission: ['direct-contact', 'airborne', 'fomite'],
    hosts: ['cattle', 'buffalo', 'sheep', 'goat', 'pig'],
    tags: ['notifiable']
  },

  // Fungal
  dermatophytosis: {
    group: 'fungal',
    transmission: ['direct-contact', 'fomite'],
    hosts: ['dog', 'cat', 'cattle', 'horse'],
    tags: ['occupational']
  },
  cryptococcosis: {
    group: 'fungal',
    transmission: ['airborne'],
    hosts: ['wildlife'],
    tags: []
  },
  aspergillosis: {
    group: 'fungal',
    transmission: ['airborne'],
    hosts: ['poultry', 'cattle', 'horse'],
    tags: []
  },
  sporotrichosis: {
    group: 'fungal',
    transmission: ['direct-contact', 'fomite'],
    hosts: ['cat', 'dog', 'horse'],
    tags: ['emerging', 'occupational']
  },

  // Parasitic (Protozoal / Helminthic)
  toxoplasmosis: {
    group: 'protozoal',
    transmission: ['food-borne', 'fomite', 'direct-contact'],
    hosts: ['cat', 'sheep', 'goat', 'pig', 'poultry'],
    tags: ['neglected']
  },
  echinococcosis: {
    group: 'helminthic',
    transmission: ['fomite', 'food-borne'],
    hosts: ['dog', 'sheep', 'cattle', 'goat'],
    tags: ['neglected']
  },
  leishmaniasis: {
    group: 'protozoal',
    transmission: ['vector-borne'],
    hosts: ['dog', 'wildlife'],
    tags: ['neglected']
  },
  cysticercosis: {
    group: 'helminthic',
    transmission: ['food-borne', 'fomite'],
    hosts: ['pig'],
    tags: ['neglected']
  },
  schistosomiasis: {
    group: 'helminthic',
    transmission: ['water-borne'],
    hosts: ['cattle', 'buffalo', 'horse'],
    tags: []
  },
  cryptosporidiosis: {
    group: 'protozoal',
    transmission: ['water-borne', 'food-borne', 'fomite'],
    hosts: ['cattle', 'sheep', 'goat', 'pig'],
    tags: ['neglected']
  },
  giardiasis: {
    group: 'protozoal',
    transmission: ['water-borne', 'fomite'],
    hosts: ['dog', 'cat', 'cattle'],
    tags: []
  },
  visceral_larva: {
    group: 'helminthic',
    transmission: ['fomite'],
    hosts: ['dog', 'cat'],
    tags: ['neglected']
  },
  trichinellosis: {
    group: 'helminthic',
    transmission: ['food-borne'],
    hosts: ['pig', 'wildlife'],
    tags: []
  },

  // Prion
  bse: {
    group: 'prion',
    transmission: ['food-borne', 'meat-borne'],
    hosts: ['cattle', 'cat'],
    tags: ['notifiable']
  },
  scrapie: {
    group: 'prion',
    transmission: ['direct-contact'],
    hosts: ['sheep', 'goat'],
    tags: ['notifiable']
  },
  cwd: {
    group: 'prion',
    transmission: ['direct-contact', 'fomite'],
    hosts: ['wildlife'],
    tags: ['notifiable', 'emerging']
  }
};

// Inject metadata on load
Object.keys(diseases).forEach(cat => {
  diseases[cat].forEach(d => {
    const meta = diseaseMetadata[d.id] || {};
    d.group = meta.group || cat;
    d.transmissionTypes = meta.transmission || [];
    d.hostTypes = meta.hosts || [];
    d.tags = meta.tags || [];
  });
});

// --- GLOSSARY DATABASE ---
const glossary = {
  zoonosis: { term: "Zoonosis", def: "A disease or infection that is naturally transmissible from vertebrate animals to humans." },
  anthroponotic: { term: "Anthroponotic", def: "A disease transmissible from humans to other humans (or from humans to animals)." },
  sylvatic: { term: "Sylvatic", def: "Occurring in, or affecting, wild animals (from the Latin 'sylva' meaning forest)." },
  fomite: { term: "Fomite", def: "An inanimate object or substance (like clothing, bedding, or farm equipment) capable of transmitting infectious organisms." },
  vector: { term: "Vector", def: "An organism (typically a biting insect or tick) that transmits a disease or parasite from one animal to another." },
  reservoir: { term: "Reservoir Host", def: "A host in which an infectious agent normally lives, grows, and multiplies, without causing severe disease to the host itself." },
  cfr: { term: "Case Fatality Rate (CFR)", def: "The proportion of people (or animals) diagnosed with a disease who die from it within a specified period." },
  incubation: { term: "Incubation Period", def: "The time elapsed between exposure to a pathogenic organism and when symptoms first become apparent." },
  notifiable: { term: "Notifiable Disease", def: "Any disease that is required by law to be reported to government public health or veterinary authorities." },
  prophylaxis: { term: "Prophylaxis", def: "Treatment or action taken to prevent a disease from occurring (e.g., vaccination or preventative medication)." },
  apicomplexan: { term: "Apicomplexan", def: "A large phylum of parasitic alveolates, characterized by the presence of a unique apical complex organelle." },
  cercaria: { term: "Cercaria", def: "The larval form of trematode parasites (like Schistosoma) that sheds from the snail host and infects the definitive host by skin penetration." },
  hydrophobia: { term: "Hydrophobia", def: "Extreme or irrational fear of water, a classical neurological symptom of rabies in humans caused by painful throat spasms during swallowing." },
  encephalitis: { term: "Encephalitis", def: "Acute inflammation of the brain, often caused by viral infections (like Japanese Encephalitis or rabies)." },
  splenomegaly: { term: "Splenomegaly", def: "Enlargement of the spleen, commonly seen in systemic infections such as Visceral Leishmaniasis (Kala-azar)." },
  myalgia: { term: "Myalgia", def: "Muscle pain or soreness, a common clinical sign of systemic febrile illnesses like Trichinellosis and Leptospirosis." },
  prion: { term: "Prion", def: "An abnormal, pathogenic agent that is transmissible and able to induce abnormal folding of specific normal cellular proteins (PrP) in the brain." },
  mbm: { term: "Meat and Bone Meal (MBM)", def: "An animal protein product derived from rendering animal tissues, historically used in cattle feed and linked to the spread of BSE." },
  vcjd: { term: "Variant Creutzfeldt-Jakob Disease (vCJD)", def: "A rare, fatal neurodegenerative disease in humans linked to eating beef contaminated with Bovine Spongiform Encephalopathy (BSE)." },
  tse: { term: "Transmissible Spongiform Encephalopathy (TSE)", def: "A group of progressive, fatal neurodegenerative conditions in humans and animals caused by prions (includes BSE, Scrapie, CWD)." },
  haccp: { term: "HACCP", def: "Hazard Analysis Critical Control Point - a systematic preventive approach to food safety from biological, chemical, and physical hazards." },
  pep: { term: "Post-Exposure Prophylaxis (PEP)", def: "Preventative medical treatment started after exposure to a pathogen (like rabies virus) to prevent infection from taking hold." },
  onehealth: { term: "One Health", def: "A collaborative, multisectoral, and transdisciplinary approach working at local, regional, national, and global levels to achieve optimal health outcomes recognizing the interconnection between people, animals, plants, and their shared environment." }
};

// Create a synonym map for highlighting matching terms
const glossarySynonyms = {
  'zoonotic': 'zoonosis',
  'zoonoses': 'zoonosis',
  'case fatality rate': 'cfr',
  'case fatality rates': 'cfr',
  'transmission vector': 'vector',
  'vectors': 'vector',
  'fomites': 'fomite',
  'reservoirs': 'reservoir',
  'incubation period': 'incubation',
  'incubation periods': 'incubation',
  'notifiable diseases': 'notifiable',
  'prophylactic': 'prophylaxis',
  'apicomplexans': 'apicomplexan',
  'cercariae': 'cercaria',
  'prions': 'prion',
  'one health': 'onehealth',
  'one-health': 'onehealth'
};

// --- BOOKMARKS & HISTORY STATE ---
let bookmarks = [];
try {
  bookmarks = JSON.parse(localStorage.getItem('zoonotix.bookmarks')) || [];
  if (!Array.isArray(bookmarks)) bookmarks = [];
} catch (e) {
  bookmarks = [];
}

let readingHistory = [];
try {
  readingHistory = JSON.parse(localStorage.getItem('zoonotix.history')) || [];
  if (!Array.isArray(readingHistory)) readingHistory = [];
} catch (e) {
  readingHistory = [];
}

let readingProgress = {};
try {
  readingProgress = JSON.parse(localStorage.getItem('zoonotix.progress')) || {};
  if (typeof readingProgress !== 'object' || readingProgress === null) readingProgress = {};
} catch (e) {
  readingProgress = {};
}

// --- DIRECTORY FILTER STATE ---
let activeFilters = {
  group: [],
  transmission: [],
  host: [],
  tag: []
};
let alphabetFilter = '';
let directorySearchQuery = '';
let currentDirectoryTab = 'all';

// --- FUZZY SEARCH LEVENSHTEIN HELPER ---
function levDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
      }
    }
  }
  return dp[m][n];
}

// Typo tolerant fuzzy substring match
function fuzzyMatch(text, query) {
  text = text.toLowerCase();
  query = query.toLowerCase();
  if (text.includes(query)) return true;
  
  // split and do word-level fuzzy match
  const textWords = text.split(/[^a-z0-9]+/);
  const queryWords = query.split(/[^a-z0-9]+/);
  
  for (const qWord of queryWords) {
    if (qWord.length < 3) continue; // too short for fuzzy
    let matched = false;
    for (const tWord of textWords) {
      if (tWord.length < 3) continue;
      // If the word matches as a substring, or has a Levenshtein distance <= 2 (or 1 for short words)
      if (tWord.includes(qWord)) { matched = true; break; }
      const maxDistance = qWord.length <= 4 ? 1 : 2;
      if (levDistance(qWord, tWord) <= maxDistance) { matched = true; break; }
    }
    if (!matched) return false; // all query words must match
  }
  return true;
}

// --- GLOBAL SEARCH ENGINE WITH HISTORY ---
let recentSearches = [];
try {
  recentSearches = JSON.parse(localStorage.getItem('zoonotix.recentSearches')) || [];
  if (!Array.isArray(recentSearches)) recentSearches = [];
} catch (e) {
  recentSearches = [];
}
const popularSearches = ['Rabies', 'Nipah', 'Anthrax', 'BSE', 'Brucellosis', 'Swine Influenza', 'Swimmer\'s Itch'];

function saveSearchQuery(q) {
  q = q.trim();
  if (!q) return;
  recentSearches = recentSearches.filter(s => s.toLowerCase() !== q.toLowerCase());
  recentSearches.unshift(q);
  recentSearches = recentSearches.slice(0, 5); // keep top 5
  localStorage.setItem('zoonotix.recentSearches', JSON.stringify(recentSearches));
  renderRecentSearches();
}

function clearSearchHistory() {
  recentSearches = [];
  localStorage.removeItem('zoonotix.recentSearches');
  renderRecentSearches();
}

function renderRecentSearches() {
  const container = document.getElementById('search-suggestions');
  if (!container) return;
  
  const q = document.getElementById('overlay-search-input').value.trim();
  if (q) return; // don't show recent searches if typing
  
  let html = '';
  if (recentSearches.length > 0) {
    html += `
      <li class="suggestion-header" style="color:var(--accent);padding:12px 18px 4px;font-family:'DM Mono';font-size:10px;letter-spacing:1px;text-transform:uppercase;display:flex;justify-content:space-between;align-items:center;">
        Recent Searches
        <button class="collapse-btn" style="padding:2px 6px;font-size:9px;" onclick="clearSearchHistory(); event.stopPropagation();">Clear All</button>
      </li>
    `;
    recentSearches.forEach(s => {
      html += `
        <li class="suggestion-item" role="option" onclick="applySearchTerm('${s}')">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="opacity:0.5;">🕒</span>
            <div>${s}</div>
          </div>
        </li>
      `;
    });
  }
  
  html += `
    <li class="suggestion-header" style="color:var(--accent2);padding:12px 18px 4px;font-family:'DM Mono';font-size:10px;letter-spacing:1px;text-transform:uppercase;">Popular Topics</li>
  `;
  popularSearches.forEach(s => {
    html += `
      <li class="suggestion-item" role="option" onclick="applySearchTerm('${s}')">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="opacity:0.5;">🔥</span>
          <div>${s}</div>
        </div>
      </li>
    `;
  });
  
  container.innerHTML = html;
}

function applySearchTerm(term) {
  const input = document.getElementById('overlay-search-input');
  if (input) {
    input.value = term;
    input.dispatchEvent(new Event('input'));
    input.focus();
  }
}

// Enhance the overlay search to search all fields and do fuzzy matching
function runGlobalSearch(q) {
  const list = document.getElementById('search-suggestions');
  const ql = q.trim().toLowerCase();
  
  if (!ql) {
    renderRecentSearches();
    return;
  }
  
  const matches = [];
  Object.entries(diseases).forEach(([cat, arr]) => {
    arr.forEach(d => {
      const searchFields = [
        d.name,
        d.aka,
        d.agent,
        d.reservoir,
        d.vector,
        d.humanRisk,
        d.control,
        d.geography,
        d.origin,
        d.spread,
        d.indianContext,
        ...d.hosts,
        ...d.keywords,
        ...Object.keys(d.quickfacts),
        ...Object.values(d.quickfacts)
      ].join(' ');
      
      if (fuzzyMatch(searchFields, ql)) {
        // Calculate score for sorting
        let score = 0;
        if (d.name.toLowerCase() === ql) score += 100;
        else if (d.name.toLowerCase().includes(ql)) score += 50;
        else if (d.aka.toLowerCase().includes(ql)) score += 30;
        else if (d.agent.toLowerCase().includes(ql)) score += 20;
        
        matches.push({ cat, d, score });
      }
    });
  });
  
  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);
  
  const suggestions = matches.slice(0, 10);
  if (suggestions.length === 0) {
    list.innerHTML = `<li style="color:var(--muted);padding:18px;text-align:center;">No matching zoonoses found for "${q}"</li>`;
    return;
  }
  
  // Highlight helper
  function highlight(text, query) {
    const escQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escQuery})`, 'ig');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }
  
  list.innerHTML = suggestions.map((s, i) => {
    const name = highlight(s.d.name, ql);
    const aka = highlight(s.d.aka, ql);
    const agent = highlight(s.d.agent, ql);
    return `<li class="suggestion-item" role="option" data-idx="${i}" data-cat="${s.cat}" data-id="${s.d.id}" tabindex="0" onclick="closeSearch(); showDisease('${s.cat}', '${s.d.id}'); saveSearchQuery('${q}');">
      <div>
        <div style="font-weight:600;display:flex;align-items:center;gap:8px;">
          ${name} 
          <span style="font-size:11px;font-style:italic;font-weight:normal;opacity:0.75;color:var(--accent)">(${agent})</span>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;">${aka}</div>
      </div>
      <div class="suggestion-meta" style="color:${colorMap[s.cat]}">${s.cat.charAt(0).toUpperCase()+s.cat.slice(1)}</div>
    </li>`;
  }).join('');
}

// --- KEYBOARD SHORTCUTS FOR ACCESSIBILITY ---
document.addEventListener('keydown', (e) => {
  // Global search trigger: '/' key when not in inputs
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    if (typeof window.openSearch === 'function') window.openSearch();
  }
});

// --- ADVANCED FILTERING & DIRECTORY LOGIC ---
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function renderAlphabetPicker() {
  const container = document.getElementById('dir-alphabet-picker');
  if (!container) return;
  
  container.innerHTML = `
    <button class="alpha-btn ${alphabetFilter === '' ? 'active' : ''}" onclick="setAlphabetFilter('')">All</button>
    ${alphabet.map(letter => `
      <button class="alpha-btn ${alphabetFilter === letter ? 'active' : ''}" onclick="setAlphabetFilter('${letter}')">${letter}</button>
    `).join('')}
  `;
}

function setAlphabetFilter(letter) {
  alphabetFilter = letter;
  renderAlphabetPicker();
  renderDirectory();
}

function toggleFilter(category, value) {
  const idx = activeFilters[category].indexOf(value);
  if (idx > -1) {
    activeFilters[category].splice(idx, 1);
  } else {
    activeFilters[category].push(value);
  }
  renderDirectory();
}

function clearAllFilters() {
  activeFilters = { group: [], transmission: [], host: [], tag: [] };
  alphabetFilter = '';
  directorySearchQuery = '';
  document.getElementById('dir-search-input').value = '';
  
  // Uncheck all sidebar checkboxes
  const checkboxes = document.querySelectorAll('.directory-sidebar input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);
  
  renderAlphabetPicker();
  renderDirectory();
}

function setDirectoryTab(tab) {
  currentDirectoryTab = tab;
  document.querySelectorAll('.dir-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('dir-tab-' + tab).classList.add('active');
  renderDirectory();
}

function updateDirectorySearch(q) {
  directorySearchQuery = q;
  renderDirectory();
}

function toggleMobileFilters(open) {
  const sidebar = document.querySelector('.directory-sidebar');
  const overlay = document.getElementById('drawer-overlay');
  if (open) {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Compile directory items based on searches, filters, tabs, and alphabet picker
function renderDirectory() {
  const container = document.getElementById('dir-disease-list');
  const countBadge = document.getElementById('dir-results-count');
  if (!container) return;
  
  let matches = [];
  
  // Gather base list depending on selected tab
  if (currentDirectoryTab === 'all') {
    Object.entries(diseases).forEach(([cat, arr]) => {
      arr.forEach(d => matches.push({ cat, d }));
    });
  } else if (currentDirectoryTab === 'bookmarks') {
    Object.entries(diseases).forEach(([cat, arr]) => {
      arr.forEach(d => {
        if (bookmarks.includes(d.id)) {
          matches.push({ cat, d });
        }
      });
    });
  } else if (currentDirectoryTab === 'history') {
    readingHistory.forEach(hist => {
      Object.entries(diseases).forEach(([cat, arr]) => {
        arr.forEach(d => {
          if (d.id === hist.id) {
            matches.push({ cat, d, timestamp: hist.time });
          }
        });
      });
    });
    // Sort reading history by timestamp descending
    matches.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  // Apply Search Query Filter (fuzzy)
  if (directorySearchQuery.trim()) {
    const q = directorySearchQuery.toLowerCase();
    matches = matches.filter(item => {
      const searchFields = [
        item.d.name, item.d.aka, item.d.agent, item.d.reservoir, item.d.vector,
        ...item.d.hosts, ...item.d.keywords
      ].join(' ');
      return fuzzyMatch(searchFields, q);
    });
  }
  
  // Apply Alphabetical Filter
  if (alphabetFilter) {
    matches = matches.filter(item => item.d.name.startsWith(alphabetFilter));
  }
  
  // Apply Interactive Filters (Bacterial, Host, Vector, Risk, etc.)
  // Group Filters (Bacterial, Viral, Fungal, Protozoal, Helminthic, Rickettsial, Prion)
  if (activeFilters.group.length > 0) {
    matches = matches.filter(item => {
      // Q Fever matches both bacterial and rickettsial
      if (item.d.id === 'qfever') {
        return activeFilters.group.includes('bacterial') || activeFilters.group.includes('rickettsial');
      }
      return activeFilters.group.includes(item.d.group);
    });
  }
  
  // Transmission Filters (Combinable AND/OR check - matches any active transmission filters)
  if (activeFilters.transmission.length > 0) {
    matches = matches.filter(item => {
      return activeFilters.transmission.some(t => item.d.transmissionTypes.includes(t));
    });
  }
  
  // Host Filters (Combinable)
  if (activeFilters.host.length > 0) {
    matches = matches.filter(item => {
      return activeFilters.host.some(h => item.d.hostTypes.includes(h));
    });
  }
  
  // Special Tag Filters
  if (activeFilters.tag.length > 0) {
    matches = matches.filter(item => {
      return activeFilters.tag.some(t => item.d.tags.includes(t));
    });
  }
  
  // Update badges
  countBadge.textContent = `${matches.length} DISEASE${matches.length === 1 ? '' : 'S'} FOUND`;
  document.getElementById('bookmark-count-badge').textContent = bookmarks.length;
  
  // Render empty state
  if (matches.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 16px;background:var(--surface);border:1px solid var(--border);border-radius:16px;">
        <span style="font-size:36px;display:block;margin-bottom:12px;">🔍</span>
        <div style="font-weight:600;font-size:16px;margin-bottom:6px;">No Matching Zoonoses</div>
        <p style="color:var(--muted);font-size:13px;max-width:320px;margin:0 auto 16px;">Adjust your filters, clear your search, or browse another category.</p>
        <button class="back-btn" onclick="clearAllFilters()" style="margin-bottom:0;">Reset Filters</button>
      </div>
    `;
    return;
  }
  
  // Render list
  container.innerHTML = matches.map((item, i) => {
    const isBookmarked = bookmarks.includes(item.d.id);
    return `
      <div class="disease-card" style="--cc:${colorMap[item.cat]}" onclick="showDisease('${item.cat}', '${item.d.id}')">
        <div class="disease-num">0${i+1}</div>
        <div class="disease-info">
          <div style="display:flex;align-items:center;gap:8px;">
            <div class="disease-name">${item.d.name}</div>
            ${isBookmarked ? '<span style="color:var(--accent);font-size:12px;">★</span>' : ''}
          </div>
          <div class="disease-aka">${item.d.aka}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
          <div class="disease-badge" style="color:${colorMap[item.cat]};border-color:${colorMap[item.cat]}33;background:${colorMap[item.cat]}11">
            ${item.d.group.charAt(0).toUpperCase() + item.d.group.slice(1)}
          </div>
          ${item.d.tags.includes('notifiable') ? '<span style="font-size:9px;font-family:\'DM Mono\';color:#e84444;border:1px solid rgba(232,68,68,0.2);padding:2px 4px;border-radius:4px;background:rgba(232,68,68,0.05);">OIE</span>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

// --- BOOKMARKS MANAGEMENT ---
function toggleBookmark(id) {
  const idx = bookmarks.indexOf(id);
  if (idx > -1) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(id);
  }
  localStorage.setItem('zoonotix.bookmarks', JSON.stringify(bookmarks));
  updateBookmarkButtonUI(id);
  
  // Refresh badges and tabs
  const badge = document.getElementById('bookmark-count-badge');
  if (badge) badge.textContent = bookmarks.length;
}

function updateBookmarkButtonUI(id) {
  const btn = document.getElementById('bookmark-toggle-btn');
  if (!btn) return;
  const isBookmarked = bookmarks.includes(id);
  if (isBookmarked) {
    btn.classList.add('active');
    btn.innerHTML = `★ Bookmarked`;
  } else {
    btn.classList.remove('active');
    btn.innerHTML = `☆ Bookmark`;
  }
}

// --- READING HISTORY & PROGRESS TRACKING ---
function trackView(id) {
  // Push to history
  readingHistory = readingHistory.filter(h => h.id !== id);
  readingHistory.unshift({ id, time: Date.now() });
  readingHistory = readingHistory.slice(0, 10); // Keep last 10
  localStorage.setItem('zoonotix.history', JSON.stringify(readingHistory));
  
  // Sync badges
  const badge = document.getElementById('bookmark-count-badge');
  if (badge) badge.textContent = bookmarks.length;
}

function saveScrollProgress(id, sectionId, percent) {
  if (!readingProgress[id]) readingProgress[id] = {};
  readingProgress[id] = { section: sectionId, percent: Math.round(percent), time: Date.now() };
  localStorage.setItem('zoonotix.progress', JSON.stringify(readingProgress));
}

function checkAndShowResumeBanner(id) {
  const progress = readingProgress[id];
  const container = document.getElementById('resume-reading-banner');
  if (!progress || progress.percent < 10 || progress.percent > 90) {
    if (container) container.remove();
    return;
  }
  
  // Create or update banner
  let banner = document.getElementById('resume-reading-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'resume-reading-banner';
    banner.className = 'resume-banner';
    document.body.appendChild(banner);
  }
  
  const sectionTitle = progress.section.replace(/-/g, ' ').toUpperCase();
  banner.innerHTML = `
    <span>Resume at <strong>${sectionTitle}</strong> (${progress.percent}%)</span>
    <button class="resume-btn" onclick="resumeScroll('${progress.section}')">Resume</button>
    <button class="resume-close" onclick="closeResumeBanner()">&times;</button>
  `;
}

function resumeScroll(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeResumeBanner();
  }
}

function closeResumeBanner() {
  const banner = document.getElementById('resume-reading-banner');
  if (banner) banner.remove();
}

// --- RELATED CONTENT CALCULATION ---
function renderRelatedDiseases(cat, currentId) {
  const current = diseases[cat].find(x => x.id === currentId);
  if (!current) return '';
  
  const pool = [];
  Object.entries(diseases).forEach(([otherCat, arr]) => {
    arr.forEach(other => {
      if (other.id === currentId) return; // skip self
      
      let score = 0;
      // 1. Same causative organism category (+3 points)
      if (otherCat === cat) score += 3;
      
      // 2. Overlapping host species (+2 points per host)
      const currentHosts = current.hosts || [];
      const otherHosts = other.hosts || [];
      const hostOverlap = otherHosts.filter(h => currentHosts.includes(h)).length;
      score += hostOverlap * 2;
      
      // 3. Overlapping keywords (+2 points per keyword)
      const currentKeywords = current.keywords || [];
      const otherKeywords = other.keywords || [];
      const keywordOverlap = otherKeywords.filter(k => currentKeywords.includes(k)).length;
      score += keywordOverlap * 2;
      
      // 4. Same danger level (+1 point)
      if (other.danger === current.danger) score += 1;
      
      pool.push({ otherCat, other, score });
    });
  });
  
  // Sort by score descending
  pool.sort((a, b) => b.score - a.score);
  
  const relatedMatches = pool.slice(0, 3);
  
  return `
    <div class="related-section">
      <div class="sidebar-card-title" style="margin-bottom:12px;font-size:12px;color:var(--accent)"><svg class="icon" aria-hidden="true" style="width:16px;height:16px;"><use href="assets/icons/ze-icons.svg#shield"></use></svg> Related Zoonoses (One Health Connections)</div>
      <div class="related-grid">
        ${relatedMatches.map(m => `
          <div class="related-card" style="--cc:${colorMap[m.otherCat]}" onclick="showDisease('${m.otherCat}', '${m.other.id}')">
            <div class="related-tag">${m.otherCat} zoonosis</div>
            <div class="related-name">${m.other.name}</div>
            <div class="related-aka">${m.other.aka}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// --- COLLAPSIBLE SECTIONS FOR COMPACT READING ---
function toggleSectionCollapse(headerEl) {
  const section = headerEl.closest('.ency-section');
  if (section) {
    section.classList.toggle('collapsed');
  }
}

function expandAllSections() {
  document.querySelectorAll('.ency-section').forEach(sec => sec.classList.remove('collapsed'));
}

function collapseAllSections() {
  document.querySelectorAll('.ency-section').forEach(sec => sec.classList.add('collapsed'));
}

// --- PREV / NEXT PAGINATION CONTROLS ---
function renderPaginationNav(cat, currentId) {
  const list = diseases[cat];
  const idx = list.findIndex(x => x.id === currentId);
  if (idx === -1) return '';
  
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;
  
  let html = `<div class="pagination-nav">`;
  if (prev) {
    html += `
      <div class="pagination-btn" style="--cc:${colorMap[cat]}" onclick="showDisease('${cat}', '${prev.id}')">
        <span class="pag-dir">← Previous Zoonosis</span>
        <span class="pag-name">${prev.name}</span>
      </div>
    `;
  } else {
    html += `<div></div>`; // empty placeholder
  }
  
  if (next) {
    html += `
      <div class="pagination-btn next" style="--cc:${colorMap[cat]}" onclick="showDisease('${cat}', '${next.id}')">
        <span class="pag-dir">Next Zoonosis →</span>
        <span class="pag-name">${next.name}</span>
      </div>
    `;
  } else {
    html += `<div></div>`;
  }
  html += `</div>`;
  return html;
}

// --- CONTEXTUAL GLOSSARY HIGHLIGHTER & TRIGGER ---
function highlightGlossaryTerms(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) {
    const parent = walker.currentNode.parentNode;
    if (
      parent.closest('.meta-pill') || 
      parent.closest('.section-header') || 
      parent.closest('a') || 
      parent.closest('button') || 
      parent.closest('.glossary-trigger') ||
      parent.closest('.tc-node')
    ) {
      continue;
    }
    nodes.push(walker.currentNode);
  }
  
  // Combine core terms and synonyms, sorted by length descending to match longest matches first
  const termKeys = [...Object.keys(glossary), ...Object.keys(glossarySynonyms)].sort((a, b) => b.length - a.length);
  
  nodes.forEach(node => {
    let html = node.nodeValue;
    let replaced = false;
    
    // Simple HTML escape
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    termKeys.forEach(term => {
      const regex = new RegExp(`\\b(${term}s?)\\b`, 'gi');
      if (regex.test(html)) {
        const resolvedKey = glossarySynonyms[term.toLowerCase()] || term.toLowerCase();
        html = html.replace(regex, `<span class="glossary-trigger" data-term="${resolvedKey}">$1</span>`);
        replaced = true;
      }
    });
    
    if (replaced) {
      const span = document.createElement('span');
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    }
  });
}

function showGlossaryTerm(termKey) {
  const item = glossary[termKey];
  if (!item) return;
  
  const tooltip = document.getElementById('glossary-tooltip');
  if (!tooltip) return;
  
  document.getElementById('gt-term-title').textContent = item.term;
  document.getElementById('gt-term-def').textContent = item.def;
  
  tooltip.classList.add('active');
  
  // Automatically hide after 8 seconds of inactivity, or close manually
  if (window.gtTimeout) clearTimeout(window.gtTimeout);
  window.gtTimeout = setTimeout(closeGlossaryTooltip, 8000);
}

function closeGlossaryTooltip() {
  const tooltip = document.getElementById('glossary-tooltip');
  if (tooltip) tooltip.classList.remove('active');
}

function openGlossaryTab(e) {
  if (e) e.preventDefault();
  closeGlossaryTooltip();
  showView('about'); // Scroll to syllabus / glossary section
  
  // Scroll directly to glossary section on about page
  const glossaryEl = document.getElementById('about-glossary-section');
  if (glossaryEl) {
    glossaryEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- SCROLL SPY & TABLE OF CONTENTS ---
let activeSectionId = '';

function setupScrollSpy(contentContainer) {
  const sections = contentContainer.querySelectorAll('.ency-section');
  
  function spy() {
    let activeId = '';
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        activeId = sec.id;
      }
    });
    
    if (activeId && activeId !== activeSectionId) {
      activeSectionId = activeId;
      updateTOCActiveLink();
    }
    
    // Save scroll progress in localStorage (debounced-like)
    const currentViewId = document.querySelector('.view.active').id;
    if (currentViewId === 'view-ency') {
      const curId = document.querySelector('.ency-title').textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
      // Look up correct disease ID by finding name
      let dId = '';
      for (const cat of Object.keys(diseases)) {
        const found = diseases[cat].find(x => x.name.toLowerCase().replace(/[^a-z0-9]+/g, '') === curId);
        if (found) { dId = found.id; break; }
      }
      
      if (dId) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        saveScrollProgress(dId, activeId || 'origin-history', percent);
      }
    }
  }
  
  document.removeEventListener('scroll', spy);
  document.addEventListener('scroll', spy);
  spy();
}

function updateTOCActiveLink() {
  document.querySelectorAll('.toc-link').forEach(link => {
    if (link.getAttribute('href') === '#' + activeSectionId) {
      link.classList.add('active');
      link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      link.classList.remove('active');
    }
  });
}

function toggleMobileTOC(open) {
  const drawer = document.getElementById('toc-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (open) {
    // Populate TOC drawer
    const list = document.getElementById('toc-drawer-list');
    const sourceLinks = document.getElementById('toc-list');
    if (list && sourceLinks) {
      list.innerHTML = sourceLinks.innerHTML;
      // Wire up custom scroll listener inside drawer links
      list.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeAllDrawers();
          }
        });
      });
    }
    
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeAllDrawers() {
  toggleMobileFilters(false);
  toggleMobileTOC(false);
}

// --- SYNC THEME SELECTIONS IN DOM ---
document.addEventListener('DOMContentLoaded', () => {
  // Setup Back-to-top scroll trigger
  window.addEventListener('scroll', () => {
    const btn = document.getElementById('back-to-top-btn');
    if (btn) {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }
  });
  
  // Set bookmarks count on tab initially
  const badge = document.getElementById('bookmark-count-badge');
  if (badge) badge.textContent = bookmarks.length;
});
