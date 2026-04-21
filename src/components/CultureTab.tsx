import { Users, Route, ShieldCheck, MapPin, HeartHandshake } from 'lucide-react';
import { CULTURE_DATA } from '../data/cultureData';

const iconMap: Record<string, React.ElementType> = {
  HeartHandshake,
  Route,
  ShieldCheck,
  MapPin,
  Users
};

const sectionStyleMap: Record<string, { iconBg: string, iconColor: string, accent: string, glow: string }> = {
  partnerships: { iconBg: 'from-gold-500/30 to-gold-700/30', iconColor: 'text-gold-300', accent: 'border-gold-400/30', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.08)]' },
  logistics: { iconBg: 'from-amber-500/30 to-amber-800/30', iconColor: 'text-amber-300', accent: 'border-amber-500/25', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.06)]' },
  opsec: { iconBg: 'from-sky-500/30 to-sky-800/30', iconColor: 'text-sky-300', accent: 'border-sky-500/25', glow: 'shadow-[0_0_30px_rgba(56,189,248,0.06)]' },
  zones: { iconBg: 'from-royal-500/30 to-royal-800/30', iconColor: 'text-royal-300', accent: 'border-royal-500/30', glow: 'shadow-[0_0_30px_rgba(124,58,237,0.08)]' },
  customs: { iconBg: 'from-fuchsia-500/30 to-fuchsia-900/30', iconColor: 'text-fuchsia-300', accent: 'border-fuchsia-500/25', glow: 'shadow-[0_0_30px_rgba(232,121,249,0.06)]' }
};

export default function CultureTab({ language }: { language: 'en' | 'es' }) {
  return (
    <div className="p-4 sm:p-6 space-y-6 pb-24 h-full overflow-y-auto">
      {/* Hero */}
      <div className="relative mb-2 overflow-hidden rounded-2xl bg-gradient-to-br from-royal-800/60 via-obsidian-900/80 to-obsidian-950/80 border border-royal-800/50 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-royal-500/15 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-300/90 mb-2">
            {language === 'en' ? 'Field Intelligence' : 'Inteligencia de Campo'}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-parchment-50 to-gold-300 leading-tight">
            {language === 'en' ? 'Culture & Operations' : 'Cultura y Operaciones'}
          </h2>
          <p className="text-parchment-300 text-sm sm:text-[15px] leading-relaxed max-w-2xl">
            {language === 'en'
              ? 'Essential operational intelligence, logistics, and social protocols for the Copán department.'
              : 'Inteligencia operativa esencial, logística y protocolos sociales para el departamento de Copán.'}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {CULTURE_DATA.map((section) => {
          const IconComponent = iconMap[section.icon] || Users;
          const styles = sectionStyleMap[section.id] || sectionStyleMap.zones;

          return (
            <section
              key={section.id}
              className={`relative bg-gradient-to-br from-obsidian-800/85 to-obsidian-900/90 border border-royal-800/50 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-gold-400/25 ${styles.glow} hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(212,175,55,0.08)] overflow-hidden`}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${styles.accent.replace('border-', 'via-')} to-transparent opacity-60`} />

              <div className="flex items-center gap-3 mb-5 relative z-10">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${styles.iconBg} border ${styles.accent} shadow-inner`}>
                  <IconComponent className={styles.iconColor} size={22} strokeWidth={2} />
                </div>
                <h3 className="font-display text-xl font-semibold text-parchment-50 tracking-tight">
                  {section.title[language]}
                </h3>
              </div>

              <ul className="space-y-4 text-[15px] text-parchment-200 leading-relaxed relative z-10">
                {section.items.map((item) => {
                  let dotColor = "bg-royal-400 shadow-[0_0_6px_rgba(168,85,247,0.6)]";
                  let titleColor = "text-parchment-50";

                  if (item.type === 'warning') {
                    dotColor = "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)]";
                    titleColor = "text-amber-300";
                  } else if (item.type === 'success') {
                    dotColor = "bg-gold-300 shadow-[0_0_6px_rgba(212,175,55,0.8)]";
                    titleColor = "text-gold-200";
                  }

                  return (
                    <li key={item.id} className="flex gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${dotColor}`} />
                      <span className="flex-1">
                        <strong className={`${titleColor} block mb-1 font-semibold tracking-tight`}>{item.title[language]}</strong>
                        <span className="text-parchment-300">{item.content[language]}</span>
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
