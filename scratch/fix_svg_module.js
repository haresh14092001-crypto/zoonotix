const fs = require('fs');

// Fix the standalone SVG engine file to:
// 1. Accept colorOverride parameter in each function
// 2. Use safe colorMap fallback
let code = fs.readFileSync('scratch/zoonotix_svg_engine.js', 'utf8');

code = code.replace(/drawTransmissionCycle\(d, ext\) \{/g, 'drawTransmissionCycle(d, ext, colorOverride) {');
code = code.replace(/drawPathogenesisFlow\(d, ext\) \{/g, 'drawPathogenesisFlow(d, ext, colorOverride) {');
code = code.replace(/drawOneHealthTriangle\(d, ext\) \{/g, 'drawOneHealthTriangle(d, ext, colorOverride) {');
code = code.replace(/drawDiagnosticWorkflow\(d, ext\) \{/g, 'drawDiagnosticWorkflow(d, ext, colorOverride) {');

// Fix colorMap reference - it only appears once in drawTransmissionCycle
code = code.replace(
  /const accentColor = colorMap\[d\.group\] \|\| 'var\(--accent\)';/g,
  "const accentColor = colorOverride || (typeof colorMap !== 'undefined' && colorMap[d.group]) || '#00d4aa';"
);

fs.writeFileSync('scratch/zoonotix_svg_engine.js', code);
console.log('Fixed SVG engine module file');
console.log('Signature updated:', code.includes('drawTransmissionCycle(d, ext, colorOverride)'));
console.log('colorMap safe:', code.includes("colorOverride || (typeof colorMap !== 'undefined'"));
