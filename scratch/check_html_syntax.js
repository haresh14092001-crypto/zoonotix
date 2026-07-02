const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find all script blocks
const re = /<script>([\s\S]*?)<\/script>/g;
let match;
let i = 1;
while ((match = re.exec(html)) !== null) {
    const js = match[1];
    console.log(`Evaluating script block ${i}...`);
    try {
        // Evaluate JavaScript block using Node VM module to get precise syntax error details
        const { VM } = require('vm');
        const vm = require('vm');
        const script = new vm.Script(js, { filename: `script-${i}.js` });
        console.log(`Script block ${i} is syntactically valid!`);
    } catch (err) {
        console.error(`Syntax error in script block ${i}:`);
        console.error(err.stack);
    }
    i++;
}
