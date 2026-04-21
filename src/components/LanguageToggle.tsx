import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'es';
  onToggle: () => void;
}

export default function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-obsidian-800/60 hover:bg-obsidian-700/80 border border-royal-800/60 hover:border-gold-400/40 transition-all duration-300 text-parchment-200 hover:text-gold-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
      aria-label="Toggle language"
    >
      <Globe size={15} className="text-gold-300/80 group-hover:text-gold-300 transition-colors" strokeWidth={2.25} />
      <span className="text-xs font-bold tracking-[0.15em]">{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
}
