import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Environmental Classification',
    content: `The interior of Honduras is a geographically complex environment characterized by high-altitude mountain ranges, dense tropical rainforests, and semi-arid corridors. Approximately 80% of the national territory is composed of highlands that rise to elevations of 2,849 meters, creating a diverse matrix of microclimates that present unique challenges for survival operations.\n\nLa Mosquitia, located in the northeast, represents the most significant tract of untouched wilderness. Conversely, the southern "Dry Corridor" represents an area of extreme vulnerability.`
  },
  {
    title: 'Water Procurement',
    content: `Water is the primary logistical constraint in the Honduran wilderness. While the country possesses extensive river systems, availability is inconsistent. \n\nKarst Topography: Look for "losing streams" where surface water is diverted into the bedrock. Assume any water emerging from a karst spring or cave entrance is contaminated by surface activities.\n\nBotanical Water Sources: \n- Water Vines (Lianas): Species such as Vitis tiliifolia (Caribbean grape) are known for discharging abundant, drinkable water.\n- Palm Stalks: The flowering stalks of buri, coconut, and nipa palms contain a sugary fluid.\n\nAll wild-sourced water in Honduras should be treated.`
  },
  {
    title: 'Shelter Engineering',
    content: `In the Honduran environment, a shelter must provide protection from three primary elements: high-volume precipitation, ground-level hazards (insects, snakes, and dampness), and high humidity.\n\nElevated Platform Construction: Because the forest floor is often saturated and serves as the primary habitat for the Fer-de-lance, an elevated platform is the standard military and survival recommendation. Foundational framework using four sturdy trees, horizontal cross-beams lashed at waist height, and bamboo decking.`
  },
  {
    title: 'Fire Craft',
    content: `Fire serves as a critical multi-purpose tool in the jungle: it purifies water, cooks food, dries clothing, signals for rescue, and provides a psychological deterrent against predators. However, the 90% humidity makes fire-starting exceptionally difficult.\n\nTinder: Seek out the inner bark of standing dead trees or find resinous pine "fatwood" in the highlands. Always build the fire on a raised platform or a base of wet logs to prevent the damp ground from wicking away the heat.`
  },
  {
    title: 'Foraging & Hunting',
    content: `Honduras offers significant caloric potential for the informed survivor, but proper identification is vital to avoid toxicity.\n\nEdible Flora:\n- Avocado (Persea americana): High fat and protein content.\n- Maya Nut (Brosimum alicastrum): Highly nutritious.\n- Guava (Psidium guajava)\n\nToxic Indicators:\n- Milky Sap: Common in the Apocynaceae and Euphorbiaceae families. Causes skin irritation, blindness, and systemic poisoning.`
  },
  {
    title: 'Wilderness Medicine',
    content: `The tropical environment of Honduras facilitates the rapid development of infections and host several highly venomous species.\n\nOphidian Envenomation (Vipers and Elapids): Fer-de-lance and Coral Snakes. Immobilize, keep limb at or slightly below heart level, and evacuate.\n\nImmersion Syndromes: Trench Foot (Tropical Immersion Foot) caused by prolonged exposure to damp conditions. Dry feet completely at night.`
  },
  {
    title: 'Navigation & Signaling',
    content: `Navigation in the Honduran rainforest is complicated by the dense "green wall" and the triple-canopy forest, which can obscure the sun and stars.\n\nOrienteering: Use a compass to maintain a constant bearing. Use "blazes" or "cairns" to mark trails. Following water downstream is a viable strategy for finding settlements.\n\nEmergency Signaling: Signal Mirror (flash can be seen for dozens of miles), Smoke Signals (three columns), Audible Signals (whistle blast).`
  }
];

export default function SurvivalManual() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold border-b border-stone-700 pb-2 mb-4 text-lime-400">Technical Manual</h2>
      {SECTIONS.map((section, idx) => (
        <div key={idx} className="bg-stone-800 rounded-lg overflow-hidden border border-stone-700">
          <button 
            className="w-full flex items-center justify-between p-4 text-left font-bold text-stone-200 hover:bg-stone-750 transition-colors focus:outline-none"
            onClick={() => setOpenSection(openSection === idx ? null : idx)}
          >
            <span>{section.title}</span>
            {openSection === idx ? <ChevronUp size={20} className="shrink-0 ml-4" /> : <ChevronDown size={20} className="shrink-0 ml-4" />}
          </button>
          {openSection === idx && (
            <div className="p-4 pt-0 text-sm text-stone-300 leading-relaxed whitespace-pre-wrap border-t border-stone-700 bg-stone-900/50">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}