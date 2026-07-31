import React from 'react';
import { Utensils, Sparkles, MessageCircle, Leaf, Check } from 'lucide-react';
import { DINING_ITEMS, RESORT_CONFIG } from '../data/resortData';

interface DiningSectionProps {
  onOpenWhatsAppBooking: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onOpenWhatsAppBooking }) => {
  return (
    <section id="dining" className="relative py-24 bg-[#070e0a] border-t border-emerald-900/40 text-slate-100 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Utensils className="w-3.5 h-3.5 text-amber-400" /> The Cloud Spices Dining
          </span>
          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mt-4">
            100% Halal & Organic Kerala Gourmet
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-sans-body">
            Savor authentic Kerala spice culinary heritage crafted with vegetables harvested daily from our organic estate garden and mountain spring water.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🌙
            </div>
            <h3 className="text-lg font-serif-display font-bold text-white">100% Certified Halal</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              All meats served at our resort are 100% certified Halal, prepared according to strict hygienic protocols.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-800/40 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🍃
            </div>
            <h3 className="text-lg font-serif-display font-bold text-white">Organic Estate Garden</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Fresh mountain cardamon, pepper, cinnamon, and farm vegetables picked straight from our estate garden every morning.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              🕯️
            </div>
            <h3 className="text-lg font-serif-display font-bold text-white">Candlelight Villa Terrace</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Private 5-course romantic dining served right on your villa balcony surrounded by warm bonfires and mountain mist.
            </p>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DINING_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e1a13] rounded-2xl overflow-hidden border border-emerald-900/50 hover:border-amber-400/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {item.isChefSpecial && (
                    <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-bold text-[10px] font-cinzel uppercase px-2.5 py-1 rounded-full shadow">
                      ⭐ Chef's Special
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-500/30">
                    ₹{item.priceINR}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-cinzel text-emerald-400 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-base font-serif-display font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans-body">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/${RESORT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Munnar Mist Resort! I would like to inquire about ordering ${item.name} during my stay.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[#14281d] hover:bg-emerald-900 text-amber-300 font-bold text-xs rounded-xl border border-emerald-700/60 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
