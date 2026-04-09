import { Users, Route, ShieldCheck, MapPin, HeartHandshake } from 'lucide-react';
import { CULTURE_DATA } from '../data/cultureData';

const iconMap: Record<string, React.ElementType> = {
  HeartHandshake,
  Route,
  ShieldCheck,
  MapPin,
  Users
};

const sectionStyleMap: Record<string, { bg: string, iconColor: string, hover: string }> = {
  partnerships: { bg: 'bg-lime-500/10 border-lime-500/20', iconColor: 'text-lime-400', hover: 'hover:border-lime-500/40' },
  logistics: { bg: 'bg-amber-500/10 border-amber-500/20', iconColor: 'text-amber-400', hover: 'hover:border-amber-500/40' },
  opsec: { bg: 'bg-blue-500/10 border-blue-500/20', iconColor: 'text-blue-400', hover: 'hover:border-blue-500/40' },
  zones: { bg: 'bg-stone-500/10 border-stone-500/20', iconColor: 'text-stone-300', hover: 'hover:border-stone-500/40' },
  customs: { bg: 'bg-purple-500/10 border-purple-500/20', iconColor: 'text-purple-400', hover: 'hover:border-purple-500/40' }
};

export default function CultureTab({ language }: { language: 'en' | 'es' }) {
  return (
    <div className="p-4 space-y-6 pb-24 h-full bg-stone-950/50 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-100 mb-2 group-hover:text-lime-400 transition-colors">
          {language === 'en' ? 'Culture & Operations' : 'Cultura y Operaciones'}
        </h2>
        <p className="text-stone-400 text-sm">
          {language === 'en' 
            ? 'Essential operational intelligence, logistics, and social protocols for the Copán department.'
            : 'Inteligencia operativa esencial, logística y protocolos sociales para el departamento de Copán.'}
        </p>
      </div>

      <div className="space-y-6">
        {CULTURE_DATA.map((section) => {
          const IconComponent = iconMap[section.icon] || Users;
          const styles = sectionStyleMap[section.id] || sectionStyleMap.zones;

          return (
            <section 
              key={section.id} 
              className={`bg-stone-900/80 border ${styles.bg} rounded-3xl p-6 shadow-lg backdrop-blur-md relative overflow-hidden transition-all duration-300 ${styles.hover}`}
            >
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className={`p-2 rounded-xl border ${styles.bg}`}>
                  <IconComponent className={styles.iconColor} size={24} />
                </div>
                <h3 className="text-xl font-bold text-stone-200">
                  {section.title[language]}
                </h3>
              </div>
              
              <ul className="space-y-4 text-sm text-stone-300 leading-relaxed relative z-10">
                {section.items.map((item) => {
                  let dotColor = "bg-stone-500 shadow-[0_0_5px_rgba(120,113,108,0.5)]";
                  let titleColor = "text-stone-200";
                  
                  if (item.type === 'warning') {
                    dotColor = "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]";
                    titleColor = "text-amber-400";
                  } else if (item.type === 'success') {
                    dotColor = "bg-lime-500 shadow-[0_0_5px_rgba(132,204,22,0.5)]";
                    titleColor = "text-lime-400";
                  }

                  return (
                    <li key={item.id} className="flex gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${dotColor}`}></div>
                      <span>
                        <strong className={`${titleColor} block mb-1`}>{item.title[language]}</strong> 
                        {item.content[language]}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
