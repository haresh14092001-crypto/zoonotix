const fs = require('fs');

// Read the current index.html file
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the header navigation tabs row
const navRegex = /<nav>[\s\S]*?<\/nav>/;
const newNav = `
<nav>
<button class="nav-tab active" id="tab-home" onclick="showView('home')">Categories</button>
<button class="nav-tab" id="tab-directory" onclick="showView('directory')">Directory & Filters</button>
<button class="nav-tab" id="tab-about" onclick="showView('about')">About & Syllabus</button>
</nav>
`.trim();

html = html.replace(navRegex, newNav);
console.log("Replaced header navigation.");

// 2. Define the directory view HTML markup
const directoryHtml = `
<!-- DIRECTORY & FILTERS VIEW -->
<div class="view" id="view-directory">
  <div class="section-title">Disease Directory</div>
  <p class="section-desc">Search, filter, and browse all 38 zoonotic diseases. Combine filters for advanced epidemiological study.</p>
  
  <div class="directory-tabs">
    <button class="dir-tab-btn active" id="dir-tab-all" onclick="setDirectoryTab('all')">All Diseases</button>
    <button class="dir-tab-btn" id="dir-tab-bookmarks" onclick="setDirectoryTab('bookmarks')">Bookmarks (<span id="bookmark-count-badge">0</span>)</button>
    <button class="dir-tab-btn" id="dir-tab-history" onclick="setDirectoryTab('history')">Reading History</button>
  </div>

  <div class="directory-container">
    <!-- Filter Sidebar -->
    <aside class="directory-sidebar">
      <div class="filter-section">
        <div class="filter-title">Pathogen Group</div>
        <div class="filter-options">
          <label class="filter-option"><input type="checkbox" value="bacterial" onchange="toggleFilter('group', 'bacterial')"> Bacterial</label>
          <label class="filter-option"><input type="checkbox" value="viral" onchange="toggleFilter('group', 'viral')"> Viral</label>
          <label class="filter-option"><input type="checkbox" value="fungal" onchange="toggleFilter('group', 'fungal')"> Fungal</label>
          <label class="filter-option"><input type="checkbox" value="protozoal" onchange="toggleFilter('group', 'protozoal')"> Protozoal</label>
          <label class="filter-option"><input type="checkbox" value="helminthic" onchange="toggleFilter('group', 'helminthic')"> Helminthic</label>
          <label class="filter-option"><input type="checkbox" value="rickettsial" onchange="toggleFilter('group', 'rickettsial')"> Rickettsial</label>
          <label class="filter-option"><input type="checkbox" value="prion" onchange="toggleFilter('group', 'prion')"> Prion</label>
        </div>
      </div>
      
      <div class="filter-section">
        <div class="filter-title">Transmission Route</div>
        <div class="filter-options">
          <label class="filter-option"><input type="checkbox" value="food-borne" onchange="toggleFilter('transmission', 'food-borne')"> Food-borne</label>
          <label class="filter-option"><input type="checkbox" value="water-borne" onchange="toggleFilter('transmission', 'water-borne')"> Water-borne</label>
          <label class="filter-option"><input type="checkbox" value="milk-borne" onchange="toggleFilter('transmission', 'milk-borne')"> Milk-borne</label>
          <label class="filter-option"><input type="checkbox" value="meat-borne" onchange="toggleFilter('transmission', 'meat-borne')"> Meat-borne</label>
          <label class="filter-option"><input type="checkbox" value="airborne" onchange="toggleFilter('transmission', 'airborne')"> Airborne</label>
          <label class="filter-option"><input type="checkbox" value="vector-borne" onchange="toggleFilter('transmission', 'vector-borne')"> Vector-borne</label>
          <label class="filter-option"><input type="checkbox" value="direct-contact" onchange="toggleFilter('transmission', 'direct-contact')"> Direct contact</label>
          <label class="filter-option"><input type="checkbox" value="fomite" onchange="toggleFilter('transmission', 'fomite')"> Fomite</label>
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-title">Animal Hosts</div>
        <div class="filter-options">
          <label class="filter-option"><input type="checkbox" value="cattle" onchange="toggleFilter('host', 'cattle')"> Cattle</label>
          <label class="filter-option"><input type="checkbox" value="buffalo" onchange="toggleFilter('host', 'buffalo')"> Buffalo</label>
          <label class="filter-option"><input type="checkbox" value="sheep" onchange="toggleFilter('host', 'sheep')"> Sheep</label>
          <label class="filter-option"><input type="checkbox" value="goat" onchange="toggleFilter('host', 'goat')"> Goat</label>
          <label class="filter-option"><input type="checkbox" value="pig" onchange="toggleFilter('host', 'pig')"> Pig</label>
          <label class="filter-option"><input type="checkbox" value="horse" onchange="toggleFilter('host', 'horse')"> Horse</label>
          <label class="filter-option"><input type="checkbox" value="dog" onchange="toggleFilter('host', 'dog')"> Dog</label>
          <label class="filter-option"><input type="checkbox" value="cat" onchange="toggleFilter('host', 'cat')"> Cat</label>
          <label class="filter-option"><input type="checkbox" value="poultry" onchange="toggleFilter('host', 'poultry')"> Poultry</label>
          <label class="filter-option"><input type="checkbox" value="wildlife" onchange="toggleFilter('host', 'wildlife')"> Wildlife</label>
        </div>
      </div>

      <div class="filter-section">
        <div class="filter-title">Special Tags</div>
        <div class="filter-options">
          <label class="filter-option"><input type="checkbox" value="notifiable" onchange="toggleFilter('tag', 'notifiable')"> OIE Notifiable</label>
          <label class="filter-option"><input type="checkbox" value="emerging" onchange="toggleFilter('tag', 'emerging')"> Emerging Disease</label>
          <label class="filter-option"><input type="checkbox" value="neglected" onchange="toggleFilter('tag', 'neglected')"> Neglected Zoonosis</label>
          <label class="filter-option"><input type="checkbox" value="occupational" onchange="toggleFilter('tag', 'occupational')"> Occupational Hazard</label>
        </div>
      </div>
      
      <button class="collapse-btn" style="width:100%;margin-top:16px;" onclick="clearAllFilters()">Clear Filters</button>
    </aside>

    <!-- Directory Content -->
    <div class="directory-content-area">
      <!-- Alphabetical Picker -->
      <div class="alphabet-picker" id="dir-alphabet-picker"></div>
      
      <div class="search-bar" style="margin-bottom:20px;">
        <span class="search-icon" aria-hidden="true"><svg class="icon icon-search" aria-hidden="true"><use href="assets/icons/ze-icons.svg#search"></use></svg></span>
        <input type="text" id="dir-search-input" placeholder="Search by name, synonym, hosts, vector..." oninput="updateDirectorySearch(this.value)">
        <button class="collapse-btn" style="padding:4px 8px;margin-right:4px;" onclick="document.getElementById('dir-search-input').value='';updateDirectorySearch('')">Clear</button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:12px;color:var(--muted);font-family:'DM Mono',monospace;">
        <div id="dir-results-count">0 DISEASES FOUND</div>
        <button class="collapse-btn" id="mobile-filter-btn" style="display:inline-block;" onclick="toggleMobileFilters(true)">Filters</button>
      </div>

      <div class="disease-list" id="dir-disease-list"></div>
    </div>
  </div>
</div>
`.trim();

