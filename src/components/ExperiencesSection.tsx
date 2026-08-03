import React from 'react';
import { Compass, Sparkles, MessageCircle, Trees, Flame, Sun, Heart, Waves } from 'lucide-react';
import { RESORT_CONFIG } from '../data/resortData';

interface ExperiencesSectionProps {
  onOpenWhatsAppBooking: () => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onOpenWhatsAppBooking }) => {
  const experiences = [
    {
      id: 'exp1',
      title: 'Tea Estate Masterclass & Plucking',
      subtitle: 'Pluck first-flush tea leaves alongside 3rd-generation tea masters.',
      image: 'https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=1000&q=80',
      icon: '🍃',
      details: 'Guided morning walk through 120 acres of organic tea slopes followed by custom tea tasting session.',
    },
    {
      id: 'exp2',
      title: 'Heated Infinity Pool Cloud Dip',
      subtitle: 'Swim at 1,600m altitude wrapped in morning mist.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      icon: '🏊',
      details: 'Temperature-controlled water kept at a cozy 32°C year-round overlooking valley cloud blankets.',
    },
    {
      id: 'exp3',
      title: 'Wild Elephant Trail Corridor',
      subtitle: 'Safe observation deck overlooking Anakkulam elephant stream.',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
      icon: '🐘',
      details: 'Guided naturalist sessions explaining wild elephant migration patterns in Munnar mountains.',
    },
    {
      id: 'exp4',
      title: 'Stargazing Campfire & Acoustic Flute',
      subtitle: 'Warm evening bonfire with fresh cardamom brew.',
      image: '/photo/campfire.jfif',
      icon: '🔥',
      details: 'Gather around the stone fire pit under crystal night skies with live local instrumental melodies.',
    },
    {
      id: 'exp5',
      title: 'Ayurvedic Herbal Wellness Spa',
      subtitle: 'Traditional Kerala Abhyanga massage with herbal oils.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      icon: '🌿',
      details: 'Revitalize mind and body with certified Ayurvedic doctors using organic spice oils.',
    },
    {
      id: 'exp6',
      title: 'Hidden Waterfall & Mountain Trek',
      subtitle: 'Scenic hike to Attukad cascade mountain streams.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      icon: '🌊',
      details: 'Explore hidden mountain streams, exotic bird species, and ancient eucalyptus trees.',
    },
  ];

  return (
    <section id="experiences" className="relative py-24 bg-[#08100b] border-t border-emerald-900/40 text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Curated Hill Station Activities
          </span>
          <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mt-4">
            Unforgettable Munnar Memories
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed font-sans-body">
            Every stay includes complimentary morning tea estate walks, bonfire gatherings, and personalized wildlife concierge assistance.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel rounded-2xl overflow-hidden border border-emerald-800/40 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-400/40 flex items-center justify-center text-xl shadow-lg">
                    {exp.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif-display font-bold text-white group-hover:text-amber-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-cinzel mt-1">
                    {exp.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 mt-3 font-sans-body leading-relaxed">
                    {exp.details}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onOpenWhatsAppBooking}
                  className="w-full py-2.5 bg-[#122319] hover:bg-emerald-900 text-amber-200 font-semibold text-xs rounded-xl border border-emerald-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inquire via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
