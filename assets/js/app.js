
window.diseases = {};
window.glossary = {};
window.glossarySynonyms = {};

async function initializeApp() {
    try {
        const [disRes, gloRes, synRes, svgRes] = await Promise.all([
            fetch('data/diseases.json'),
            fetch('data/glossary.json'),
            fetch('data/glossarySynonyms.json'),
            fetch('assets/svg/ze-icons.svg')
        ]);
        
        window.diseases = await disRes.json();
        window.glossary = await gloRes.json();
        window.glossarySynonyms = await synRes.json();
        
        const svgText = await svgRes.text();
        document.getElementById('inlined-svgs').innerHTML = svgText;
        
        // Make diseases available globally
        diseases = window.diseases;
        glossary = window.glossary;
        glossarySynonyms = window.glossarySynonyms;
        
        // Trigger original setup
        if (typeof window.__originalInit === 'function') {
            window.__originalInit();
        }
    } catch(e) {
        console.error("Failed to load modular data. Note: CORS blocks fetch() on file:// protocols.", e);
        document.body.innerHTML = "<div style='padding:40px;text-align:center;color:red;font-family:sans-serif;'><h2>Application Error</h2><p>Failed to load modular data via fetch().</p><p>If you are opening this file locally, modern browsers block HTTP requests for local files due to security policies.</p><p>Please host this application on a web server.</p></div>";
    }
}
document.addEventListener('DOMContentLoaded', initializeApp);

const colorMap = {
bacterial: '#e8a838',
viral: '#e84444',
fungal: '#7dc45e',
parasitic: '#9b72cf',
prion: '#e84497'
};

let diseases = {};

let glossary = {};

let glossarySynonyms = {};

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
      <div class="sidebar-card-title" style="margin-bottom:12px;font-size:12px;color:var(--accent)"><svg class="icon" aria-hidden="true" style="width:16px;height:16px;"><use href="#shield"></use></svg> Related Zoonoses (One Health Connections)</div>
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
  showView('about', false, true); // skipScroll = true
  
  // Scroll directly to glossary section on about page
  const glossaryEl = document.getElementById('about-glossary-section');
  if (glossaryEl) {
    setTimeout(() => glossaryEl.scrollIntoView({ behavior: 'smooth' }), 50);
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
window.__originalInit = () => {
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



// ==========================================
// UPGRADED NAVIGATION & DISPLAY CONTROLS
// ==========================================

// --- ENHANCED ROUTER ---
const scrollMemory = {}; // Tracks scroll position per path
let currentPath = '';

let appHistoryCount = 0;

function navigateTo(path, stateData = {}, replace = false) {
  scrollMemory[currentPath] = window.scrollY;
  currentPath = path;
  if (typeof history !== 'undefined') {
    if (replace) {
      history.replaceState({ path, ...stateData }, '', '#' + path);
    } else {
      history.pushState({ path, ...stateData }, '', '#' + path);
      appHistoryCount++;
    }
  }
}

function restoreScroll(path) {
  setTimeout(() => {
    if (scrollMemory[path] !== undefined) {
      window.scrollTo(0, scrollMemory[path]);
    } else {
      window.scrollTo(0, 0);
    }
  }, 10);
}

function showView(viewId, skipHistory = false, skipScroll = false) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + viewId);
  if (el) el.classList.add('active');

  // Deactivate all navigation tabs
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  
  // Activate correct tab in header
  if (viewId === 'home' || viewId === 'list' || viewId === 'ency') {
    const tab = document.getElementById('tab-home');
    if (tab) tab.classList.add('active');
  } else if (viewId === 'directory') {
    const tab = document.getElementById('tab-directory');
    if (tab) tab.classList.add('active');
  } else if (viewId === 'about') {
    const tab = document.getElementById('tab-about');
    if (tab) tab.classList.add('active');
  }
  
  // Close overlays
  if (typeof closeAllDrawers === 'function') closeAllDrawers();
  if (typeof closeGlossaryTooltip === 'function') closeGlossaryTooltip();
  
  // Initialize Directory content
  if (viewId === 'directory') {
    if (typeof renderAlphabetPicker === 'function') renderAlphabetPicker();
    if (typeof renderDirectory === 'function') renderDirectory();
  }
  
  if (!skipHistory) {
    navigateTo(viewId, { view: viewId });
    if (!skipScroll) window.scrollTo(0, 0);
  }
}

