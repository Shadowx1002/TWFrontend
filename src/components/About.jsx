import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, ShieldCheck, Linkedin, Mail, Award, CheckCircle2, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Destinations', value: '150+', icon: <Globe className="text-blue-400" size={24} />, glow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]' },
    { label: 'Happy Travelers', value: '12k+', icon: <Users className="text-emerald-400" size={24} />, glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]' },
    { label: 'Verified Stays', value: '100%', icon: <ShieldCheck className="text-purple-400" size={24} />, glow: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]' },
  ];

  const team = [
    {
      name: "Sarath Kumarasingha",
      role: "Founder & CEO",
      image: "https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/WhatsApp%20Image%202026-03-12%20at%2012.08.04%20PM.jpeg",
      linkedin: "#"
    },
    {
      name: "Nirodha Sampath",
      role: "Operations Director",
      image: "https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/WhatsApp%20Image%202026-03-12%20at%2012.40.17%20PM.jpeg",
      linkedin: "#"
    },
    {
      name: "Dinidu Madhusanka",
      role: "Head of Guest Experience",
      image: "https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/WhatsApp%20Image%202026-03-12%20at%2012.37.59%20PM.jpeg",
      linkedin: "#"
    }
  ];

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <section id="about" className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none translate-y-1/3 translate-x-1/3" />

      {/* --- DECORATIVE SIDE TEXT --- */}
      <div className="hidden xl:flex absolute left-8 top-32 -rotate-90 origin-left items-center gap-4 text-white/20 font-black tracking-[0.5em] text-xs uppercase z-0 pointer-events-none">
        <span className="w-12 h-[1px] bg-white/20"></span>
        02 // Our Heritage
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- TOP SECTION: STORY --- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-40">
          
          {/* Left: Cinematic Image */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80" 
                alt="Our Vision" 
                className="w-full h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 lg:-right-12 z-20 bg-white/5 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] hidden md:flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-transparent border border-yellow-400/30 flex items-center justify-center mb-4 shadow-inner">
                <Award className="text-yellow-400" size={28} />
              </div>
              <p className="text-xl font-black italic uppercase tracking-widest text-center leading-tight">Bespoke<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Quality</span></p>
            </motion.div>
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <Sparkles className="text-blue-500" size={18} />
                <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs">A Legacy of Excellence</span>
              </motion.div>
              
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">
                CRAFTING <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500">LEGACIES</span>
              </motion.h2>
              
              <motion.p variants={fadeUp} className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed font-medium">
                Kavindu Travels is a leading destination management company in Sri Lanka. We don't just provide tours; we curate deep connections between our guests and the island's rich heritage, delivering unparalleled luxury and authentic experiences.
              </motion.p>

              {/* Stats Grid */}
              <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeUp}
                    className={`group p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all duration-300 ${stat.glow}`}
                  >
                    <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black mb-1 tracking-tighter">{stat.value}</div>
                    <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: LEADERSHIP --- */}
        <div className="mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">The Visionaries</h3>
            <p className="text-white/40 uppercase text-sm font-bold tracking-[0.2em] flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-white/20"></span>
              The team behind your adventure
              <span className="w-12 h-[1px] bg-white/20"></span>
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
              >
                {/* Image with Advanced Grayscale-to-Color Hover */}
                <div className="relative h-[450px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out" 
                  />
                </div>
                
                {/* Sliding Info Panel */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl">
                    <h4 className="text-2xl font-black tracking-tight mb-1">{member.name}</h4>
                    <p className="text-blue-400 text-xs uppercase font-bold tracking-widest mb-4">{member.role}</p>
                    
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- BOTTOM SECTION: LEGAL & TRUST --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-emerald-600/5 border border-white/10 rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-12 shadow-2xl"
        >
          {/* Glass glare effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10 w-full lg:w-auto">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
              <ShieldCheck className="text-blue-500" size={32} />
              Official Verification
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/80 bg-black/20 w-fit px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                <span className="font-medium tracking-wide">SLTDA Registered: <strong className="text-white">SLTDA/DMC/2026/001</strong></span>
              </div>
              <div className="flex items-center gap-4 text-white/80 bg-black/20 w-fit px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
                <CheckCircle2 size={20} className="text-blue-500 shrink-0" />
                <span className="font-medium tracking-wide">Business Reg No: <strong className="text-white">PV-2024-KVT88</strong></span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 text-center lg:text-right flex flex-col items-center lg:items-end w-full lg:w-auto">
             <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 p-4 backdrop-blur-md shadow-inner">
               <img src="logo.png" alt="Logo" className="w-full h-auto grayscale opacity-80" />
             </div>
             <p className="text-white/40 text-[10px] sm:text-xs max-w-sm leading-relaxed uppercase tracking-widest font-bold">
               Authorized Travel Partner & Destination Management Company under the laws of the Democratic Socialist Republic of Sri Lanka.
             </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;