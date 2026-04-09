const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Ensure the directory is empty so we don't have bad wiki images left over
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    fs.unlinkSync(path.join(dir, file));
  }
}

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

async function downloadImage(query, filename) {
  const url = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(query)}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HondurasSurvival/1.0 (test@example.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          
          if (!json.results || json.results.length === 0 || !json.results[0].default_photo) {
             console.log('No image found for', query);
             return resolve(false);
          }
          let imageUrl = json.results[0].default_photo.medium_url;
          // Upgrade the URL to use the large photo if we want slightly better quality (medium is 500px, large is 1024px)
          // Actually medium is perfectly adequate for our PWA and faster to load.
          
          const file = fs.createWriteStream(path.join(dir, filename));
          https.get(imageUrl, { headers: { 'User-Agent': 'HondurasSurvival/1.0 (test@example.com)' } }, (response) => {
            if (response.statusCode >= 300) {
              console.log('Error downloading', filename, 'Status:', response.statusCode);
              file.close();
              fs.unlinkSync(path.join(dir, filename));
              return resolve(false);
            }
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log('Downloaded', filename, 'for', query);
              resolve(true);
            });
          }).on('error', err => {
            fs.unlinkSync(path.join(dir, filename));
            reject(err);
          });
        } catch (e) {
          console.error('Error parsing iNaturalist API JSON for', query, e.message);
          resolve(false);
        }
      });
    }).on('error', err => {
      console.error('Network error for', query, err.message);
      resolve(false);
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('Starting exact-match iNaturalist photo downloads...');
  for (const q of queries) {
    await downloadImage(q.q, q.file);
    // Be nice to the iNaturalist API
    await sleep(500);
  }
  console.log('Done!');
})();