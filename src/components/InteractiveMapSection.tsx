import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Car, Clock, Compass, ExternalLink, Sparkles, Mountain, Trees, Droplets } from 'lucide-react';
import { MAP_ATTRACTIONS, RESORT_CONFIG } from '../data/resortData';
import { MapAttraction } from '../types';

export const InteractiveMapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<MapAttraction>(MAP_ATTRACTIONS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization

    // Initialize Leaflet Map centered on Munnar Resort
    const map = L.map(mapContainerRef.current, {
      center: [RESORT_CONFIG.coordinates.lat, RESORT_CONFIG.coordinates.lng],
      zoom: 12,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Dark styled tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Custom Icon Generator
    const createCustomIcon = (isResort: boolean, category: string) => {
      const color = isResort ? '#f59e0b' : '#10b981';
      const iconHtml = `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid #080d0a;
          box-shadow: 0 0 15px ${color}80;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080d0a;
          font-weight: bold;
          font-size: 14px;
        ">
          ${isResort ? '⭐' : category === 'Wildlife' ? '🐘' : category === 'Waterfall' ? '🌊' : '📍'}
        </div>
      `;
      return L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Add markers for all attractions
    MAP_ATTRACTIONS.forEach((attraction) => {
      const isResort = attraction.id === 'resort-loc';
      const marker = L.marker([attraction.lat, attraction.lng], {
        icon: createCustomIcon(isResort, attraction.category),
      }).addTo(map);

      const popupContent = `
        <div style="width: 220px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <img src="${attraction.image}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" referrerPolicy="no-referrer"/>
          <strong style="font-size: 14px; color: #fef08a; display: block;">${attraction.name}</strong>
          <span style="font-size: 11px; color: #94a3b8; display: block; margin-top: 2px;">
            ${isResort ? '★ Munnar Mist Resort Base' : `${attraction.distanceKm} km from Resort (${attraction.driveTimeMin} min drive)`}
          </span>
          <p style="font-size: 11px; color: #cbd5e1; margin-top: 6px; line-height: 1.4;">${attraction.description}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedAttraction(attraction);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle attraction selection from side list
  const handleSelectAttraction = (attraction: MapAttraction) => {
    setSelectedAttraction(attraction);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([attraction.lat, attraction.lng], 13, {
        duration: 1.5,
      });
    }
  };

  const filteredAttractions = activeCategoryFilter === 'All'
    ? MAP_ATTRACTIONS
    : MAP_ATTRACTIONS.filter(a => a.category === activeCategoryFilter || (activeCategoryFilter === 'Nearby' && a.id !== 'resort-loc'));

  return (
    <section id="location-map" className="relative py-24 bg-[#080f0a] border-t border-emerald-900/40 text-slate-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" /> Munnar Hill Station Location
          </span>
          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mt-4">
            Explore Munnar & Nearby Wonders
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-sans-body">
            Situated 1,600m high in the Western Ghats among lush tea plantations, waterfall cascades, and wild elephant corridors.
          </p>
        </div>

        {/* Airport & Railway Quick Travel Bar */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              ✈️
            </div>
            <div>
              <span className="text-xs text-amber-300 font-cinzel font-semibold block">Cochin Intl. Airport (COK)</span>
              <span className="text-sm font-bold text-white">105 km • 3 Hrs Scenic Drive</span>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
              🚆
            </div>
            <div>
              <span className="text-xs text-emerald-300 font-cinzel font-semibold block">Aluva / Ernakulam Railway Station</span>
              <span className="text-sm font-bold text-white">110 km • 3.2 Hrs Drive</span>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              🚖
            </div>
            <div>
              <span className="text-xs text-amber-300 font-cinzel font-semibold block">Resort Pickup Service</span>
              <span className="text-sm font-bold text-white">Private Luxury Innova Available</span>
            </div>
          </div>
        </div>

        {/* Map & Attractions Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Container (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c1611] p-3 rounded-2xl border border-emerald-800/40 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-cinzel font-bold text-amber-300">
                  Interactive Munnar Map
                </span>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${RESORT_CONFIG.coordinates.lat},${RESORT_CONFIG.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* The Actual Leaflet Map Canvas */}
            <div
              ref={mapContainerRef}
              className="w-full h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-inner border border-emerald-900/50"
            />
          </div>

          {/* Attraction Detail Card & List (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Resort', 'Tea Garden', 'Peak', 'Waterfall', 'Wildlife'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    activeCategoryFilter === cat
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                      : 'bg-[#122319] text-slate-300 border-emerald-900/60 hover:border-emerald-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Currently Selected Attraction Focus Card */}
            <div className="glass-panel p-5 rounded-2xl border border-amber-500/30">
              <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                <img
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full font-cinzel">
                  {selectedAttraction.category}
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <h4 className="text-lg font-serif-display font-bold text-white drop-shadow-md">
                    {selectedAttraction.name}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-[#122319] p-2.5 rounded-xl border border-emerald-800/40 flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-slate-400 text-[10px] block">Distance</span>
                    <span className="font-bold text-white">
                      {selectedAttraction.distanceKm === 0 ? 'Resort Base' : `${selectedAttraction.distanceKm} km`}
                    </span>
                  </div>
                </div>
                <div className="bg-[#122319] p-2.5 rounded-xl border border-emerald-800/40 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-slate-400 text-[10px] block">Drive Time</span>
                    <span className="font-bold text-white">
                      {selectedAttraction.driveTimeMin === 0 ? 'On Premises' : `${selectedAttraction.driveTimeMin} mins`}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedAttraction.description}
              </p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-cinzel text-amber-400 uppercase font-semibold block">Key Highlights</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAttraction.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] bg-emerald-950 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-800/50">
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Clickable Attraction List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredAttractions.map((att) => (
                <button
                  key={att.id}
                  onClick={() => handleSelectAttraction(att)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedAttraction.id === att.id
                      ? 'bg-emerald-950 border-amber-400/80 text-white shadow-lg'
                      : 'bg-[#0e1a13] border-emerald-900/40 text-slate-300 hover:bg-[#13251c]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={att.image}
                      alt={att.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">{att.name}</h5>
                      <span className="text-[10px] text-amber-300 font-cinzel">
                        {att.category} • {att.distanceKm === 0 ? 'Onsite' : `${att.distanceKm} km`}
                      </span>
                    </div>
                  </div>
                  <Navigation className={`w-4 h-4 ${selectedAttraction.id === att.id ? 'text-amber-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
