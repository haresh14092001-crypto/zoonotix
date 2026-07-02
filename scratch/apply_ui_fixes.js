const fs = require('fs');

function applyFixes(filename) {
    let text = fs.readFileSync(filename, 'utf8');

    // 1. Fix scroll bug
    text = text.replace("link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });", "// link.scrollIntoView removed to prevent window jumping");

    // 2. Add responsive CSS
    const mobileCSS = `
    /* PHASE 6.5 MOBILE FIXES */
    @media (max-width: 768px) {
        header { padding: 20px 20px 0 !important; }
        main { padding: 20px !important; }
        body { overflow-x: hidden; width: 100%; }
        .ency-title { font-size: 32px !important; }
        .section-body p { word-wrap: break-word; overflow-wrap: break-word; line-height: 1.85 !important; }
        .categories-grid { grid-template-columns: 1fr !important; }
        .disease-hero { height: 160px !important; border-radius: 12px !important; }
        .kv-item { flex-direction: column; gap: 4px; }
        .kv-key { min-width: auto; }
        .list-card { flex-direction: column; align-items: flex-start; gap: 12px; }
        .list-card-icon { align-self: flex-start; }
    }
    .section-body { word-wrap: break-word; overflow-wrap: break-word; }
    `;
    
    if (!text.includes('/* PHASE 6.5 MOBILE FIXES */')) {
        text = text.replace('</style>', mobileCSS + '\n</style>');
    }

    // 3. Inject Hero Image Banner
    const heroHTML = `<div class="disease-hero" style="width: 100%; height: 240px; background-image: url('assets/images/\${cat}_bg.png'); background-size: cover; background-position: center; border-radius: 16px; margin-bottom: 24px; border: 1px solid var(--border); box-shadow: 0 8px 32px rgba(0,0,0,0.5); position: relative;"><div style="position: absolute; inset: 0; background: linear-gradient(to top, var(--bg), transparent); border-radius: 16px;"></div></div>`;
    
    if (!text.includes('class="disease-hero"')) {
        // Find <h1 class="ency-title"> and inject before it
        text = text.replace('<h1 class="ency-title">', heroHTML + '\n        <h1 class="ency-title">');
    }

    fs.writeFileSync(filename, text);
    console.log(`Applied UI fixes to ${filename}`);
}

applyFixes('index.html');
applyFixes('scratch/build_index_html.js');
