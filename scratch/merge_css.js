const fs = require('fs');

// Read index.html style tag
const htmlContent = fs.readFileSync('index.html', 'utf8');
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
const htmlCss = styleMatch ? styleMatch[1].trim() : '';

// Read external CSS
const extCss = fs.readFileSync('assets/css/ze-ui.css', 'utf8').trim();

// We will concatenate the original layout CSS (from index.html) and add any rules that are only in the external CSS, 
// or let's create a combined CSS file.
// Let's analyze if we can just append the new styles in ze-ui.css to the layout styles in index.html,
// since CSS rules cascade and later rules override/extend earlier ones.
// However, to keep it clean, let's structure the combined CSS file beautifully:
// 1. Theme Variables & Base Styles
// 2. Layout, Header & Navigation
// 3. Category Views
// 4. Disease List & Directory Views
// 5. Encyclopedia Page Views
// 6. About & Syllabus Views
// 7. Search Overlay & UI Elements
// 8. Focus-visible Accessibility Rules
// 9. Playful / Clinical Theme Overrides
// 10. Responsive Media Queries

// Let's build a clean combined CSS content:
const combinedCss = `/* ==========================================================================
   ZOONOTIX DESIGN SYSTEM & STYLE SHEET
   Combined and Cleaned for Phase 3
   ========================================================================== */

${htmlCss}

/* ==========================================================================
   PHASE 1 & 2 MODERNIZATION & THEMING STYLES
   ========================================================================== */

/* Theme variables overrides */
body[data-theme="playful"] {
  --bg: #0b0f19;
  --surface: #121824;
  --surface2: #1b2336;
  --border: #223e66;
  --accent: #00e5bc;
  --accent2: #ff7c4d;
  --accent3: #8a66d6;
  --text: #f0f5ff;
  --muted: #809ebd;
}

body[data-theme="clinical"] {
  --bg: #07090e;
  --surface: #0e131b;
  --surface2: #151c27;
  --border: #1a2f4c;
  --accent: #00b3ff;
  --accent2: #f05252;
  --accent3: #31c48d;
  --text: #e1e8f5;
  --muted: #627d98;
  --viral-contrast: #ff4d4d;
}

/* Accessibility Focus Outlines */
button:focus-visible,
a:focus-visible,
input:focus-visible,
.nav-tab:focus-visible,
.back-btn:focus-visible,
.disease-card:focus-visible,
.suggestion-item:focus-visible,
.toc-link:focus-visible,
.floating-search-btn:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Dot indicators */
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}
.dot-high { background-color: #e84444; }
.dot-medium { background-color: var(--bacterial); }
.dot-low { background-color: var(--fungal); }

/* Reading Progress */
.reading-progress {
  position: fixed;
  left: 0;
  top: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--accent3));
  width: 0%;
  z-index: 100;
  transition: width 0.1s linear;
}

/* Search Overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(11, 15, 26, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}
.search-overlay[hidden] {
  display: none;
}
.search-panel {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}
.close-search {
  align-self: flex-start;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: 8px;
  margin-bottom: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
}
.close-search:hover {
  color: var(--text);
  border-color: var(--accent);
}
.search-suggestions {
  list-style: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
.suggestion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.15s;
}
.suggestion-item:last-child {
  border-bottom: none;
}
.suggestion-item:hover,
.suggestion-item[aria-selected="true"] {
  background: var(--surface2);
}
.suggestion-meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--muted);
}
.search-highlight {
  background: rgba(0, 212, 170, 0.2);
  color: var(--accent);
  border-radius: 2px;
  padding: 0 2px;
  font-weight: 600;
}

/* Floating Search Button */
.floating-search-btn {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent3));
  border: none;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  z-index: 90;
  transition: transform 0.2s;
}
.floating-search-btn:hover {
  transform: scale(1.05);
}

/* TOC Links */
.toc-link {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: var(--muted);
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.15s, padding-left 0.15s;
  border-left: 2px solid transparent;
  padding-left: 8px;
}
.toc-link:hover,
.toc-link.active {
  color: var(--accent);
  border-left-color: var(--accent);
  padding-left: 12px;
}
`;

fs.writeFileSync('assets/css/ze-ui.css', combinedCss.trim());
console.log("CSS file merged and written successfully to assets/css/ze-ui.css!");
