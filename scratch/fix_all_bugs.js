/**
 * ZOONOTIX COMPREHENSIVE FIX v2
 * Applies all required fixes to index.html:
 * 1. Removes markdown fence from view-home (already done, verify)
 * 2. Injects missing drawer/overlay/FAB HTML elements
 * 3. Fixes the glossary section in about view
 * 4. Ensures </body></html> properly closes the file
 */
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let fixCount = 0;

// ======================================================
// FIX 1: Remove any remaining markdown fences
// ======================================================
if (html.includes('```')) {
  const homeStart = html.indexOf('<div class="view active" id="view-home">');
  const homeEnd = html.indexOf('<!-- DISEASE LIST VIEW -->');
  if (homeStart !== -1 && homeEnd !== -1) {
    let homeBlock = html.substring(homeStart, homeEnd);
    if (homeBlock.includes('```')) {
      const cleaned = homeBlock.replace(/```\r?\n/g, '');
      html = html.substring(0, homeStart) + cleaned + html.substring(homeEnd);
      fixCount++;
      console.log('FIX 1: Removed markdown fences from view-home');
    }
  }
} else {
  console.log('FIX 1: No markdown fences - SKIP');
}

// ======================================================
// FIX 2: Inject missing drawer HTML elements
// ======================================================
const drawerElementsToInject = `
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
  <a href="#" class="gt-def-link" onclick="openGlossaryTab(event)">Browse full glossary &rarr;</a>
</div>

<button id="back-to-top-btn" class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Back to top">
  &uarr;
</button>

<button id="mobile-toc-btn" class="mobile-toc-fab" onclick="toggleMobileTOC(true)" aria-label="Table of Contents">
  <svg class="icon" aria-hidden="true" style="width:20px;height:20px;"><use href="assets/icons/ze-icons.svg#book"></use></svg>
</button>
`;

const hasTocDrawer = html.includes('id="toc-drawer"');
const hasDrawerOverlay = html.includes('id="drawer-overlay"');

if (!hasTocDrawer && !hasDrawerOverlay) {
  // Inject before </script></html>
  html = html.replace('</script>\n</html>', `</script>\n${drawerElementsToInject}\n</body>\n</html>`);
  fixCount++;
  console.log('FIX 2: Injected drawer HTML elements before closing tags');
} else {
  console.log('FIX 2: Drawer elements already present - SKIP');
}

// ======================================================
// FIX 3: Inject glossary section in about view if missing
// ======================================================
const hasGlossaryResults = html.includes('id="glossary-results-list"');
if (!hasGlossaryResults) {
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
`;
  // Find the closing of the about view content grid
  const aboutViewEnd = html.indexOf('</div>\n</div>\n\n</main>');
  if (aboutViewEnd !== -1) {
    html = html.substring(0, aboutViewEnd) + glossaryHtml + html.substring(aboutViewEnd);
    fixCount++;
    console.log('FIX 3: Injected glossary section into about view');
  } else {
    console.log('FIX 3 WARN: Could not find about view end marker to inject glossary');
  }
} else {
  console.log('FIX 3: Glossary section already present - SKIP');
}

// ======================================================
// FIX 4: Add missing CSS for drawer elements (if not already present)
// ======================================================
const hasDrawerCss = html.includes('.toc-drawer') || fs.existsSync('assets/css/ze-ui.css') && fs.readFileSync('assets/css/ze-ui.css', 'utf8').includes('.toc-drawer');
if (!hasDrawerCss) {
  const drawerCss = `
/* ==========================================
   DRAWERS & OVERLAYS CSS
   ========================================== */
.drawer-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6);
  z-index: 400; opacity: 0; pointer-events: none;
  transition: opacity 0.3s;
}
.drawer-overlay.active { opacity: 1; pointer-events: all; }

.toc-drawer {
  position: fixed; top: 0; right: -320px; width: 300px; height: 100vh;
  background: var(--surface); border-left: 1px solid var(--border);
  z-index: 500; transition: right 0.3s ease; overflow-y: auto;
  padding: 20px;
}
.toc-drawer.open { right: 0; }
.toc-drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.toc-drawer-title { font-weight: 700; font-size: 16px; }
.toc-drawer-close { background: none; border: none; color: var(--muted); font-size: 20px; cursor: pointer; }
.toc-drawer-content a { display: block; padding: 8px 0; color: var(--muted); text-decoration: none; font-size: 13px; border-bottom: 1px solid var(--border); }
.toc-drawer-content a:hover { color: var(--accent); }
.toc-drawer-content a.active { color: var(--accent); font-weight: 600; }

.glossary-tooltip {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  background: var(--surface2); border: 1px solid var(--accent);
  border-radius: 12px; padding: 16px; max-width: 360px; width: 90%;
  z-index: 600; display: none; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.glossary-tooltip.show { display: block; }
.gt-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.gt-term { font-weight: 700; color: var(--accent); font-size: 15px; }
.gt-close { background: none; border: none; color: var(--muted); font-size: 18px; cursor: pointer; }
.gt-def { font-size: 13px; line-height: 1.6; color: var(--text); margin-bottom: 10px; }
.gt-def-link { font-size: 12px; color: var(--accent2); text-decoration: none; }

.back-to-top {
  position: fixed; bottom: 24px; right: 24px;
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--accent); color: var(--bg); border: none;
  font-size: 18px; cursor: pointer; z-index: 300;
  opacity: 0; pointer-events: none; transition: opacity 0.3s;
  display: flex; align-items: center; justify-content: center;
}
.back-to-top.visible { opacity: 1; pointer-events: all; }

.mobile-toc-fab {
  position: fixed; bottom: 80px; right: 24px;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--surface2); border: 1px solid var(--border);
  color: var(--text); cursor: pointer; z-index: 300;
  display: none; align-items: center; justify-content: center;
}
@media (max-width: 768px) { .mobile-toc-fab { display: flex; } }
`;
  // Inject CSS before </style>
  html = html.replace('</style>', drawerCss + '\n</style>');
  fixCount++;
  console.log('FIX 4: Injected drawer CSS into <style> block');
} else {
  console.log('FIX 4: Drawer CSS already present - SKIP');
}

// ======================================================
// FIX 5: Add closeAllDrawers, toggleMobileTOC, closeGlossaryTooltip, openGlossaryTab functions if missing
// ======================================================
const hasCloseAllDrawers = html.includes('function closeAllDrawers(');
if (!hasCloseAllDrawers) {
  const drawerFunctions = `
// ==========================================
// DRAWER & OVERLAY MANAGEMENT
// ==========================================
function closeAllDrawers() {
  const overlay = document.getElementById('drawer-overlay');
  const tocDrawer = document.getElementById('toc-drawer');
  if (overlay) overlay.classList.remove('active');
  if (tocDrawer) tocDrawer.classList.remove('open');
}

function toggleMobileTOC(open) {
  const overlay = document.getElementById('drawer-overlay');
  const tocDrawer = document.getElementById('toc-drawer');
  if (open) {
    // Sync toc-drawer-list with toc-list content
    const tocList = document.getElementById('toc-list');
    const tocDrawerList = document.getElementById('toc-drawer-list');
    if (tocList && tocDrawerList) tocDrawerList.innerHTML = tocList.innerHTML;
    if (overlay) overlay.classList.add('active');
    if (tocDrawer) tocDrawer.classList.add('open');
  } else {
    closeAllDrawers();
  }
}

function closeGlossaryTooltip() {
  const tooltip = document.getElementById('glossary-tooltip');
  if (tooltip) tooltip.classList.remove('show');
}

function openGlossaryTab(e) {
  if (e) e.preventDefault();
  showView('about');
  setTimeout(() => {
    const el = document.getElementById('about-glossary-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Back to top visibility
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top-btn');
  if (btn) {
    if (window.scrollY > 300) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }
});
`;
  html = html.replace('</script>', drawerFunctions + '\n</script>');
  fixCount++;
  console.log('FIX 5: Injected drawer management functions');
} else {
  console.log('FIX 5: Drawer functions already present - SKIP');
}

// ======================================================
// WRITE & REPORT
// ======================================================
fs.writeFileSync('index.html', html);
console.log(`\n✅ Applied ${fixCount} fix(es). index.html updated.`);

// Final validation
console.log('\n--- FINAL VALIDATION ---');
const finalHtml = fs.readFileSync('index.html', 'utf8');
const checks = {
  'No markdown fences': !finalHtml.includes('```'),
  'view-home is active': finalHtml.includes('class="view active" id="view-home"'),
  'Category grid present': finalHtml.includes('id="cat-grid"'),
  'TOC Drawer present': finalHtml.includes('id="toc-drawer"'),
  'Drawer overlay present': finalHtml.includes('id="drawer-overlay"'),
  'Glossary tooltip present': finalHtml.includes('id="glossary-tooltip"'),
  'Back-to-top button present': finalHtml.includes('id="back-to-top-btn"'),
  'Mobile TOC FAB present': finalHtml.includes('id="mobile-toc-btn"'),
  'Glossary results list present': finalHtml.includes('id="glossary-results-list"'),
  'showDisease function present': finalHtml.includes('function showDisease('),
  'diseaseEnrichment present': finalHtml.includes('const diseaseEnrichment ='),
  'svgEngine present': finalHtml.includes('const svgEngine ='),
  'closeAllDrawers present': finalHtml.includes('function closeAllDrawers('),
};
let allOk = true;
for (const [label, result] of Object.entries(checks)) {
  console.log(`  ${result ? '✅' : '❌'} ${label}`);
  if (!result) allOk = false;
}
console.log(allOk ? '\n🎉 ALL CHECKS PASSED!' : '\n⚠️ Some checks failed, review above.');
