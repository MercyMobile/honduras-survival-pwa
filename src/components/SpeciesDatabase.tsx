import { Search, Leaf, Skull, Bug, Bird, Fish, Trees } from 'lucide-react';
import { useState } from 'react';
import { SPECIES, type Species } from '../data/speciesData';


function FallbackIcon({ type, category }: { type: string, category: string }) {
  const colorClass = type === 'threat' ? 'text-red-500' : type === 'food' ? 'text-amber-500' : 'text-green-500';
  const cat = category.toLowerCase();
  
  if (cat.includes('snake') || cat.includes('reptile')) return <Skull size={48} className={colorClass} strokeWidth={1.5} />;
  if (cat.includes('insect') || cat.includes('spider')) return <Bug size={48} className={colorClass} strokeWidth={1.5} />;
  if (cat.includes('bird')) return <Bird size={48} className={colorClass} strokeWidth={1.5} />;
  if (cat.includes('fish') || cat.includes('crustacean') || cat.includes('mollusk')) return <Fish size={48} className={colorClass} strokeWidth={1.5} />;
  if (cat.includes('tree') || cat.includes('plant')) return <Trees size={48} className={colorClass} strokeWidth={1.5} />;
  return <Leaf size={48} className={colorClass} strokeWidth={1.5} />;
}