function showCategory(cat) {
  currentCategory = cat;
  const label = cat.charAt(0).toUpperCase() + cat.slice(1);
  document.getElementById('list-cat-label').textContent = label;
  document.getElementById('list-title').textContent = label + ' Zoonoses';
  document.getElementById('list-title').style.color = colorMap[cat];
  
  const container = document.getElementById('disease-list-container');
  container.style.setProperty('--cc', colorMap[cat]);
  
  container.innerHTML = diseases[cat].map((d, i) => `
    <div class="disease-card" style="--cc:${colorMap[cat]}" role="button" tabindex="0" onclick="showDisease('${cat}', '${d.id}')" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showDisease('${cat}', '${d.id}') }">
      <div class="disease-num">0${i+1}</div>
      <div class="disease-info">
        <div class="disease-name">${d.name}</div>
        <div class="disease-aka">${d.aka}</div>
      </div>
      <div class="disease-badge" style="color:${colorMap[cat]};border-color:${colorMap[cat]}33;background:${colorMap[cat]}11">${d.badge}</div>
    </div>
  `).join('');
  
  showView('list', true);
  if (!window.__isPopState) navigateTo('list/' + cat, { view: 'list', cat });
  if (!window.__isPopState) window.scrollTo(0, 0);
}

function goBackToList() {
  if (appHistoryCount > 0) {
    window.history.back();
  } else if (currentCategory) {
    showCategory(currentCategory);
  } else {
    showView('home');
  }
}

function toggleClinicalTab(type) {
  document.querySelectorAll('.clinical-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.clinical-panel').forEach(panel => panel.classList.remove('active'));
  
  const tabBtn = document.getElementById('tab-btn-' + type);
  const panel = document.getElementById('panel-' + type);
  if (tabBtn) tabBtn.classList.add('active');
  if (panel) panel.classList.add('active');
}

