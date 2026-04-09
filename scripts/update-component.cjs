const fs = require('fs');
let code = fs.readFileSync('src/components/SpeciesDatabase.tsx', 'utf8');

// Remove getSpeciesImagePath
code = code.replace(/function getSpeciesImagePath[\s\S]*?return null;\n}\n/, '');

const newIll = `function SpeciesIllustration({ species }: { species: Species }) {
  const imagePath = species.image;
  const [imgError, setImgError] = useState(false);

  if (imagePath && !imgError) {
    return (
      <div className="relative w-full h-full group bg-black/40">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={imagePath} 
            alt="" 
            className="w-full h-full object-cover blur-xl opacity-40 scale-110"
            aria-hidden="true"
          />
        </div>
        <img 
          src={imagePath} 
          alt={species.name} 
          className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 z-10 drop-shadow-2xl"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback to a sleek icon
  return (
    <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
      <div className="p-6 bg-stone-900/50 rounded-full shadow-inner border border-stone-800/50 backdrop-blur-sm">
        <FallbackIcon type={species.type} category={species.category} />
      </div>
    </div>
  );
}`;

code = code.replace(/function SpeciesIllustration[\s\S]*?return \([\s\S]*?<\/div>\n  \);\n}/, newIll);

fs.writeFileSync('src/components/SpeciesDatabase.tsx', code);
