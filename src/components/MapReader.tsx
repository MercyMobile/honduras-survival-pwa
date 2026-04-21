import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2, MapPin, X, Check } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'camp' | 'water' | 'danger' | 'rescue';
  notes: string;
  created: number;
}

interface MapLocation {
  name: string;
  nameEs: string;
  lat: number;
  lng: number;
  type: 'river' | 'danger' | 'safe' | 'rescue' | 'city';
  description: string;
  descriptionEs: string;
}

const LOCATIONS: MapLocation[] = [
  { name: 'Río Plátano', nameEs: 'Río Plátano', lat: 15.7, lng: -84.8, type: 'river', description: 'Major river in La Mosquitia UNESCO reserve', descriptionEs: 'Río principal en la reserva UNESCO de La Mosquitia' },
  { name: 'Río Patuca', nameEs: 'Río Patuca', lat: 15.2, lng: -84.9, type: 'river', description: 'Second largest river in Honduras', descriptionEs: 'Segundo río más grande de Honduras' },
  { name: 'Río Coco', nameEs: 'Río Coco', lat: 14.5, lng: -84.6, type: 'river', description: 'Border river with Nicaragua', descriptionEs: 'Río fronterizo con Nicaragua' },
  { name: 'La Mosquitia', nameEs: 'La Mosquitia', lat: 15.5, lng: -84.5, type: 'danger', description: 'Dense jungle, remote. Plan carefully.', descriptionEs: 'Selva densa, remota. Planifique cuidadosamente.' },
  { name: 'Tegucigalpa', nameEs: 'Tegucigalpa', lat: 14.1, lng: -87.2, type: 'city', description: 'Capital - hospitals, embassies', descriptionEs: 'Capital - hospitales, embajadas' },
  { name: 'San Pedro Sula', nameEs: 'San Pedro Sula', lat: 15.5, lng: -88.0, type: 'city', description: 'Major city - international airport', descriptionEs: 'Ciudad importante - aeropuerto internacional' },
  { name: 'La Ceiba', nameEs: 'La Ceiba', lat: 15.75, lng: -86.9, type: 'city', description: 'Coastal city - gateway to Bay Islands', descriptionEs: 'Ciudad costera - puerta a Islas de la Bahía' },
  { name: 'Roatán', nameEs: 'Roatán', lat: 16.3, lng: -86.5, type: 'rescue', description: 'International airport on Bay Island', descriptionEs: 'Aeropuerto internacional en Isla de la Bahía' },
  { name: 'Copán Ruinas', nameEs: 'Copán Ruinas', lat: 14.8, lng: -89.1, type: 'safe', description: 'Tourist area - archaeological site', descriptionEs: 'Área turística - sitio arqueológico' },
  { name: 'Comayagua', nameEs: 'Comayagua', lat: 14.46, lng: -87.65, type: 'city', description: 'Historic city with medical facilities', descriptionEs: 'Ciudad histórica con instalaciones médicas' },
  { name: 'Choluteca', nameEs: 'Choluteca', lat: 13.3, lng: -87.17, type: 'city', description: 'Southern city, near El Salvador border', descriptionEs: 'Ciudad del sur, cerca de la frontera con El Salvador' },
  { name: 'Puerto Lempira', nameEs: 'Puerto Lempira', lat: 15.27, lng: -83.8, type: 'rescue', description: 'Regional airport in La Mosquitia', descriptionEs: 'Aeropuerto regional en La Mosquitia' },
];

// Purple/gold aligned marker colors
const TYPE_COLORS: Record<string, string> = {
  river: '#60A5FA',
  danger: '#F87171',
  safe: '#34D399',
  rescue: '#D4AF37',
  city: '#C084FC',
  camp: '#A855F7',
  water: '#22D3EE',
};

interface MapReaderProps {
  language: 'en' | 'es';
}

