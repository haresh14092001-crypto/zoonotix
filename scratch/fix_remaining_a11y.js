const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Helper to add role and tabindex to specific elements
function makeAccessible(htmlStr, regex, keydownActionTemplate) {
    return htmlStr.replace(regex, (match, p1) => {
        if (match.includes('role="button"')) return match;
        // p1 is the onclick action
        const keyAction = keydownActionTemplate.replace('{action}', p1);
        return match.replace(`onclick="${p1}"`, `role="button" tabindex="0" onclick="${p1}" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); ${keyAction} }"`);
    });
}

// 1. disease-card
html = makeAccessible(html, /<div class="disease-card"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");

// 2. related-card
html = makeAccessible(html, /<div class="related-card"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");

// 3. pagination-btn
html = makeAccessible(html, /<div class="pagination-btn[^"]*"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");

// 4. section-header
html = makeAccessible(html, /<div class="section-header"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");

// 5. a tags without href (nav-btn)
html = html.replace(/<a class="nav-btn"[^>]*onclick="([^"]+)"[^>]*>/g, (match, p1) => {
    if (match.includes('href')) return match;
    return match.replace(`onclick="${p1}"`, `href="javascript:void(0)" onclick="${p1}"`);
});

fs.writeFileSync('index.html', html);
console.log('index.html a11y patched');

// build_index_html.js needs the same patches for its templates
let buildHtml = fs.readFileSync('scratch/build_index_html.js', 'utf8');
buildHtml = makeAccessible(buildHtml, /<div class="disease-card"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");
buildHtml = makeAccessible(buildHtml, /<div class="related-card"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");
buildHtml = makeAccessible(buildHtml, /<div class="pagination-btn[^"]*"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");
buildHtml = makeAccessible(buildHtml, /<div class="section-header"[^>]*onclick="([^"]+)"[^>]*>/g, "{action}");
fs.writeFileSync('scratch/build_index_html.js', buildHtml);
console.log('scratch/build_index_html.js a11y patched');
