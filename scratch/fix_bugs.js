/**
 * ZOONOTIX PHASE 5 - COMPREHENSIVE BUG FIX SCRIPT
 * Fixes all identified bugs:
 * 1. Markdown ``` fence wrapping the category grid HTML in view-home
 * 2. Any duplicate nav injections from the build script
 * 3. Validates overall structure
 */
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let fixCount = 0;

// ================================================
// FIX 1: Remove markdown ``` fences from view-home
// The home view has a ``` before and after the search-wrapper/cat-grid
// The actual HTML should be directly inside view-home without fences
// ================================================
const before = html;

// Pattern: the ``` appears at lines 545 and 591
// We remove it specifically from inside the view-home div
const viewHomeStart = html.indexOf('<div class="view active" id="view-home">');
const viewListStart = html.indexOf('<!-- DISEASE LIST VIEW -->');

if (viewHomeStart !== -1 && viewListStart !== -1) {
  let homeBlock = html.substring(viewHomeStart, viewListStart);
  
  if (homeBlock.includes('```')) {
    // Remove all backtick fences from the home view block
    const cleanedHomeBlock = homeBlock.replace(/```\r?\n/g, '');
    html = html.substring(0, viewHomeStart) + cleanedHomeBlock + html.substring(viewListStart);
    fixCount++;
    console.log('FIX 1 APPLIED: Removed markdown fences from view-home');
  } else {
    console.log('FIX 1 SKIPPED: No markdown fences in view-home');
  }
} else {
  console.log('WARNING: Could not find view-home or view-list boundaries');
}

// ================================================
// FIX 2: Check for duplicate <nav> elements
// The build script adds a nav, but there's already a nav. Check for duplicates.
// ================================================
const navMatches = html.match(/<nav>/g);
const navCount = navMatches ? navMatches.length : 0;
console.log(`FIX 2 CHECK: Found ${navCount} <nav> elements`);

if (navCount > 1) {
  // Remove the FIRST nav (old one) and keep the injected one
  const firstNavStart = html.indexOf('<nav>');
  const firstNavEnd = html.indexOf('</nav>') + 6;
  
  // Check if there's a nav tab inside it
  const firstNavContent = html.substring(firstNavStart, firstNavEnd);
  if (firstNavContent.includes('nav-tab')) {
    // Keep the one that has the new tab structure with all 3 tabs
    // The old nav might have 2 buttons, the new one has 3
    // Find and count tabs in first nav
    const firstTabCount = (firstNavContent.match(/nav-tab/g) || []).length;
    console.log(`  First nav has ${firstTabCount} tabs`);
    
    if (firstTabCount < 3) {
      // Remove old nav, keep new nav (which comes later)
      html = html.substring(0, firstNavStart) + html.substring(firstNavEnd);
      fixCount++;
      console.log('FIX 2 APPLIED: Removed duplicate old nav element');
    }
  }
}

// ================================================
// FIX 3: Ensure diseases obj categories match what the UI expects
// The JS uses diseases.bacterial, diseases.viral, etc.
// but the enrichment data uses diseases.prion NOT diseases.prion
// Make sure we don't have a mismatch where 'creutzfeldt' appears
// in viral instead of a separate category
// ================================================
const diseasesMatch = html.match(/const diseases = (\{[\s\S]*?\n\};)/);
if (diseasesMatch) {
  console.log('FIX 3 CHECK: diseases object found, checking category keys');
  try {
    // Extract category keys
    const diseasesObjStr = diseasesMatch[0];
    const keys = [];
    const keyMatches = diseasesObjStr.matchAll(/^\s{2}([a-z_]+):\s*\[/gm);
    for (const m of keyMatches) {
      keys.push(m[1]);
    }
    console.log('  Disease categories:', keys.join(', '));
  } catch(e) {
    console.log('  Could not parse disease keys:', e.message);
  }
}

// ================================================
// FIX 4: Verify the view-home cat-card onclick handlers point to correct function
// ================================================
const catCardMatches = html.match(/onclick="showCategory\('[a-z]+'\)"/g);
console.log(`FIX 4 CHECK: cat-card onclick handlers found: ${catCardMatches ? catCardMatches.length : 0}`);
if (catCardMatches) {
  catCardMatches.forEach(m => console.log('  -', m));
}

// ================================================
// FIX 5: Ensure view CSS is correct (only view-home should have active class)
// ================================================
const activeViews = html.match(/class="view active"/g) || html.match(/class="view[^"]*active[^"]*"/g);
console.log(`FIX 5 CHECK: Active views: ${activeViews ? activeViews.length : 0}`);

// ================================================
// WRITE FIXED FILE
// ================================================
if (fixCount > 0) {
  fs.writeFileSync('index.html', html);
  console.log(`\n✅ Applied ${fixCount} fix(es). index.html updated.`);
} else {
  console.log('\nℹ️ No file changes needed.');
}

// ================================================
// FINAL VALIDATION
// ================================================
console.log('\n--- FINAL VALIDATION ---');
const finalHtml = fs.readFileSync('index.html', 'utf8');
const hasFence = finalHtml.includes('```');
console.log('Markdown fences remaining:', hasFence ? '❌ YES (PROBLEM!)' : '✅ NONE');
const homeIsActive = finalHtml.includes('class="view active" id="view-home"');
console.log('Home view is active:', homeIsActive ? '✅ YES' : '❌ NO');
const catGridPresent = finalHtml.includes('id="cat-grid"');
console.log('Category grid present:', catGridPresent ? '✅ YES' : '❌ NO');
const encyCalled = finalHtml.includes("showView('ency')");
console.log('Encyclopedia view transition exists:', encyCalled ? '✅ YES' : '❌ NO');
