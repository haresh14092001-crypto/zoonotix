const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

let issues = [];

// Check for backtick fences inside HTML (not inside script tags)
lines.forEach((line, idx) => {
  if (line.trim() === '```') {
    issues.push(`Line ${idx+1}: Markdown fence (\`\`\`) found in HTML body`);
  }
});

// Check for the search/cat-grid HTML being inside a code fence
const viewHomeStart = html.indexOf('id="view-home"');
const viewHomeEnd = html.indexOf('id="view-list"');
const viewHomeContent = html.substring(viewHomeStart, viewHomeEnd);
const hasFence = viewHomeContent.includes('```');
console.log('view-home has markdown fence:', hasFence);

// Count the <div class="view"> elements
const viewCount = (html.match(/class="view/g) || []).length;
console.log('Number of .view elements found:', viewCount);

// Check for view-ency
const hasEncyView = html.includes('id="view-ency"');
console.log('Has view-ency:', hasEncyView);

// Check for critical function definitions
const hasDiseases = html.includes('const diseases = {');
const hasShowDisease = html.includes('function showDisease(');
const hasShowView = html.includes('function showView(');
const hasShowCategory = html.includes('function showCategory(');
console.log('has diseases:', hasDiseases);
console.log('has showDisease:', hasShowDisease);
console.log('has showView:', hasShowView);
console.log('has showCategory:', hasShowCategory);

// Check for \text{ } artifacts in HTML
const hasTexArtifact = html.includes('\\text{ }');
console.log('Has LaTeX \\text{ } artifact:', hasTexArtifact);

// Check script order: enrichment must come before svgEngine and logic
const enrichmentSrc = html.indexOf('window.diseaseEnrichment = diseaseEnrichment;');
const svgEngineSrc = html.indexOf('window.svgEngine = svgEngine;');
const showDiseaseSrc = html.indexOf('function showDisease(');
console.log('\nScript order:');
console.log('diseaseEnrichment defined at pos:', enrichmentSrc);
console.log('svgEngine defined at pos:', svgEngineSrc);
console.log('showDisease defined at pos:', showDiseaseSrc);

// Check for duplicate function definitions
const showDiseaseCount = (html.match(/function showDisease\(/g) || []).length;
console.log('\nshowDisease definition count:', showDiseaseCount);
const showViewCount = (html.match(/function showView\(/g) || []).length;
console.log('showView definition count:', showViewCount);

// List all issues
if (issues.length > 0) {
  console.log('\n--- HTML ISSUES ---');
  issues.forEach(i => console.log(i));
} else {
  console.log('\nNo backtick fence issues.');
}
