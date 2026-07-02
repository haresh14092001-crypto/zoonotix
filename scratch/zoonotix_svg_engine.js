// ==========================================
// ZOONOTIX PHASE 4 — DYNAMIC SVG DRAWING ENGINE
// Programmatic medical vector illustrations for visual learning
// ==========================================

const svgEngine = {
  // 1. Draw Transmission Cycle
  drawTransmissionCycle(d, ext, colorOverride) {
    const cycle = ext.transmissionCycle || {
      reservoir: ext.pathogenesis?.entry || "Reservoir",
      vector: d.vector || "Direct / Indirect Contact",
      animal: d.hosts[0] || "Susceptible Animal",
      human: "Human infection",
      path: d.spread || "Transmission path"
    };

    const hasVector = d.vector && d.vector.toLowerCase() !== 'none';
    const accentColor = colorOverride || (typeof colorMap !== 'undefined' && colorMap[d.group]) || '#00d4aa';

    return `
<svg class="visual-svg" viewBox="0 0 800 280" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${accentColor}" />
    </marker>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  
  <!-- Reservoir Node -->
  <g class="svg-node" transform="translate(40, 90)">
    <rect x="0" y="0" width="160" height="90" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <rect x="0" y="0" width="160" height="26" rx="10" fill="${accentColor}22" />
    <text x="80" y="18" text-anchor="middle" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--text)">RESERVOIR</text>
    <text x="80" y="52" text-anchor="middle" font-family="'DM Sans'" font-size="12" font-weight="600" fill="var(--text)">${cycle.reservoir}</text>
    <text x="80" y="70" text-anchor="middle" font-family="'DM Sans'" font-size="9" fill="var(--muted)">Environmental source</text>
  </g>

  <!-- Vector / Mode Node -->
  <g class="svg-node" transform="translate(240, 90)">
    <rect x="0" y="0" width="160" height="90" rx="10" fill="var(--surface)" stroke="${accentColor}" stroke-dasharray="4 2" stroke-width="1.5" />
    <rect x="0" y="0" width="160" height="26" rx="10" fill="${accentColor}11" />
    <text x="80" y="18" text-anchor="middle" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="${accentColor}">${hasVector ? 'VECTOR' : 'TRANSMISSION ROUTE'}</text>
    <text x="80" y="50" text-anchor="middle" font-family="'DM Sans'" font-size="11" font-weight="600" fill="var(--text)">
      <tspan x="80" dy="0">${hasVector ? cycle.vector : (cycle.path ? cycle.path.split(' ').slice(0, 2).join(' ') : 'Direct Contact')}</tspan>
      <tspan x="80" dy="16" font-size="9" fill="var(--muted)">${hasVector ? 'Arthropod vector' : 'Transmission vehicle'}</tspan>
    </text>
  </g>

  <!-- Animal Host Node -->
  <g class="svg-node" transform="translate(440, 90)">
    <rect x="0" y="0" width="160" height="90" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <rect x="0" y="0" width="160" height="26" rx="10" fill="${accentColor}22" />
    <text x="80" y="18" text-anchor="middle" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--text)">ANIMAL HOST</text>
    <text x="80" y="52" text-anchor="middle" font-family="'DM Sans'" font-size="12" font-weight="600" fill="var(--text)">${cycle.animal}</text>
    <text x="80" y="70" text-anchor="middle" font-family="'DM Sans'" font-size="9" fill="var(--muted)">Amplifier / Sentinel</text>
  </g>

  <!-- Human Node -->
  <g class="svg-node" transform="translate(640, 90)">
    <rect x="0" y="0" width="160" height="90" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2" style="filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" />
    <rect x="0" y="0" width="160" height="26" rx="10" fill="var(--accent)22" />
    <text x="80" y="18" text-anchor="middle" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--accent)">HUMAN SPILLOVER</text>
    <text x="80" y="52" text-anchor="middle" font-family="'DM Sans'" font-size="12" font-weight="bold" fill="var(--text)">Accidental Host</text>
    <text x="80" y="70" text-anchor="middle" font-family="'DM Sans'" font-size="9" fill="var(--muted)">Zoonotic target</text>
  </g>

  <!-- Connectors -->
  <!-- Reservoir to Vector -->
  <path d="M 200 135 L 232 135" fill="none" stroke="${accentColor}" stroke-width="2" marker-end="url(#arrow)" />
  
  <!-- Vector to Animal -->
  <path d="M 400 135 L 432 135" fill="none" stroke="${accentColor}" stroke-width="2" marker-end="url(#arrow)" />
  
  <!-- Animal to Human -->
  <path d="M 600 135 L 632 135" fill="none" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Direct Reservoir to Human (Spillover) -->
  <path d="M 120 180 C 120 230, 720 230, 720 188" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 3" marker-end="url(#arrow)" />
  <text x="420" y="240" text-anchor="middle" font-family="'DM Mono'" font-size="9" fill="var(--accent)">Direct Spillover (e.g. food/inhalation)</text>

  <!-- Return Cycle / Pasture Persistence -->
  <path d="M 520 90 C 520 50, 120 50, 120 82" fill="none" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="3 3" marker-end="url(#arrow)" />
  <text x="320" y="40" text-anchor="middle" font-family="'DM Mono'" font-size="8" fill="var(--muted)">Excreta / Contamination loop</text>
</svg>
    `;
  },

  // 2. Draw Pathogenesis Flow
  drawPathogenesisFlow(d, ext, colorOverride) {
    const p = ext.pathogenesis || {
      entry: "Portal of entry",
      spread: "Viremia / Lymphatic spread",
      organs: ["Target Organs"],
      lesions: "Primary pathology"
    };

    const accentColor = colorOverride || (typeof colorMap !== 'undefined' && colorMap[d.group]) || '#00d4aa';
    const targetOrgansStr = Array.isArray(p.organs) ? p.organs.join(' & ') : p.organs;

    return `
<svg class="visual-svg" viewBox="0 0 600 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="flow-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text)" />
    </marker>
  </defs>

  <!-- Step 1: Entry -->
  <g class="svg-node" transform="translate(180, 15)">
    <rect x="0" y="0" width="240" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <circle cx="20" cy="25" r="10" fill="${accentColor}33" />
    <text x="20" y="28" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--text)">1</text>
    <text x="45" y="22" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--muted)">PORTAL OF ENTRY</text>
    <text x="45" y="38" font-family="'DM Sans'" font-size="11" font-weight="600" fill="var(--text)">${p.entry}</text>
  </g>

  <!-- Step 2: Systemic Dissemination -->
  <g class="svg-node" transform="translate(180, 95)">
    <rect x="0" y="0" width="240" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <circle cx="20" cy="25" r="10" fill="${accentColor}33" />
    <text x="20" y="28" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--text)">2</text>
    <text x="45" y="22" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--muted)">DISSEMINATION PATH</text>
    <text x="45" y="38" font-family="'DM Sans'" font-size="11" font-weight="600" fill="var(--text)">${p.spread}</text>
  </g>

  <!-- Step 3: Localization in Target Organs -->
  <g class="svg-node" transform="translate(180, 175)">
    <rect x="0" y="0" width="240" height="50" rx="8" fill="var(--surface)" stroke="${accentColor}" stroke-width="2" />
    <circle cx="20" cy="25" r="10" fill="${accentColor}" />
    <text x="20" y="28" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--background)">3</text>
    <text x="45" y="22" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="${accentColor}">TARGET ORGANS</text>
    <text x="45" y="38" font-family="'DM Sans'" font-size="12" font-weight="bold" fill="var(--text)">${targetOrgansStr}</text>
  </g>

  <!-- Step 4: Lesions & Cellular Injury -->
  <g class="svg-node" transform="translate(180, 255)">
    <rect x="0" y="0" width="240" height="50" rx="8" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <circle cx="20" cy="25" r="10" fill="${accentColor}33" />
    <text x="20" y="28" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--text)">4</text>
    <text x="45" y="22" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--muted)">PATHOLOGICAL CHANGES</text>
    <text x="45" y="38" font-family="'DM Sans'" font-size="11" font-weight="600" fill="var(--text)">${p.lesions ? (p.lesions.split(',').slice(0, 2).join(',') || 'Tissue damage') : 'Tissue damage'}</text>
  </g>

  <!-- Step 5: Clinical Manifestation -->
  <g class="svg-node" transform="translate(180, 315)">
    <rect x="0" y="0" width="240" height="50" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2" />
    <circle cx="20" cy="25" r="10" fill="var(--accent)33" />
    <text x="20" y="28" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--text)">5</text>
    <text x="45" y="22" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--accent)">CLINICAL SIGN / OUTCOME</text>
    <text x="45" y="38" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--text)">${d.badge} (CFR: ${d.mortality})</text>
  </g>

  <!-- Connector Lines -->
  <line x1="300" y1="65" x2="300" y2="90" stroke="var(--muted)" stroke-width="2" marker-end="url(#flow-arrow)" />
  <line x1="300" y1="145" x2="300" y2="170" stroke="var(--muted)" stroke-width="2" marker-end="url(#flow-arrow)" />
  <line x1="300" y1="225" x2="300" y2="250" stroke="var(--muted)" stroke-width="2" marker-end="url(#flow-arrow)" />
  <line x1="300" y1="305" x2="300" y2="310" stroke="var(--muted)" stroke-width="2" marker-end="url(#flow-arrow)" />
</svg>
    `;
  },

  // 3. Draw One Health Triangle Intersection
  drawOneHealthTriangle(d, ext, colorOverride) {
    const oh = ext.onehealth || {};
    const humanConnection = oh.human || "Direct contact zoonotic spillover";
    const animalConnection = oh.animal || "Intraspecies transmission cycles";
    const envConnection = oh.environment || "Fomite and environmental persistence";

    const accentColor = colorOverride || (typeof colorMap !== 'undefined' && colorMap[d.group]) || '#00d4aa';

    return `
<svg class="visual-svg" viewBox="0 0 600 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <!-- Humans Circle -->
  <g class="svg-circle-group">
    <circle cx="210" cy="180" r="120" fill="rgba(232, 68, 68, 0.06)" stroke="var(--accent)" stroke-width="1.5" />
    <text x="140" y="110" font-family="'DM Sans'" font-size="13" font-weight="bold" fill="var(--accent)">HUMAN INTERFACE</text>
    <text x="145" y="140" font-family="'DM Sans'" font-size="10" fill="var(--text)">
      <tspan x="120" dy="0">${humanConnection.split(' ').slice(0,3).join(' ')}</tspan>
      <tspan x="120" dy="14">${humanConnection.split(' ').slice(3,6).join(' ') || ''}</tspan>
    </text>
  </g>

  <!-- Animals Circle -->
  <g class="svg-circle-group">
    <circle cx="390" cy="180" r="120" fill="${accentColor}0A" stroke="${accentColor}" stroke-width="1.5" />
    <text x="390" y="110" font-family="'DM Sans'" font-size="13" font-weight="bold" fill="${accentColor}">ANIMAL INTERFACE</text>
    <text x="390" y="140" font-family="'DM Sans'" font-size="10" fill="var(--text)">
      <tspan x="390" dy="0" text-anchor="middle">${animalConnection.split(' ').slice(0,3).join(' ')}</tspan>
      <tspan x="390" dy="14" text-anchor="middle">${animalConnection.split(' ').slice(3,6).join(' ') || ''}</tspan>
    </text>
  </g>

  <!-- Environment Circle -->
  <g class="svg-circle-group">
    <circle cx="300" cy="285" r="120" fill="rgba(125, 196, 94, 0.06)" stroke="#7dc45e" stroke-width="1.5" />
    <text x="300" y="375" text-anchor="middle" font-family="'DM Sans'" font-size="13" font-weight="bold" fill="#7dc45e">ENVIRONMENTAL INTERFACE</text>
    <text x="300" y="325" font-family="'DM Sans'" font-size="10" fill="var(--text)">
      <tspan x="300" dy="0" text-anchor="middle">${envConnection.split(' ').slice(0,3).join(' ')}</tspan>
      <tspan x="300" dy="14" text-anchor="middle">${envConnection.split(' ').slice(3,6).join(' ') || ''}</tspan>
    </text>
  </g>

  <!-- Central Intersection (One Health Core Zoonosis) -->
  <g transform="translate(250, 200)">
    <polygon points="50,10 80,60 20,60" fill="var(--surface)" stroke="var(--text)" stroke-width="1.5" />
    <text x="50" y="46" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--text)">ONE</text>
    <text x="50" y="56" text-anchor="middle" font-family="'DM Mono'" font-size="9" font-weight="bold" fill="var(--text)">HEALTH</text>
  </g>
</svg>
    `;
  },

  // 4. Draw Diagnostic Workflow
  drawDiagnosticWorkflow(d, ext, colorOverride) {
    const dx = ext.diagnosis || {
      history: "History indicators",
      signs: "Clinical signs",
      samples: "Biological samples",
      tests: [{ test: "Direct test", type: "Standard" }]
    };

    const accentColor = colorOverride || (typeof colorMap !== 'undefined' && colorMap[d.group]) || '#00d4aa';
    const primaryTest = dx.tests[0] ? dx.tests[0].test : "Lab Assay";

    return `
<svg class="visual-svg" viewBox="0 0 800 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="dx-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${accentColor}" />
    </marker>
  </defs>

  <!-- Step 1: Suspect -->
  <g class="svg-node" transform="translate(20, 60)">
    <rect x="0" y="0" width="160" height="90" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <rect x="0" y="0" width="160" height="22" rx="6" fill="var(--muted)1a" />
    <text x="10" y="15" font-family="'DM Sans'" font-size="9" font-weight="bold" fill="var(--muted)">1. CLINICAL SUSPECT</text>
    <text x="10" y="44" font-family="'DM Sans'" font-size="10" font-weight="bold" fill="var(--text)">${dx.signs ? (dx.signs.split(',').slice(0, 2).join(',') || 'Signs') : 'Signs'}</text>
    <text x="10" y="60" font-family="'DM Sans'" font-size="9" fill="var(--muted)">History: ${dx.history ? dx.history.split(' ').slice(0, 2).join(' ') : 'exposure'}...</text>
  </g>

  <!-- Step 2: Sampling -->
  <g class="svg-node" transform="translate(220, 60)">
    <rect x="0" y="0" width="160" height="90" rx="6" fill="var(--surface)" stroke="var(--border)" stroke-width="2" />
    <rect x="0" y="0" width="160" height="22" rx="6" fill="var(--muted)1a" />
    <text x="10" y="15" font-family="'DM Sans'" font-size="9" font-weight="bold" fill="var(--muted)">2. SAMPLE COLLECTION</text>
    <text x="10" y="44" font-family="'DM Sans'" font-size="10" font-weight="bold" fill="var(--text)">${dx.samples ? (dx.samples.split(',').slice(0, 2).join(',') || 'Tissues/Serum') : 'Tissues/Serum'}</text>
    <text x="10" y="70" font-family="'DM Sans'" font-size="8" fill="#e84444" font-weight="bold">Biosecurity Protocol</text>
  </g>

  <!-- Step 3: Lab Analysis -->
  <g class="svg-node" transform="translate(420, 60)">
    <rect x="0" y="0" width="160" height="90" rx="6" fill="var(--surface)" stroke="${accentColor}" stroke-width="2" />
    <rect x="0" y="0" width="160" height="22" rx="6" fill="${accentColor}1a" />
    <text x="10" y="15" font-family="'DM Sans'" font-size="9" font-weight="bold" fill="${accentColor}">3. LABORATORY TESTING</text>
    <text x="10" y="44" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--text)">${primaryTest}</text>
    <text x="10" y="62" font-family="'DM Sans'" font-size="9" fill="var(--muted)">${dx.tests[1] ? dx.tests[1].test : 'Serology & PCR'}</text>
  </g>

  <!-- Step 4: Confirmation -->
  <g class="svg-node" transform="translate(620, 60)">
    <rect x="0" y="0" width="160" height="90" rx="6" fill="var(--surface)" stroke="var(--accent)" stroke-width="2" style="filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" />
    <rect x="0" y="0" width="160" height="22" rx="6" fill="var(--accent)1a" />
    <text x="10" y="15" font-family="'DM Sans'" font-size="9" font-weight="bold" fill="var(--accent)">4. CONFIRMATION</text>
    <text x="10" y="44" font-family="'DM Sans'" font-size="11" font-weight="bold" fill="var(--text)">WOAH Reference</text>
    <text x="10" y="60" font-family="'DM Sans'" font-size="9" fill="var(--muted)">Reporting mandated</text>
  </g>

  <!-- Connectors -->
  <line x1="180" y1="105" x2="212" y2="105" stroke="${accentColor}" stroke-width="2" marker-end="url(#dx-arrow)" />
  <line x1="380" y1="105" x2="412" y2="105" stroke="${accentColor}" stroke-width="2" marker-end="url(#dx-arrow)" />
  <line x1="580" y1="105" x2="612" y2="105" stroke="var(--accent)" stroke-width="2" marker-end="url(#dx-arrow)" />
</svg>
    `;
  }
};

// Export or expose globally depending on environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { svgEngine };
} else {
  window.svgEngine = svgEngine;
}
