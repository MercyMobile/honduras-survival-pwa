import { useState } from 'react';
import { Droplet, Heart, Compass, Scale } from 'lucide-react';
import SurvivalTab from './components/SurvivalTab';
import LanguageToggle from './components/LanguageToggle';
import SpeciesDatabase from './components/SpeciesDatabase';
import MapReader from './components/MapReader';
import CultureTab from './components/CultureTab';

type MainTab = 'survival' | 'species' | 'map' | 'culture';

function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('survival');
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    const saved = localStorage.getItem('survival-language');
    return (saved === 'es' ? 'es' : 'en') as 'en' | 'es';
  });

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    localStorage.setItem('survival-language', newLang);
  };

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-200 overflow-hidden selection:bg-lime-500/30 font-sans">
      {/* Premium Header */}
      <header className="relative bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/60 p-4 shrink-0 flex items-center justify-between z-20 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center shadow-lg shadow-lime-500/20">
            <Droplet size={18} className="text-stone-950" strokeWidth={2.5} />
          </div>
          <h1 className="text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-stone-400">
            {language === 'en' ? 'Honduras Survival' : 'Supervivencia'}
          </h1>
        </div>
        <div className="flex items-center gap-4 relative">
          <LanguageToggle language={language} onToggle={handleLanguageToggle} />
          <div className="flex items-center gap-1.5 bg-stone-900/50 px-2.5 py-1 rounded-full border border-stone-800/50">
            <span className="w-2 h-2 rounded-full bg-lime-500 shadow-[0_0_8px_rgba(132,204,22,0.8)] animate-pulse"></span>
            <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">OFFLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-0 scroll-smooth">
        {activeTab === 'survival' && <SurvivalTab language={language} />}
        {activeTab === 'species' && <SpeciesDatabase />}
        {activeTab === 'map' && <MapReader />}
        {activeTab === 'culture' && <CultureTab language={language} />}
      </main>

      {/* Modern Bottom Navigation */}
      <nav className="relative bg-stone-950/90 backdrop-blur-2xl border-t border-stone-800/60 shrink-0 pb-safe z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent pointer-events-none" />
        <div className="relative flex justify-around items-center px-2 py-3 sm:px-6">
          <NavButton 
            id="survival" 
            icon={<Droplet size={22} strokeWidth={activeTab === 'survival' ? 2.5 : 2} />} 
            label={language === 'en' ? 'Survival' : 'Manual'} 
            active={activeTab === 'survival'} 
            onClick={() => setActiveTab('survival')} 
          />
          <NavButton 
            id="species" 
            icon={<Heart size={22} strokeWidth={activeTab === 'species' ? 2.5 : 2} />} 
            label={language === 'en' ? 'Flora/Fauna' : 'Flora/Fauna'} 
            active={activeTab === 'species'} 
            onClick={() => setActiveTab('species')} 
          />
          <NavButton 
            id="map" 
            icon={<Compass size={22} strokeWidth={activeTab === 'map' ? 2.5 : 2} />} 
            label={language === 'en' ? 'Map' : 'Mapa'} 
            active={activeTab === 'map'} 
            onClick={() => setActiveTab('map')} 
          />
          <NavButton 
            id="culture" 
            icon={<Scale size={22} strokeWidth={activeTab === 'culture' ? 2.5 : 2} />} 
            label={language === 'en' ? 'Culture' : 'Cultura'} 
            active={activeTab === 'culture'} 
            onClick={() => setActiveTab('culture')} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ id, icon, label, active, onClick }: { id: string, icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  void id;
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      className="relative flex flex-col items-center justify-center p-2 min-w-[72px] transition-all duration-300 group outline-none"
    >
      <div className={`relative mb-1.5 transition-transform duration-300 ${active ? '-translate-y-1 text-lime-400' : 'text-stone-500 group-hover:text-stone-300'}`}>
        {icon}
        {active && (
          <div className="absolute -inset-2 bg-lime-500/20 rounded-full blur-md -z-10" />
        )}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${active ? 'text-lime-400 translate-y-0 opacity-100' : 'text-stone-500 translate-y-1 opacity-70 group-hover:text-stone-400'}`}>
        {label}
      </span>
      {active && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-lime-400 rounded-full shadow-[0_0_8px_rgba(132,204,22,1)]" />
      )}
    </button>
  );
}

export default App;
