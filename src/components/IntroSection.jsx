import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Trees, Waves, ArrowRight, Sparkles } from 'lucide-react';

const IntroSection = () => {
  const features = [
    {
      icon: <Landmark className="text-amber-400" size={28} />,
      title: "2,500 Years of History",
      desc: "From the towering rock fortress of Sigiriya to the sacred temples of Kandy, explore a land where legends live.",
      glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]",
      iconBg: "from-amber-500/20 to-transparent"
    },
    {
      icon: <Trees className="text-emerald-400" size={28} />,
      title: "Untamed Wilderness",
      desc: "Home to the highest density of leopards in the world and the 'Great Elephant Gathering' in Minneriya.",
      glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
      iconBg: "from-emerald-500/20 to-transparent"
    },
    {
      icon: <Waves className="text-blue-400" size={28} />,
      title: "Pristine Coastlines",
      desc: "Surround yourself with golden sands and turquoise waters, from the surf of Arugam Bay to the whales of Mirissa.",
      glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
      iconBg: "from-blue-500/20 to-transparent"
    }
  ];

  // Framer Motion Variants for Staggered Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden flex items-center min-h-[90vh]">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full" 
        />
      </div>

      {/* --- DECORATIVE SIDE TEXT --- */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left items-center gap-4 text-white/20 font-black tracking-[0.5em] text-xs uppercase z-0 pointer-events-none">
        <span className="w-12 h-[1px] bg-white/20"></span>
        01 // The Essence
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Dynamic Grid: 1 col on mobile, 2 col on lg, 3 col on xl */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1.2fr] gap-12 xl:gap-16 items-center">
          
          {/* --- LEFT: COMPELLING TEXT --- */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-2 xl:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-500" size={18} />
              <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs">The Wonder of Asia</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8">
              A SMALL ISLAND <br /> 
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 drop-shadow-lg">
                BIG ADVENTURES
              </span>
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-medium">
              Sri Lanka is not just a destination; it's a feeling. Within a few hours, you can travel from misty tea plantations in the mountains to sun-drenched tropical beaches. It is a land of smiles, spices, and soulful experiences.
            </p>
            
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-sm group relative w-fit"
            >
              <span className="relative z-10">Start Exploring</span>
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 relative z-10">
                <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="absolute left-0 bottom-1 w-24 h-[1px] bg-blue-500/50 group-hover:w-full transition-all duration-500"></span>
            </motion.button>
          </motion.div>

          {/* --- MIDDLE: BEAUTIFUL PHOTOS OF SRI LANKA --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative h-[450px] sm:h-[550px] w-full flex items-center justify-center lg:col-span-1"
          >
            {/* Decorative Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

            {/* Main Tall Image (Heritage/Nature) */}
            <div className="absolute z-10 w-[70%] h-[85%] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src="https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/koslanda.jpeg" alt="Sri Lanka Heritage" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"/>
            </div>
            
            {/* Top Left Floating Image (Wildlife) */}
            <div className="absolute z-20 top-[2%] -left-2 sm:left-[5%] w-36 h-36 sm:w-48 sm:h-48 rounded-[1.5rem] overflow-hidden border-[6px] border-[#0a0a0a] shadow-2xl group">
              <img src="https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/Pinnawala,%20Sri%20Lanka.jpeg" alt="Wildlife" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"/>
            </div>

            {/* Bottom Right Floating Image (Beaches) */}
            <div className="absolute z-20 bottom-[2%] -right-2 sm:right-[5%] w-40 h-40 sm:w-52 sm:h-52 rounded-[1.5rem] overflow-hidden border-[6px] border-[#0a0a0a] shadow-2xl group bg-[#0a0a0a]">
              <img src="https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/_.jpeg" alt="Beach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"/>
            </div>
          </motion.div>

          {/* --- RIGHT: FEATURE CARDS --- */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 relative lg:col-span-1"
          >
            {/* Connecting decorative line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block z-0"></div>

            {features.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: -10, scale: 1.02 }}
                className={`group relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[2.5rem] transition-all duration-500 cursor-default ${item.glow}`}
              >
                <div className="flex gap-4 sm:gap-6 items-start">
                  
                  {/* Icon Container with Gradient Background */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-br ${item.iconBg} border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;