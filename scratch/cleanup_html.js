const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the `<style>...</style>` block
// Find the exact style block and replace it
const styleRegex = /<style>[\s\S]*?<\/style>/;
if (styleRegex.test(html)) {
    html = html.replace(styleRegex, '');
    console.log("Successfully removed inline <style> block.");
} else {
    console.log("Warning: <style> block not found in HTML!");
}

// 2. Remove triple backticks around the search wrapper / category grid
// We saw:
// Line 544: ```
// Line 590: ```
// Let's replace the first two triple backticks with empty strings or clean them.
// Let's search for literal backticks in the file and remove them.
const backtickCountBefore = (html.match(/```/g) || []).length;
console.log(`Found ${backtickCountBefore} triple backticks in index.html.`);

// Replace all occurrences of ``` in the HTML (which are visual residue from markdown paste)
html = html.replace(/```/g, '');
const backtickCountAfter = (html.match(/```/g) || []).length;
console.log(`After replacement: ${backtickCountAfter} triple backticks left.`);

fs.writeFileSync('index.html', html);
console.log("Cleaned index.html successfully written!");
