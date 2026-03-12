import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Users, Briefcase, CheckCircle, Sparkles, 
  MapPin, Mail, ArrowRight, ArrowLeft, ShieldCheck 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const VEHICLES = [
  { id: 'car', name: 'Luxury Car', pax: 3, bags: 2, img: 'https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/2023-toyota-aqua-gr-sport.jpg' },
  { id: 'suv', name: 'Premium Mini Van', pax: 4, bags: 4, img: 'https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/210716140154-chrysler-pacifica-2021.jpg' },
  { id: 'van', name: 'KDH Luxury Van', pax: 8, bags: 10, img: 'https://dgqaogrifiyzufrqslxe.supabase.co/storage/v1/object/public/tour-images/WhatsApp%20Image%202026-03-12%20at%202.31.11%20PM.jpeg' },
  { id: 'bus', name: 'Coaster Bus', pax: 20, bags: 25, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80' },
];

const Transport = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    cities: '', pax: 1, baggage: 1, selectedVehicle: '', email: '' 
  });
  const [recommended, setRecommended] = useState(null);

  // LOGIC: Sharp recommendation based on Pax and Bags
  useEffect(() => {
    const suitable = VEHICLES.find(v => 
      parseInt(formData.pax) <= v.pax && parseInt(formData.baggage) <= v.bags
    ) || VEHICLES[3]; // Default to Bus if group is huge
    
    setRecommended(suitable);
    // Auto-select the recommendation by default
    setFormData(prev => ({ ...prev, selectedVehicle: suitable.name }));
  }, [formData.pax, formData.baggage]);

  const handleSubmit = async () => {
    if (!formData.email) {
      toast.error("Please provide your email address.");
      return;
    }

    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005';
      await axios.post(`${backendUrl}/api/transport/book`, formData);
      setStep(3);
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-black/50 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-white/5 transition-all";

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-32 bg-[#0a0a0a] min-h-screen px-4 sm:px-6 relative overflow-hidden flex items-center justify-center">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none translate-y-1/2" />

      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-4">
            Private <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Transfers</span>
          </h1>
          <p className="text-white/50 text-sm font-bold tracking-[0.3em] uppercase">Premium Chauffeured Fleet</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Progress Bar */}
          {step < 3 && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                initial={{ width: '50%' }}
                animate={{ width: step === 1 ? '50%' : '100%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* --- STEP 1: JOURNEY DETAILS --- */}
            {step === 1 && (
              <motion.div key="s1" variants={pageVariants} initial="initial" animate="in" exit="out" className="space-y-8 mt-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-black text-sm">1</div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-widest">Journey Details</h2>
                </div>
                
                <div className="relative">
                  <MapPin className="absolute top-6 left-5 text-blue-500" size={20} />
                  <textarea 
                     placeholder="Which cities are you traveling to? (e.g. Colombo, Kandy, Nuwara Eliya)" 
                     className={`${inputStyle} h-32 pl-14 pt-6`}
                     value={formData.cities}
                     onChange={(e) => setFormData({...formData, cities: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-2 text-white/50 mb-2">
                       <Users size={16}/>
                       <label className="text-[10px] uppercase font-bold tracking-widest">Total Passengers</label>
                    </div>
                    <div className="flex items-center justify-between bg-white/50 border border-white/10 rounded-2xl p-2">
                       <button onClick={() => setFormData(p => ({...p, pax: Math.max(1, p.pax - 1)}))} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-lg transition">-</button>
                       <span className="font-black text-2xl">{formData.pax}</span>
                       <button onClick={() => setFormData(p => ({...p, pax: p.pax + 1}))} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-lg transition">+</button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-2 text-white/50 mb-2">
                       <Briefcase size={16}/>
                       <label className="text-[10px] uppercase font-bold tracking-widest">Large Baggage</label>
                    </div>
                    <div className="flex items-center justify-between bg-white/50 border border-white/10 rounded-2xl p-2">
                       <button onClick={() => setFormData(p => ({...p, baggage: Math.max(0, p.baggage - 1)}))} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-lg transition">-</button>
                       <span className="font-black text-2xl">{formData.baggage}</span>
                       <button onClick={() => setFormData(p => ({...p, baggage: p.baggage + 1}))} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-lg transition">+</button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if(!formData.cities) return toast.error("Please enter your destinations.");
                    setStep(2);
                  }} 
                  className="w-full bg-blue-600 py-6 rounded-2xl font-black uppercase text-white tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group mt-4"
                >
                  Select Vehicle <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* --- STEP 2: FLEET SELECTION --- */}
            {step === 2 && (
              <motion.div key="s2" variants={pageVariants} initial="initial" animate="in" exit="out" className="space-y-8 mt-4">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-black text-sm">2</div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-widest">Select Fleet</h2>
                  </div>
                  <button onClick={() => setStep(1)} className="text-white/40 hover:text-white transition flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                     <ArrowLeft size={14}/> Edit Details
                  </button>
                </div>
                
                {/* RECOMMENDATION BOX */}
                <div className="p-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 rounded-[2rem]">
                  <div className="p-6 bg-[#0a0a0a] rounded-[1.8rem] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-gradient-to-bl from-blue-500 to-emerald-500 text-white rounded-bl-2xl flex items-center gap-1 shadow-lg">
                      <Sparkles size={14}/> <span className="text-[10px] font-black uppercase tracking-widest">Smart Pick</span>
                    </div>
                    
                    <img src={recommended?.img} alt={recommended?.name} className="w-full md:w-48 h-32 object-cover rounded-2xl border border-white/10 shadow-xl" />
                    
                    <div className="flex-1 w-full text-center md:text-left">
                      <p className="text-blue-400 text-[10px] uppercase font-bold tracking-widest mb-1">Optimized for your group</p>
                      <h4 className="text-white text-3xl font-black italic tracking-tighter mb-3">{recommended?.name}</h4>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-white/60 text-sm font-bold bg-white/5 w-fit mx-auto md:mx-0 px-4 py-2 rounded-xl">
                        <span className="flex items-center gap-2"><Users size={16} className="text-emerald-400"/> {recommended?.pax} Pax</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span className="flex items-center gap-2"><Briefcase size={16} className="text-amber-400"/> {recommended?.bags} Bags</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OTHER VEHICLES GRID */}
                <div className="grid grid-cols-2 gap-4">
                  {VEHICLES.map(v => (
                    <button 
                      key={v.id} 
                      onClick={() => setFormData({...formData, selectedVehicle: v.name})}
                      className={`p-4 rounded-[2rem] border transition-all duration-300 relative group text-left ${formData.selectedVehicle === v.name ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
                    >
                      
                      <p className="text-white font-black text-sm uppercase tracking-tight">{v.name}</p>
                      <div className="flex items-center gap-3 mt-2 opacity-60 font-bold">
                         <span className="flex items-center gap-1 text-white"><Users size={12} className={formData.selectedVehicle === v.name ? "text-emerald-400" : "text-white"}/> <span className="text-[10px]">{v.pax}</span></span>
                         <span className="flex items-center gap-1 text-white"><Briefcase size={12} className={formData.selectedVehicle === v.name ? "text-amber-400" : "text-white"}/> <span className="text-[10px]">{v.bags}</span></span>
                      </div>
                      {formData.selectedVehicle === v.name && (
                        <div className="absolute top-4 right-4 bg-blue-500 rounded-full text-white shadow-lg">
                          <CheckCircle size={20} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="relative mt-8 border-t border-white/10 pt-8">
                  <Mail className="absolute top-[3.2rem] left-5 text-emerald-500" size={20} />
                  <input 
                    type="email" 
                    placeholder="Where should we send the quote?" 
                    className={`${inputStyle} pl-14 py-6`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="w-full bg-emerald-600 py-6 rounded-2xl font-black uppercase text-white tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Request Quote'}
                </button>
              </motion.div>
            )}

            {/* --- STEP 3: SUCCESS --- */}
            {step === 3 && (
              <motion.div key="s3" variants={pageVariants} initial="initial" animate="in" className="text-center py-20 px-4">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-8 relative">
                   <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse"></div>
                   <ShieldCheck size={40} className="text-emerald-500 relative z-10" />
                </div>
                <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">Request <span className="text-emerald-500">Received</span></h3>
                <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
                  Your private transport request has been secured. Our concierge team will contact you at <strong className="text-white">{formData.email}</strong> shortly with your customized quote.
                </p>
                <button onClick={() => window.location.reload()} className="mt-12 text-blue-400 text-xs font-bold uppercase tracking-widest hover:text-blue-300 transition border-b border-blue-400/30 pb-1">
                  Book Another Transfer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Transport;