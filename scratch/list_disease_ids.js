const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Use VM or eval-like parsing to inspect the diseases object, or simple regex
// Let's find the script block and extract the diseases object
const scriptMatch = html.match(/const diseases = (\{[\s\S]*?\});/);
if (!scriptMatch) {
    console.error("Could not find diseases object in index.html!");
    process.exit(1);
}

// Evaluate the diseases object safely
const diseasesStr = scriptMatch[1];
const diseases = eval(`(${diseasesStr})`);

Object.keys(diseases).forEach(cat => {
    console.log(`\n--- Category: ${cat} ---`);
    diseases[cat].forEach(d => {
        console.log(`- ${d.id}: ${d.name} (${d.aka ? d.aka.substring(0, 30) : ''})`);
    });
});
