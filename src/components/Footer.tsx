import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Heart, Compass, ShieldCheck } from 'lucide-react';
import { RESORT_CONFIG } from '../data/resortData';

interface FooterProps {
  onOpenWhatsAppBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsAppBooking }) => {
  return (
    <footer className="bg-[#050a07] border-t border-emerald-900/60 text-slate-300 pt-16 pb-12 font-sans-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Resort Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-900 border border-amber-400/50 flex items-center justify-center text-amber-300 text-lg">
                🍃
              </div>
              <span className="font-cinzel text-lg font-bold text-white tracking-wider">
                Munnar Mist
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Luxury eco-heritage resort 
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-cinzel">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Eco-Friendly</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest mb-4">
              Explore Resort
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#villas" className="hover:text-amber-300 transition-colors">Private Pool Villas</a></li>
              <li><a href="#photo-gallery" className="hover:text-amber-300 transition-colors">Scenery Photo Gallery</a></li>
              <li><a href="#location-map" className="hover:text-amber-300 transition-colors">Interactive Munnar Map</a></li>
              <li><a href="#dining" className="hover:text-amber-300 transition-colors">Gourmet Dining</a></li>
              <li><a href="#experiences" className="hover:text-amber-300 transition-colors">Tea Estate & Elephant Walks</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest mb-4">
              Direct Concierge
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESORT_CONFIG.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESORT_CONFIG.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESORT_CONFIG.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: WhatsApp Direct Booking */}
          <div>
            <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-widest mb-4">
              WhatsApp Booking
            </h4>
            {/* <p className="text-xs text-slate-400 mb-4">
              Get instant villa availability, customized honeymoon setups, and airport transfers directly on WhatsApp.
            </p> */}
            <button
              onClick={onOpenWhatsAppBooking}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 uppercase tracking-wider transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Munnar Resort. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" /> for Munnar Hill Station Travelers
          </p>
        </div>
      </div>
    </footer>
  );
};
