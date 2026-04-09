const fs = require('fs');
const path = require('path');

const speciesFile = path.join(__dirname, '..', 'src', 'data', 'speciesData.ts');
let content = fs.readFileSync(speciesFile, 'utf8');

const queries = [
  { q: 'Bothrops asper', file: 'fer-de-lance.jpg' },
  { q: 'Micrurus', file: 'coral-snake.jpg' },
  { q: 'Lachesis muta', file: 'bushmaster.jpg' },
  { q: 'Bothrops nummifer', file: 'jumping-viper.jpg' },
  { q: 'Porthidium nasutum', file: 'hognose.jpg' },
  { q: 'Crotalus simus', file: 'rattlesnake.jpg' },
  { q: 'Iguana iguana', file: 'green-iguana.jpg' },
  { q: 'Ctenosaura similis', file: 'black-iguana.jpg' },
  { q: 'Scolopendra subspinipes', file: 'centipede.jpg' },
  { q: 'Paraponera clavata', file: 'bullet-ant.jpg' },
  { q: 'Brachypelma', file: 'tarantula.jpg' },
  { q: 'Phoneutria', file: 'wandering-spider.jpg' },
  { q: 'Centruroides', file: 'scorpion.jpg' },
  { q: 'Triatominae', file: 'kissing-bug.jpg' },
  { q: 'Aedes aegypti', file: 'mosquito.jpg' },
  { q: 'Dermatobia hominis', file: 'botfly.jpg' },
  { q: 'Tunga penetrans', file: 'sand-flea.jpg' },
  { q: 'Eciton', file: 'army-ants.jpg' },
  { q: 'Dieffenbachia', file: 'dieffenbachia.jpg' },
  { q: 'Hippomane mancinella', file: 'manchineel.jpg' },
  { q: 'Apocynaceae', file: 'apocynaceae.jpg' },
  { q: 'Ricinus communis', file: 'castor-bean.jpg' },
  { q: 'Nerium oleander', file: 'oleander.jpg' },
  { q: 'Datura stramonium', file: 'datura.jpg' },
  { q: 'Jatropha curcas', file: 'physic-nut.jpg' },
  { q: 'Hura crepitans', file: 'sandbox-tree.jpg' },
  { q: 'Euphorbia', file: 'spurge.jpg' },
  { q: 'Erythrina crista-galli', file: 'cockspur.jpg' },
  { q: 'Brosimum alicastrum', file: 'maya-nut.jpg' },
  { q: 'Annona muricata', file: 'soursop.jpg' },
  { q: 'Persea americana', file: 'avocado.jpg' },
  { q: 'Psidium guajava', file: 'guava.jpg' },
  { q: 'Cocos nucifera', file: 'coconut.jpg' },
  { q: 'Carica papaya', file: 'papaya.jpg' },
  { q: 'Bactris gasipaes', file: 'heart-of-palm.jpg' },
  { q: 'Musa', file: 'banana.jpg' },
  { q: 'Mangifera indica', file: 'mango.jpg' },
  { q: 'Averrhoa carambola', file: 'starfruit.jpg' },
  { q: 'Anacardium occidentale', file: 'cashew.jpg' },
  { q: 'Inga edulis', file: 'guaba.jpg' },
  { q: 'Passiflora edulis', file: 'passion-fruit.jpg' },
  { q: 'Ananas comosus', file: 'pineapple.jpg' },
  { q: 'Byrsonima crassifolia', file: 'nance.jpg' },
  { q: 'Manilkara zapota', file: 'zapote.jpg' },
  { q: 'Pouteria sapota', file: 'mamey.jpg' },
  { q: 'Dasyprocta punctata', file: 'agouti.jpg' },
  { q: 'Cuniculus paca', file: 'paca.jpg' },
  { q: 'Odocoileus virginianus', file: 'deer.jpg' },
  { q: 'Pecari tajacu', file: 'peccary.jpg' },
  { q: 'Dasypus novemcinctus', file: 'armadillo.jpg' },
  { q: 'Alouatta palliata', file: 'howler-monkey.jpg' },
  { q: 'Cebus capucinus', file: 'white-faced-monkey.jpg' },
  { q: 'Chelonia mydas', file: 'green-turtle.jpg' },
  { q: 'Dermatemys mawii', file: 'hickatee.jpg' },
  { q: 'Centropomus undecimalis', file: 'snook.jpg' },
  { q: 'Oreochromis niloticus', file: 'tilapia.jpg' },
  { q: 'Parachromis managuensis', file: 'guapote.jpg' },
  { q: 'Megalops atlanticus', file: 'tarpon.jpg' },
  { q: 'Callinectes sapidus', file: 'crab.jpg' },
  { q: 'Litopenaeus vannamei', file: 'shrimp.jpg' },
  { q: 'Aliger gigas', file: 'conch.jpg' },
  { q: 'Crax rubra', file: 'curassow.jpg' },
  { q: 'Numida meleagris', file: 'guinea-fowl.jpg' },
  { q: 'Meleagris ocellata', file: 'wild-turkey.jpg' },
  { q: 'Columbidae', file: 'pigeon.jpg' },
  { q: 'Amazona', file: 'parrot.jpg' },
  { q: 'Picidae', file: 'woodpecker.jpg' }
];

let updatedContent = content;
let matched = 0;

for (const query of queries) {
  // Try finding block that matches query.q (scientific name) or something similar
  const qStr = query.q.replace(/ /g, '[ \s\n]+');
  // Match an object in the SPECIES array that contains the query word
  
  // We'll use a simple regex approach: find name: '...' where it contains the q or the filename base
  const fileBase = query.file.replace('.jpg', '');
  
  // We can look for the object block.
  // Instead, let's just do a string replace per item, but we must be careful
  // We can parse the file using simple string splitting
  let parts = updatedContent.split(/name:\s*['"`]/);
  let newContent = parts[0];
  
  for (let i = 1; i < parts.length; i++) {
    let block = parts[i];
    // Find the end of the name string
    const endNameMatch = block.match(/['"`]/);
    if (!endNameMatch) {
      newContent += "name: '" + block;
      continue;
    }
    const nameStr = block.substring(0, endNameMatch.index);
    
    // Check if this block matches our query
    // Either the name contains the query.q or the localNames contains the file base
    const blockUntilImage = block.substring(0, block.indexOf('image:'));
    
    // if block matches query
    if (blockUntilImage.toLowerCase().includes(query.q.toLowerCase()) || 
        blockUntilImage.toLowerCase().includes(fileBase.toLowerCase().replace(/-/g, ' '))) {
      
      // Update image: null to image: '/images/query.file'
      if (block.includes('image: null')) {
        block = block.replace('image: null', `image: '/images/${query.file}'`);
        matched++;
        // remove the query so we don't match it again? No, it's fine
      }
    }
    newContent += "name: '" + nameStr + "'" + block.substring(endNameMatch.index + 1);
  }
  updatedContent = newContent;
}

fs.writeFileSync(speciesFile, updatedContent);
console.log(`Matched and updated ${matched} images in speciesData.ts`);
