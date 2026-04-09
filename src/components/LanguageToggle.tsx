import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'es';
  onToggle: () => void;
}

export default function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors text-stone-300"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span className="text-sm font-semibold">{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
}