const dirStartIdx = html.indexOf('<div class="view" id="view-directory">');
const dirEndIdx = html.indexOf('<div class="view" id="view-about">');
if (dirStartIdx !== -1 && dirEndIdx !== -1) {
  html = html.substring(0, dirStartIdx) + directoryHtml + '\n\n' + html.substring(dirEndIdx);
} else if (html.includes('<div class="view" id="view-about">')) {
  html = html.replace('<div class="view" id="view-about">', `${directoryHtml}\n\n<div class="view" id="view-about">`);
} else {
  html = html.replace('<!-- ABOUT VIEW -->', `${directoryHtml}\n\n<!-- ABOUT VIEW -->`);
}
console.log("Inserted Directory & Filters view HTML.");

// 3. Add drawers, modals and overlays just before </body>
const drawersHtml = `
<!-- Drawers, Modals & Floating Buttons -->
<div id="drawer-overlay" class="drawer-overlay" onclick="closeAllDrawers()"></div>

<div id="toc-drawer" class="toc-drawer">
  <div class="toc-drawer-header">
    <div class="toc-drawer-title">Table of Contents</div>
    <button class="toc-drawer-close" onclick="closeAllDrawers()">&times;</button>
  </div>
  <div class="toc-drawer-content" id="toc-drawer-list"></div>
</div>

<div id="glossary-tooltip" class="glossary-tooltip">
  <div class="gt-header">
    <div class="gt-term" id="gt-term-title">Term</div>
    <button class="gt-close" onclick="closeGlossaryTooltip()">&times;</button>
  </div>
  <div class="gt-def" id="gt-term-def">Definition goes here...</div>
  <a href="#" class="gt-def-link" onclick="openGlossaryTab(event)">Browse full glossary →</a>
</div>

<button id="back-to-top-btn" class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Back to top">
  &uarr;
</button>

<button id="mobile-toc-btn" class="mobile-toc-fab" onclick="toggleMobileTOC(true)" aria-label="Table of Contents">
  <svg class="icon" aria-hidden="true" style="width:20px;height:20px;"><use href="assets/icons/ze-icons.svg#book"></use></svg>
</button>
`.trim();

