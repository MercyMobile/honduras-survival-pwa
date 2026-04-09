import { useState } from 'react';
import { ChevronDown, ChevronUp, Droplet, Tent, Flame, Utensils, Heart, Compass, Radio, CheckCircle } from 'lucide-react';
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
    const saved = localStorage.getItem('survival-checklists');
    return saved ? JSON.parse(saved) : {};
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
    <div className="flex flex-col h-full bg-stone-950/50">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto border-b border-stone-800/60 bg-stone-950/80 p-3 gap-3 shrink-0 backdrop-blur-xl scrollbar-hide">
        {categories.map(cat => {
          const CatIcon = ICONS[cat.icon];
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenTopic(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-lime-500/20 to-lime-900/30 text-lime-400 border border-lime-500/30 shadow-[0_0_15px_rgba(132,204,22,0.15)]' 
                  : 'bg-stone-900/60 text-stone-500 hover:text-stone-300 hover:bg-stone-800/50 border border-stone-800/50'
              }`}
            >
              <CatIcon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-sm font-bold tracking-wide">{cat.title[language]}</span>
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
            <div key={topic.id} className={`bg-stone-900/80 rounded-3xl border transition-all duration-300 overflow-hidden shadow-lg backdrop-blur-md ${isOpen ? 'border-stone-700/80 shadow-xl' : 'border-stone-800/60 hover:border-stone-700/60'}`}>
              <button
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-stone-800/30 group"
              >
                <div className="flex-1">
                  <h3 className={`font-bold text-lg sm:text-xl transition-colors ${isOpen ? 'text-lime-400' : 'text-stone-200 group-hover:text-stone-100'}`}>
                    {topic.title[language]}
                  </h3>
                  {topic.checklist && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 max-w-[150px] h-1.5 bg-stone-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-lime-500 transition-all duration-500 ease-out"
                          style={{ width: `${topic.checklist.length > 0 ? (completedCount / topic.checklist.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-stone-500">
                        {completedCount}/{topic.checklist.length}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 ml-4">
                  {isComplete && <CheckCircle size={22} className="text-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.3)] rounded-full" />}
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-stone-800/80' : 'bg-stone-900'}`}>
                    {isOpen ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-500" />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-800/50 bg-stone-950/30">
                  {/* Content */}
                  <p className="text-base text-stone-300 leading-relaxed mb-6">{topic.content[language]}</p>

                  {/* Estimated Time & Materials */}
                  {(topic.estimatedTime || topic.materials) && (
                    <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4 sm:gap-8 shadow-inner">
                      {topic.estimatedTime && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-800/80 flex items-center justify-center shrink-0">
                            <span className="text-stone-400 text-xs font-bold">⏱</span>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-0.5">{language === 'en' ? 'Time' : 'Tiempo'}</p>
                            <p className="text-sm font-medium text-stone-300">{topic.estimatedTime}</p>
                          </div>
                        </div>
                      )}
                      {topic.materials && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-800/80 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-stone-400 text-xs font-bold">🛠</span>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">{language === 'en' ? 'Materials' : 'Materiales'}</p>
                            <ul className="text-sm text-stone-300 space-y-1">
                              {topic.materials.map((m, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className="w-1 h-1 rounded-full bg-stone-600" />
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
                    <div className="space-y-3 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 ml-1">{language === 'en' ? 'Action Checklist' : 'Lista de Verificación'}</h4>
                      {topic.checklist.map((item, idx) => {
                        const isChecked = progress[topic.id]?.[idx] || false;
                        return (
                          <label
                            key={idx}
                            className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                              isChecked 
                                ? 'bg-lime-900/10 border-lime-900/30' 
                                : 'bg-stone-900/50 border-stone-800/50 hover:bg-stone-800/50 hover:border-stone-700/50'
                            } ${item.critical ? 'border-red-900/30 bg-red-950/10 shadow-[inset_0_0_20px_rgba(239,68,68,0.03)]' : ''}`}
                          >
                            <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleChecklistToggle(topic.id, idx)}
                                className="peer appearance-none w-5 h-5 rounded border border-stone-600 checked:bg-lime-500 checked:border-lime-500 focus:ring-2 focus:ring-lime-500/30 transition-all cursor-pointer"
                              />
                              <CheckCircle size={14} className="absolute text-stone-900 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                            </div>
                            <span className={`text-sm leading-relaxed transition-all ${isChecked ? 'text-stone-500 line-through' : 'text-stone-300'}`}>
                              {item.text[language]}
                            </span>
                            {item.critical && !isChecked && (
                              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-1 rounded-md">Critical</span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* Steps */}
                  {topic.steps && (
                    <div className="space-y-4 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 ml-1">{language === 'en' ? 'Step by Step' : 'Paso a Paso'}</h4>
                      {topic.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-stone-900/40 rounded-2xl border border-stone-800/40">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-800 border border-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold shadow-inner">
                            {idx + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm text-stone-300 leading-relaxed">{step.text[language]}</p>
                            {step.warning && (
                              <div className="mt-3 p-3 bg-red-950/30 border border-red-900/30 rounded-xl flex gap-2 items-start">
                                <span className="text-red-500 shrink-0">⚠️</span>
                                <p className="text-sm text-red-200/90 leading-relaxed">
                                  {step.warning[language]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Biblical Principle */}
                  {topic.biblicalPrinciple && (
                    <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-amber-950/40 to-stone-900/80 border border-amber-900/30 rounded-2xl p-5 shadow-lg">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-amber-500/70 mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
                        {language === 'en' ? 'Biblical Principle' : 'Principio Bíblico'}
                      </h4>
                      <p className="text-xs font-bold text-amber-400 mb-1.5">
                        {topic.biblicalPrinciple.verse}
                      </p>
                      <p className="text-sm text-amber-100/90 italic mb-4 leading-relaxed">
                        "{topic.biblicalPrinciple.text[language]}"
                      </p>
                      <div className="bg-amber-950/40 rounded-xl p-3 border border-amber-900/20">
                        <p className="text-xs text-amber-200/80 leading-relaxed">
                          <span className="font-bold text-amber-500/80 mr-2">{language === 'en' ? 'Application:' : 'Aplicación:'}</span>
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
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-stone-900/30 rounded-3xl border border-stone-800/50 border-dashed">
            <div className="w-16 h-16 rounded-full bg-stone-800/50 flex items-center justify-center mb-4">
              <span className="text-2xl opacity-50">🏕️</span>
            </div>
            <h4 className="text-stone-300 font-semibold mb-2">
              {language === 'en' ? 'No topics available' : 'No hay tópicos disponibles'}
            </h4>
            <p className="text-stone-500 text-sm max-w-[250px]">
              {language === 'en' ? 'Check back later for updates in this category.' : 'Vuelve más tarde para ver actualizaciones.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
