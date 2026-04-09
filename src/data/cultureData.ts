export type CultureCategory = 'customs' | 'partnerships' | 'logistics' | 'opsec' | 'zones';

export interface CultureItem {
  id: string;
  title: { en: string; es: string };
  content: { en: string; es: string };
  type: 'standard' | 'warning' | 'success';
}

export interface CultureSection {
  id: CultureCategory;
  title: { en: string; es: string };
  icon: string;
  items: CultureItem[];
}

export const CULTURE_DATA: CultureSection[] = [
  {
    id: 'partnerships',
    title: { en: 'Strategic Partnerships', es: 'Alianzas Estratégicas' },
    icon: 'HeartHandshake',
    items: [
      {
        id: 'social-capital',
        title: { en: 'The Safety Multiplier', es: 'El Multiplicador de Seguridad' },
        content: { 
          en: 'Operating safely relies heavily on social capital. Moving under the explicit endorsement of a respected local pastor or community leader is the greatest security asset you can have. Missions succeed gracefully when deeply integrated with local authority.',
          es: 'Operar con seguridad depende del capital social. Moverse bajo el respaldo explícito de un pastor o líder comunitario respetado es el mayor activo de seguridad. Las misiones tienen éxito cuando se integran profundamente con la autoridad local.'
        },
        type: 'success'
      },
      {
        id: 'missionary-respect',
        title: { en: 'Religious Respect', es: 'Respeto Religioso' },
        content: {
          en: 'Religious workers and missionaries are highly respected across all strata of Honduran society. Identifying yourself clearly and operating with legitimate purpose grants immense social grace and natural sanctuary.',
          es: 'Los trabajadores religiosos y misioneros son muy respetados en todos los estratos sociales. Identificarse claramente y operar con un propósito legítimo otorga inmensa gracia social y santuario natural.'
        },
        type: 'standard'
      }
    ]
  },
  {
    id: 'logistics',
    title: { en: 'Smart Logistics & Movement', es: 'Logística Inteligente y Movimiento' },
    icon: 'Route',
    items: [
      {
        id: 'daylight-ops',
        title: { en: 'Daylight Operations', es: 'Operaciones Diurnas' },
        content: {
          en: 'The golden rule of safe transit is strictly finishing all intercity and rural highway movement before dusk. Do not engage in night travel under any circumstances.',
          es: 'La regla de oro del tránsito es terminar todo movimiento interurbano antes del anochecer. No viaje de noche bajo ninguna circunstancia.'
        },
        type: 'warning'
      },
      {
        id: 'vetted-transport',
        title: { en: 'Vetted Transportation', es: 'Transporte Verificado' },
        content: {
          en: 'Avoid public buses and random street taxis, as the transit sector experiences high friction. Always utilize privately contracted and deeply vetted local drivers known to your organizational partners.',
          es: 'Evite los autobuses públicos y taxis rateros. Utilice siempre conductores privados de confianza, verificados y conocidos por sus socios organizativos.'
        },
        type: 'standard'
      },
      {
        id: 'el-florido',
        title: { en: 'El Florido Border Control', es: 'Frontera El Florido' },
        content: {
          en: 'Unlike major crossings, the El Florido border typically closes overnight (roughly 9:00 PM to 6:00 AM). Plan itineraries meticulously to avoid arriving late and being stranded in vulnerable blind spots.',
          es: 'A diferencia de los cruces principales, la frontera de El Florido cierra durante la noche (aprox. de 9:00 PM a 6:00 AM). Planifique para no quedar varado en puntos ciegos vulnerables.'
        },
        type: 'warning'
      }
    ]
  },
  {
    id: 'opsec',
    title: { en: 'Operational Security (OPSEC)', es: 'Seguridad Operacional (OPSEC)' },
    icon: 'ShieldCheck',
    items: [
      {
        id: 'low-profile',
        title: { en: 'Low Profile Posture', es: 'Postura de Bajo Perfil' },
        content: {
          en: 'Maintain a discreet footprint. Avoid openly displaying expensive jewelry, high-end electronics, or branded items. Predictability is a vulnerability—vary routines when possible.',
          es: 'Mantenga una huella discreta. Evite mostrar joyas caras o electrónicos de alta gama. La previsibilidad es una vulnerabilidad; varíe las rutinas cuando sea posible.'
        },
        type: 'standard'
      },
      {
        id: 'social-media',
        title: { en: 'Digital Discipline', es: 'Disciplina Digital' },
        content: {
          en: 'Never post real-time locations, live travel itineraries, or specific project coordinates on social media. Wait until the team has fully departed the area or country to share updates.',
          es: 'Nunca publique ubicaciones en tiempo real ni itinerarios en redes sociales. Espere hasta que el equipo haya salido de la zona o del país para compartir actualizaciones.'
        },
        type: 'standard'
      },
      {
        id: 'extortion-management',
        title: { en: 'Territorial Realities', es: 'Realidades Territoriales' },
        content: {
          en: 'Certain urban peripheries experience "war tax" frictions. Because yielding to demands violates international material-support laws, the best defense is absolute avoidance by always routing through vetted local guides.',
          es: 'Ciertas periferias experimentan el "impuesto de guerra". Como ceder viola leyes internacionales, la mejor defensa es la evasión absoluta guiándose siempre por expertos locales.'
        },
        type: 'standard'
      }
    ]
  },
  {
    id: 'zones',
    title: { en: 'Regional Operating Zones', es: 'Zonas Operativas Regionales' },
    icon: 'MapPin',
    items: [
      {
        id: 'copan-ruinas',
        title: { en: 'Copán Ruinas & Santa Rosa', es: 'Copán Ruinas y Santa Rosa' },
        content: {
          en: 'The tourist center of Copán Ruinas and the commercial hub of Santa Rosa offer solid infrastructure. You will be very safe adhering to standard daylight protocols and remaining in policed, central areas.',
          es: 'Copán Ruinas y el centro de Santa Rosa ofrecen buena infraestructura. Es muy seguro si se adhieren a protocolos diurnos y permanecen en áreas centrales custodiadas.'
        },
        type: 'success'
      },
      {
        id: 'friction-zones',
        title: { en: 'Nueva Arcadia & El Paraíso', es: 'Nueva Arcadia y El Paraíso' },
        content: {
          en: 'These municipalities serve as complex logistical chokepoints. Operations here require extreme vetting, explicit local invitations, and highly structured itineraries. Limit operational footprints here when possible.',
          es: 'Estos municipios son cuellos de botella logísticos. Las operaciones aquí requieren investigación profunda, invitaciones explícitas e itinerarios estrictos.'
        },
        type: 'warning'
      }
    ]
  },
  {
    id: 'customs',
    title: { en: 'Local Customs & Etiquette', es: 'Costumbres y Etiqueta' },
    icon: 'Users',
    items: [
      {
        id: 'greetings',
        title: { en: 'Greetings are Mandatory', es: 'Los Saludos Son Obligatorios' },
        content: {
          en: 'Always greet people with "Buenos días", "Buenas tardes", or "Buenas noches" before speaking. Skipping the greeting is considered rude and suspicious.',
          es: 'Siempre salude con "Buenos días", "Buenas tardes" o "Buenas noches" antes de hablar. Omitir el saludo se considera grosero.'
        },
        type: 'standard'
      },
      {
        id: 'fincas',
        title: { en: 'Private Fincas', es: 'Fincas Privadas' },
        content: {
          en: 'Almost all land is owned. Respect farmers and ask for permission ("¿Permiso para pasar?") before crossing fields. Never harvest crops without buying them directly.',
          es: 'Casi toda la tierra tiene dueño. Pida permiso ("¿Permiso para pasar?") antes de cruzar campos. Nunca coseche sin autorización.'
        },
        type: 'standard'
      }
    ]
  }
];
