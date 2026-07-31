import React, { useState } from 'react';
import { Star, Quote, ChevronDown, MessageCircle, HelpCircle, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS, FAQS, RESORT_CONFIG } from '../data/resortData';

interface TestimonialsAndFAQProps {
  onOpenWhatsAppBooking: () => void;
}

export const TestimonialsAndFAQSection: React.FC<TestimonialsAndFAQProps> = ({ onOpenWhatsAppBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-[#070e0a] border-t border-emerald-900/40 text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Guest Reviews & Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-serif-display font-bold text-white mt-4">
              Loved By Travelers Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-panel p-6 rounded-2xl border border-emerald-800/40 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans-body italic mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-emerald-900/60">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.author}</h4>
                    <span className="text-[10px] text-amber-300 font-cinzel block">
                      {t.location} • Stayed in {t.stayedIn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-cinzel font-semibold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Essential Information
            </span>
            <h3 className="text-2xl md:text-4xl font-serif-display font-bold text-white mt-3">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl border border-emerald-800/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-serif-display font-bold text-white hover:text-amber-300 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed font-sans-body border-t border-emerald-900/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Support Banner */}
          <div className="mt-12 glass-panel p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-base font-serif-display font-bold text-white">Have more questions about Munnar?</h4>
              <p className="text-xs text-slate-300 mt-1">Chat directly with our resort concierge on WhatsApp for instant answers!</p>
            </div>
            <button
              onClick={onOpenWhatsAppBooking}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 uppercase tracking-wider shrink-0 transition-transform transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Ask Concierge on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
