import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, CheckCheck } from 'lucide-react';
import { RESORT_CONFIG } from '../data/resortData';

interface FloatingWhatsAppFABProps {
  onOpenWhatsAppBooking: () => void;
}

export const FloatingWhatsAppFAB: React.FC<FloatingWhatsAppFABProps> = ({ onOpenWhatsAppBooking }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  const quickOptions = [
    'Is Mist Pool Villa available this weekend?',
    'Can I get Honeymoon package details?',
    'How do I reach the resort from Cochin Airport?',
  ];

  const handleSendQuickQuery = (queryText: string) => {
    const text = `Hi munnar Resort! ${queryText}`;
    const url = `https://wa.me/${RESORT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Box */}
      {popupOpen && (
        <div className="mb-4 w-80 bg-[#0d1811] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-4 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold">
                  💬
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0d1811]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-cinzel">Munnar Resort Concierge</h4>
                <span className="text-[10px] text-emerald-300 block">Online • Typically replies instantly</span>
              </div>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
            <div className="bg-[#14281c] p-3 rounded-xl border border-emerald-800/60 text-xs text-slate-200">
              <p className="font-semibold text-amber-300">Namaste! 👋 Welcome to munnar Resort.</p>
              <p className="mt-1">How can our resort team assist your Munnar vacation today?</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-amber-400 font-cinzel uppercase font-semibold block">Quick Inquiries</span>
              {quickOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuickQuery(opt)}
                  className="w-full text-left p-2 rounded-lg bg-[#112017] hover:bg-emerald-900 text-[11px] text-slate-300 hover:text-amber-200 border border-emerald-900 transition-colors flex items-center justify-between group"
                >
                  <span>{opt}</span>
                  <Send className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-[#0a120d] border-t border-emerald-900 flex gap-2">
            <button
              onClick={() => {
                setPopupOpen(false);
                onOpenWhatsAppBooking();
              }}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Full Booking Form</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setPopupOpen(!popupOpen)}
        className="relative group p-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl shadow-emerald-950/80 transition-all transform hover:scale-110 flex items-center justify-center"
        title="Chat with Resort Concierge on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-slate-950" />
      </button>
    </div>
  );
};
