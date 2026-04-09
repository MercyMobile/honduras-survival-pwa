export type SurvivalCategory = 'water' | 'shelter' | 'fire' | 'food' | 'first-aid' | 'navigation' | 'signaling';
export type ContentType = 'checklist' | 'steps' | 'reference';

export interface ChecklistItem {
  text: { en: string; es: string };
  critical?: boolean;
}

export interface Step {
  text: { en: string; es: string };
  warning?: { en: string; es: string };
}

export interface BiblicalPrinciple {
  verse: string;
  text: { en: string; es: string };
  application: { en: string; es: string };
}

export interface SurvivalTopic {
  id: string;
  category: SurvivalCategory;
  title: { en: string; es: string };
  type: ContentType;
  content: {
    en: string;
    es: string;
  };
  checklist?: ChecklistItem[];
  steps?: Step[];
  materials?: { en: string; es: string }[];
  estimatedTime?: string;
  biblicalPrinciple?: BiblicalPrinciple;
}

export const SURVIVAL_DATA: SurvivalTopic[] = [
  {
    id: 'water-finding',
    category: 'water',
    title: { en: 'Finding Water', es: 'Encontrar Agua' },
    type: 'checklist',
    content: {
      en: 'Water is the top priority. You can survive 3 weeks without food but only 3 days without water.',
      es: 'El agua es la prioridad principal. Puedes sobrevivir 3 semanas sin comida pero solo 3 días sin agua.'
    },
    checklist: [
      { text: { en: 'Look for animal trails converging (animals need water daily)', es: 'Busque senderos de animales que convergen (los animales necesitan agua diariamente)' } },
      { text: { en: 'Search valley bottoms and ravines', es: 'Busque en el fondo de valles y quebradas' } },
      { text: { en: 'Listen for running water (stop and listen 2 minutes)', es: 'Escuche agua corriendo (pare y escuche 2 minutos)' } },
      { text: { en: 'Watch for insect swarms (indicates nearby water)', es: 'Observe enjambres de insectos (indica agua cercana)' } },
      { text: { en: 'Check for green vegetation in dry areas', es: 'Busque vegetación verde en áreas secas' } },
      { text: { en: 'Dig in dry stream beds (water may be below surface)', es: 'Cave en lechos de arroyos secos (el agua puede estar bajo la superficie)' } },
      { critical: true, text: { en: 'Avoid water near mining areas or agricultural runoff', es: 'Evite agua cerca de minería o agricultura' } }
    ],
    biblicalPrinciple: {
      verse: 'Proverbs 14:15',
      text: { en: 'The prudent give thought to their steps', es: 'El prudente mira bien por sus pasos' },
      application: { en: 'Always verify water safety before drinking', es: 'Siempre verifique la seguridad del agua antes de beber' }
    }
  },
  {
    id: 'water-purification',
    category: 'water',
    title: { en: 'Water Purification', es: 'Purificación de Agua' },
    type: 'steps',
    estimatedTime: '10-30 minutes',
    materials: [
      { en: 'Fire source or purification tablets', es: 'Fuente de fuego o tabletas purificadoras' },
      { en: 'Container (bamboo, pot, coconut shell)', es: 'Recipiente (bamboo, olla, cáscara de coco)' }
    ],
    content: {
      en: 'ALL wild water in Honduras must be purified. Boiling is the most reliable method.',
      es: 'TODA el agua silvestre en Honduras debe purificarse. Hervir es el método más confiable.'
    },
    steps: [
      { text: { en: 'Filter water through cloth to remove debris', es: 'Filtre el agua a través de tela para eliminar escombros' } },
      { text: { en: 'Bring water to rolling boil', es: 'Lleve el agua a ebullición' } },
      { text: { en: 'Boil for 1-3 minutes (longer at altitude)', es: 'Hierva durante 1-3 minutos (más tiempo en altitud)' } },
      { text: { en: 'Let cool naturally - do not add ice', es: 'Deje enfriar naturalmente - no agregue hielo' } },
      { text: { en: 'Store in clean container', es: 'Guarde en recipiente limpio' }, warning: { en: 'Never drink untreated water - parasites are invisible', es: 'Nunca beba agua sin tratar - los parásitos son invisibles' } }
    ],
    biblicalPrinciple: {
      verse: '1 John 4:1',
      text: { en: 'Test the spirits to see whether they are from God', es: 'Probad los espíritus si son de Dios' },
      application: { en: 'Test your water - contamination is invisible but deadly', es: 'Pruebe su agua - la contaminación es invisible pero mortal' }
    }
  },
  {
    id: 'water-bamboo-filter',
    category: 'water',
    title: { en: 'Build Bamboo Water Filter', es: 'Construir Filtro de Bambú' },
    type: 'steps',
    estimatedTime: '20 minutes',
    materials: [
      { en: 'Bamboo stalk (30cm section)', es: 'Tallo de bambú (sección de 30cm)' },
      { en: 'Cloth, charcoal, sand, grass', es: 'Tela, carbón, arena, pasto' }
    ],
    content: {
      en: 'A bamboo filter removes sediment and some contaminants. ALWAYS purify water after filtering.',
      es: 'Un filtro de bambú elimina sedimentos y algunos contaminantes. SIEMPRE purifique el agua después de filtrar.'
    },
    steps: [
      { text: { en: 'Cut bamboo section 30cm long with node intact at bottom', es: 'Corte sección de bambú de 30cm con nudo intacto en el fondo' } },
      { text: { en: 'Punch small holes through the node for drainage', es: 'Perfore pequeños agujeros en el nudo para drenaje' } },
      { text: { en: 'Layer inside (bottom to top): grass 2cm, crushed charcoal 5cm, sand 5cm, cloth on top', es: 'Capas adentro (abajo a arriba): pasto 2cm, carbón triturado 5cm, arena 5cm, tela arriba' } },
      { text: { en: 'Pour water slowly through top layer', es: 'Vierta agua lentamente por la capa superior' } },
      { text: { en: 'Collect filtered water from bottom', es: 'Recoja agua filtrada del fondo' } },
      { text: { en: 'Filter is now ready to use', es: 'El filtro está listo para usar' }, warning: { en: 'ALWAYS boil or chemically treat after filtering - this only removes sediment', es: 'SIEMPRE hierva o trate químicamente después de filtrar - esto solo elimina sedimentos' } }
    ]
  },
  {
    id: 'shelter-site',
    category: 'shelter',
    title: { en: 'Shelter Site Selection', es: 'Selección de Sitio para Refugio' },
    type: 'checklist',
    content: {
      en: 'A good shelter site protects from rain, wind, insects, and ground hazards. Location is everything.',
      es: 'Un buen sitio de refugio protege de lluvia, viento, insectos y peligros del suelo. La ubicación lo es todo.'
    },
    checklist: [
      { text: { en: 'Look for level ground (test by lying down)', es: 'Busque terreno nivelado (pruebe acostándose)' } },
      { text: { en: 'Check above for dead branches (widowmakers)', es: 'Verifique arriba por ramas muertas' } },
      { text: { en: 'Avoid dry riverbeds (flash flood risk)', es: 'Evite lechos de ríos secos (riesgo de inundación)' } },
      { text: { en: 'Stay away from animal trails', es: 'Manténgase alejado de senderos de animales' } },
      { text: { en: 'Look for natural windbreaks (rock formations, dense vegetation)', es: 'Busque cortavientos naturales (formaciones rocosas, vegetación densa)' } },
      { text: { en: 'Check for ant hills or bee nests nearby', es: 'Verifique hormigueros o nidos de abejas cercanos' } },
      { critical: true, text: { en: 'Never camp under coconut palms - falling coconuts kill people', es: 'Nunca acampe bajo palmeras de coco - los cocos que caen matan personas' } }
    ],
    biblicalPrinciple: {
      verse: 'Matthew 7:24-25',
      text: { en: 'The wise man built his house upon the rock', es: 'El hombre prudente edificó su casa sobre la roca' },
      application: { en: 'Build on stable ground, avoid flood zones and falling hazards', es: 'Construya sobre terreno estable, evite zonas de inundación y peligros de caída' }
    }
  },
  {
    id: 'shelter-platform',
    category: 'shelter',
    title: { en: 'Build Elevated Platform', es: 'Construir Plataforma Elevada' },
    type: 'steps',
    estimatedTime: '45-60 minutes',
    materials: [
      { en: '4 sturdy trees in rectangle pattern', es: '4 árboles resistentes en patrón rectangular' },
      { en: 'Vines or cordage for lashing', es: 'Bejucos o cuerda para amarrar' },
      { en: 'Bamboo or straight branches for decking', es: 'Bambú o ramas rectas para el piso' }
    ],
    content: {
      en: 'An elevated platform protects from ground moisture, insects, snakes, and small animals. This is the standard shelter in Honduras rainforest.',
      es: 'Una plataforma elevada protege de humedad del suelo, insectos, serpientes y animales pequeños. Este es el refugio estándar en la selva de Honduras.'
    },
    steps: [
      { text: { en: 'Find 4 trees in rectangle pattern (about 2m x 1m)', es: 'Encuentre 4 árboles en patrón rectangular (aprox 2m x 1m)' } },
      { text: { en: 'Lash horizontal beams between trees at waist height', es: 'Amarrar vigas horizontales entre árboles a la altura de la cintura' } },
      { text: { en: 'Add cross-beams every 30cm for support', es: 'Agregue vigas transversales cada 30cm para soporte' } },
      { text: { en: 'Lay bamboo poles or branches across for flooring', es: 'Coloque polos de bambú o ramas a través para el piso' } },
      { text: { en: 'Test stability before sleeping - shake and press firmly', es: 'Pruebe estabilidad antes de dormir - sacuda y presione firmemente' } },
      { text: { en: 'Cover with tarp or palm fronds for rain protection', es: 'Cubra con lona o hojas de palma para protección de lluvia' }, warning: { en: 'Test each lashing - a collapse at night could injure you near snakes', es: 'Pruebe cada amarre - un colapso nocturno podría herirlo cerca de serpientes' } }
    ],
    biblicalPrinciple: {
      verse: 'Proverbs 27:17',
      text: { en: 'Iron sharpens iron', es: 'Hierro con hierro se aguza' },
      application: { en: 'Work methodically - each lashing supports the whole structure', es: 'Trabaje metódicamente - cada amarre soporta toda la estructura' }
    }
  },
  {
    id: 'fire-tinder',
    category: 'fire',
    title: { en: 'Collecting Tinder', es: 'Recolectar Yesca' },
    type: 'checklist',
    content: {
      en: 'Fire is critical for purification, cooking, warmth, and signaling. In 90% humidity, good tinder is essential.',
      es: 'El fuego es crítico para purificación, cocina, calor y señalización. En 90% humedad, buena yesca es esencial.'
    },
    checklist: [
      { text: { en: 'Inner bark of standing dead trees (dryest material)', es: 'Corteza interna de árboles muertos en pie (material más seco)' } },
      { text: { en: 'Pine resin/fatwood in highlands (burns even when wet)', es: 'Resina de pino en tierras altas (arde incluso mojada)' } },
      { text: { en: 'Dry palm fronds (crush to increase surface area)', es: 'Hojas de palma secas (triture para aumentar superficie)' } },
      { text: { en: 'Bird nests (abandoned, paper-fine material)', es: 'Nidos de pájaros (abandonados, material fino como papel)' } },
      { text: { en: 'Dry grass bundled tightly', es: 'Pasto seco atado firmemente' } },
      { critical: true, text: { en: 'Collect 3x more tinder than you think you need', es: 'Recoja 3 veces más yesca de lo que cree necesitar' } }
    ]
  },
  {
    id: 'fire-starting',
    category: 'fire',
    title: { en: 'Starting Fire in Humidity', es: 'Encender Fuego en Humedad' },
    type: 'steps',
    estimatedTime: '15-30 minutes',
    materials: [
      { en: 'Lighter, matches, or ferro rod', es: 'Encendedor, fósforos, o varilla ferro' },
      { en: 'Dry tinder bundle', es: 'Atado de yesca seca' },
      { en: 'Kindling (pencil-thin dry sticks)', es: 'Astillas (palos secos del grosor de lápiz)' }
    ],
    content: {
      en: 'High humidity makes fire starting difficult. Build on a platform to prevent ground moisture from killing your fire.',
      es: 'La alta humedad hace difícil encender fuego. Construya sobre plataforma para evitar que la humedad del suelo mate su fuego.'
    },
    steps: [
      { text: { en: 'Build fire base: 2-3 wet logs as platform', es: 'Construya base: 2-3 troncos húmedos como plataforma' } },
      { text: { en: 'Place tinder bundle on platform', es: 'Coloque atado de yesca en plataforma' } },
      { text: { en: 'Create spark or flame directly into tinder', es: 'Cree chispa o llama directamente en yesca' } },
      { text: { en: 'Gently blow at base of ember (oxygen feeds fire)', es: 'Sople suavemente en base de brasa (oxígeno alimenta fuego)' } },
      { text: { en: 'Add pencil-thin kindling when flame establishes', es: 'Agregue astillas delgadas cuando se establezca llama' } },
      { text: { en: 'Gradually add thicker wood as fire grows', es: 'Agregue madera más gruesa gradualmente mientras crece el fuego' } },
      { text: { en: 'Maintain fire with regular fuel additions', es: 'Mantenga fuego con adiciones regulares de combustible' }, warning: { en: 'Never leave fire unattended - jungle fires spread rapidly', es: 'Nunca deje fuego sin vigilancia - incendios de selva se propagan rápido' } }
    ],
    biblicalPrinciple: {
      verse: 'Matthew 5:14-15',
      text: { en: 'A city set on a hill cannot be hidden', es: 'Una ciudad sobre el monte no se puede esconder' },
      application: { en: 'Your fire signals hope and rescue - keep it visible', es: 'Su fuego señala esperanza y rescate - manténgalo visible' }
    }
  },
  {
    id: 'food-edible',
    category: 'food',
    title: { en: 'Edible Plants of Honduras', es: 'Plantas Comestibles de Honduras' },
    type: 'reference',
    content: {
      en: 'Honduras offers significant caloric resources for those who can identify safe plants. When in doubt, do not eat.',
      es: 'Honduras ofrece recursos calóricos significativos para quienes pueden identificar plantas seguras. En duda, no coma.'
    },
    biblicalPrinciple: {
      verse: 'Matthew 10:16',
      text: { en: 'Be wise as serpents and innocent as doves', es: 'Sed prudentes como serpientes y sencillos como palomas' },
      application: { en: 'When uncertain about a plant, choose caution over hunger', es: 'Cuando dude sobre una planta, elija cautela sobre hambre' }
    }
  },
  {
    id: 'first-aid-snake',
    category: 'first-aid',
    title: { en: 'Snake Bite Protocol', es: 'Protocolo de Mordedura de Serpiente' },
    type: 'steps',
    estimatedTime: 'Immediate action required',
    materials: [
      { en: 'Clean cloth or bandage', es: 'Paño limpio o venda' },
      { en: 'Splint material (sticks, bamboo)', es: 'Material para férula (palos, bambú)' }
    ],
    content: {
      en: 'Honduras has two dangerous snakes: Fer-de-lance (hemotoxic) and Coral Snake (neurotoxic). Both require immediate evacuation.',
      es: 'Honduras tiene dos serpientes peligrosas: Fer-de-lance (hemotóxica) y Coral (neurotóxica). Ambas requieren evacuación inmediata.'
    },
    steps: [
      { text: { en: 'Stay calm - panic increases heart rate and venom spread', es: 'Mantenga la calma - el pánico aumenta ritmo cardíaco y propagación de veneno' } },
      { text: { en: 'Immobilize victim completely', es: 'Inmovilice a la víctima completamente' } },
      { text: { en: 'Keep bite at or slightly below heart level', es: 'Mantenga mordedura a nivel o ligeramente debajo del corazón' } },
      { text: { en: 'Remove rings, watches, tight clothing near bite', es: 'Quite anillos, relojes, ropa ajustada cerca de mordedura' } },
      { text: { en: 'Mark edge of swelling with pen, note time', es: 'Marque borde de hinchazón con bolígrafo, anote hora' } },
      { text: { en: 'Evacuate immediately - carry victim if possible', es: 'Evacúe inmediatamente - cargue víctima si es posible' } },
      { text: { en: 'Monitor breathing and consciousness during evacuation', es: 'Monitoree respiración y conciencia durante evacuación' }, warning: { en: 'DO NOT use tourniquets, cut the wound, or suck venom - these cause more harm', es: 'NO use torniquetes, corte la herida, o succione veneno - causan más daño' } }
    ]
  },
  {
    id: 'navigation-compass',
    category: 'navigation',
    title: { en: 'Compass Navigation', es: 'Navegación con Brújula' },
    type: 'steps',
    estimatedTime: '5 minutes per bearing',
    materials: [
      { en: 'Compass', es: 'Brújula' },
      { en: 'Map (if available)', es: 'Mapa (si disponible)' }
    ],
    content: {
      en: 'Dense canopy can obscure sun and stars. A compass is your most reliable navigation tool in Honduras rainforest.',
      es: 'El dosel denso puede oscurecer sol y estrellas. Una brújula es su herramienta más confiable en la selva de Honduras.'
    },
    steps: [
      { text: { en: 'Hold compass flat in palm, away from metal', es: 'Sostenga brújula plana en palma, lejos de metal' } },
      { text: { en: 'Rotate bezel to align with desired bearing', es: 'Gire bisel para alinear con rumbo deseado' } },
      { text: { en: 'Turn body until needle aligns with orienting arrow', es: 'Gire cuerpo hasta que aguja se alinee con flecha orientadora' } },
      { text: { en: 'Sight a landmark in that direction (tree, rock)', es: 'Apunte un punto de referencia en esa dirección (árbol, roca)' } },
      { text: { en: 'Walk to landmark, repeat process', es: 'Camine al punto de referencia, repita proceso' } },
      { text: { en: 'Continue this process to maintain your bearing', es: 'Continúe este proceso para mantener su rumbo' }, warning: { en: 'Iron deposits can deflect compass - verify with multiple readings', es: 'Depósitos de hierro pueden desviar brújula - verifique con múltiples lecturas' } }
    ],
    biblicalPrinciple: {
      verse: 'Luke 14:28',
      text: { en: 'Count the cost before beginning', es: 'Calcula los gastos antes de comenzar' },
      application: { en: 'Plan your route before departing - navigation prevents getting lost', es: 'Planifique su ruta antes de salir - navegación evita perderse' }
    }
  },
  {
    id: 'signaling-mirror',
    category: 'signaling',
    title: { en: 'Signal Mirror Technique', es: 'Técnica de Espejo de Señal' },
    type: 'steps',
    estimatedTime: 'Instant when aircraft visible',
    materials: [
      { en: 'Mirror or reflective surface (phone screen, metal)', es: 'Espejo o superficie reflectiva (pantalla de teléfono, metal)' }
    ],
    content: {
      en: 'A signal mirror flash can be seen for 50+ miles. This is your best daytime rescue signaling method.',
      es: 'Un destello de espejo se puede ver a 50+ millas. Este es su mejor método de señalización de rescate diurno.'
    },
    steps: [
      { text: { en: 'Hold mirror close to eye', es: 'Sostenga espejo cerca del ojo' } },
      { text: { en: 'Sight target aircraft through reflection hole or over edge', es: 'Apunte aeronave a través de agujero de reflexión o sobre borde' } },
      { text: { en: 'Angle mirror so sunlight reflects toward target', es: 'Incline espejo para que luz solar se refleje hacia objetivo' } },
      { text: { en: 'Flash 3 times (international distress signal)', es: 'Destelle 3 veces (señal de socorro internacional)' } },
      { text: { en: 'Repeat every few minutes while aircraft visible', es: 'Repita cada pocos minutos mientras aeronave visible' } }
    ],
    biblicalPrinciple: {
      verse: 'Matthew 5:14',
      text: { en: 'You are the light of the world', es: 'Ustedes son la luz del mundo' },
      application: { en: 'Make yourself visible - rescue cannot come if they cannot find you', es: 'Hágase visible - el rescate no puede venir si no pueden encontrarlo' }
    }
  },
  {
    id: 'shelter-rainproof',
    category: 'shelter',
    title: { en: 'Build Rain-Proof Shelter', es: 'Construir Refugio a Prueba de Lluvia' },
    type: 'steps',
    estimatedTime: '30-45 minutes',
    materials: [
      { en: 'Large leaves (banana, palm, philodendron)', es: 'Hojas grandes (banano, palma, filodendro)' },
      { en: 'Vines or cordage', es: 'Bejucos o cuerda' },
      { en: 'Sturdy branches or bamboo', es: 'Ramas resistentes o bambú' }
    ],
    content: {
      en: 'Honduras receives 100+ inches of rain annually. A rain-proof shelter is essential for survival.',
      es: 'Honduras recibe más de 100 pulgadas de lluvia anualmente. Un refugio a prueba de lluvia es esencial para la supervivencia.'
    },
    steps: [
      { text: { en: 'Construct A-frame or lean-to frame with angled roof (45° minimum)', es: 'Construya marco A o inclinado con techo angulado (mínimo 45°)' } },
      { text: { en: 'Layer large leaves starting from bottom (like shingles)', es: 'Superponga hojas grandes comenzando desde abajo (como tejas)' } },
      { text: { en: 'Overlap each layer 50% to ensure water runs off', es: 'Superponga cada capa 50% para asegurar que el agua escurra' } },
      { text: { en: 'Secure leaves with vines woven through frame', es: 'Asegure hojas con bejucos tejidos a través del marco' } },
      { text: { en: 'Add extra layers on windward side', es: 'Agregue capas extra en el lado del viento' } },
      { text: { en: 'Build drainage trench around shelter perimeter', es: 'Construya zanja de drenaje alrededor del perímetro del refugio' } },
      { text: { en: 'Test by pouring water - any leak will flood during tropical storms', es: 'Pruebe vertiendo agua - cualquier fuga inundará durante tormentas tropicales' }, warning: { en: 'Check shelter integrity daily - storms can damage thatching', es: 'Verifique integridad del refugio diariamente - tormentas pueden dañar el techado' } }
    ]
  },
  {
    id: 'water-rain-catchment',
    category: 'water',
    title: { en: 'Build Rain Catchment System', es: 'Construir Sistema de Captación de Lluvia' },
    type: 'steps',
    estimatedTime: '20-30 minutes',
    materials: [
      { en: 'Large leaves (banana, heliconia)', es: 'Hojas grandes (banano, heliconia)' },
      { en: 'Clean containers (bottles, bamboo, coconut shells)', es: 'Recipientes limpios (botellas, bambú, cáscaras de coco)' },
      { en: 'Vines for securing', es: 'Bejucos para asegurar' }
    ],
    content: {
      en: 'Rainwater is the safest water source in Honduras. A good catchment system provides abundant clean water during wet season.',
      es: 'El agua de lluvia es la fuente más segura en Honduras. Un buen sistema de captación proporciona abundante agua limpia durante la temporada húmeda.'
    },
    steps: [
      { text: { en: 'Find large leaves with natural cup shape', es: 'Encuentre hojas grandes con forma de copa natural' } },
      { text: { en: 'Position leaves to channel water into container', es: 'Posicione hojas para canalizar agua al recipiente' } },
      { text: { en: 'Secure leaves to branches at angle', es: 'Asegure hojas a ramas en ángulo' } },
      { text: { en: 'Place clean container at lowest point', es: 'Coloque recipiente limpio en el punto más bajo' } },
      { text: { en: 'Cover container during first rain (washes debris)', es: 'Cubra recipiente durante primera lluvia (lava escombros)' } },
      { text: { en: 'Store collected water in covered containers', es: 'Guarde agua recolectada en recipientes cubiertos' } }
    ]
  },
  {
    id: 'first-aid-wounds',
    category: 'first-aid',
    title: { en: 'Treat Open Wounds', es: 'Tratar Heridas Abiertas' },
    type: 'steps',
    estimatedTime: '10-15 minutes',
    materials: [
      { en: 'Clean cloth or bandana', es: 'Paño limpio o pañuelo' },
      { en: 'Clean water', es: 'Agua limpia' },
      { en: 'Natural antiseptic (honey, crushed garlic if available)', es: 'Antiséptico natural (miel, ajo triturado si disponible)' }
    ],
    content: {
      en: 'In tropical environments, wounds become infected rapidly. Clean treatment within the first hour prevents most infections.',
      es: 'En ambientes tropicales, las heridas se infectan rápidamente. El tratamiento limpio dentro de la primera hora previene la mayoría de infecciones.'
    },
    steps: [
      { text: { en: 'Stop bleeding with direct pressure (15 minutes)', es: 'Detenga sangrado con presión directa (15 minutos)' } },
      { text: { en: 'Wash wound thoroughly with clean water', es: 'Lave la herida completamente con agua limpia' } },
      { text: { en: 'Remove all debris with clean tweezers or fingers', es: 'Remueva todos los escombros con pinzas limpias o dedos' } },
      { text: { en: 'Apply natural antiseptic if available (honey preferred)', es: 'Aplique antiséptico natural si está disponible (miel preferido)' } },
      { text: { en: 'Cover with cleanest available cloth', es: 'Cubra con el paño más limpio disponible' } },
      { text: { en: 'Change dressing twice daily, keep wound dry', es: 'Cambie vendaje dos veces al día, mantenga herida seca' } },
      { text: { en: 'Monitor for infection signs: increasing pain, swelling, red streaks', es: 'Monitoree señales de infección: dolor creciente, hinchazón, líneas rojas' }, warning: { en: 'Red streaks from wound = blood poisoning. EVACUATE IMMEDIATELY', es: 'Líneas rojas desde herida = envenenamiento de sangre. EVACÚE INMEDIATAMENTE' } }
    ]
  },
  {
    id: 'first-aid-diarrhea',
    category: 'first-aid',
    title: { en: 'Treat Diarrhea and Dehydration', es: 'Tratar Diarrea y Deshidratación' },
    type: 'steps',
    estimatedTime: 'Ongoing treatment',
    materials: [
      { en: 'Clean water', es: 'Agua limpia' },
      { en: 'Salt', es: 'Sal' },
      { en: 'Sugar or honey', es: 'Azúcar o miel' },
      { en: 'Rice (if available)', es: 'Arroz (si disponible)' }
    ],
    content: {
      en: 'Diarrhea kills through dehydration. Oral rehydration solution (ORS) is life-saving and easy to make.',
      es: 'La diarrea mata por deshidratación. La solución de rehidratación oral (SRO) salva vidas y es fácil de preparar.'
    },
    steps: [
      { text: { en: 'Mix ORS: 1 liter clean water + 6 tsp sugar + 0.5 tsp salt', es: 'Mezcle SRO: 1 litro agua limpia + 6 cdt azúcar + 0.5 cdt sal' } },
      { text: { en: 'Drink small amounts frequently (every 15 minutes)', es: 'Beba pequeñas cantidades frecuentemente (cada 15 minutos)' } },
      { text: { en: 'Monitor urine output - clear means adequate hydration', es: 'Monitoree producción de orina - clara significa hidratación adecuada' } },
      { text: { en: 'Eat plain rice or bananas to slow diarrhea', es: 'Coma arroz simple o bananas para frenar diarrea' } },
      { text: { en: 'Avoid caffeine, alcohol, fatty foods', es: 'Evite cafeína, alcohol, alimentos grasosos' } },
      { text: { en: 'Continue fluids even if vomiting - small sips absorb', es: 'Continúe líquidos aunque vomite - pequeños sorbos se absorben' }, warning: { en: 'Seek evacuation if diarrhea contains blood or lasts more than 3 days', es: 'Busque evacuación si la diarrea contiene sangre o dura más de 3 días' } }
    ],
    biblicalPrinciple: {
      verse: 'Matthew 10:42',
      text: { en: 'Give a cup of cold water to one of these little ones', es: 'Dad un vaso de agua fría a uno de estos pequeños' },
      application: { en: 'Simple clean water saves lives - never underestimate the power of basic care', es: 'Agua limpia simple salva vidas - nunca subestime el poder del cuidado básico' }
    }
  },
  {
    id: 'food-hunting-rodents',
    category: 'food',
    title: { en: 'Catch Small Game (Rodents)', es: 'Capturar Pequeños Animales (Roedores)' },
    type: 'steps',
    estimatedTime: '2-4 hours setup, check twice daily',
    materials: [
      { en: 'Snare wire or cordage', es: 'Alambre de trampa o cuerda' },
      { en: 'Bait (fruit, nuts, corn)', es: 'Cebo (fruta, nueces, maíz)' }
    ],
    content: {
      en: 'Rodents (agouti, paca, rabbits) are abundant and provide good protein. Trapping is more energy-efficient than hunting.',
      es: 'Los roedores (agutí, paca, conejos) son abundantes y proporcionan buena proteína. Las trampas son más eficientes energéticamente que la caza.'
    },
    steps: [
      { text: { en: 'Identify game trails (look for droppings, hair, paths)', es: 'Identifique senderos de animales (busque excrementos, pelo, caminos)' } },
      { text: { en: 'Set snare at natural funnel points (between rocks, under logs)', es: 'Coloque trampa en puntos de embudo naturales (entre rocas, bajo troncos)' } },
      { text: { en: 'Create loop just larger than your fist', es: 'Cree lazo apenas más grande que su puño' } },
      { text: { en: 'Place bait 10cm behind snare loop', es: 'Coloque cebo 10cm detrás del lazo de la trampa' } },
      { text: { en: 'Check traps at dawn and dusk', es: 'Revise trampas al amanecer y atardecer' } },
      { text: { en: 'Always cook all meat thoroughly - wild game carries parasites', es: 'Siempre cocine toda la carne completamente - la caza silvestre lleva parásitos' }, warning: { en: 'Never eat raw or undercooked wild meat', es: 'Nunca coma carne silvestre cruda o mal cocida' } }
    ]
  },
  {
    id: 'food-fishing',
    category: 'food',
    title: { en: 'Fish in Streams and Rivers', es: 'Pescar en Arroyos y Ríos' },
    type: 'steps',
    estimatedTime: '1-3 hours',
    materials: [
      { en: 'Line (vines, cordage, shoelaces)', es: 'Línea (bejucos, cuerda, cordones)' },
      { en: 'Hook (carved wood, bone, safety pin)', es: 'Anzuelo (madera tallada, hueso, imperdible)' },
      { en: 'Bait (worms, insects, fruit)', es: 'Cebo (gusanos, insectos, fruta)' }
    ],
    content: {
      en: 'Honduras streams contain tilapia, guapote, and other fish. Fishing provides reliable protein with minimal energy expenditure.',
      es: 'Los arroyos de Honduras contienen tilapia, guapote y otros peces. La pesca proporciona proteína confiable con gasto mínimo de energía.'
    },
    steps: [
      { text: { en: 'Find calm pools near river bends or under logs', es: 'Encuentre pozas tranquilas cerca de curvas del río o bajo troncos' } },
      { text: { en: 'Carve hook from hardwood or use safety pin bent into hook shape', es: 'Talle anzuelo de madera dura o use imperdible doblado en forma de gancho' } },
      { text: { en: 'Attach bait securely to hook (worms, insects work well)', es: 'Asegure cebo firmemente al anzuelo (gusanos, insectos funcionan bien)' } },
      { text: { en: 'Cast into pool and wait motionless', es: 'Lance a la poza y espere sin moverse' } },
      { text: { en: 'Pull steadily when you feel a bite', es: 'Hale constantemente cuando sienta un bocado' } },
      { text: { en: 'Gut and cook fish immediately over fire', es: 'Eviscere y cocine el pescado inmediatamente sobre fuego' } }
    ],
    biblicalPrinciple: {
      verse: 'Matthew 4:19',
      text: { en: 'I will make you fishers of men', es: 'Os haré pescadores de hombres' },
      application: { en: 'Patience and skill provide sustenance - fish sustain the body as you sustain the soul', es: 'La paciencia y habilidad proporcionan sustento - los peces sostienen el cuerpo mientras sostiene el alma' }
    }
  },
  {
    id: 'navigation-sun',
    category: 'navigation',
    title: { en: 'Navigate by Sun', es: 'Navegar por el Sol' },
    type: 'steps',
    estimatedTime: '5 minutes to establish, check hourly',
    materials: [
      { en: 'Stick (30cm long)', es: 'Palo (30cm de largo)' },
      { en: 'Small stones for marking', es: 'Piedras pequeñas para marcar' }
    ],
    content: {
      en: 'When compass fails, the sun provides reliable direction. In Honduras, sun rises in the east and sets in the west.',
      es: 'Cuando la brújula falla, el sol proporciona dirección confiable. En Honduras, el sol sale por el este y se pone por el oeste.'
    },
    steps: [
      { text: { en: 'Place stick upright in clear, flat ground', es: 'Coloque el palo vertical en terreno claro y plano' } },
      { text: { en: 'Mark tip of shadow with stone (first point)', es: 'Marque punta de la sombra con piedra (primer punto)' } },
      { text: { en: 'Wait 15 minutes, mark new shadow tip (second point)', es: 'Espere 15 minutos, marque nueva punta de sombra (segundo punto)' } },
      { text: { en: 'Draw line between marks - this runs East-West', es: 'Dibuje línea entre marcas - esto corre Este-Oeste' } },
      { text: { en: 'First mark is West, second is East (sun moves East to West)', es: 'Primera marca es Oeste, segunda es Este (el sol se mueve Este a Oeste)' } },
      { text: { en: 'Face East - North is to your left, South to your right', es: 'De frente al Este - Norte está a su izquierda, Sur a su derecha' } }
    ]
  },
  {
    id: 'signaling-smoke',
    category: 'signaling',
    title: { en: 'Build Smoke Signals', es: 'Construir Señales de Humo' },
    type: 'steps',
    estimatedTime: '30 minutes setup, use as needed',
    materials: [
      { en: 'Fire with good fuel supply', es: 'Fuego con buen suministro de combustible' },
      { en: 'Green vegetation (leaves, palm fronds)', es: 'Vegetación verde (hojas, frondas de palma)' },
      { en: 'Wet cloth or blanket', es: 'Tela húmeda o manta' }
    ],
    content: {
      en: 'Smoke signals work day or night. International distress signal is THREE columns of smoke.',
      es: 'Las señales de humo funcionan de día o noche. La señal de socorro internacional es TRES columnas de humo.'
    },
    steps: [
      { text: { en: 'Build fire in open, elevated area visible from distance', es: 'Construya fuego en área abierta, elevada visible desde distancia' } },
      { text: { en: 'Maintain steady fire base (good coals)', es: 'Mantenga base de fuego constante (buenas brasas)' } },
      { text: { en: 'Create quick smoke by adding green vegetation', es: 'Cree humo rápido agregando vegetación verde' } },
      { text: { en: 'Add wet material for dense white smoke', es: 'Agregue material húmedo para humo blanco denso' } },
      { text: { en: 'Signal: 3 puffs of smoke = distress', es: 'Señal: 3 bocanadas de humo = socorro' } },
      { text: { en: 'Pulse smoke rhythmically to attract attention', es: ' Pulse el humo rítmicamente para atraer atención' } },
      { text: { en: 'Keep signal fire ready at all times during rescue window', es: 'Mantenga fuego de señalización listo todo el tiempo durante ventana de rescate' }, warning: { en: 'Never leave signal fire unattended - forest fires are deadly', es: 'Nunca deje fuego de señalización sin vigilancia - incendios forestales son mortales' } }
    ]
  },
  {
    id: 'first-aid-heat',
    category: 'first-aid',
    title: { en: 'Treat Heat Exhaustion and Stroke', es: 'Tratar Agotamiento y Golpe de Calor' },
    type: 'checklist',
    content: {
      en: 'Honduran heat and humidity cause rapid dehydration. Heat stroke is LIFE-THREATENING and requires immediate action.',
      es: 'El calor y humedad de Honduras causan deshidratación rápida. El golpe de calor es PELIGROSO y requiere acción inmediata.'
    },
    checklist: [
      { text: { en: 'Move victim to shade immediately', es: 'Mueva víctima a sombra inmediatamente' }, critical: true },
      { text: { en: 'Remove excess clothing', es: 'Remueva ropa excesiva' } },
      { text: { en: 'Fan victim to increase air circulation', es: 'Abanique víctima para aumentar circulación de aire' } },
      { text: { en: 'Apply cool water to skin (neck, armpits, groin)', es: 'Aplique agua fría a la piel (cuello, axilas, ingle)' } },
      { text: { en: 'Give small sips of water if conscious', es: 'Dé pequeños sorbos de agua si está consciente' } },
      { critical: true, text: { en: 'HEAT STROKE (confusion, hot dry skin, temp >40°C): EVACUATE IMMEDIATELY', es: 'GOLPE DE CALOR (confusión, piel caliente seca, temp >40°C): EVACÚE INMEDIATAMENTE' } }
    ]
  },
  {
    id: 'first-aid-insects',
    category: 'first-aid',
    title: { en: 'Treat Insect Bites and Stings', es: 'Tratar Picaduras de Insectos' },
    type: 'checklist',
    content: {
      en: 'Bees, wasps, ants, and spiders are common. Most bites are minor, but allergic reactions are dangerous.',
      es: 'Abejas, avispas, hormigas y arañas son comunes. La mayoría de picaduras son menores, pero las reacciones alérgicas son peligrosas.'
    },
    checklist: [
      { text: { en: 'Remove stinger by scraping (not squeezing)', es: 'Remueva aguijón raspando (no apretando)' } },
      { text: { en: 'Clean bite area with soap and water', es: 'Limpie área de picadura con jabón y agua' } },
      { text: { en: 'Apply cold compress to reduce swelling', es: 'Aplique compresa fría para reducir hinchazón' } },
      { text: { en: 'Take antihistamine if available', es: 'Tome antihistamínico si está disponible' } },
      { critical: true, text: { en: 'Watch for anaphylaxis: difficulty breathing, face/throat swelling - EVACUATE', es: 'Observe anafilaxia: dificultad respiratoria, hinchazón de cara/garganta - EVACÚE' } }
    ]
  }
];

export const CATEGORIES: { id: SurvivalCategory; title: { en: string; es: string }; icon: string }[] = [
  { id: 'water', title: { en: 'Water', es: 'Agua' }, icon: 'droplet' },
  { id: 'shelter', title: { en: 'Shelter', es: 'Refugio' }, icon: 'tent' },
  { id: 'fire', title: { en: 'Fire', es: 'Fuego' }, icon: 'flame' },
  { id: 'food', title: { en: 'Food', es: 'Comida' }, icon: 'utensils' },
  { id: 'first-aid', title: { en: 'First Aid', es: 'Primeros Auxilios' }, icon: 'heart' },
  { id: 'navigation', title: { en: 'Navigation', es: 'Navegación' }, icon: 'compass' },
  { id: 'signaling', title: { en: 'Signaling', es: 'Señalización' }, icon: 'radio' }
];
