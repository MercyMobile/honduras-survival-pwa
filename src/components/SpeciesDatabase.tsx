import { Search, Leaf, Skull, Bug, Bird, Fish, Trees } from 'lucide-react';
import { useState } from 'react';
import { SPECIES, type Species } from '../data/speciesData';

interface SpeciesDatabaseProps {
  language: 'en' | 'es';
}

function FallbackIcon({ type, category }: { type: string, category: string }) {
  const colorClass = type === 'threat' ? 'text-red-400' : type === 'food' ? 'text-gold-300' : 'text-emerald-400';
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
      <div className="relative w-full h-full group bg-obsidian-950">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imagePath}
            alt=""
            className="w-full h-full object-cover blur-2xl opacity-50 scale-110"
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

  return (
    <div className="w-full h-full bg-gradient-to-br from-obsidian-800 via-royal-900/50 to-obsidian-900 flex items-center justify-center">
      <div className="p-6 bg-obsidian-900/70 rounded-full shadow-inner border border-royal-800/60 backdrop-blur-sm">
        <FallbackIcon type={species.type} category={species.category} />
      </div>
    </div>
  );
}

export default function SpeciesDatabase({ language }: SpeciesDatabaseProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'threat' | 'safe' | 'food'>('threat');

  const LABELS = {
    threats: { en: 'Threats', es: 'Amenazas' },
    ediblePlants: { en: 'Edible Plants', es: 'Plantas Comestibles' },
    gameFish: { en: 'Game / Fish', es: 'Caza / Pesca' },
    searchPlaceholder: { en: 'Search by name, local name, or description...', es: 'Buscar por nombre, nombre local, o descripción...' },
    alsoKnownAs: { en: 'Also known as:', es: 'También conocido como:' },
    identificationTips: { en: 'Identification Tips', es: 'Consejos de Identificación' },
    habitat: { en: 'Habitat', es: 'Hábitat' },
    symptoms: { en: 'Symptoms', es: 'Síntomas' },
    preparation: { en: 'Preparation', es: 'Preparación' },
    nutrition: { en: 'Nutrition', es: 'Nutrición' },
    emergencyProtocol: { en: 'Emergency Protocol', es: 'Protocolo de Emergencia' },
    preparationSafety: { en: 'Preparation & Safety', es: 'Preparación y Seguridad' },
    protocol: { en: 'Protocol', es: 'Protocolo' },
    localLaws: { en: 'Local Laws & Customs', es: 'Leyes y Costumbres Locales' },
    criticalWarning: { en: 'CRITICAL WARNING', es: 'ADVERTENCIA CRÍTICA' },
    noSpeciesFound: { en: 'No species found', es: 'No se encontraron especies' },
    noMatchFor: { en: 'We couldn\'t find any match for', es: 'No pudimos encontrar coincidencias para' },
    inThisCategory: { en: 'in this category.', es: 'en esta categoría.' },
  };

  const t = (key: keyof typeof LABELS) => LABELS[key][language];

  const filtered = SPECIES.filter(s => {
    const matchesType = activeTab === 'food' ? s.type === 'food' : s.type === activeTab;
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      (s.localNames && (s.localNames.en.toLowerCase().includes(query.toLowerCase()) ||
                          s.localNames.es.toLowerCase().includes(query.toLowerCase())));
    return matchesType && matchesQuery;
  });

  return (
    <div className="p-4 sm:p-6 space-y-5 pb-24 flex flex-col h-full">
      {/* Segmented control */}
      <div className="flex bg-obsidian-900/70 p-1 rounded-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] border border-royal-800/50 shrink-0 backdrop-blur-md">
        <button
          className={`flex-1 py-3 font-semibold text-sm flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            activeTab === 'threat'
              ? 'bg-gradient-to-b from-red-500/20 to-red-900/40 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.15)] border border-red-500/30'
              : 'text-parchment-400 hover:text-parchment-100'
          }`}
          onClick={() => setActiveTab('threat')}
        >
          <Skull size={18} /> <span className="hidden sm:inline">{t('threats')}</span>
        </button>
        <button
          className={`flex-1 py-3 font-semibold text-sm flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            activeTab === 'safe'
              ? 'bg-gradient-to-b from-emerald-500/20 to-emerald-900/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] border border-emerald-500/30'
              : 'text-parchment-400 hover:text-parchment-100'
          }`}
          onClick={() => setActiveTab('safe')}
        >
          <Leaf size={18} /> <span className="hidden sm:inline">{t('ediblePlants')}</span>
        </button>
        <button
          className={`flex-1 py-3 font-semibold text-sm flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            activeTab === 'food'
              ? 'bg-gradient-to-b from-gold-400/25 to-gold-700/40 text-gold-200 shadow-[0_0_20px_rgba(212,175,55,0.2)] border border-gold-400/40'
              : 'text-parchment-400 hover:text-parchment-100'
          }`}
          onClick={() => setActiveTab('food')}
        >
          <Fish size={18} /> <span className="hidden sm:inline">{t('gameFish')}</span>
        </button>
      </div>

      {/* Search input */}
      <div className="relative shrink-0 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-parchment-400 group-focus-within:text-gold-300 transition-colors" size={19} />
        </div>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="w-full bg-obsidian-900/60 border border-royal-800/60 rounded-2xl py-3.5 pl-12 pr-4 text-parchment-100 placeholder-parchment-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400/50 transition-all shadow-sm backdrop-blur-sm text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Species Cards */}
      <div className="space-y-5 overflow-y-auto flex-1 pb-10 -mx-1 px-1">
        {filtered.map((species, idx) => {
          const riskColors: Record<string, { bg: string, text: string, border: string }> = {
            'CRITICAL': { bg: 'bg-red-950/80', text: 'text-red-200', border: 'border-red-500/40' },
            'HIGH': { bg: 'bg-orange-950/80', text: 'text-orange-200', border: 'border-orange-500/40' },
            'MODERATE': { bg: 'bg-yellow-950/80', text: 'text-yellow-200', border: 'border-yellow-500/40' },
            'SAFE': { bg: 'bg-emerald-950/80', text: 'text-emerald-200', border: 'border-emerald-500/40' }
          };

          const rc = riskColors[species.risk] || { bg: 'bg-obsidian-800', text: 'text-parchment-200', border: 'border-royal-700' };

          return (
            <div
              key={idx}
              className="relative bg-gradient-to-br from-obsidian-800/85 to-obsidian-900/90 border border-royal-800/50 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.15)] hover:border-gold-400/30 group"
            >
              <div className="w-full bg-obsidian-950 relative h-48 sm:h-56 overflow-hidden">
                <SpeciesIllustration species={species} />

                {/* Top gradient fade for pill readability */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-obsidian-950/70 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-obsidian-950/80 to-transparent pointer-events-none" />

                {/* Risk level pill */}
                <div className={`absolute top-4 right-4 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg border backdrop-blur-md ${rc.bg} ${rc.text} ${rc.border}`}>
                  {species.risk}
                </div>

                {/* Category tag */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] rounded-lg bg-obsidian-950/80 text-gold-200 backdrop-blur-md border border-gold-400/20">
                  {species.category}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-bold text-parchment-50 leading-tight mb-1 group-hover:text-gold-200 transition-colors">{species.name}</h3>
                  {species.localNames && (
                    <p className="text-sm text-parchment-300 font-medium">
                      <span className="text-parchment-400">{t('alsoKnownAs')}</span> {species.localNames.en} <span className="text-gold-400/60 px-1">·</span> {species.localNames.es}
                    </p>
                  )}
                </div>

                <p className="text-[15px] text-parchment-200 leading-relaxed mb-5">{species.description}</p>

                <div className="space-y-3">
                  {species.identificationTips && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.7)]"></div>
                      <div>
                        <span className="font-semibold text-sky-300 block mb-0.5 tracking-wide">{t('identificationTips')}</span>
                        <span className="text-parchment-300">{species.identificationTips}</span>
                      </div>
                    </div>
                  )}

                  {species.habitat && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-parchment-400 mt-2 shrink-0"></div>
                      <div>
                        <span className="font-semibold text-parchment-100 block mb-0.5 tracking-wide">{t('habitat')}</span>
                        <span className="text-parchment-300">{species.habitat}</span>
                      </div>
                    </div>
                  )}

                  {species.symptoms && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(248,113,113,0.7)]"></div>
                      <div>
                        <span className="font-bold text-red-300 block mb-0.5 tracking-wide">{t('symptoms')}</span>
                        <span className="text-parchment-200">{species.symptoms}</span>
                      </div>
                    </div>
                  )}

                  {species.preparation && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.7)]"></div>
                      <div>
                        <span className="font-semibold text-gold-200 block mb-0.5 tracking-wide">{t('preparation')}</span>
                        <span className="text-parchment-300">{species.preparation}</span>
                      </div>
                    </div>
                  )}

                  {species.nutritionalValue && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.7)]"></div>
                      <div>
                        <span className="font-semibold text-emerald-300 block mb-0.5 tracking-wide">{t('nutrition')}</span>
                        <span className="text-parchment-300">{species.nutritionalValue}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className={`bg-obsidian-900/70 border p-4 rounded-xl text-sm ${species.type === 'threat' ? 'border-red-500/30 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]' : species.type === 'food' ? 'border-gold-400/30' : 'border-emerald-500/30'}`}>
                    <span className={`font-bold block mb-2 tracking-[0.2em] uppercase text-[10px] ${species.type === 'threat' ? 'text-red-300' : species.type === 'food' ? 'text-gold-300' : 'text-emerald-300'}`}>
                      {species.type === 'threat' ? t('emergencyProtocol') : species.type === 'food' ? t('preparationSafety') : t('protocol')}
                    </span>
                    <span className="text-parchment-200 leading-relaxed block">{species.protocol}</span>
                  </div>

                  {species.localLaws && (
                    <div className="bg-obsidian-900/50 border border-royal-700/50 p-4 rounded-xl text-sm">
                      <span className="font-bold text-parchment-100 block mb-2 tracking-[0.2em] uppercase text-[10px]">
                        {t('localLaws')}
                      </span>
                      <span className="text-parchment-300 leading-relaxed block">{species.localLaws}</span>
                    </div>
                  )}

                  {species.warning && (
                    <div className="bg-red-950/40 border border-red-500/40 p-4 rounded-xl text-sm flex gap-3 items-start shadow-[inset_0_0_20px_rgba(239,68,68,0.08)]">
                      <Skull className="text-red-400 shrink-0 mt-0.5" size={18} />
                      <div>
                        <span className="font-bold text-red-300 block mb-1 tracking-wider">{t('criticalWarning')}</span>
                        <span className="text-red-100/90 leading-relaxed">{species.warning}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-obsidian-800/40 rounded-2xl border border-royal-800/50 border-dashed">
            <Search className="text-parchment-500 mb-4" size={48} strokeWidth={1} />
            <h4 className="font-display text-parchment-100 font-semibold mb-2 text-lg">{t('noSpeciesFound')}</h4>
            <p className="text-parchment-400 text-sm max-w-[280px]">{t('noMatchFor')} "<span className="text-gold-300 font-medium">{query}</span>" {t('inThisCategory')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
