import { useState } from 'react';
import { Droplet, Heart, Compass, Scale, Church } from 'lucide-react';
import SurvivalTab from './components/SurvivalTab';
import LanguageToggle from './components/LanguageToggle';
import SpeciesDatabase from './components/SpeciesDatabase';
import MapReader from './components/MapReader';
import CultureTab from './components/CultureTab';
import PulpitTab from './components/PulpitTab';

type MainTab = 'survival' | 'species' | 'map' | 'culture' | 'pulpit';

function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('survival');
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    try {
      const saved = localStorage.getItem('survival-language');
      return (saved === 'es' ? 'es' : 'en') as 'en' | 'es';
    } catch {
      return 'en' as 'en' | 'es';
    }
  });

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    localStorage.setItem('survival-language', newLang);
  };

  return (
    <div className="flex flex-col h-full text-parchment-100 overflow-hidden font-sans">
      {/* Luxury Header */}
      <header className="relative shrink-0 z-20">
        <div className="absolute inset-0 bg-obsidian-900/70 backdrop-blur-2xl" />
        {/* Gold hairline bottom border with fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        {/* Subtle violet glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-royal-500/10 via-transparent to-gold-400/5 pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Monogram mark */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-700 via-royal-600 to-royal-800 flex items-center justify-center shadow-lg shadow-royal-900/60 border border-gold-400/30">
                <Droplet size={18} className="text-gold-300" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-gold-400/40 to-royal-500/40 blur-md opacity-50 -z-10" />
            </div>

            <div className="min-w-0">
              <h1 className="font-display text-sm sm:text-base font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-parchment-50 to-gold-300 leading-tight line-clamp-2 md:line-clamp-1">
                {language === 'en'
                  ? "Mercy Mobile's Missionary Survival Guide"
                  : "Guía de Supervivencia Misionera de Mercy Mobile"}
              </h1>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-parchment-400 mt-0.5 truncate">
                {language === 'en' ? 'Copán Department · Honduras' : 'Departamento de Copán · Honduras'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageToggle language={language} onToggle={handleLanguageToggle} />
            <div className="hidden sm:flex items-center gap-1.5 bg-obsidian-800/60 px-3 py-1.5 rounded-full border border-gold-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.9)] gold-shimmer"></span>
              <span className="text-[10px] font-bold text-gold-300/90 tracking-[0.2em] uppercase">Offline</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-0 scroll-smooth">
        {activeTab === 'survival' && <SurvivalTab language={language} />}
        {activeTab === 'species' && <SpeciesDatabase language={language} />}
        {activeTab === 'map' && <MapReader language={language} />}
        {activeTab === 'culture' && <CultureTab language={language} />}
        {activeTab === 'pulpit' && <PulpitTab language={language} />}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="shrink-0 pb-safe z-20 px-3 pb-3 pt-2">
        <div className="relative gradient-border-gold rounded-2xl bg-obsidian-800/80 backdrop-blur-2xl border border-royal-800/60 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),0_0_0_1px_rgba(212,175,55,0.08)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-royal-900/50 via-obsidian-800/20 to-transparent pointer-events-none" />
          <div className="relative flex justify-around items-center px-1 py-2.5 sm:px-4">
            <NavButton
              icon={<Droplet size={21} strokeWidth={activeTab === 'survival' ? 2.5 : 1.75} />}
              label={language === 'en' ? 'Survival' : 'Manual'}
              active={activeTab === 'survival'}
              onClick={() => setActiveTab('survival')}
            />
            <NavButton
              icon={<Heart size={21} strokeWidth={activeTab === 'species' ? 2.5 : 1.75} />}
              label={language === 'en' ? 'Flora' : 'Flora'}
              active={activeTab === 'species'}
              onClick={() => setActiveTab('species')}
            />
            <NavButton
              icon={<Compass size={21} strokeWidth={activeTab === 'map' ? 2.5 : 1.75} />}
              label={language === 'en' ? 'Map' : 'Mapa'}
              active={activeTab === 'map'}
              onClick={() => setActiveTab('map')}
            />
            <NavButton
              icon={<Scale size={21} strokeWidth={activeTab === 'culture' ? 2.5 : 1.75} />}
              label={language === 'en' ? 'Culture' : 'Cultura'}
              active={activeTab === 'culture'}
              onClick={() => setActiveTab('culture')}
            />
            <NavButton
              icon={<Church size={21} strokeWidth={activeTab === 'pulpit' ? 2.5 : 1.75} />}
              label={language === 'en' ? 'Pulpit' : 'Púlpito'}
              active={activeTab === 'pulpit'}
              onClick={() => setActiveTab('pulpit')}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative flex flex-col items-center justify-center px-2 py-1.5 min-w-[56px] sm:min-w-[64px] transition-all duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 rounded-xl"
    >
      {/* Active glow background */}
      {active && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold-400/10 to-royal-500/5" />
      )}

      <div className={`relative mb-1 transition-all duration-300 ${active ? 'text-gold-300 -translate-y-0.5' : 'text-parchment-400 group-hover:text-parchment-200'}`}>
        {icon}
        {active && (
          <div className="absolute -inset-2 bg-gold-400/25 rounded-full blur-lg -z-10" />
        )}
      </div>
      <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${active ? 'text-gold-300' : 'text-parchment-400/80 group-hover:text-parchment-200'}`}>
        {label}
      </span>
      {/* Gold underline indicator */}
      {active && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
      )}
    </button>
  );
}

export default App;
