import { useEffect, useRef, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
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

const TYPE_COLORS: Record<string, string> = {
  river: '#3b82f6',
  danger: '#ef4444',
  safe: '#22c55e',
  rescue: '#f59e0b',
  city: '#64748b',
  camp: '#8b5cf6',
  water: '#06b6d4',
};

export default function MapReader() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [showAddWaypoint, setShowAddWaypoint] = useState(false);
  const [newWaypoint, setNewWaypoint] = useState({ name: '', type: 'camp' as Waypoint['type'], notes: '' });
  const [online, setOnline] = useState(navigator.onLine);
  const [language] = useState<'en' | 'es'>(() => {
    const saved = localStorage.getItem('survival-language');
    return (saved === 'es' ? 'es' : 'en') as 'en' | 'es';
  });

  const t = (en: string, es: string) => language === 'en' ? en : es;

  const getSavedWaypoints = (): Waypoint[] => {
    const saved = localStorage.getItem('survival-waypoints');
    return saved ? JSON.parse(saved) : [];
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

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);

    // Add location markers
    LOCATIONS.forEach(loc => {
      const color = TYPE_COLORS[loc.type] || '#a3a3a3';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.5);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br/>${loc.description}<br/><small>${loc.lat.toFixed(3)}, ${loc.lng.toFixed(3)}</small>`);
    });

    mapRef.current = map;

    // Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPosition({ lat: latitude, lng: longitude });
          const userIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="background:#22c55e;width:18px;height:18px;border-radius:50%;border:3px solid #16a34a;box-shadow:0 0 10px rgba(34,197,94,0.6);"></div>`,
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

  // Update waypoints on map
  useEffect(() => {
    if (!mapRef.current) return;
    // Remove old waypoint markers (we'll re-add all)
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker && (layer.getPopup()?.getContent() as string)?.includes('waypoint-')) {
        mapRef.current!.removeLayer(layer);
      }
    });
    waypoints.forEach(wp => {
      const color = TYPE_COLORS[wp.type] || '#a3a3a3';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.5);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      L.marker([wp.lat, wp.lng], { icon })
        .addTo(mapRef.current!)
        .bindPopup(`<b>waypoint-${wp.id}</b><br/>${wp.name}<br/><small>${wp.notes}</small>`);
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
      <div className="bg-stone-950 p-2 border-b border-stone-800 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-stone-200">{t('Map', 'Mapa')}</h2>
          <span className={`text-xs font-mono ${online ? 'text-green-400' : 'text-yellow-500'}`}>
            {online ? t('ONLINE', 'EN LÍNEA') : t('OFFLINE', 'SIN CONEXIÓN')}
          </span>
        </div>
        {userPosition && (
          <span className="text-xs text-lime-400 font-mono">
            📍 {userPosition.lat.toFixed(4)}, {userPosition.lng.toFixed(4)}
          </span>
        )}
      </div>

      <div className="flex-1 relative">
        <div ref={mapContainer} id="map-root" className="absolute inset-0" />
        {!online && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-900/90 text-yellow-200 text-xs px-3 py-1 rounded-full z-[1000]">
            {t('Map tiles require internet. Previously viewed areas may work.', 'Los mapas requieren internet. Áreas vistas previamente pueden funcionar.')}
          </div>
        )}
      </div>

      <div className="bg-stone-950 border-t border-stone-800 shrink-0 max-h-36 overflow-y-auto p-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {LOCATIONS.map((loc, i) => (
            <button
              key={i}
              onClick={() => mapRef.current?.setView([loc.lat, loc.lng], 10)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-stone-800 text-stone-400 hover:bg-stone-700"
            >
              <span style={{ color: TYPE_COLORS[loc.type] }}>●</span>
              {language === 'en' ? loc.name : loc.nameEs}
            </button>
          ))}
        </div>

        {waypoints.length > 0 && (
          <div className="border-t border-stone-700 pt-1 mb-1">
            {waypoints.map(wp => (
              <div key={wp.id} className="flex items-center justify-between bg-stone-800 rounded px-2 py-1 mb-1">
                <span className="text-xs text-stone-300"><span style={{ color: TYPE_COLORS[wp.type] }}>●</span> {wp.name} <span className="text-stone-500">{wp.notes}</span></span>
                <button onClick={() => deleteWaypoint(wp.id)} className="text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        )}

        {userPosition && (
          !showAddWaypoint ? (
            <button onClick={() => setShowAddWaypoint(true)} className="w-full flex items-center justify-center gap-2 bg-lime-900/50 text-lime-400 py-1.5 rounded text-xs hover:bg-lime-900">
              <Plus size={14} /> {t('Add Waypoint at Your Location', 'Agregar Marcador en Su Ubicación')}
            </button>
          ) : (
            <div className="flex gap-1">
              <input type="text" placeholder={t('Name', 'Nombre')} value={newWaypoint.name} onChange={e => setNewWaypoint({ ...newWaypoint, name: e.target.value })} className="flex-1 bg-stone-800 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200" />
              <select value={newWaypoint.type} onChange={e => setNewWaypoint({ ...newWaypoint, type: e.target.value as Waypoint['type'] })} className="bg-stone-800 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200">
                <option value="camp">{t('Camp', 'Campamento')}</option>
                <option value="water">{t('Water', 'Agua')}</option>
                <option value="danger">{t('Danger', 'Peligro')}</option>
                <option value="rescue">{t('Rescue', 'Rescate')}</option>
              </select>
              <input type="text" placeholder={t('Notes', 'Notas')} value={newWaypoint.notes} onChange={e => setNewWaypoint({ ...newWaypoint, notes: e.target.value })} className="flex-1 bg-stone-800 border border-stone-700 rounded px-2 py-1 text-xs text-stone-200" />
              <button onClick={addWaypoint} className="bg-lime-600 text-white px-2 py-1 rounded text-xs">{t('Save', '✓')}</button>
              <button onClick={() => setShowAddWaypoint(false)} className="bg-stone-700 text-stone-300 px-2 py-1 rounded text-xs">{t('X', 'X')}</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
