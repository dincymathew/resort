import React from 'react';
import { Utensils, Sparkles, MessageCircle, Leaf, Check } from 'lucide-react';
import { MENU_CATEGORIES, RESORT_CONFIG } from '../data/resortData';

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
            Organic Kerala Gourmet
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-sans-body">
            Savor authentic Kerala spice culinary heritage crafted with vegetables harvested daily from our organic estate garden and mountain spring water.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
        </div> */}

        {/* Menu Layout */}
        <div className="bg-[#142e18] rounded-3xl p-8 md:p-12 border border-emerald-800/40 relative overflow-hidden shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-12 relative z-10">
            {MENU_CATEGORIES.map((category) => (
              <div key={category.category} className="mb-10 break-inside-avoid">
                <h3 className="text-xl md:text-2xl font-serif-display font-bold uppercase text-white mb-6 tracking-wide">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-baseline group">
                      <span className="text-[15px] text-slate-100 font-medium group-hover:text-amber-300 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-amber-400 font-semibold ml-4">
                        ₹{item.priceINR}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-emerald-800/50 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-700/50 shrink-0">
                  <span className="text-xl">🌅</span>
                </div>
                <div>
                  <span className="block text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Breakfast</span>
                  <span className="text-sm font-semibold text-white whitespace-nowrap">08:00 AM to 09:30 AM</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-700/50 shrink-0">
                  <span className="text-xl">🌙</span>
                </div>
                <div>
                  <span className="block text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Dinner</span>
                  <span className="text-sm font-semibold text-white whitespace-nowrap">07:30 PM to 09:30 PM</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${RESORT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hi Munnar Resort! I would like to inquire about dining options.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full lg:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
