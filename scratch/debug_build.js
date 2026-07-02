const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const scriptStartIdx = html.indexOf('<script>');
const diseasesStartIdx = html.indexOf('const diseases = {');

console.log(`scriptStartIdx: ${scriptStartIdx}`);
console.log(`diseasesStartIdx: ${diseasesStartIdx}`);

const sample = html.substring(scriptStartIdx, scriptStartIdx + 300);
console.log("\n--- Sample at scriptStartIdx ---");
console.log(sample);

const dbEnd = html.indexOf('};', diseasesStartIdx);
console.log(`dbEnd index: ${dbEnd}`);
const sampleEnd = html.substring(dbEnd - 50, dbEnd + 50);
console.log("\n--- Sample at dbEnd ---");
console.log(sampleEnd);