function sanitizeForPopup(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function MapReader({ language }: MapReaderProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [showAddWaypoint, setShowAddWaypoint] = useState(false);
  const [newWaypoint, setNewWaypoint] = useState({ name: '', type: 'camp' as Waypoint['type'], notes: '' });
  const [online, setOnline] = useState(navigator.onLine);

  const t = (en: string, es: string) => language === 'en' ? en : es;

  const getSavedWaypoints = (): Waypoint[] => {
    try {
      const saved = localStorage.getItem('survival-waypoints');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [waypoints, setWaypoints] = useState<Waypoint[]>(getSavedWaypoints);

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

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = L.map(mapContainer.current, {
      center: [15.2, -86.5],
      zoom: 7,
      zoomControl: true,
    });

    // Primary tile layer — browser fetches from OSM when online.
    // The service worker intercepts these requests and stores them in
    // the 'osm-tiles' CacheFirst cache, so previously-viewed areas
    // render offline automatically.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
      maxNativeZoom: 18,
      keepBuffer: 4,
    }).addTo(map);

    LOCATIONS.forEach(loc => {
      const color = TYPE_COLORS[loc.type] || '#C084FC';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid #F0E9D6;box-shadow:0 2px 6px rgba(0,0,0,0.6),0 0 10px ${color}80;"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br/>${loc.description}<br/><small>${loc.lat.toFixed(3)}, ${loc.lng.toFixed(3)}</small>`);
    });

    mapRef.current = map;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition({ lat: latitude, lng: longitude });
          const userIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background:#D4AF37;width:18px;height:18px;border-radius:50%;border:3px solid #8E6F14;box-shadow:0 0 14px rgba(212,175,55,0.8);"></div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
          L.marker([latitude, longitude], { icon: userIcon })
            .addTo(map)
            .bindPopup('<b>Your Location</b>');
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker && (layer.getPopup()?.getContent() as string)?.includes('waypoint-')) {
        mapRef.current!.removeLayer(layer);
      }
    });
    waypoints.forEach(wp => {
      const color = TYPE_COLORS[wp.type] || '#C084FC';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid #F0E9D6;box-shadow:0 2px 6px rgba(0,0,0,0.5);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      L.marker([wp.lat, wp.lng], { icon })
        .addTo(mapRef.current!)
        .bindPopup(`<b>waypoint-${sanitizeForPopup(wp.id)}</b><br/>${sanitizeForPopup(wp.name)}<br/><small>${sanitizeForPopup(wp.notes)}</small>`);
    });
  }, [waypoints]);

  const addWaypoint = () => {
    if (!newWaypoint.name.trim() || !userPosition) return;
    const waypoint: Waypoint = {
      id: Date.now().toString(),
      name: newWaypoint.name,
      lat: userPosition.lat,
      lng: userPosition.lng,
      type: newWaypoint.type,
      notes: newWaypoint.notes,
      created: Date.now(),
    };
    const updated = [...waypoints, waypoint];
    setWaypoints(updated);
    localStorage.setItem('survival-waypoints', JSON.stringify(updated));
    setShowAddWaypoint(false);
    setNewWaypoint({ name: '', type: 'camp', notes: '' });
  };

  const deleteWaypoint = (id: string) => {
    const updated = waypoints.filter(w => w.id !== id);
    setWaypoints(updated);
    localStorage.setItem('survival-waypoints', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top status bar */}
      <div className="bg-obsidian-900/80 backdrop-blur-xl px-4 py-2.5 border-b border-royal-800/60 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-base font-semibold text-gold-200 tracking-wide">{t('Map', 'Mapa')}</h2>
          <span className={`flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-[0.2em] uppercase ${online ? 'text-emerald-300' : 'text-gold-300'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-gold-400 shadow-[0_0_6px_rgba(212,175,55,0.8)]'}`} />
            {online ? t('Online', 'En línea') : t('Offline', 'Sin conexión')}
          </span>
        </div>
        {userPosition && (
          <span className="text-[11px] text-gold-200 font-mono tracking-tight flex items-center gap-1.5 bg-obsidian-800/60 px-2.5 py-1 rounded-full border border-gold-400/20">
            <MapPin size={11} className="text-gold-300" />
            {userPosition.lat.toFixed(4)}, {userPosition.lng.toFixed(4)}
          </span>
        )}
      </div>

      <div className="flex-1 relative">
        <div ref={mapContainer} id="map-root" className="absolute inset-0" />
        {!online && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm">
            <div className="bg-obsidian-900/95 backdrop-blur-md rounded-xl border border-gold-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)] px-4 py-3">
              <p className="text-gold-200 text-xs font-bold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                {t('Offline Mode', 'Modo sin conexión')}
              </p>
              <p className="text-parchment-300 text-[11px] leading-relaxed">
                {t(
                  'Cached map tiles are available for areas you previously viewed. Scroll and zoom to use them. Unvisited areas show a grid pattern until you reconnect.',
                  'Los tiles del mapa guardados están disponibles para las áreas vistas antes. Desplázate y haz zoom para usarlos. Las áreas no visitadas muestran una cuadrícula hasta reconectarse.'
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom control panel */}
      <div className="bg-obsidian-900/90 backdrop-blur-xl border-t border-royal-800/60 shrink-0 max-h-44 overflow-y-auto p-3 scrollbar-hide">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {LOCATIONS.map((loc, i) => (
            <button
              key={i}
              onClick={() => mapRef.current?.setView([loc.lat, loc.lng], 10)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-obsidian-800/70 text-parchment-200 hover:bg-royal-800/50 hover:text-gold-200 border border-royal-800/50 hover:border-gold-400/30 transition-all"
            >
              <span style={{ color: TYPE_COLORS[loc.type] }} className="text-base leading-none">●</span>
              {language === 'en' ? loc.name : loc.nameEs}
            </button>
          ))}
        </div>

        {waypoints.length > 0 && (
          <div className="border-t border-royal-800/50 pt-2 mb-2 space-y-1">
            {waypoints.map(wp => (
              <div key={wp.id} className="flex items-center justify-between bg-obsidian-800/60 border border-royal-800/40 rounded-lg px-2.5 py-1.5">
                <span className="text-xs text-parchment-100 flex items-center gap-1.5">
                  <span style={{ color: TYPE_COLORS[wp.type] }} className="text-base leading-none">●</span>
                  <span className="font-medium">{wp.name}</span>
                  {wp.notes && <span className="text-parchment-400 font-light">— {wp.notes}</span>}
                </span>
                <button
                  onClick={() => deleteWaypoint(wp.id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {userPosition && (
          !showAddWaypoint ? (
            <button
              onClick={() => setShowAddWaypoint(true)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-royal-700/60 to-royal-800/60 hover:from-royal-700/80 hover:to-royal-800/80 text-gold-200 py-2 rounded-lg text-xs font-semibold tracking-wide border border-gold-400/25 hover:border-gold-400/50 transition-all"
            >
              <Plus size={14} /> {t('Add Waypoint at Your Location', 'Agregar Marcador en Su Ubicación')}
            </button>
          ) : (
            <div className="flex flex-wrap gap-1.5 items-stretch">
              <input
                type="text"
                placeholder={t('Name', 'Nombre')}
                value={newWaypoint.name}
                onChange={e => setNewWaypoint({ ...newWaypoint, name: e.target.value })}
                className="flex-1 min-w-0 bg-obsidian-800/80 border border-royal-800/60 rounded-lg px-2.5 py-1.5 text-xs text-parchment-100 placeholder-parchment-500 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/30"
              />
              <select
                value={newWaypoint.type}
                onChange={e => setNewWaypoint({ ...newWaypoint, type: e.target.value as Waypoint['type'] })}
                className="bg-obsidian-800/80 border border-royal-800/60 rounded-lg px-2 py-1.5 text-xs text-parchment-100 focus:outline-none focus:border-gold-400/50"
              >
                <option value="camp">{t('Camp', 'Campamento')}</option>
                <option value="water">{t('Water', 'Agua')}</option>
                <option value="danger">{t('Danger', 'Peligro')}</option>
                <option value="rescue">{t('Rescue', 'Rescate')}</option>
              </select>
              <input
                type="text"
                placeholder={t('Notes', 'Notas')}
                value={newWaypoint.notes}
                onChange={e => setNewWaypoint({ ...newWaypoint, notes: e.target.value })}
                className="flex-1 min-w-0 bg-obsidian-800/80 border border-royal-800/60 rounded-lg px-2.5 py-1.5 text-xs text-parchment-100 placeholder-parchment-500 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/30"
              />
              <button
                onClick={addWaypoint}
                className="bg-gradient-to-br from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-[0_2px_10px_rgba(212,175,55,0.4)] transition-all"
              >
                <Check size={12} strokeWidth={3} />
              </button>
              <button
                onClick={() => setShowAddWaypoint(false)}
                className="bg-obsidian-800 hover:bg-obsidian-700 text-parchment-300 border border-royal-800/60 px-2.5 py-1.5 rounded-lg text-xs"
              >
                <X size={12} />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