function showDisease(cat, id) {
  if (typeof id === 'string') {
    id = id.replace(/'/g, "");
  }
  const d = diseases[cat].find(x => x.id === id);
  if (!d) return;
  
  // Track that student viewed this disease
  trackView(d.id);
  
  const cc = colorMap[cat];
  const catLabel = cat.charAt(0).toUpperCase() + cat.slice(1);
  
  // Load Phase 4 enriched database with scientifically-accurate fallbacks
  
  let baseExt = (window.diseaseEnrichment && window.diseaseEnrichment[d.id]) || {};
  
  // Adapter to map Phase 11 encyclopedia data to HTML template UI
  const ext = {
    definition: baseExt.definition || "Detailed scientific reference profile under active compilation.",
    etiology: baseExt.etiology || d.agent,
    taxonomy: baseExt.taxonomy || "Microbial taxonomy under evaluation.",
    vetImportance: baseExt.economicImportance || "Primary veterinary herd health constraint.",
    publicHealthImportance: baseExt.publicHealthImportance || "Zoonotic spillover risk.",
    riskGroups: baseExt.transmission || "Veterinarians, farmers, livestock handlers.",
    envSurvival: baseExt.envSurvival || "Sensitive to standard disinfection.",
    pathogenesis: {
      entry: baseExt.pathogenesis ? baseExt.pathogenesis.entry : "Mucosal/dermal",
      spread: baseExt.pathogenesis ? baseExt.pathogenesis.spread : "Systemic",
      organs: baseExt.pathogenesis ? baseExt.pathogenesis.organs : ["Systemic organs"],
      lesions: baseExt.pathogenesis ? baseExt.pathogenesis.lesions : "Acute changes"
    },
    clinicalSigns: {
      animals: { 
        acute: baseExt.clinicalSigns && baseExt.clinicalSigns.animals ? baseExt.clinicalSigns.animals.acute : d.badge, 
        chronic: baseExt.clinicalSigns && baseExt.clinicalSigns.animals ? baseExt.clinicalSigns.animals.chronic : "Chronic fatigue", 
        subclinical: baseExt.clinicalSigns && baseExt.clinicalSigns.animals ? baseExt.clinicalSigns.animals.subclinical : "Shedders" 
      },
      humans: { 
        acute: baseExt.clinicalSigns && baseExt.clinicalSigns.humans ? baseExt.clinicalSigns.humans.acute : d.humanRisk, 
        chronic: baseExt.clinicalSigns && baseExt.clinicalSigns.humans ? baseExt.clinicalSigns.humans.chronic : "Fatigue", 
        subclinical: baseExt.clinicalSigns && baseExt.clinicalSigns.humans ? baseExt.clinicalSigns.humans.subclinical : "Seroconversion" 
      }
    },
    lesionsDesc: {
      gross: baseExt.grossLesions || "Acute congestion.",
      histopathology: baseExt.histopathology || "Microvascular thrombi.",
      hallmark: baseExt.grossLesions || "Widespread tissue congestion."
    },
    diagnosis: {
      history: baseExt.historicalBackground || "Exposure to vectors.",
      signs: d.badge,
      samples: baseExt.sampleCollection || "Serum, blood.",
      tests: [
        { test: "Laboratory", type: "Culture/Stain", description: baseExt.laboratoryDiagnosis || "N/A" },
        { test: "Serology", type: "Antibody", description: baseExt.serology || "N/A" },
        { test: "Molecular", type: "PCR", description: baseExt.pcr || "N/A" },
        { test: "Rapid Tests", type: "POC", description: baseExt.rapidTests || "N/A" }
      ],
      differentials: [
        { disease: baseExt.differentialDiagnosis || "Related zoonoses", keyDiff: "Diagnostic distinction relies on lab.", mistake: "High overlap of acute signs." }
      ]
    },
    treatment: [
      { drug: "Primary Therapy", purpose: baseExt.treatmentPrinciples || "Supportive", mechanism: "N/A", speciesNotes: "Veterinary supervision required.", limitations: baseExt.drugResistance || "N/A", resistance: baseExt.drugResistance || "N/A" }
    ],
    control: {
      farm: baseExt.biosecurity || "Standard biosecurity.",
      animal: baseExt.vaccination || "Isolation of sick herds.",
      human: baseExt.prevention || "Hand hygiene, PPE.",
      government: baseExt.control || "State reporting mandates."
    },
    publicHealth: { economic: baseExt.economicImportance || "Productivity losses.", foodSafety: baseExt.publicHealthImportance || "Pasteurize milk.", wildlifeInterface: baseExt.onehealth || "Sylvatic reservoirs." },
    onehealth: { human: baseExt.onehealth || "Zoonotic exposure.", animal: "Domestic host cycles.", environment: "Fomite/soil interfaces." },
    references: baseExt.references || ["WOAH Terrestrial Manual", "WHO Guidelines", "Merck Veterinary Manual"],
    epidemiology: {
      source: baseExt.reservoir || "Contaminated environment",
      globalRelevance: baseExt.globalContext || "Worldwide distribution"
    }
  };

  
  // Danger badge (HTML-safe)
  const dangerLabel = d.danger === 'high'
    ? '<span class="dot dot-high" aria-hidden="true"></span> HIGH RISK'
    : d.danger === 'medium'
    ? '<span class="dot dot-medium" aria-hidden="true"></span> MODERATE RISK'
    : '<span class="dot dot-low" aria-hidden="true"></span> LOW RISK';
    
  // Related content
  const relatedHTML = renderRelatedDiseases(cat, d.id);
  
  // Next/Prev Pagination
  const paginationHTML = renderPaginationNav(cat, d.id);
  
  document.getElementById('ency-content').innerHTML = `
    <div class="ency-header">
      <div class="logo-row" style="justify-content:space-between;margin-bottom:12px;align-items:center;">
        <button class="back-btn" id="ency-back-btn" onclick="goBackToList()" style="margin-bottom:0;padding:6px 12px;">
          <svg class="icon icon-arrow-left" aria-hidden="true" focusable="false" style="width:14px;height:14px;"><use href="#arrow-left"></use></svg>
          Back
        </button>
        <button class="bookmark-btn" id="bookmark-toggle-btn" onclick="toggleBookmark('${d.id}')">
          ☆ Bookmark
        </button>
      </div>
      
      <div class="breadcrumb" style="margin-top:12px;">Zoonotic Diseases → ${catLabel} → <span style="color:${cc}">${d.name}</span></div>
      
      <div class="ency-title" style="color:${cc};margin-top:8px;">${d.name}</div>
      <div class="ency-subtitle">${d.aka}</div>
      
      <div class="ency-meta">
        <div class="meta-pill">
          <div>
            <div class="meta-label">Causative Agent</div>
            <div class="meta-value" style="font-size:13px; font-style:italic;">${d.agent}</div>
          </div>
        </div>
        <div class="meta-pill">
          <div>
            <div class="meta-label">Incubation</div>
            <div class="meta-value">${d.incubation}</div>
          </div>
        </div>
        <div class="meta-pill">
          <div>
            <div class="meta-label">CFR</div>
            <div class="meta-value">${d.mortality}</div>
          </div>
        </div>
        <div class="meta-pill">
          <div>
            <div class="meta-label">Est. Read</div>
            <div class="meta-value" id="meta-est-time">-</div>
          </div>
        </div>
        <div class="meta-pill">
          <div>
            <div class="meta-label">Geography (India)</div>
            <div class="meta-value" style="font-size:12px">${d.geography}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ency-body">
      <div class="ency-sections">
        
        <!-- Controls to Expand / Collapse All -->
        <div class="collapse-controls">
          <button class="collapse-btn" onclick="expandAllSections()">Expand All</button>
          <button class="collapse-btn" onclick="collapseAllSections()">Collapse All</button>
        </div>

        <!-- 1. Disease Overview -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-book" aria-hidden="true"><use href="#book"></use></svg></span>
              <span class="section-name">Disease Overview & Etiology</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p style="font-weight:500; font-size:14px; margin-bottom:12px; color:var(--accent);">${ext.definition}</p>
            <div class="kv-list">
              <div class="kv-item">
                <div class="kv-key">Etiological Agent</div>
                <div class="kv-val" style="font-style:italic;">${ext.etiology}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Taxonomy</div>
                <div class="kv-val">${ext.taxonomy}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Veterinary Importance</div>
                <div class="kv-val">${ext.vetImportance}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Public Health Importance</div>
                <div class="kv-val">${ext.publicHealthImportance}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 2. Epidemiology -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-microbe" aria-hidden="true"><use href="#microbe"></use></svg></span>
              <span class="section-name">Epidemiology & Distribution</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="kv-list">
              <div class="kv-item">
                <div class="kv-key">Source of Infection</div>
                <div class="kv-val">${ext.epidemiology ? ext.epidemiology.source : 'Contaminated water, feed, and discharges.'}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Susceptible Hosts</div>
                <div class="kv-val">${Array.isArray(d.hosts) ? d.hosts.join(', ') : (d.hosts || 'Multiple species')}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Occupational Risks</div>
                <div class="kv-val">${ext.riskGroups}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Environmental Survival</div>
                <div class="kv-val">${ext.envSurvival}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Indian Relevance</div>
                <div class="kv-val">${d.indianContext}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Global Relevance</div>
                <div class="kv-val">${ext.epidemiology ? ext.epidemiology.globalRelevance : 'Worldwide distribution.'}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3. Transmission & Pathogenesis -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-transfer" aria-hidden="true"><use href="#transfer"></use></svg></span>
              <span class="section-name">Transmission Cycle & Pathogenesis</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p><strong>Epidemiological Transmission Cycle:</strong> Spreads between reservoirs, vectors, and targets.</p>
            <div id="transmission-cycle-container" class="visual-container" style="margin-bottom:24px;"></div>
            
            <p><strong>Pathogenesis Pathway:</strong> Developmental stages of the agent inside the host.</p>
            <div id="pathogenesis-flow-container" class="visual-container"></div>
          </div>
        </div>
        
        <!-- 4. Clinical Signs -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-hospital" aria-hidden="true"><use href="#hospital"></use></svg></span>
              <span class="section-name">Clinical Signs & Manifestations</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="clinical-tabs">
              <button class="clinical-tab-btn active" id="tab-btn-animals" onclick="toggleClinicalTab('animals')">Animals</button>
              <button class="clinical-tab-btn" id="tab-btn-humans" onclick="toggleClinicalTab('humans')">Humans</button>
            </div>
            
            <div class="clinical-panel active" id="panel-animals">
              <div class="clinical-cards-grid">
                <div class="clinical-card">
                  <div class="clinical-card-type">Acute</div>
                  <div class="clinical-card-text">${ext.clinicalSigns.animals.acute}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Chronic</div>
                  <div class="clinical-card-text">${ext.clinicalSigns.animals.chronic}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Subclinical</div>
                  <div class="clinical-card-text">${ext.clinicalSigns.animals.subclinical}</div>
                </div>
              </div>
            </div>

            <div class="clinical-panel" id="panel-humans">
              <div class="clinical-cards-grid">
                <div class="clinical-card">
                  <div class="clinical-card-type">Acute</div>
                  <div class="clinical-card-text">${ext.clinicalSigns.humans.acute}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Chronic</div>
                  <div class="clinical-card-text">${ext.clinicalSigns.humans.chronic}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Subclinical</div>
                  <div class="clinical-card-text">${ext.clinicalSigns.humans.subclinical}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Lesions -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-shield" aria-hidden="true"><use href="#shield"></use></svg></span>
              <span class="section-name">Pathology & Lesions</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="pathology-grid">
              <div class="pathology-card">
                <div class="pathology-title">👁️ Gross Lesions</div>
                <p style="font-size:13px; line-height:1.6;">${ext.lesionsDesc.gross}</p>
              </div>
              <div class="pathology-card">
                <div class="pathology-title">🔬 Histopathology</div>
                <p style="font-size:13px; line-height:1.6;">${ext.lesionsDesc.histopathology}</p>
              </div>
            </div>
            <div class="pathology-card" style="margin-top:16px; border-left:4px solid var(--accent2);">
              <div class="pathology-title" style="color:var(--accent2); font-size:11px; font-weight:bold; font-family:'DM Mono';">DIAGNOSTIC HALLMARK LESION</div>
              <p style="font-size:13px; font-weight:500;">${ext.lesionsDesc.hallmark}</p>
            </div>
          </div>
        </div>

        <!-- 6. Diagnosis -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-india-flag" aria-hidden="true"><use href="#india-flag"></use></svg></span>
              <span class="section-name">Diagnostics & Lab Workflows</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p><strong>Diagnostic Pipeline:</strong> Standard timeline flow from suspicion to lab confirmation.</p>
            <div id="diagnostic-workflow-container" class="visual-container" style="margin-bottom:24px;"></div>
            
            <p><strong>Laboratory diagnostic techniques comparison:</strong></p>
            <div class="table-responsive">
            <table class="diagnostic-comparison">
              <thead>
                <tr>
                  <th>Diagnostic Test</th>
                  <th>Method Type</th>
                  <th>Description & Diagnostic Use</th>
                </tr>
              </thead>
              <tbody>
                ${ext.diagnosis.tests.map(t => `
                  <tr>
                    <td style="font-weight:bold;">${t.test}</td>
                    <td style="font-family:'DM Mono'; font-size:11px; color:var(--accent);">${t.type}</td>
                    <td>${t.description}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            </div>

            <p style="margin-top:24px;"><strong>Differential Diagnosis:</strong> Differentiating similar clinical presentations.</p>
            <div class="diff-grid">
              ${ext.diagnosis.differentials.map(diff => `
                <div class="diff-card">
                  <div class="diff-header">
                    <span class="diff-name">${diff.disease}</span>
                    <span style="font-size:11px; font-family:'DM Mono'; color:var(--accent2);">Differential Match</span>
                  </div>
                  <div class="diff-point"><strong>Key differentiating factor:</strong> ${diff.keyDiff}</div>
                  <div class="diff-point" style="font-style:italic; color:var(--muted);"><strong>Common mistake:</strong> ${diff.mistake}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 7. Treatment -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-bolt" aria-hidden="true"><use href="#bolt"></use></svg></span>
              <span class="section-name">Treatment & Supportive Care</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="treatment-grid">
              ${ext.treatment.map(tr => `
                <div class="treatment-card">
                  <div class="treatment-drug">${tr.drug}</div>
                  <div class="kv-list" style="margin-top:8px;">
                    <div class="kv-item"><div class="kv-key">Purpose</div><div class="kv-val">${tr.purpose}</div></div>
                    <div class="kv-item"><div class="kv-key">Mechanism</div><div class="kv-val">${tr.mechanism}</div></div>
                    <div class="kv-item"><div class="kv-key">Species Considerations</div><div class="kv-val" style="color:var(--accent);">${tr.speciesNotes}</div></div>
                    <div class="kv-item"><div class="kv-key">Limitations</div><div class="kv-val">${tr.limitations}</div></div>
                    ${tr.resistance && tr.resistance !== 'N/A' ? `<div class="kv-item"><div class="kv-key" style="color:#e84444;">Resistance</div><div class="kv-val" style="color:#e84444;">${tr.resistance}</div></div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 8. Control & Prevention -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-shield" aria-hidden="true"><use href="#shield"></use></svg></span>
              <span class="section-name">Prevention, Biosecurity & Control</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p>Epidemiological management levels to prevent transmission and contain outbreaks.</p>
            <div class="control-grid">
              <div class="control-card">
                <div class="control-level">Farm Level</div>
                <div style="font-size:12px; line-height:1.5;">${ext.control.farm}</div>
              </div>
              <div class="control-card">
                <div class="control-level">Animal Level</div>
                <div style="font-size:12px; line-height:1.5;">${ext.control.animal}</div>
              </div>
              <div class="control-card">
                <div class="control-level">Human Level</div>
                <div style="font-size:12px; line-height:1.5;">${ext.control.human}</div>
              </div>
              <div class="control-card">
                <div class="control-level">Government Level</div>
                <div style="font-size:12px; line-height:1.5;">${ext.control.government}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 9. Public Health Significance -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-book" aria-hidden="true"><use href="#book"></use></svg></span>
              <span class="section-name">Public Health & Economics</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="kv-list">
              <div class="kv-item">
                <div class="kv-key">Economic Impact</div>
                <div class="kv-val">${ext.publicHealth.economic}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Food & Milk Safety</div>
                <div class="kv-val">${ext.publicHealth.foodSafety}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Wildlife Interface</div>
                <div class="kv-val">${ext.publicHealth.wildlifeInterface}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 10. One Health Integration -->
        <div class="ency-section">
          <div class="section-header" role="button" tabindex="0" onclick="toggleSectionCollapse(this)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSectionCollapse(this) }">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-transfer" aria-hidden="true"><use href="#transfer"></use></svg></span>
              <span class="section-name">One Health Integration</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p>One Health interfaces (Human, Animal, and Environment) details:</p>
            <div id="one-health-triangle-container" class="visual-container"></div>
          </div>
        </div>

        <!-- 11. Quick Revision Card (High Yield Mobile summary) -->
        <div class="revision-card">
          <div class="revision-badge">QUICK REVISION</div>
          <h4 style="font-family:'Playfair Display', serif; font-size:18px; margin-bottom:12px; color:var(--accent);">High-Yield Summary Card</h4>
          <div class="revision-grid">
            <div class="revision-item">
              <div class="revision-label">Causative Agent</div>
              <div class="revision-value" style="font-style:italic;">${(ext.etiology || d.agent || 'Unknown agent').split(';')[0]}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Reservoir Host</div>
              <div class="revision-value">${d.reservoir}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Main Transmission</div>
              <div class="revision-value">${d.vector} / ${(d.spread || d.vector || 'Direct contact').split(' ').slice(0, 3).join(' ')}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Hallmark Signs</div>
              <div class="revision-value">${d.badge}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Best Lab Test</div>
              <div class="revision-value">${ext.diagnosis.tests && ext.diagnosis.tests.length > 0 ? ext.diagnosis.tests[0].test : 'PCR'}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Major Lesion</div>
              <div class="revision-value">${(ext.lesionsDesc && ext.lesionsDesc.hallmark ? ext.lesionsDesc.hallmark.split(' ').slice(0, 5).join(' ') : 'Tissue changes noted')}...</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Primary Prevention</div>
              <div class="revision-value">${(ext.control && ext.control.farm ? ext.control.farm.split(' ').slice(0, 4).join(' ') : 'Biosecurity measures')}...</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">One Health Takeaway</div>
              <div class="revision-value">${(ext.onehealth.human || ext.onehealth.humanConnection || 'Zoonotic exposure.').split(' ').slice(0, 4).join(' ')}...</div>
            </div>
          </div>
        </div>

        <!-- 12. References Section -->
        <div class="ency-section" style="border-top:1px solid var(--border); margin-top:24px; padding-top:16px;">
          <div class="section-name" style="font-size:13px; color:var(--muted); font-family:'DM Mono', monospace;">Authoritative Veterinary References</div>
          <ul class="references-list">
            ${ext.references.map(ref => `
              <li>${ref}</li>
            `).join('')}
          </ul>
        </div>
        
        ${paginationHTML}
        ${relatedHTML}
        
      </div>
      
      <div class="ency-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true" focusable="false"><use href="#shield"></use></svg> Risk Classification</div>
          <div class="danger-badge ${d.danger}">${dangerLabel}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:8px">Based on human case fatality rate and pandemic potential</div>
        </div>
        
        <div class="sidebar-card" id="toc-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true"><use href="#book"></use></svg> On this page</div>
          <nav id="toc-list" aria-label="On this page"></nav>
        </div>
        
        <div class="sidebar-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true" focusable="false"><use href="#bolt"></use></svg> Quick Facts</div>
          <div class="quick-facts">
            ${Object.entries(d.quickfacts).map(([k, v]) => `
              <div class="qf-row">
                <span class="qf-label">${k}</span>
                <span class="qf-val">${v}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="sidebar-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true" focusable="false"><use href="#tag"></use></svg> Keywords</div>
          <div class="tag-cloud">
            ${d.keywords.map(k => `<span class="tag">${k}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Wire dynamic toggle click handler
  document.getElementById('bookmark-toggle-btn').onclick = () => toggleBookmark(d.id);
  
  updateBookmarkButtonUI(d.id);
  showView('ency', true);
  if (!window.__isPopState) navigateTo('ency/' + cat + '/' + d.id, { view: 'ency', cat, id: d.id });
  if (!window.__isPopState) window.scrollTo(0, 0);
  
  // Call post-render helper
  setTimeout(() => {
    postRenderEncy();
    
    // Inject dynamically drawn SVGs from svgEngine
    if (window.svgEngine) {
      document.getElementById('transmission-cycle-container').innerHTML = window.svgEngine.drawTransmissionCycle(d, ext);
      document.getElementById('pathogenesis-flow-container').innerHTML = window.svgEngine.drawPathogenesisFlow(d, ext);
      document.getElementById('one-health-triangle-container').innerHTML = window.svgEngine.drawOneHealthTriangle(d, ext);
      document.getElementById('diagnostic-workflow-container').innerHTML = window.svgEngine.drawDiagnosticWorkflow(d, ext);
    }
    
    
    // Contextual glossary highlighting
    highlightGlossaryTerms(document.getElementById('ency-content'));
    // Setup Scroll Spy
    setupScrollSpy(document.querySelector('.ency-sections'));
    // Check and show resume banner
    checkAndShowResumeBanner(d.id);
  }, 80);
}

function postRenderEncy() {
  const sections = document.querySelectorAll('.ency-sections .ency-section');
  const toc = document.getElementById('toc-list');
  if (toc) { toc.innerHTML = ''; }
  let allText = '';
  
  sections.forEach((sec) => {
    const headingEl = sec.querySelector('.section-name');
    if (!headingEl) return;
    const heading = headingEl.textContent.trim();
    const slug = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    sec.id = slug;
    
    if (toc) {
      const a = document.createElement('a');
      a.href = '#' + slug;
      a.className = 'toc-link';
      a.textContent = heading;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(slug).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      toc.appendChild(a);
    }
    allText += ' ' + sec.textContent;
  });
  
  // Estimate read time
  const words = (allText.trim().split(/\s+/).filter(Boolean)).length;
  const mins = Math.max(1, Math.round(words / 200));
  const meta = document.getElementById('meta-est-time');
  if (meta) meta.textContent = mins + ' min';
  
  // Setup reading progress indicator bar
  const content = document.querySelector('.ency-sections');
  const progress = document.getElementById('reading-progress');
  
  function updateProgress() {
    if (!content) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progress) progress.style.width = percent + '%';
  }
  
  document.removeEventListener('scroll', updateProgress);
  document.addEventListener('scroll', updateProgress);
  updateProgress();
}

// Search diseases on home view
function searchDiseases(query) {
  const wrapper = document.getElementById('search-wrapper');
  const catGrid = document.getElementById('cat-grid');
  const results = document.getElementById('search-results');
  
  if (!query || !query.trim()) {
    wrapper.style.display = 'none';
    catGrid.style.display = '';
    return;
  }
  
  wrapper.style.display = 'block';
  catGrid.style.display = 'none';
  
  const q = query.toLowerCase();
  const matches = [];
  
  Object.entries(diseases).forEach(([cat, list]) => {
    list.forEach(d => {
      const searchFields = [d.name, d.aka, d.agent, ...d.keywords].join(' ');
      if (fuzzyMatch(searchFields, q)) {
        matches.push({ cat, d });
      }
    });
  });
  
  if (matches.length === 0) {
    results.innerHTML = '<div style="color:var(--muted);font-size:14px;padding:20px 0">No diseases found for "' + query + '"</div>';
    return;
  }
  
  results.innerHTML = matches.map(({ cat, d }, i) => `
    <div class="disease-card" style="--cc:${colorMap[cat]}" role="button" tabindex="0" onclick="showDisease('${cat}', '${d.id}')" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showDisease('${cat}', '${d.id}') }">
      <div class="disease-num">0${i+1}</div>
      <div class="disease-info">
        <div class="disease-name">${d.name}</div>
        <div class="disease-aka">${d.aka}</div>
      </div>
      <div class="disease-badge" style="color:${colorMap[cat]};border-color:${colorMap[cat]}33;background:${colorMap[cat]}11">${cat.charAt(0).toUpperCase()+cat.slice(1)}</div>
    </div>
  `).join('');
}

// Search glossary on about view
function searchGlossary(query) {
  const list = document.getElementById('glossary-results-list');
  if (!list) return;
  
  const q = query.trim().toLowerCase();
  
  let html = '';
  const entries = Object.values(glossary);
  
  const filtered = entries.filter(item => {
    return item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q);
  });
  
  if (filtered.length === 0) {
    list.innerHTML = `<div style="color:var(--muted);font-size:13px;padding:12px 0;text-align:center;">No glossary definitions match "${query}"</div>`;
    return;
  }
  
  list.innerHTML = filtered.map(item => `
    <div class="qf-row" style="flex-direction:column;align-items:flex-start;padding:10px 0;gap:4px;">
      <span class="qf-val" style="color:var(--accent);font-size:14px;">${item.term}</span>
      <span class="qf-label" style="color:var(--text);font-size:13px;text-align:left;line-height:1.5;">${item.def}</span>
    </div>
  `).join('');
}

// Setup search bar in Category view
document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.path) {
      window.__isPopState = true;
      let s = e.state;
      currentPath = s.path;
      if (s.view === 'ency') showDisease(s.cat, s.id);
      else if (s.view === 'list') showCategory(s.cat);
      else showView(s.view, true);
      restoreScroll(s.path);
      window.__isPopState = false;
    } else {
      handleHashRoute();
    }
  });

  function handleHashRoute() {
    window.__isPopState = true;
    let hash = window.location.hash.substring(1) || 'home';
    currentPath = hash;
    const parts = hash.split('/');
    if (parts[0] === 'ency' && parts.length === 3) showDisease(parts[1], parts[2]);
    else if (parts[0] === 'list' && parts.length === 2) showCategory(parts[1]);
    else showView(parts[0], true);
    window.__isPopState = false;
  }
  
  setTimeout(() => handleHashRoute(), 50);

  const homeView = document.getElementById('view-home');
  if (homeView) {
    const searchBar = document.createElement('div');
    searchBar.innerHTML = `
      <div class="search-bar" style="margin-bottom:32px">
        <span class="search-icon" aria-hidden="true"><svg class="icon icon-search" aria-hidden="true"><use href="#search"></use></svg></span>
        <input type="text" placeholder="Search all diseases, agents, keywords..." oninput="searchDiseases(this.value)" style="flex:1;background:transparent;border:none;outline:none;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;">
      </div>
    `;
    homeView.insertBefore(searchBar, document.querySelector('.categories-grid'));
  }
  
  // Render alphabetical picker initially
  renderAlphabetPicker();
  
  // Render glossary initially
  searchGlossary('');
});


// --- FLOATING OVERLAY SEARCH ---
(() => {
  const overlay = document.getElementById('search-overlay');
  const openBtn = document.getElementById('floating-search-btn');
  const closeBtn = document.getElementById('close-search-btn');
  const input = document.getElementById('overlay-search-input');
  const list = document.getElementById('search-suggestions');
  let selected = -1;
  let lastFocused = null;
  const focusableSelector = 'a[href], button, input, [tabindex]:not([tabindex="-1"])';

  function trapTab(e) {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(overlay.querySelectorAll(focusableSelector)).filter(n => !n.disabled && n.offsetParent !== null);
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openSearch() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    input.value = '';
    runGlobalSearch('');
    setTimeout(() => input.focus(), 20);
    overlay.addEventListener('keydown', trapTab);
  }

  function closeSearch() {
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    list.innerHTML = '';
    selected = -1;
    overlay.removeEventListener('keydown', trapTab);
    try { if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus(); else openBtn.focus(); } catch (e) { openBtn.focus(); }
  }

  input.addEventListener('input', (e) => runGlobalSearch(e.target.value));

  input.addEventListener('keydown', (e) => {
    const items = Array.from(list.querySelectorAll('.suggestion-item'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selected = Math.min(items.length - 1, selected + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selected = Math.max(0, selected - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selected >= 0 && items[selected]) {
        items[selected].click();
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
    items.forEach((it, idx) => {
      it.setAttribute('aria-selected', idx === selected ? 'true' : 'false');
      if (idx === selected) it.scrollIntoView({ block: 'nearest' });
    });
  });

  openBtn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });

  window.openSearch = openSearch;
  window.closeSearch = closeSearch;
})();

// --- THEME TOGGLE ---
(function(){
  const btn = document.getElementById('theme-toggle');
  const root = document.body;
  const stored = localStorage.getItem('zoonotix.theme') || 'playful';
  root.setAttribute('data-theme', stored);
  if (btn) btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'playful' ? 'clinical' : 'playful';
    root.setAttribute('data-theme', next);
    localStorage.setItem('zoonotix.theme', next);
  });
})();