"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Snowflake, Menu, X, CloudFog, Sparkles, MapPin, Phone } from 'lucide-react';
import { RESORT_CONFIG, INITIAL_WEATHER } from '../data/resortData';

interface NavbarProps {
  onOpenWhatsAppBooking: () => void;
  snowActive: boolean;
  onToggleSnow: () => void;
  onTriggerElephants: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenWhatsAppBooking,
  snowActive,
  onToggleSnow,
  onTriggerElephants,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Villas & Suites', href: '/villas-and-suites' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Location Map', href: '/location' },
    { name: 'Dining', href: '/dining' },
    { name: 'Experiences', href: '/experiences' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080f0a]/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-amber-400/50 flex items-center justify-center text-amber-300 font-cinzel font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
            🍃
          </div>
          <div>
            <span className="font-cinzel text-base md:text-lg font-bold text-white tracking-wider block group-hover:text-amber-300 transition-colors">
              Munnar 
            </span>
            <span className="text-[9px] font-sans text-amber-400 uppercase tracking-widest block -mt-1 font-semibold">
              Resort
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-amber-300 transition-colors py-1 relative group font-sans-body"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Action Controls & WhatsApp CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Live Weather Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[11px] text-amber-200">
            <CloudFog className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{INITIAL_WEATHER.tempC}°C Munnar Fog</span>
          </div>

          {/* Snowfall / Mist Effect Toggle */}
          <button
            onClick={onToggleSnow}
            className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
              snowActive
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md font-bold'
                : 'bg-emerald-950/80 text-slate-300 border-emerald-800/60 hover:text-white'
            }`}
            title="Toggle Snowfall & Mist Effect"
          >
            <Snowflake className={`w-3.5 h-3.5 ${snowActive ? 'animate-spin' : ''}`} />
            <span>{snowActive ? 'Snow ON' : 'Snow FX'}</span>
          </button>

          {/* Elephants Parade Trigger Toggle */}
          <button
            onClick={onTriggerElephants}
            className="px-3.5 py-1.5 rounded-full bg-emerald-900/90 hover:bg-emerald-800 border border-amber-500/40 text-amber-300 text-xs font-medium flex items-center gap-1.5 shadow-md transition-all transform hover:scale-105"
            title="Trigger Elephants Moving Across Screen"
          >
            <span>🐘 Elephants</span>
          </button>

          {/* Book via WhatsApp Button */}
          <button
            onClick={onOpenWhatsAppBooking}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all transform hover:scale-105 uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Book WhatsApp</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onTriggerElephants}
            className="p-2 bg-emerald-900/80 rounded-full text-amber-300 text-xs border border-amber-500/40"
          >
            🐘
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white bg-slate-900/80 rounded-xl border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a120d] border-b border-amber-500/20 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-900">
            <span className="text-xs font-cinzel text-amber-400">
              🌡️ Munnar Temp: {INITIAL_WEATHER.tempC}°C ({INITIAL_WEATHER.condition})
            </span>
            <button
              onClick={onToggleSnow}
              className={`text-xs px-3 py-1 rounded-full border ${
                snowActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-emerald-950 text-slate-300'
              }`}
            >
              ❄️ Snow {snowActive ? 'On' : 'Off'}
            </button>
          </div>

          <div className="space-y-3 font-sans-body">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-200 hover:text-amber-300 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWhatsAppBooking();
            }}
            className="w-full mt-4 py-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Book via WhatsApp Now</span>
          </button>
        </div>
      )}
    </header>
  );
};