const drawersStartIdx = html.indexOf('<!-- Drawers, Modals & Floating Buttons -->');
const drawersEndIdx = html.indexOf('<div id="search-overlay"');
if (drawersStartIdx !== -1 && drawersEndIdx !== -1 && drawersStartIdx < drawersEndIdx) {
  html = html.substring(0, drawersStartIdx) + html.substring(drawersEndIdx);
}

if (html.includes('<div id="search-overlay"')) {
  html = html.replace('<div id="search-overlay"', `${drawersHtml}\n<div id="search-overlay"`);
} else {
  html += `\n${drawersHtml}`;
}
console.log("Inserted Drawers and overlays HTML.");

// 4. Add the searchable Glossary section inside the About view
const glossaryHtml = `
<div class="about-card" id="about-glossary-section" style="grid-column: 1 / -1; margin-top:16px;">
  <h3>Veterinary Zoonoses Glossary</h3>
  <p style="margin-bottom:16px;">Search key epidemiological, public health, and microbiological terms used in this reference manual.</p>
  <div class="search-bar" style="margin-bottom:16px;">
    <span class="search-icon" aria-hidden="true"><svg class="icon icon-search" aria-hidden="true"><use href="assets/icons/ze-icons.svg#search"></use></svg></span>
    <input type="text" id="glossary-search-input" placeholder="Search glossary terms..." oninput="searchGlossary(this.value)">
  </div>
  <div class="quick-facts" id="glossary-results-list" style="max-height:400px;overflow-y:auto;gap:12px;border: 1px solid var(--border);padding:12px;border-radius:10px;"></div>
</div>
`.trim();

const glossaryStartIdx = html.indexOf('<div class="about-card" id="about-glossary-section"');
const glossaryEndIdx = html.indexOf('</div>\n</div>\n\n</main>');
if (glossaryStartIdx !== -1 && glossaryEndIdx !== -1 && glossaryStartIdx < glossaryEndIdx) {
  html = html.substring(0, glossaryStartIdx) + html.substring(glossaryEndIdx);
}

html = html.replace('</div>\n</div>\n\n</main>', `${glossaryHtml}\n</div>\n</div>\n\n</main>`);
console.log("Inserted Searchable Glossary inside About view HTML.");

// 5. Partition the script tags properly
const scriptStartIdx = html.indexOf('<script>');
const colorMapStartIdx = html.indexOf('const colorMap = {');
const diseasesStartIdx = html.indexOf('const diseases = {');

if (scriptStartIdx === -1 || colorMapStartIdx === -1 || diseasesStartIdx === -1) {
    console.error("Could not locate script tags or diseases database!");
    process.exit(1);
}

// Extracted HTML layout *before* the first script tag
const finalHtmlLayout = html.substring(0, scriptStartIdx);

// Extract the colorMap and diseases database block
const databaseEndMarker = '};';
const diseasesEndIdx = html.indexOf(databaseEndMarker, diseasesStartIdx) + databaseEndMarker.length;
const databaseContent = html.substring(colorMapStartIdx, diseasesEndIdx);

// Load Phase 3 core JS logic
const phase3Logic = fs.readFileSync('scratch/zoonotix_logic.js', 'utf8');

// Load Phase 4 database extensions and SVG engines
const phase4Database = fs.readFileSync('scratch/zoonotix_content_enrichment.js', 'utf8');
const phase4SvgEngine = fs.readFileSync('scratch/zoonotix_svg_engine.js', 'utf8');

