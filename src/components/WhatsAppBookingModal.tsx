import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, MessageCircle, Sparkles, Check, Coffee, ShieldCheck, ExternalLink, IndianRupee } from 'lucide-react';
import { ROOMS, RESORT_CONFIG } from '../data/resortData';
import { BookingFormData } from '../types';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
}

export const WhatsAppBookingModal: React.FC<WhatsAppBookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
}) => {
  // Default dates: tomorrow to +3 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDate = new Date();
  checkoutDate.setDate(checkoutDate.getDate() + 4);

  const formatDateString = (d: Date) => d.toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    roomType: preSelectedRoomId || ROOMS[0].id,
    checkIn: formatDateString(tomorrow),
    checkOut: formatDateString(checkoutDate),
    adults: 2,
    children: 0,
    fullName: '',
    email: '',
    phone: '',
    mealPlan: ' Gourmet Board (Breakfast + Dinner)',
    specialAddons: ['Private Infinity Pool Heating', 'Complimentary Afternoon High Tea'],
    specialRequests: '',
  });

  useEffect(() => {
    if (preSelectedRoomId) {
      setFormData((prev) => ({ ...prev, roomType: preSelectedRoomId }));
    }
  }, [preSelectedRoomId]);

  const selectedRoom = ROOMS.find((r) => r.id === formData.roomType) || ROOMS[0];

  // Calculate nights & total price
  const start = new Date(formData.checkIn);
  const end = new Date(formData.checkOut);
  const diffTime = Math.max(1, end.getTime() - start.getTime());
  const nightsCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const totalEstimateINR = selectedRoom.priceINR * nightsCount;
  const totalEstimateUSD = selectedRoom.priceUSD * nightsCount;

  const handleAddonToggle = (addon: string) => {
    setFormData((prev) => {
      const exists = prev.specialAddons.includes(addon);
      return {
        ...prev,
        specialAddons: exists
          ? prev.specialAddons.filter((a) => a !== addon)
          : [...prev.specialAddons, addon],
      };
    });
  };

  const generateWhatsAppURL = () => {
    const addonsList = formData.specialAddons.length > 0
      ? formData.specialAddons.join(', ')
      : 'Standard Villa Services';

    const text = `*MUNNAR RESORT*
*Direct WhatsApp Reservation Request*
----------------------------------------
🏡 *Villa Choice:* ${selectedRoom.name}
📅 *Check-In:* ${formData.checkIn}
📅 *Check-Out:* ${formData.checkOut} (${nightsCount} Night${nightsCount > 1 ? 's' : ''})
👥 *Guests:* ${formData.adults} Adult(s), ${formData.children} Child(ren)
🍽️ *Meal Plan:* ${formData.mealPlan}
✨ *Add-ons:* ${addonsList}
💰 *Est. Total:* ₹${totalEstimateINR.toLocaleString()} (~ $${totalEstimateUSD} USD)

👤 *Guest Name:* ${formData.fullName || 'Valued Guest'}
📞 *Phone/WhatsApp:* ${formData.phone || 'Not provided'}
📧 *Email:* ${formData.email || 'N/A'}
💬 *Special Notes:* ${formData.specialRequests || 'Honeymoon / Relaxing retreat stay'}

_Sent via Munnar Mist Resort Official Web Portal_`;

    return `https://wa.me/${RESORT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppURL();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0f1b14] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-6 border-b border-amber-500/20">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800/60 p-2 rounded-full border border-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6 fill-emerald-500/30" />
              </div>
              <div>
                <span className="text-xs font-cinzel tracking-widest text-amber-400 font-semibold uppercase">
                  Instant Direct Booking
                </span>
                <h3 className="text-xl font-serif-display font-bold text-white">
                  Reserve via WhatsApp
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Fastest response! Pre-fill your reservation details and connect directly with our resort manager on WhatsApp.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Room Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase text-amber-300 tracking-wider mb-2">
                Select Villa / Suite
              </label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              >
                {ROOMS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — ₹{r.priceINR.toLocaleString()} / night (${r.priceUSD} USD)
                  </option>
                ))}
              </select>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Check-In Date
                </label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Check-Out Date
                </label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Guests & Meal Plan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Adults
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Children
                </label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-400" /> Meal Plan
                </label>
                <select
                  value={formData.mealPlan}
                  onChange={(e) => setFormData({ ...formData, mealPlan: e.target.value })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value=" Gourmet Board (Breakfast + Dinner)">Gourmet (Breakfast + Dinner)</option>
                  <option value="Bed & Traditional Kerala Breakfast Only">Bed & Kerala Breakfast Only</option>
                  <option value="All-Inclusive Full Board (All Meals + Tea Plucking)">All-Inclusive Full Board</option>
                </select>
              </div>
            </div>

            {/* Special Addons Checkboxes */}
            <div>
              <label className="block text-xs font-semibold uppercase text-amber-300 tracking-wider mb-2">
                Complimentary & Custom Add-Ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Private Heated Pool Setup',
                  'Honeymoon Bed & Flower Decor',
                  'Tea Plantation Master Walk',
                  'Cochin Airport Luxury Pickup',
                  'Candlelight Terrace Dinner',
                  'Guided Elephant Corridor Safari',
                ].map((addon) => {
                  const checked = formData.specialAddons.includes(addon);
                  return (
                    <button
                      type="button"
                      key={addon}
                      onClick={() => handleAddonToggle(addon)}
                      className={`flex items-center gap-2.5 text-xs text-left p-2.5 rounded-xl border transition-all ${
                        checked
                          ? 'bg-emerald-900/60 border-amber-400/60 text-amber-200'
                          : 'bg-[#16271e]/50 border-emerald-900/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                          checked
                            ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold'
                            : 'border-slate-600'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{addon}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 8848034957"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Special Notes / Requests</label>
              <textarea
                rows={2}
                placeholder="E.g., Arriving by 2 PM, celebrating anniversary, dietary needs..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full bg-[#16271e] border border-emerald-800/60 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Price Estimation Summary */}
            <div className="bg-gradient-to-r from-emerald-950 to-[#122319] p-4 rounded-xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-cinzel text-slate-400 uppercase tracking-widest block">
                  Estimated Total ({nightsCount} Night{nightsCount > 1 ? 's' : ''})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-serif-display font-bold text-amber-300">
                    ₹{totalEstimateINR.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">
                    (~ ${totalEstimateUSD} USD)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  ✔ Best Price Guarantee & Direct WhatsApp Concierge Assistance
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 text-sm transition-all transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Open WhatsApp Booking Chat</span>
                <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
