import { useEffect, useRef, useState } from 'react';
import { ExternalLink, RefreshCw, WifiOff, Church, BookOpen } from 'lucide-react';

interface PulpitTabProps {
  language: 'en' | 'es';
}

const PULPIT_URL = 'https://preacherpulpit.com';

export default function PulpitTab({ language }: PulpitTabProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'blocked'>('loading');
  const [iframeKey, setIframeKey] = useState(0); // bump to force reload
  const blockTimerRef = useRef<number | null>(null);

  const t = (en: string, es: string) => (language === 'en' ? en : es);

  // Track connectivity
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

  // Detect iframe blocking: if `load` doesn't fire within 8s, assume blocked
  useEffect(() => {
    if (!online) return;
    setLoadState('loading');
    // Clear any previous timer
    if (blockTimerRef.current) window.clearTimeout(blockTimerRef.current);
    blockTimerRef.current = window.setTimeout(() => {
      // If still loading after 8s, treat as blocked/failed
      setLoadState((current) => (current === 'loading' ? 'blocked' : current));
    }, 8000);
    return () => {
      if (blockTimerRef.current) window.clearTimeout(blockTimerRef.current);
    };
  }, [iframeKey, online]);

  const handleIframeLoad = () => {
    // Fires when iframe successfully renders the target page.
    // Note: cross-origin frames can't be introspected, but `load` firing
    // at all is a good enough signal the host didn't block it.
    if (blockTimerRef.current) window.clearTimeout(blockTimerRef.current);
    setLoadState('loaded');
  };

  const handleReload = () => {
    setIframeKey((k) => k + 1);
  };

  const openInBrowser = () => {
    window.open(PULPIT_URL, '_blank', 'noopener,noreferrer');
  };

  // Offline screen
  if (!online) {
    return (
      <div className="flex flex-col h-full">
        <PulpitHeader language={language} onReload={handleReload} onOpen={openInBrowser} disabled />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md text-center bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/90 border border-royal-800/60 rounded-2xl p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-royal-700 to-royal-900 flex items-center justify-center border border-gold-400/30">
              <WifiOff size={28} className="text-gold-300" strokeWidth={2} />
            </div>
            <h3 className="font-display text-xl font-semibold text-gold-200 mb-2">
              {t('Internet Required', 'Se Requiere Internet')}
            </h3>
            <p className="text-parchment-300 text-sm leading-relaxed">
              {t(
                "Preacher's Pulpit is an online Bible study and sermon preparation toolkit. Connect to the internet to access it.",
                "Preacher's Pulpit es una herramienta en línea para estudio bíblico y preparación de sermones. Conéctese a internet para acceder."
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PulpitHeader language={language} onReload={handleReload} onOpen={openInBrowser} />

      <div className="flex-1 relative bg-obsidian-950">
        {/* Loading overlay */}
        {loadState === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950/90 backdrop-blur-sm z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-royal-700 border-t-gold-400 animate-spin" />
              <p className="text-parchment-300 text-sm font-medium">
                {t("Loading Preacher's Pulpit…", 'Cargando Preacher\'s Pulpit…')}
              </p>
            </div>
          </div>
        )}

        {/* Blocked fallback */}
        {loadState === 'blocked' ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 overflow-y-auto">
            <div className="max-w-md w-full text-center bg-gradient-to-br from-royal-800/60 via-obsidian-900/80 to-obsidian-950/90 border border-gold-400/30 rounded-2xl p-8 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal-500/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
                  <BookOpen size={28} className="text-obsidian-950" strokeWidth={2.5} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-300/90 mb-2">
                  {t('External Ministry Tool', 'Herramienta Ministerial Externa')}
                </p>
                <h3 className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-parchment-50 to-gold-300 mb-3">
                  Preacher's Pulpit
                </h3>
                <p className="text-parchment-300 text-sm leading-relaxed mb-6">
                  {t(
                    'This tool opens best in your browser. Tap below to launch the full Bible study and sermon preparation toolkit.',
                    'Esta herramienta funciona mejor en su navegador. Toque abajo para abrir el conjunto completo de estudio bíblico y preparación de sermones.'
                  )}
                </p>

                <button
                  onClick={openInBrowser}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:via-gold-300 hover:to-gold-400 text-obsidian-950 font-bold py-3.5 px-5 rounded-xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.55)] transition-all duration-300 tracking-wide"
                >
                  <ExternalLink size={18} strokeWidth={2.5} />
                  <span>{t('Open Preacher\'s Pulpit', 'Abrir Preacher\'s Pulpit')}</span>
                </button>

                <button
                  onClick={handleReload}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-obsidian-800/60 hover:bg-obsidian-700/70 text-parchment-200 hover:text-gold-200 border border-royal-800/60 hover:border-gold-400/30 font-semibold py-3 px-5 rounded-xl transition-all duration-300 text-sm"
                >
                  <RefreshCw size={15} strokeWidth={2} />
                  <span>{t('Try Again', 'Intentar de Nuevo')}</span>
                </button>

                <p className="mt-6 text-[11px] text-parchment-500 font-mono tracking-tight">
                  preacherpulpit.com
                </p>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={PULPIT_URL}
            title="Preacher's Pulpit"
            onLoad={handleIframeLoad}
            className="absolute inset-0 w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  );
}

function PulpitHeader({
  language,
  onReload,
  onOpen,
  disabled = false,
}: {
  language: 'en' | 'es';
  onReload: () => void;
  onOpen: () => void;
  disabled?: boolean;
}) {
  const t = (en: string, es: string) => (language === 'en' ? en : es);
  return (
    <div className="relative shrink-0 bg-obsidian-900/80 backdrop-blur-xl border-b border-royal-800/50 px-4 py-2.5 flex items-center justify-between gap-3 z-10">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-royal-700 to-royal-900 flex items-center justify-center shrink-0 border border-gold-400/30">
          <Church size={14} className="text-gold-300" strokeWidth={2.25} />
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold text-gold-200 truncate leading-tight">
            Preacher's Pulpit
          </p>
          <p className="text-[10px] font-mono tracking-tight text-parchment-400 truncate">
            preacherpulpit.com
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onReload}
          disabled={disabled}
          aria-label={t('Reload', 'Recargar')}
          className="p-2 rounded-lg bg-obsidian-800/60 hover:bg-obsidian-700/80 border border-royal-800/60 hover:border-gold-400/30 text-parchment-300 hover:text-gold-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RefreshCw size={14} strokeWidth={2.25} />
        </button>
        <button
          onClick={onOpen}
          aria-label={t('Open in browser', 'Abrir en navegador')}
          className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-700/30 hover:from-gold-400/30 hover:to-gold-700/40 border border-gold-400/40 hover:border-gold-400/60 text-gold-200 hover:text-gold-100 transition-all text-[11px] font-bold tracking-wide"
        >
          <ExternalLink size={13} strokeWidth={2.5} />
          <span className="hidden sm:inline">{t('Open', 'Abrir')}</span>
        </button>
      </div>
    </div>
  );
}
