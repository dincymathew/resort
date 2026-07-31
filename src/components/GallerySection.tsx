import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, MessageCircle, MapPin } from 'lucide-react';
import { GALLERY_ITEMS, RESORT_CONFIG } from '../data/resortData';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  onOpenWhatsAppBooking: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenWhatsAppBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'villas', label: 'Villas & Suites' },
    { id: 'tea', label: 'Tea Gardens & Views' },
    { id: 'pool', label: 'Infinity Pool' },
    { id: 'dining', label: 'Halal Cuisine & Dining' },
    { id: 'activities', label: 'Wildlife & Activities' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const activeLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="photo-gallery" className="relative py-24 bg-[#0a120d] border-t border-emerald-900/40 text-slate-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" /> Scenery & Experience Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mt-4">
            Capturing Munnar's Magical Atmosphere
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-sans-body">
            Immerse yourself in our private tea estates, misty mountain horizons, heated pools, and authentic Kerala heritage.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-[#122219] text-slate-300 border border-emerald-900/50 hover:border-emerald-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(index)}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-emerald-900/40 shadow-xl bg-[#0f1b14]"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge */}
                {item.location && (
                  <span className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-cinzel px-3 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {item.location}
                  </span>
                )}

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-lg font-serif-display font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-sans-body">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-slate-300 hover:text-white bg-slate-800/80 p-3 rounded-full border border-slate-700/50 z-50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-emerald-950/80 hover:bg-emerald-900 p-3 rounded-full border border-amber-500/30 z-50 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-emerald-950/80 hover:bg-emerald-900 p-3 rounded-full border border-amber-500/30 z-50 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <div className="max-w-5xl w-full flex flex-col items-center">
                <div className="relative max-h-[70vh] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                  <img
                    src={activeLightboxItem.image}
                    alt={activeLightboxItem.title}
                    className="max-h-[70vh] w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Caption & Actions */}
                <div className="mt-6 text-center max-w-2xl">
                  <h3 className="text-2xl font-serif-display font-bold text-amber-300">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 font-sans-body leading-relaxed">
                    {activeLightboxItem.caption}
                  </p>
                  {activeLightboxItem.location && (
                    <span className="text-xs text-emerald-400 font-cinzel block mt-2">
                      📍 Location: {activeLightboxItem.location}
                    </span>
                  )}

                  <div className="mt-5 flex justify-center gap-4">
                    <button
                      onClick={() => {
                        closeLightbox();
                        onOpenWhatsAppBooking();
                      }}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 text-xs uppercase tracking-wider transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950" />
                      Inquire About This View on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