function SpeciesIllustration({ species }: { species: Species }) {
  const imagePath = species.image;

  if (imagePath) {
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
}
export default function SpeciesDatabase() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'threat' | 'safe' | 'food'>('threat');

  const filtered = SPECIES.filter(s => {
    const matchesType = activeTab === 'food' ? s.type === 'food' : s.type === activeTab;
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      (s.localNames && (s.localNames.en.toLowerCase().includes(query.toLowerCase()) || 
                          s.localNames.es.toLowerCase().includes(query.toLowerCase())));
    return matchesType && matchesQuery;
  });

  return (
    <div className="p-4 space-y-6 pb-24 flex flex-col h-full bg-stone-950/50">
      {/* Modern segmented control */}
      <div className="flex bg-stone-900/80 p-1 rounded-2xl shadow-inner border border-stone-800/50 shrink-0 backdrop-blur-md">
        <button 
          className={`flex-1 py-3 font-semibold text-sm flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            activeTab === 'threat' 
              ? 'bg-gradient-to-b from-red-500/20 to-red-900/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-red-500/30' 
              : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/50'
          }`}
          onClick={() => setActiveTab('threat')}
        >
          <Skull size={18} /> <span className="hidden sm:inline">Threats</span>
        </button>
        <button 
          className={`flex-1 py-3 font-semibold text-sm flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            activeTab === 'safe' 
              ? 'bg-gradient-to-b from-green-500/20 to-green-900/40 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)] border border-green-500/30' 
              : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/50'
          }`}
          onClick={() => setActiveTab('safe')}
        >
          <Leaf size={18} /> <span className="hidden sm:inline">Edible Plants</span>
        </button>
        <button 
          className={`flex-1 py-3 font-semibold text-sm flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            activeTab === 'food' 
              ? 'bg-gradient-to-b from-amber-500/20 to-amber-900/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] border border-amber-500/30' 
              : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/50'
          }`}
          onClick={() => setActiveTab('food')}
        >
          <Fish size={18} /> <span className="hidden sm:inline">Game / Fish</span>
        </button>
      </div>

      {/* Modern Search input */}
      <div className="relative shrink-0 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-stone-500 group-focus-within:text-lime-500 transition-colors" size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search by name, local name, or description..." 
          className="w-full bg-stone-900/60 border border-stone-800/60 rounded-2xl py-4 pl-12 pr-4 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500/50 transition-all shadow-sm backdrop-blur-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Species Cards */}
      <div className="space-y-6 overflow-y-auto flex-1 pb-10">
        {filtered.map((species, idx) => {
          const riskColors: Record<string, { bg: string, text: string, border: string }> = {
            'CRITICAL': { bg: 'bg-red-950/80', text: 'text-red-300', border: 'border-red-500/30' },
            'HIGH': { bg: 'bg-orange-950/80', text: 'text-orange-300', border: 'border-orange-500/30' },
            'MODERATE': { bg: 'bg-yellow-950/80', text: 'text-yellow-300', border: 'border-yellow-500/30' },
            'SAFE': { bg: 'bg-green-950/80', text: 'text-green-300', border: 'border-green-500/30' }
          };

          const rc = riskColors[species.risk] || { bg: 'bg-stone-800', text: 'text-stone-300', border: 'border-stone-700' };

          return (
            <div key={idx} className="bg-stone-900/80 border border-stone-800/60 rounded-3xl overflow-hidden shadow-lg backdrop-blur-md transition-all hover:shadow-xl hover:border-stone-700/80 group">
              <div className="w-full bg-stone-950 relative h-48 sm:h-56 overflow-hidden">
                <SpeciesIllustration species={species} />
                
                {/* Modern pill for risk level */}
                <div className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-lg border backdrop-blur-md ${rc.bg} ${rc.text} ${rc.border}`}>
                  {species.risk}
                </div>
                
                {/* Category tag */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-lg bg-stone-950/70 text-stone-300 backdrop-blur-md border border-stone-800/50">
                  {species.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-stone-100 leading-tight mb-1 group-hover:text-lime-400 transition-colors">{species.name}</h3>
                  {species.localNames && (
                    <p className="text-sm text-stone-400 font-medium">
                      <span className="opacity-70">Also known as:</span> {species.localNames.en} <span className="opacity-40 px-1">|</span> {species.localNames.es}
                    </p>
                  )}
                </div>
                
                <p className="text-base text-stone-300 leading-relaxed mb-5">{species.description}</p>
                
                <div className="space-y-3">
                  {species.identificationTips && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                      <div>
                        <span className="font-semibold text-blue-300 block mb-0.5">Identification Tips</span>
                        <span className="text-stone-400">{species.identificationTips}</span>
                      </div>
                    </div>
                  )}

                  {species.habitat && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-600 mt-2 shrink-0"></div>
                      <div>
                        <span className="font-semibold text-stone-300 block mb-0.5">Habitat</span>
                        <span className="text-stone-400">{species.habitat}</span>
                      </div>
                    </div>
                  )}
                  
                  {species.symptoms && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                      <div>
                        <span className="font-bold text-red-400 block mb-0.5">Symptoms</span>
                        <span className="text-stone-300">{species.symptoms}</span>
                      </div>
                    </div>
                  )}

                  {species.preparation && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div>
                      <div>
                        <span className="font-semibold text-amber-300 block mb-0.5">Preparation</span>
                        <span className="text-stone-400">{species.preparation}</span>
                      </div>
                    </div>
                  )}

                  {species.nutritionalValue && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                      <div>
                        <span className="font-semibold text-green-300 block mb-0.5">Nutrition</span>
                        <span className="text-stone-400">{species.nutritionalValue}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className={`bg-stone-900/80 border p-4 rounded-2xl text-sm ${species.type === 'threat' ? 'border-red-900/30 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]' : species.type === 'food' ? 'border-amber-900/30' : 'border-stone-800/80'}`}>
                    <span className={`font-bold block mb-2 tracking-wider uppercase text-xs ${species.type === 'threat' ? 'text-red-400' : species.type === 'food' ? 'text-amber-400' : 'text-green-400'}`}>
                      {species.type === 'threat' ? 'Emergency Protocol' : species.type === 'food' ? 'Preparation & Safety' : 'Protocol'}
                    </span>
                    <span className="text-stone-300 leading-relaxed block">{species.protocol}</span>
                  </div>

                  {species.localLaws && (
                    <div className="bg-stone-900/50 border border-stone-700/50 p-4 rounded-2xl text-sm">
                      <span className="font-bold text-stone-300 block mb-2 tracking-wider uppercase text-xs">
                        Local Laws & Customs
                      </span>
                      <span className="text-stone-400 leading-relaxed block">{species.localLaws}</span>
                    </div>
                  )}

                  {species.warning && (
                    <div className="bg-red-950/40 border border-red-900/50 p-4 rounded-2xl text-sm flex gap-3 items-start">
                      <Skull className="text-red-500 shrink-0 mt-0.5" size={18} />
                      <div>
                        <span className="font-bold text-red-400 block mb-1">CRITICAL WARNING</span>
                        <span className="text-red-200/90 leading-relaxed">{species.warning}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-stone-900/30 rounded-3xl border border-stone-800/50 border-dashed">
            <Search className="text-stone-600 mb-4" size={48} strokeWidth={1} />
            <h4 className="text-stone-300 font-semibold mb-2">No species found</h4>
            <p className="text-stone-500 text-sm max-w-[250px]">We couldn't find any match for "{query}" in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