// Upgraded display and nav functions - Escaped single backslash template literals
const upgradedJsLogic = `
// ==========================================
// UPGRADED NAVIGATION & DISPLAY CONTROLS
// ==========================================

function showView(viewId) {
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
  closeAllDrawers();
  closeGlossaryTooltip();
  
  // Initialize Directory content
  if (viewId === 'directory') {
    renderAlphabetPicker();
    renderDirectory();
  }
  
  window.scrollTo({ top: 0 });
}

function showCategory(cat) {
  currentCategory = cat;
  const label = cat.charAt(0).toUpperCase() + cat.slice(1);
  document.getElementById('list-cat-label').textContent = label;
  document.getElementById('list-title').textContent = label + ' Zoonoses';
  document.getElementById('list-title').style.color = colorMap[cat];
  
  const container = document.getElementById('disease-list-container');
  container.style.setProperty('--cc', colorMap[cat]);
  
  container.innerHTML = diseases[cat].map((d, i) => \`
    <div class="disease-card" style="--cc:\${colorMap[cat]}" onclick="showDisease('\${cat}', '\${d.id}')">
      <div class="disease-num">0\${i+1}</div>
      <div class="disease-info">
        <div class="disease-name">\${d.name}</div>
        <div class="disease-aka">\${d.aka}</div>
      </div>
      <div class="disease-badge" style="color:\${colorMap[cat]};border-color:\${colorMap[cat]}33;background:\${colorMap[cat]}11">\${d.badge}</div>
    </div>
  \`).join('');
  
  showView('list');
}

function goBackToList() {
  if (currentCategory) {
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
  const ext = (window.diseaseEnrichment && window.diseaseEnrichment[d.id]) || {
    definition: "Detailed scientific reference profile under active compilation by VPH departments.",
    etiology: d.agent,
    taxonomy: "Microbial taxonomy under evaluation.",
    vetImportance: "Primary veterinary herd health constraint.",
    publicHealthImportance: "Zoonotic spillover risk to farm handlers and consumers.",
    riskGroups: "Veterinarians, farmers, livestock handlers, raw meat/milk consumers.",
    envSurvival: "Sensitive to standard thermal pasteurization and common chemical disinfection.",
    pathogenesis: {
      entry: d.vector || "Mucosal/dermal penetration",
      spread: d.spread || "Viremia and systemic dissemination",
      organs: ["Systemic organs"],
      lesions: "Acute inflammatory changes"
    },
    clinicalSigns: {
      animals: { acute: d.badge, chronic: "Chronic fatigue, emaciation", subclinical: "Asymptomatic viral/bacterial shedders" },
      humans: { acute: d.humanRisk, chronic: "Chronic systemic fatigue and neurological complications", subclinical: "Seroconversion without active signs" }
    },
    lesionsDesc: {
      gross: "Acute congestion and hemorrhages of visceral parenchymal tissues.",
      histopathology: "Microvascular thrombi and mononuclear cellular infiltration.",
      hallmark: "Widespread tissue congestion and bleeding."
    },
    diagnosis: {
      history: "Exposure to tick/rodent vector nesting grounds, raw dairy products, or sick animal herds.",
      signs: d.badge,
      samples: "Serum, whole blood, CSF, or tissue biopsies.",
      tests: [
        { test: "PCR Assay", type: "Molecular", description: "Detects pathogen nucleic acids with high specificity." },
        { test: "ELISA", type: "Serology", description: "Measures diagnostic rise in antibody titers." }
      ],
      differentials: [
        { disease: "Related regional zoonoses", keyDiff: "Diagnostic distinction relies on lab cultures or molecular PCR verification.", mistake: "High overlap of acute febrile and signs." }
      ]
    },
    treatment: [
      { drug: "Supportive / Fluid Therapy", purpose: "Fluid balance, antipyretics", mechanism: "N/A", speciesNotes: "Veterinary supervision required.", limitations: "Palliative only.", resistance: "N/A" }
    ],
    control: {
      farm: "Standard biosecurity protocols.",
      animal: "Isolation of sick herds, vaccination if licensed.",
      human: "Hand hygiene, PPE, and pasteurization.",
      government: "State reporting mandates."
    },
    publicHealth: { economic: "Productivity losses and carcass condemnation.", foodSafety: "Pasteurize milk, cook meat thoroughly.", wildlifeInterface: "Sylvatic reservoirs." },
    onehealth: { human: "Zoonotic exposure.", animal: "Domestic host cycles.", environment: "Fomite/soil interfaces." },
    references: ["WOAH Terrestrial Manual", "WHO Guidelines", "Merck Veterinary Manual"]
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
  
  document.getElementById('ency-content').innerHTML = \`
    <div class="ency-header">
      <div class="logo-row" style="justify-content:space-between;margin-bottom:12px;align-items:center;">
        <button class="back-btn" id="ency-back-btn" onclick="goBackToList()" style="margin-bottom:0;padding:6px 12px;">
          <svg class="icon icon-arrow-left" aria-hidden="true" focusable="false" style="width:14px;height:14px;"><use href="assets/icons/ze-icons.svg#arrow-left"></use></svg>
          Back
        </button>
        <button class="bookmark-btn" id="bookmark-toggle-btn" onclick="toggleBookmark('\${d.id}')">
          ☆ Bookmark
        </button>
      </div>
      
      <div class="breadcrumb" style="margin-top:12px;">Zoonotic Diseases → \${catLabel} → <span style="color:\${cc}">\${d.name}</span></div>
      
      <div class="ency-title" style="color:\${cc};margin-top:8px;">\${d.name}</div>
      <div class="ency-subtitle">\${d.aka}</div>
      
      <div class="ency-meta">
        <div class="meta-pill">
          <div>
            <div class="meta-label">Causative Agent</div>
            <div class="meta-value" style="font-size:13px; font-style:italic;">\text{ }\text{ }\${d.agent}</div>
          </div>
        </div>
        <div class="meta-pill">
          <div>
            <div class="meta-label">Incubation</div>
            <div class="meta-value">\${d.incubation}</div>
          </div>
        </div>
        <div class="meta-pill">
          <div>
            <div class="meta-label">CFR</div>
            <div class="meta-value">\${d.mortality}</div>
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
            <div class="meta-value" style="font-size:12px">\${d.geography}</div>
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
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-book" aria-hidden="true"><use href="assets/icons/ze-icons.svg#book"></use></svg></span>
              <span class="section-name">Disease Overview & Etiology</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p style="font-weight:500; font-size:14px; margin-bottom:12px; color:var(--accent);">\${ext.definition}</p>
            <div class="kv-list">
              <div class="kv-item">
                <div class="kv-key">Etiological Agent</div>
                <div class="kv-val" style="font-style:italic;">\${ext.etiology}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Taxonomy</div>
                <div class="kv-val">\${ext.taxonomy}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Veterinary Importance</div>
                <div class="kv-val">\${ext.vetImportance}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Public Health Importance</div>
                <div class="kv-val">\${ext.publicHealthImportance}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 2. Epidemiology -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-microbe" aria-hidden="true"><use href="assets/icons/ze-icons.svg#microbe"></use></svg></span>
              <span class="section-name">Epidemiology & Distribution</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="kv-list">
              <div class="kv-item">
                <div class="kv-key">Source of Infection</div>
                <div class="kv-val">\${ext.epidemiology ? ext.epidemiology.source : 'Contaminated water, feed, and discharges.'}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Susceptible Hosts</div>
                <div class="kv-val">\${Array.isArray(d.hosts) ? d.hosts.join(', ') : (d.hosts || 'Multiple species')}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Occupational Risks</div>
                <div class="kv-val">\${ext.riskGroups}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Environmental Survival</div>
                <div class="kv-val">\${ext.envSurvival}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Indian Relevance</div>
                <div class="kv-val">\${d.indianContext}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Global Relevance</div>
                <div class="kv-val">\${ext.epidemiology ? ext.epidemiology.globalRelevance : 'Worldwide distribution.'}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3. Transmission & Pathogenesis -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-transfer" aria-hidden="true"><use href="assets/icons/ze-icons.svg#transfer"></use></svg></span>
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
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-hospital" aria-hidden="true"><use href="assets/icons/ze-icons.svg#hospital"></use></svg></span>
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
                  <div class="clinical-card-text">\${ext.clinicalSigns.animals.acute}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Chronic</div>
                  <div class="clinical-card-text">\${ext.clinicalSigns.animals.chronic}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Subclinical</div>
                  <div class="clinical-card-text">\${ext.clinicalSigns.animals.subclinical}</div>
                </div>
              </div>
            </div>

            <div class="clinical-panel" id="panel-humans">
              <div class="clinical-cards-grid">
                <div class="clinical-card">
                  <div class="clinical-card-type">Acute</div>
                  <div class="clinical-card-text">\${ext.clinicalSigns.humans.acute}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Chronic</div>
                  <div class="clinical-card-text">\${ext.clinicalSigns.humans.chronic}</div>
                </div>
                <div class="clinical-card">
                  <div class="clinical-card-type">Subclinical</div>
                  <div class="clinical-card-text">\text{ }\${ext.clinicalSigns.humans.subclinical}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Lesions -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-shield" aria-hidden="true"><use href="assets/icons/ze-icons.svg#shield"></use></svg></span>
              <span class="section-name">Pathology & Lesions</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="pathology-grid">
              <div class="pathology-card">
                <div class="pathology-title">👁️ Gross Lesions</div>
                <p style="font-size:13px; line-height:1.6;">\${ext.lesionsDesc.gross}</p>
              </div>
              <div class="pathology-card">
                <div class="pathology-title">🔬 Histopathology</div>
                <p style="font-size:13px; line-height:1.6;">\${ext.lesionsDesc.histopathology}</p>
              </div>
            </div>
            <div class="pathology-card" style="margin-top:16px; border-left:4px solid var(--accent2);">
              <div class="pathology-title" style="color:var(--accent2); font-size:11px; font-weight:bold; font-family:'DM Mono';">DIAGNOSTIC HALLMARK LESION</div>
              <p style="font-size:13px; font-weight:500;">\${ext.lesionsDesc.hallmark}</p>
            </div>
          </div>
        </div>

        <!-- 6. Diagnosis -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-india-flag" aria-hidden="true"><use href="assets/icons/ze-icons.svg#india-flag"></use></svg></span>
              <span class="section-name">Diagnostics & Lab Workflows</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p><strong>Diagnostic Pipeline:</strong> Standard timeline flow from suspicion to lab confirmation.</p>
            <div id="diagnostic-workflow-container" class="visual-container" style="margin-bottom:24px;"></div>
            
            <p><strong>Laboratory diagnostic techniques comparison:</strong></p>
            <table class="diagnostic-comparison">
              <thead>
                <tr>
                  <th>Diagnostic Test</th>
                  <th>Method Type</th>
                  <th>Description & Diagnostic Use</th>
                </tr>
              </thead>
              <tbody>
                \${ext.diagnosis.tests.map(t => \`
                  <tr>
                    <td style="font-weight:bold;">\${t.test}</td>
                    <td style="font-family:'DM Mono'; font-size:11px; color:var(--accent);">\text{ }\${t.type}</td>
                    <td>\${t.description}</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>

            <p style="margin-top:24px;"><strong>Differential Diagnosis:</strong> Differentiating similar clinical presentations.</p>
            <div class="diff-grid">
              \${ext.diagnosis.differentials.map(diff => \`
                <div class="diff-card">
                  <div class="diff-header">
                    <span class="diff-name">\${diff.disease}</span>
                    <span style="font-size:11px; font-family:'DM Mono'; color:var(--accent2);">Differential Match</span>
                  </div>
                  <div class="diff-point"><strong>Key differentiating factor:</strong> \${diff.keyDiff}</div>
                  <div class="diff-point" style="font-style:italic; color:var(--muted);"><strong>Common mistake:</strong> \${diff.mistake}</div>
                </div>
              \`).join('')}
            </div>
          </div>
        </div>

        <!-- 7. Treatment -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-bolt" aria-hidden="true"><use href="assets/icons/ze-icons.svg#bolt"></use></svg></span>
              <span class="section-name">Treatment & Supportive Care</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="treatment-grid">
              \${ext.treatment.map(tr => \`
                <div class="treatment-card">
                  <div class="treatment-drug">\${tr.drug}</div>
                  <div class="kv-list" style="margin-top:8px;">
                    <div class="kv-item"><div class="kv-key">Purpose</div><div class="kv-val">\${tr.purpose}</div></div>
                    <div class="kv-item"><div class="kv-key">Mechanism</div><div class="kv-val">\${tr.mechanism}</div></div>
                    <div class="kv-item"><div class="kv-key">Species Considerations</div><div class="kv-val" style="color:var(--accent);">\${tr.speciesNotes}</div></div>
                    <div class="kv-item"><div class="kv-key">Limitations</div><div class="kv-val">\text{ }\${tr.limitations}</div></div>
                    \text{ }\${tr.resistance && tr.resistance !== 'N/A' ? \`<div class="kv-item"><div class="kv-key" style="color:#e84444;">Resistance</div><div class="kv-val" style="color:#e84444;">\${tr.resistance}</div></div>\` : ''}
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        </div>

        <!-- 8. Control & Prevention -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-shield" aria-hidden="true"><use href="assets/icons/ze-icons.svg#shield"></use></svg></span>
              <span class="section-name">Prevention, Biosecurity & Control</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <p>Epidemiological management levels to prevent transmission and contain outbreaks.</p>
            <div class="control-grid">
              <div class="control-card">
                <div class="control-level">Farm Level</div>
                <div style="font-size:12px; line-height:1.5;">\${ext.control.farm}</div>
              </div>
              <div class="control-card">
                <div class="control-level">Animal Level</div>
                <div style="font-size:12px; line-height:1.5;">\${ext.control.animal}</div>
              </div>
              <div class="control-card">
                <div class="control-level">Human Level</div>
                <div style="font-size:12px; line-height:1.5;">\${ext.control.human}</div>
              </div>
              <div class="control-card">
                <div class="control-level">Government Level</div>
                <div style="font-size:12px; line-height:1.5;">\${ext.control.government}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 9. Public Health Significance -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-book" aria-hidden="true"><use href="assets/icons/ze-icons.svg#book"></use></svg></span>
              <span class="section-name">Public Health & Economics</span>
            </div>
            <span class="section-toggle-icon">▼</span>
          </div>
          <div class="section-body">
            <div class="kv-list">
              <div class="kv-item">
                <div class="kv-key">Economic Impact</div>
                <div class="kv-val">\${ext.publicHealth.economic}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Food & Milk Safety</div>
                <div class="kv-val">\${ext.publicHealth.foodSafety}</div>
              </div>
              <div class="kv-item">
                <div class="kv-key">Wildlife Interface</div>
                <div class="kv-val">\${ext.publicHealth.wildlifeInterface}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 10. One Health Integration -->
        <div class="ency-section">
          <div class="section-header" onclick="toggleSectionCollapse(this)">
            <div class="section-header-left">
              <span class="section-icon" aria-hidden="true"><svg class="icon icon-transfer" aria-hidden="true"><use href="assets/icons/ze-icons.svg#transfer"></use></svg></span>
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
              <div class="revision-value" style="font-style:italic;">\${(ext.etiology || d.agent || 'Unknown agent').split(';')[0]}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Reservoir Host</div>
              <div class="revision-value">\${d.reservoir}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Main Transmission</div>
              <div class="revision-value">\${d.vector} / \${(d.spread || d.vector || 'Direct contact').split(' ').slice(0, 3).join(' ')}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Hallmark Signs</div>
              <div class="revision-value">\${d.badge}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Best Lab Test</div>
              <div class="revision-value">\${ext.diagnosis.tests && ext.diagnosis.tests.length > 0 ? ext.diagnosis.tests[0].test : 'PCR'}</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Major Lesion</div>
              <div class="revision-value">\${(ext.lesionsDesc && ext.lesionsDesc.hallmark ? ext.lesionsDesc.hallmark.split(' ').slice(0, 5).join(' ') : 'Tissue changes noted')}...</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">Primary Prevention</div>
              <div class="revision-value">\${(ext.control && ext.control.farm ? ext.control.farm.split(' ').slice(0, 4).join(' ') : 'Biosecurity measures')}...</div>
            </div>
            <div class="revision-item">
              <div class="revision-label">One Health Takeaway</div>
              <div class="revision-value">\${(ext.onehealth.human || ext.onehealth.humanConnection || 'Zoonotic exposure.').split(' ').slice(0, 4).join(' ')}...</div>
            </div>
          </div>
        </div>

        <!-- 12. References Section -->
        <div class="ency-section" style="border-top:1px solid var(--border); margin-top:24px; padding-top:16px;">
          <div class="section-name" style="font-size:13px; color:var(--muted); font-family:'DM Mono', monospace;">Authoritative Veterinary References</div>
          <ul class="references-list">
            \${ext.references.map(ref => \`
              <li>\${ref}</li>
            \`).join('')}
          </ul>
        </div>
        
        \${paginationHTML}
        \${relatedHTML}
        
      </div>
      
      <div class="ency-sidebar">
        <div class="sidebar-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true" focusable="false"><use href="assets/icons/ze-icons.svg#shield"></use></svg> Risk Classification</div>
          <div class="danger-badge \text{ }\${d.danger}">\${dangerLabel}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:8px">Based on human case fatality rate and pandemic potential</div>
        </div>
        
        <div class="sidebar-card" id="toc-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true"><use href="assets/icons/ze-icons.svg#book"></use></svg> On this page</div>
          <nav id="toc-list" aria-label="On this page"></nav>
        </div>
        
        <div class="sidebar-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true" focusable="false"><use href="assets/icons/ze-icons.svg#bolt"></use></svg> Quick Facts</div>
          <div class="quick-facts">
            \${Object.entries(d.quickfacts).map(([k, v]) => \`
              <div class="qf-row">
                <span class="qf-label">\text{ }\${k}</span>
                <span class="qf-val">\${v}</span>
              </div>
            \`).join('')}
          </div>
        </div>
        
        <div class="sidebar-card">
          <div class="sidebar-card-title"><svg class="icon" aria-hidden="true" focusable="false"><use href="assets/icons/ze-icons.svg#tag"></use></svg> Keywords</div>
          <div class="tag-cloud">
            \${d.keywords.map(k => \`<span class="tag">\${k}</span>\`).join('')}
          </div>
        </div>
      </div>
    </div>
  \`;
  
  // Wire dynamic toggle click handler
  document.getElementById('bookmark-toggle-btn').onclick = () => toggleBookmark(d.id);
  
  updateBookmarkButtonUI(d.id);
  showView('ency');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
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
  const words = (allText.trim().split(/\\s+/).filter(Boolean)).length;
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
  
  if (!query.trim()) {
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
  
  results.innerHTML = matches.map(({ cat, d }, i) => \`
    <div class="disease-card" style="--cc:\${colorMap[cat]}" onclick="showDisease('\${cat}', '\${d.id}')">
      <div class="disease-num">0\text{ }\${i+1}</div>
      <div class="disease-info">
        <div class="disease-name">\${d.name}</div>
        <div class="disease-aka">\${d.aka}</div>
      </div>
      <div class="disease-badge" style="color:\${colorMap[cat]};border-color:\${colorMap[cat]}33;background:\${colorMap[cat]}11">\text{ }\${cat.charAt(0).toUpperCase()+cat.slice(1)}</div>
    </div>
  \`).join('');
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
    list.innerHTML = \`<div style="color:var(--muted);font-size:13px;padding:12px 0;text-align:center;">No glossary definitions match "\${query}"</div>\`;
    return;
  }
  
  list.innerHTML = filtered.map(item => \`
    <div class="qf-row" style="flex-direction:column;align-items:flex-start;padding:10px 0;gap:4px;">
      <span class="qf-val" style="color:var(--accent);font-size:14px;">\${item.term}</span>
      <span class="qf-label" style="color:var(--text);font-size:13px;text-align:left;line-height:1.5;">\text{ }\text{ }\${item.def}</span>
    </div>
  \`).join('');
}

// Setup search bar in Category view
document.addEventListener('DOMContentLoaded', () => {
  const homeView = document.getElementById('view-home');
  if (homeView) {
    const searchBar = document.createElement('div');
    searchBar.innerHTML = \`
      <div class="search-bar" style="margin-bottom:32px">
        <span class="search-icon" aria-hidden="true"><svg class="icon icon-search" aria-hidden="true"><use href="assets/icons/ze-icons.svg#search"></use></svg></span>
        <input type="text" placeholder="Search all diseases, agents, keywords..." oninput="searchDiseases(this.value)" style="flex:1;background:transparent;border:none;outline:none;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;">
      </div>
    \`;
    homeView.insertBefore(searchBar, document.querySelector('.categories-grid'));
  }
  
  // Render alphabetical picker initially
  renderAlphabetPicker();
  
  // Render glossary initially
  searchGlossary('');
});
`;

// Combine into single clean script structure
const fullPart3 = `
<script>
${databaseContent}

${phase4Database}

${phase4SvgEngine}

${phase3Logic}

${upgradedJsLogic}

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

</script>
</html>
`;

// Write out the final index.html file
const finalFileContent = `${finalHtmlLayout}\n${fullPart3}`.trim();
fs.writeFileSync('index.html', finalFileContent);
console.log("Successfully built and compiled index.html for Phase 4!");
