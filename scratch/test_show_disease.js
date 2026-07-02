const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Load diseases
let diseases = {};
eval('diseases = ' + html.match(/const diseases = (\{[\s\S]*?\n\};)/)[1]);

// Load diseaseEnrichment
const diseaseEnrichment = require('./zoonotix_content_enrichment.js').diseaseEnrichment;

// Mock colorMap
const colorMap = {
  bacterial: '#e8a838',
  viral: '#e84444',
  fungal: '#7dc45e',
  parasitic: '#9b72cf',
  prion: '#e84497'
};

// Simulated renderRelatedDiseases
function renderRelatedDiseases(cat, id) { return ''; }
// Simulated renderPaginationNav
function renderPaginationNav(cat, id) { return ''; }

const cat = 'bacterial';
const id = 'salmonellosis';
const d = diseases[cat].find(x => x.id === id);
const ext = diseaseEnrichment[id];

console.log('Disease d found:', !!d);
console.log('Enrichment ext found:', !!ext);

// Let's test the evaluation of the template string from showDisease around line 5309-5773
try {
  const cc = colorMap[cat];
  const catLabel = 'Bacterial';
  
  // The expressions inside index.html's showDisease template string:
  console.log('dangerLabel test:', d.danger === 'high');
  console.log('ext.definition test:', ext.definition ? 'OK' : 'MISSING');
  console.log('ext.etiology test:', ext.etiology ? 'OK' : 'MISSING');
  console.log('ext.taxonomy test:', ext.taxonomy ? 'OK' : 'MISSING');
  console.log('ext.vetImportance test:', ext.vetImportance ? 'OK' : 'MISSING');
  console.log('ext.publicHealthImportance test:', ext.publicHealthImportance ? 'OK' : 'MISSING');
  console.log('ext.riskGroups test:', ext.riskGroups ? 'OK' : 'MISSING');
  console.log('ext.envSurvival test:', ext.envSurvival ? 'OK' : 'MISSING');
  console.log('ext.clinicalSigns.animals.acute test:', ext.clinicalSigns.animals.acute ? 'OK' : 'MISSING');
  console.log('ext.clinicalSigns.humans.subclinical test:', ext.clinicalSigns.humans.subclinical ? 'OK' : 'MISSING');
  console.log('ext.lesionsDesc.gross test:', ext.lesionsDesc.gross ? 'OK' : 'MISSING');
  console.log('ext.lesionsDesc.histopathology test:', ext.lesionsDesc.histopathology ? 'OK' : 'MISSING');
  console.log('ext.lesionsDesc.hallmark test:', ext.lesionsDesc.hallmark ? 'OK' : 'MISSING');
  
  // Test the exact lines that could fail:
  // Line 5721: ext.onehealth.humanConnection.split(' ').slice(0, 4).join(' ')
  console.log('Evaluating ext.onehealth:', ext.onehealth);
  console.log('Evaluating ext.onehealth.humanConnection:', ext.onehealth.humanConnection);
  
  const oneHealthVal = (ext.onehealth.human || ext.onehealth.humanConnection || 'Zoonotic exposure.').split(' ').slice(0, 4).join(' ');
  console.log('oneHealthVal evaluated successfully:', oneHealthVal);
} catch (e) {
  console.error('CRASH DETECTED during evaluation:', e.stack);
}
