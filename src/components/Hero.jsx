import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Info } from 'lucide-react';

const Hero = () => {
  const [showStory, setShowStory] = useState(false);

  const scrollToPlanner = () => {
    const plannerSection = document.getElementById('planner');
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
            className="h-full w-full object-cover opacity-60"
            alt="Sri Lanka Paradise"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0a0a0a]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-8 italic"
          >
            WELCOME <br /> TO<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-6xl md:text-9xl ">
            SRI LANKA
            </span>
          </motion.h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={scrollToPlanner}
              className="px-10 py-5 bg-blue-600 rounded-2xl font-black text-white uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/20"
            >
              Start Planning
            </button>

            {/* WATCH STORY TRIGGER
            <button 
              onClick={() => setShowStory(true)}
              className="flex items-center gap-3 text-white font-bold hover:text-blue-400 transition-all group"
            >
              <div className="p-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md group-hover:scale-110 transition-transform">
                <Play size={20} fill="currentColor" />
              </div>
              Watch Story
            </button> */}
          </div>
        </div>
      </section>

      {/* --- CINEMATIC VIDEO MODAL --- */}
      <AnimatePresence>
        {showStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowStory(false)}
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition"
            >
              <X size={48} strokeWidth={1} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)] border border-white/10 relative"
            >
              {/* The Video */}
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/8g9ccCkT-u0?autoplay=1&rel=0&modestbranding=1&controls=1" 
                title="Sri Lanka Cinematic Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>

              {/* Overlay Info (Appears after 2 seconds) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none"
              >
                <div className="max-w-xs">
                  <p className="text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-1">Now Playing</p>
                  <h4 className="text-white font-black italic uppercase text-xl">The Spirit of Ceylon</h4>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                   <Info size={14} className="text-blue-400" />
                   <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Cinema 4K Experience</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;