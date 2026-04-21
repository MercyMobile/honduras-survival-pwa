import { useState } from 'react';
import { ChevronDown, ChevronUp, Droplet, Tent, Flame, Utensils, Heart, Compass, Radio, CheckCircle, Clock, Wrench } from 'lucide-react';
import { SURVIVAL_DATA, CATEGORIES, type SurvivalCategory } from '../data/survivalData';

const ICONS: Record<string, React.ElementType> = {
  droplet: Droplet,
  tent: Tent,
  flame: Flame,
  utensils: Utensils,
  heart: Heart,
  compass: Compass,
  radio: Radio
};

interface SurvivalTabProps {
  language: 'en' | 'es';
}

interface ChecklistProgress {
  [topicId: string]: boolean[];
}

export default function SurvivalTab({ language }: SurvivalTabProps) {
  const [activeCategory, setActiveCategory] = useState<SurvivalCategory>('water');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [progress, setProgress] = useState<ChecklistProgress>(() => {
    try {
      const saved = localStorage.getItem('survival-checklists');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const categories = CATEGORIES;
  const topics = SURVIVAL_DATA.filter(t => t.category === activeCategory);

  const handleChecklistToggle = (topicId: string, itemIndex: number) => {
    setProgress(prev => {
      const topicProgress = prev[topicId] || [];
      const newProgress = [...topicProgress];
      newProgress[itemIndex] = !newProgress[itemIndex];
      const updated = { ...prev, [topicId]: newProgress };
      localStorage.setItem('survival-checklists', JSON.stringify(updated));
      return updated;
    });
  };

  const getCompletionCount = (topicId: string) => {
    const topicProgress = progress[topicId] || [];
    return topicProgress.filter(Boolean).length;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto border-b border-royal-800/50 bg-obsidian-900/60 backdrop-blur-xl p-3 gap-2 shrink-0 scrollbar-hide">
        {categories.map(cat => {
          const CatIcon = ICONS[cat.icon];
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenTopic(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 border ${
                isActive
                  ? 'bg-gradient-to-br from-royal-700/80 to-royal-900/80 text-gold-200 border-gold-400/40 shadow-[0_0_20px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(212,175,55,0.1)]'
                  : 'bg-obsidian-800/50 text-parchment-400 hover:text-parchment-100 hover:bg-obsidian-700/60 border-royal-800/40 hover:border-royal-700/60'
              }`}
            >
              <CatIcon size={17} strokeWidth={isActive ? 2.25 : 1.75} />
              <span className="text-sm font-semibold tracking-wide">{cat.title[language]}</span>
            </button>
          );
        })}
      </div>

      {/* Topics List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 pb-24">
        {topics.map(topic => {
          const isOpen = openTopic === topic.id;
          const completedCount = topic.checklist ? getCompletionCount(topic.id) : 0;
          const isComplete = topic.checklist && completedCount === topic.checklist.length && topic.checklist.length > 0;

          return (
            <div
              key={topic.id}
              className={`relative bg-gradient-to-br from-obsidian-800/80 to-obsidian-900/80 rounded-2xl border transition-all duration-300 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md ${
                isOpen
                  ? 'border-gold-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_0_1px_rgba(212,175,55,0.1)]'
                  : 'border-royal-800/50 hover:border-royal-700/60'
              }`}
            >
              {/* Top accent line when open */}
              {isOpen && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
              )}

              <button
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-royal-900/20 group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display font-semibold text-lg sm:text-xl transition-colors leading-tight ${isOpen ? 'text-gold-200' : 'text-parchment-100 group-hover:text-gold-200'}`}>
                    {topic.title[language]}
                  </h3>
                  {topic.checklist && (
                    <div className="flex items-center gap-2 mt-2.5">
                      <div className="flex-1 max-w-[150px] h-1 bg-obsidian-950/80 rounded-full overflow-hidden border border-royal-900/60">
                        <div
                          className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-500 ease-out"
                          style={{ width: `${topic.checklist.length > 0 ? (completedCount / topic.checklist.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-parchment-400">
                        {completedCount}/{topic.checklist.length}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  {isComplete && (
                    <div className="relative">
                      <CheckCircle size={22} className="text-gold-300" strokeWidth={2.25} />
                      <div className="absolute inset-0 bg-gold-400/40 rounded-full blur-md -z-10" />
                    </div>
                  )}
                  <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-royal-700/60 border border-gold-400/30' : 'bg-obsidian-900/80 border border-royal-800/50'}`}>
                    {isOpen
                      ? <ChevronUp size={18} className="text-gold-300" strokeWidth={2.25} />
                      : <ChevronDown size={18} className="text-parchment-400" strokeWidth={2} />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-royal-800/40 bg-obsidian-950/40">
                  {/* Content */}
                  <p className="text-[15px] text-parchment-200 leading-relaxed mb-6">{topic.content[language]}</p>

                  {/* Estimated Time & Materials */}
                  {(topic.estimatedTime || topic.materials) && (
                    <div className="bg-obsidian-900/70 border border-royal-800/50 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-5 sm:gap-8">
                      {topic.estimatedTime && (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal-700 to-royal-900 flex items-center justify-center shrink-0 border border-gold-400/20">
                            <Clock size={15} className="text-gold-300" strokeWidth={2.25} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400/80 mb-0.5">{language === 'en' ? 'Time' : 'Tiempo'}</p>
                            <p className="text-sm font-medium text-parchment-100">{topic.estimatedTime}</p>
                          </div>
                        </div>
                      )}
                      {topic.materials && (
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-royal-700 to-royal-900 flex items-center justify-center shrink-0 mt-0.5 border border-gold-400/20">
                            <Wrench size={15} className="text-gold-300" strokeWidth={2.25} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400/80 mb-1.5">{language === 'en' ? 'Materials' : 'Materiales'}</p>
                            <ul className="text-sm text-parchment-200 space-y-1">
                              {topic.materials.map((m, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold-400/70" />
                                  {m[language]}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Checklist */}
                  {topic.checklist && (
                    <div className="space-y-2.5 mb-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-400/80 mb-3 ml-1">{language === 'en' ? 'Action Checklist' : 'Lista de Verificación'}</h4>
                      {topic.checklist.map((item, idx) => {
                        const isChecked = progress[topic.id]?.[idx] || false;
                        return (
                          <label
                            key={idx}
                            className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                              isChecked
                                ? 'bg-gold-400/5 border-gold-400/25'
                                : 'bg-obsidian-900/60 border-royal-800/50 hover:bg-obsidian-800/70 hover:border-royal-700/60'
                            } ${item.critical && !isChecked ? 'border-red-500/30 bg-red-950/15 shadow-[inset_0_0_20px_rgba(239,68,68,0.04)]' : ''}`}
                          >
                            <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleChecklistToggle(topic.id, idx)}
                                className="peer appearance-none w-5 h-5 rounded-md border border-royal-700 bg-obsidian-950 checked:bg-gradient-to-br checked:from-gold-300 checked:to-gold-500 checked:border-gold-400 focus:ring-2 focus:ring-gold-400/40 transition-all cursor-pointer shadow-inner"
                              />
                              <CheckCircle size={13} className="absolute text-obsidian-950 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                            </div>
                            <span className={`text-sm leading-relaxed transition-all flex-1 ${isChecked ? 'text-parchment-500 line-through' : 'text-parchment-200'}`}>
                              {item.text[language]}
                            </span>
                            {item.critical && !isChecked && (
                              <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.15em] text-red-300 bg-red-500/15 border border-red-500/30 px-2 py-1 rounded-md shrink-0">Critical</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* Steps */}
                  {topic.steps && (
                    <div className="space-y-3 mb-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-400/80 mb-3 ml-1">{language === 'en' ? 'Step by Step' : 'Paso a Paso'}</h4>
                      {topic.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-obsidian-900/60 rounded-xl border border-royal-800/50">
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-royal-700 via-royal-800 to-royal-900 border border-gold-400/30 text-gold-300 flex items-center justify-center text-sm font-bold font-display shadow-[inset_0_1px_0_rgba(212,175,55,0.2)]">
                            {idx + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm text-parchment-200 leading-relaxed">{step.text[language]}</p>
                            {step.warning && (
                              <div className="mt-3 p-3 bg-red-950/30 border border-red-500/30 rounded-lg flex gap-2 items-start">
                                <span className="text-red-400 shrink-0">⚠️</span>
                                <p className="text-sm text-red-100/90 leading-relaxed">
                                  {step.warning[language]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Biblical Principle - keep warm amber feel but harmonize with theme */}
                  {topic.biblicalPrinciple && (
                    <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-gold-800/30 via-royal-900/60 to-obsidian-900/80 border border-gold-400/30 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-royal-500/15 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />
                      <h4 className="relative text-[10px] uppercase tracking-[0.25em] font-bold text-gold-300 mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                        {language === 'en' ? 'Biblical Principle' : 'Principio Bíblico'}
                      </h4>
                      <p className="relative font-display text-sm font-bold text-gold-200 mb-2">
                        {topic.biblicalPrinciple.verse}
                      </p>
                      <p className="relative text-[15px] text-gold-100/90 italic mb-4 leading-relaxed font-display">
                        "{topic.biblicalPrinciple.text[language]}"
                      </p>
                      <div className="relative bg-obsidian-950/50 rounded-xl p-3.5 border border-gold-400/15">
                        <p className="text-xs text-parchment-200 leading-relaxed">
                          <span className="font-bold text-gold-300 mr-2 tracking-wide">{language === 'en' ? 'Application:' : 'Aplicación:'}</span>
                          {topic.biblicalPrinciple.application[language]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {topics.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-obsidian-800/40 rounded-2xl border border-royal-800/50 border-dashed">
            <div className="w-16 h-16 rounded-full bg-obsidian-900/80 flex items-center justify-center mb-4 border border-royal-800/60">
              <span className="text-2xl opacity-60">🏕️</span>
            </div>
            <h4 className="font-display text-parchment-100 font-semibold mb-2">
              {language === 'en' ? 'No topics available' : 'No hay tópicos disponibles'}
            </h4>
            <p className="text-parchment-400 text-sm max-w-[250px]">
              {language === 'en' ? 'Check back later for updates in this category.' : 'Vuelve más tarde para ver actualizaciones.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
