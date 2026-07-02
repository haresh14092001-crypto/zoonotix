const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Load diseases
let diseases = {};
eval('diseases = ' + html.match(/const diseases = (\{[\s\S]*?\n\};)/)[1]);

function renderRelatedDiseases(cat, currentId) {
  const current = diseases[cat].find(x => x.id === currentId);
  if (!current) return '';
  
  const pool = [];
  Object.entries(diseases).forEach(([otherCat, arr]) => {
    arr.forEach(other => {
      if (other.id === currentId) return; // skip self
      
      let score = 0;
      // 1. Same causative organism category (+3 points)
      if (otherCat === cat) score += 3;
      
      // 2. Overlapping host species (+2 points per host)
      const currentHosts = current.hosts || [];
      const otherHosts = other.hosts || [];
      const hostOverlap = otherHosts.filter(h => currentHosts.includes(h)).length;
      score += hostOverlap * 2;
      
      // 3. Overlapping keywords (+2 points per keyword)
      const currentKeywords = current.keywords || [];
      const otherKeywords = other.keywords || [];
      const keywordOverlap = otherKeywords.filter(k => currentKeywords.includes(k)).length;
      score += keywordOverlap * 2;
      
      // 4. Same danger level (+1 point)
      if (other.danger === current.danger) score += 1;
      
      pool.push({ otherCat, other, score });
    });
  });
  
  // Sort by score descending
  pool.sort((a, b) => b.score - a.score);
  
  const relatedMatches = pool.slice(0, 3);
  console.log(`Related matches for ${currentId}:`, relatedMatches.map(m => `${m.other.name} (score: ${m.score})`));
  return 'OK';
}

console.log('Testing related diseases for anthrax:');
renderRelatedDiseases('bacterial', 'anthrax');

console.log('Testing related diseases for salmonellosis:');
renderRelatedDiseases('bacterial', 'salmonellosis');

console.log('Testing related diseases for rabies:');
renderRelatedDiseases('viral', 'rabies');
