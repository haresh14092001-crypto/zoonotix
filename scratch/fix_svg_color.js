const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let fixCount = 0;

// Fix: update each drawXxx(d, ext) signature to include colorOverride
html = html.replace(/drawTransmissionCycle\(d, ext\) \{/g, () => { fixCount++; return 'drawTransmissionCycle(d, ext, colorOverride) {'; });
html = html.replace(/drawPathogenesisFlow\(d, ext\) \{/g, () => { fixCount++; return 'drawPathogenesisFlow(d, ext, colorOverride) {'; });
html = html.replace(/drawOneHealthTriangle\(d, ext\) \{/g, () => { fixCount++; return 'drawOneHealthTriangle(d, ext, colorOverride) {'; });
html = html.replace(/drawDiagnosticWorkflow\(d, ext\) \{/g, () => { fixCount++; return 'drawDiagnosticWorkflow(d, ext, colorOverride) {'; });

// Fix: replace the colorMap reference with a safe fallback
html = html.replace(
  /const accentColor = colorMap\[d\.group\] \|\| 'var\(--accent\)';/g,
  () => {
    fixCount++;
    return "const accentColor = colorOverride || (typeof colorMap !== 'undefined' && colorMap[d.group]) || '#00d4aa';";
  }
);

fs.writeFileSync('index.html', html);
console.log('Applied fixes:', fixCount);

// Verify
const final = fs.readFileSync('index.html', 'utf8');
console.log('drawTransmissionCycle has colorOverride:', final.includes('drawTransmissionCycle(d, ext, colorOverride)'));
console.log('accentColor fixed:', final.includes("colorOverride || (typeof colorMap !== 'undefined'"));
