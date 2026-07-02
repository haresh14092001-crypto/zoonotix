const fs = require('fs');

const stylesToAdd = `
/* ==========================================================================
   PHASE 3 UX & INTERACTION STYLES
   ========================================================================== */

/* Alphabetical picker */
.alphabet-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
  padding: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
}
.alpha-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--muted);
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.alpha-btn:hover, .alpha-btn.active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

/* Directory Layout */
.directory-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 900px) {
  .directory-container {
    grid-template-columns: 1fr;
  }
}
.directory-sidebar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  position: sticky;
  top: 90px;
}
.filter-section {
  margin-bottom: 20px;
}
.filter-section:last-child {
  margin-bottom: 0;
}
.filter-title {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
}
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text);
  cursor: pointer;
  user-select: none;
}
.filter-option input[type="checkbox"] {
  accent-color: var(--accent);
  cursor: pointer;
}

/* Directory tabs */
.directory-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}
.dir-tab-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
}
.dir-tab-btn:hover, .dir-tab-btn.active {
  background: rgba(0, 212, 170, 0.1);
  color: var(--accent);
  border-color: var(--accent);
}

/* Collapsible sections */
.ency-section {
  transition: all 0.25s ease-out;
}
.section-header {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-toggle-icon {
  font-size: 12px;
  color: var(--muted);
  transition: transform 0.2s;
  font-family: 'DM Mono', monospace;
}
.ency-section.collapsed .section-toggle-icon {
  transform: rotate(-90deg);
}
.ency-section.collapsed .section-body {
  display: none;
}
.collapse-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.collapse-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}
.collapse-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Glossary triggers & tooltips */
.glossary-trigger {
  border-bottom: 1px dashed var(--accent);
  color: var(--text);
  cursor: pointer;
  position: relative;
  padding-bottom: 1px;
  transition: background-color 0.15s;
}
.glossary-trigger:hover {
  background-color: rgba(0, 212, 170, 0.12);
}
.glossary-tooltip {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(150%);
  width: 90%;
  max-width: 450px;
  background: var(--surface2);
  border: 1px solid var(--accent);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  z-index: 2000;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.glossary-tooltip.active {
  transform: translateX(-50%) translateY(0);
}
.gt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}
.gt-term {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--accent);
}
.gt-close {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 20px;
  cursor: pointer;
}
.gt-def {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--text);
}
.gt-def-link {
  display: inline-block;
  margin-top: 10px;
  color: var(--accent);
  font-size: 12px;
  font-family: 'DM Mono', monospace;
  text-decoration: none;
}
.gt-def-link:hover {
  text-decoration: underline;
}

/* Related Content */
.related-section {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.related-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.related-card:hover {
  border-color: var(--cc, var(--accent));
  transform: translateY(-2px);
  background: var(--surface2);
}
.related-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: var(--cc, var(--accent));
  text-transform: uppercase;
  margin-bottom: 6px;
}
.related-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}
.related-aka {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Navigation Utilities */
.back-to-top {
  position: fixed;
  right: 24px;
  bottom: 96px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 80;
  transition: all 0.2s;
  opacity: 0;
  pointer-events: none;
}
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}
.back-to-top:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.mobile-toc-fab {
  position: fixed;
  left: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--accent);
  display: none;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  cursor: pointer;
  z-index: 90;
}
@media (max-width: 900px) {
  .mobile-toc-fab {
    display: flex;
  }
}

/* Mobile TOC Drawer */
.toc-drawer {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 60vh;
  background: var(--surface);
  border-top: 2px solid var(--border);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1500;
  padding: 24px;
  box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}
.toc-drawer.active {
  transform: translateY(0);
}
.toc-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.toc-drawer-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 20px;
}
.toc-drawer-close {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 24px;
  cursor: pointer;
}
.toc-drawer-content {
  flex: 1;
  overflow-y: auto;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1400;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
  backdrop-filter: blur(4px);
}
.drawer-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

/* Header Bookmark button */
.bookmark-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}
.bookmark-btn:hover, .bookmark-btn.active {
  border-color: var(--accent);
  color: var(--accent);
}

/* Resume reading banner */
.resume-banner {
  position: fixed;
  bottom: 24px;
  right: 90px;
  background: var(--surface2);
  border: 1px solid var(--accent);
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  z-index: 85;
  font-size: 12px;
  animation: slideInUp 0.3s ease;
}
.resume-btn {
  background: var(--accent);
  border: none;
  color: var(--bg);
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.resume-close {
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
}

@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Pagination navigation */
.pagination-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}
.pagination-btn {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  max-width: 48%;
  text-align: left;
}
.pagination-btn.next {
  text-align: right;
  align-items: flex-end;
}
.pagination-btn:hover {
  border-color: var(--accent);
  background: var(--surface2);
}
.pag-dir {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
}
.pag-name {
  font-weight: 600;
  font-size: 14px;
  margin-top: 4px;
}
`;

fs.appendFileSync('assets/css/ze-ui.css', stylesToAdd);
console.log("Successfully appended Phase 3 styles to ze-ui.css!");
