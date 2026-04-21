import { useEffect, useState } from 'react';
import { ExternalLink, WifiOff, BookOpen, Cross, Sparkles, ScrollText, Languages } from 'lucide-react';

interface PulpitTabProps {
  language: 'en' | 'es';
}

const PULPIT_URL = 'https://preacherpulpit.com';

export default function PulpitTab({ language }: PulpitTabProps) {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  const t = (en: string, es: string) => (language === 'en' ? en : es);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const openInBrowser = () => {
    window.open(PULPIT_URL, '_blank', 'noopener,noreferrer');
  };

  const features = [
    {
      icon: BookOpen,
      title: t('NASB Bible Reader', 'Lector de Biblia NASB'),
      desc: t('Read the full Bible with verse navigation and study tools.', 'Lea la Biblia completa con navegación por versículo y herramientas de estudio.'),
    },
    {
      icon: ScrollText,
      title: t('Sermon Builder', 'Constructor de Sermones'),
      desc: t('Step-by-step wizard for biblically faithful sermon preparation.', 'Asistente paso a paso para preparación fiel de sermones.'),
    },
    {
      icon: Languages,
      title: t('Greek & Hebrew Study', 'Estudio de Griego y Hebreo'),
      desc: t('Understand the original languages behind your English Bible.', 'Entienda los idiomas originales detrás de su Biblia en inglés.'),
    },
    {
      icon: Sparkles,
      title: t('Cross-References', 'Referencias Cruzadas'),
      desc: t('See how Scripture interprets Scripture.', 'Vea cómo la Escritura interpreta la Escritura.'),
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-royal-800/70 via-obsidian-900/85 to-obsidian-950/90 border border-gold-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.1)]">
          {/* Ambient glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-royal-500/25 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          {/* Gold top hairline */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

          <div className="relative p-6 sm:p-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-950/60 border border-gold-400/25 mb-6">
              <Cross size={12} className="text-gold-300" strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-300/90">
                {t('Ministry Toolkit', 'Herramientas de Ministerio')}
              </span>
            </div>

            {/* Mark */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
                  <BookOpen size={26} className="text-obsidian-950" strokeWidth={2.5} />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gold-400/30 blur-xl -z-10" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-parchment-50 to-gold-300 leading-tight">
                  Preacher's Pulpit
                </h2>
                <p className="text-[11px] font-mono tracking-tight text-parchment-400 mt-0.5">
                  preacherpulpit.com
                </p>
              </div>
            </div>

            <p className="text-parchment-200 text-[15px] sm:text-base leading-relaxed mb-6 sm:mb-7">
              {t(
                "A complete Bible study and sermon preparation toolkit from Mercy Mobile and Port Orchard Church of Christ. NASB Bible reader, AI-assisted sermon builder, Greek & Hebrew word study, cross-references, commentaries, and export.",
                'Un conjunto completo de herramientas de estudio bíblico y preparación de sermones de Mercy Mobile y la Iglesia de Cristo de Port Orchard. Lector de Biblia NASB, constructor de sermones asistido por IA, estudio de palabras en griego y hebreo, referencias cruzadas, comentarios y exportación.'
              )}
            </p>

            {/* Primary CTA */}
            {online ? (
              <button
                onClick={openInBrowser}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:via-gold-300 hover:to-gold-400 text-obsidian-950 font-bold py-4 px-6 rounded-xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.6)] transition-all duration-300 tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-900"
              >
                <ExternalLink size={18} strokeWidth={2.75} />
                <span className="text-base">{t('Open Preacher\'s Pulpit', 'Abrir Preacher\'s Pulpit')}</span>
              </button>
            ) : (
              <div className="w-full bg-obsidian-950/60 border border-gold-400/20 rounded-xl p-4 flex items-center gap-3">
                <WifiOff size={20} className="text-gold-300 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gold-200">{t('Internet Required', 'Se Requiere Internet')}</p>
                  <p className="text-xs text-parchment-300 mt-0.5 leading-relaxed">
                    {t(
                      'Connect to the internet to access this ministry toolkit.',
                      'Conéctese a internet para acceder a estas herramientas ministeriales.'
                    )}
                  </p>
                </div>
              </div>
            )}

            <p className="text-center text-[11px] text-parchment-500 mt-4 tracking-wide">
              {t('Opens in your browser', 'Se abre en su navegador')}
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-obsidian-800/70 to-obsidian-900/80 border border-royal-800/50 rounded-2xl p-4 backdrop-blur-md hover:border-gold-400/25 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-royal-700 to-royal-900 border border-gold-400/20 flex items-center justify-center shrink-0 group-hover:border-gold-400/40 transition-colors">
                    <Icon size={16} className="text-gold-300" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-[15px] font-semibold text-parchment-50 leading-tight mb-1">
                      {f.title}
                    </h4>
                    <p className="text-xs text-parchment-300 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Attribution */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-parchment-500 leading-relaxed">
            {t('A free resource from', 'Un recurso gratuito de')}{' '}
            <span className="text-gold-300 font-semibold">Mercy Mobile</span>
            <span className="text-parchment-600 mx-1.5">·</span>
            <span className="text-parchment-400">Port Orchard Church of Christ</span>
          </p>
        </div>
      </div>
    </div>
  );
}
