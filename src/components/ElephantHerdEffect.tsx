import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, AlertCircle, X } from 'lucide-react';

interface ElephantHerdProps {
  isTriggered: boolean;
  onDismiss?: () => void;
}

export const ElephantHerdEffect: React.FC<ElephantHerdProps> = ({ isTriggered, onDismiss }) => {
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Play gentle nature elephant rumble / ambient using Web Audio API synth if requested
  const playGentleElephantRumble = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setAudioContext(ctx);

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      if (ctx.state === 'suspended') return;

      const startTime = ctx.currentTime;
      const duration = 2.0;

      // Create oscillators for a richer, more complex sound
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // LFO for vibrato effect typical in elephant trumpets
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';
      lfo.type = 'sine';

      // LFO frequency (vibrato speed) and depth
      lfo.frequency.value = 12; // 12Hz vibrato
      lfoGain.gain.value = 30; // 30Hz pitch variation

      // Connect LFO to oscillator frequencies
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      // Frequency envelope for trumpet
      [osc1, osc2].forEach(osc => {
        osc.frequency.setValueAtTime(250, startTime);
        osc.frequency.exponentialRampToValueAtTime(500, startTime + 0.3);
        osc.frequency.exponentialRampToValueAtTime(450, startTime + 0.8);
        osc.frequency.exponentialRampToValueAtTime(150, startTime + duration);
      });

      // Detune osc2 for a thicker sound
      osc2.detune.value = 20;

      // Amplitude envelope
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(startTime);
      osc1.start(startTime);
      osc2.start(startTime);

      lfo.stop(startTime + duration);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
      
      setIsPlayingSound(true);
      setTimeout(() => setIsPlayingSound(false), duration * 1000);
    } catch (err) {
      // Audio fallback gracefully
      console.warn("AudioContext couldn't start:", err);
    }
  };

  useEffect(() => {
    if (isTriggered) {
      playGentleElephantRumble();
    }
  }, [isTriggered]);

  if (!isTriggered) return null;

  return (
    <div className="fixed inset-x-0 bottom-12 pointer-events-none z-50 overflow-hidden">
      {/* Top Banner Alert */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="pointer-events-auto mx-auto w-fit mb-4 bg-emerald-950/90 border border-amber-500/40 text-amber-200 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs md:text-sm font-medium tracking-wide"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="font-cinzel text-amber-300 font-bold">Munnar Wildlife Corridor Alert:</span>
          <span>Elephant Herd Crossing the Estate Trails 🐘</span>
          <button
            onClick={playGentleElephantRumble}
            className="ml-2 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 p-1.5 rounded-full border border-amber-500/30 transition-colors"
            title="Play Nature Ambient Sound"
          >
            {isPlayingSound ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Moving Herd SVG Container */}
      <div className="relative w-full h-32 md:h-44">
        <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: '110vw' }}
          transition={{
            duration: 25, // Slower, more natural crossing
            ease: 'linear',
            repeat: 0,
          }}
          className="flex items-end gap-6 md:gap-10 absolute bottom-0 left-0"
        >
          {/* Big Papa Elephant */}
          <motion.div
            animate={{
              y: [0, -3, 0, -2, 0],
              rotate: [0, 1, 0, -0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5, // Slower heavy steps for the big bull
              ease: 'easeInOut',
            }}
            className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            <svg
              viewBox="0 0 200 130"
              className="w-28 h-20 md:w-44 md:h-32 text-slate-800 fill-slate-900 stroke-amber-500/30"
            >
              {/* Elephant Body SVG Path */}
              <g fill="currentColor">
                {/* Back & Tail */}
                <path d="M 40,75 C 30,50 50,25 90,20 C 130,15 160,35 170,55 C 180,75 175,90 170,100 C 165,105 160,110 150,110 L 140,110 C 140,95 130,95 130,110 L 115,110 C 115,95 100,95 100,110 L 85,110 C 85,95 70,95 70,110 L 55,110 C 55,95 40,95 40,110 Z" />
                {/* Head & Ears */}
                <circle cx="160" cy="45" r="22" />
                <path d="M 145,30 C 130,25 125,50 145,60 Z" fill="#1e2923" />
                {/* Trunk swinging */}
                <path d="M 175,50 Q 195,65 185,85 Q 175,100 185,110 Q 190,112 182,102 Q 170,85 170,60 Z" />
                {/* Tusk */}
                <path d="M 170,60 Q 185,62 192,52 Q 182,58 168,58 Z" fill="#fef08a" />
                {/* Eye */}
                <circle cx="165" cy="42" r="2" fill="#fbbf24" />
                {/* Tail */}
                <path d="M 40,70 Q 30,85 32,100" stroke="#475569" strokeWidth="2" fill="none" />
              </g>
            </svg>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500/20 text-amber-300 text-[9px] px-2 py-0.5 rounded-full border border-amber-500/30 font-cinzel">
              Bull Elephant
            </span>
          </motion.div>

          {/* Mama Elephant */}
          <motion.div
            animate={{
              y: [0, -2.5, 0, -2, 0],
              rotate: [0, -0.5, 0, 0.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2, // Slightly faster than the big bull
              ease: 'easeInOut',
              delay: 0.1,
            }}
            className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            <svg
              viewBox="0 0 200 130"
              className="w-24 h-18 md:w-36 md:h-28 text-slate-800 fill-slate-900 stroke-amber-500/30"
            >
              <g fill="currentColor">
                <path d="M 40,75 C 30,50 50,25 90,20 C 130,15 160,35 170,55 C 180,75 175,90 170,100 C 165,105 160,110 150,110 L 140,110 C 140,95 130,95 130,110 L 115,110 C 115,95 100,95 100,110 L 85,110 C 85,95 70,95 70,110 L 55,110 C 55,95 40,95 40,110 Z" />
                <circle cx="160" cy="45" r="20" />
                <path d="M 145,30 C 130,25 125,50 145,60 Z" fill="#1e2923" />
                <path d="M 172,50 Q 190,65 180,85 Q 170,95 178,105 Z" />
                <circle cx="163" cy="42" r="2" fill="#fbbf24" />
                <path d="M 40,70 Q 30,85 32,100" stroke="#475569" strokeWidth="2" fill="none" />
              </g>
            </svg>
          </motion.div>

          {/* Cute Baby Elephant following mom! */}
          <motion.div
            animate={{
              y: [0, -4, 0, -3, 0],
              rotate: [0, 2, 0, -1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2, // Faster steps for the baby calf
              ease: 'easeInOut',
            }}
            className="relative drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          >
            <svg
              viewBox="0 0 200 130"
              className="w-14 h-10 md:w-22 md:h-16 text-slate-800 fill-slate-900 stroke-amber-400/40"
            >
              <g fill="currentColor">
                <path d="M 40,75 C 30,50 50,25 90,20 C 130,15 160,35 170,55 C 180,75 175,90 170,100 L 140,110 C 140,95 130,95 130,110 L 115,110 C 115,95 100,95 100,110 L 85,110 Z" />
                <circle cx="160" cy="45" r="16" />
                <path d="M 148,32 C 135,28 132,50 148,58 Z" fill="#2d3f34" />
                <path d="M 168,48 Q 182,60 175,75 Z" />
                <circle cx="162" cy="42" r="1.5" fill="#fef08a" />
              </g>
            </svg>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500/30 text-emerald-300 text-[8px] px-1.5 py-0.2 rounded-full border border-emerald-500/40 font-sans whitespace-nowrap">
              Baby Calf 🍼
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
