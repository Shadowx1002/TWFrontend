import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Planner = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plan, setPlan] = useState({
    fullName: '', arrivalDate: '', departureDate: '', country: '',
    whatsapp: '', pax: '1', rooms: '1', hotelCategories: [],
    mealPlans: [], interests: [], budget: '', otherRequirements: '', email: ''
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleMultiSelect = (field, value) => {
    const current = plan[field];
    const updated = current.includes(value) ? current.filter(i => i !== value) : [...current, value];
    setPlan({ ...plan, [field]: updated });
  };

  const submitToBackend = async () => {
    if (!validateEmail(plan.email)) return toast.error("Please enter a valid email address.");
    if (!plan.budget) return toast.error("Please select a budget range.");
    
    setIsSubmitting(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005';
      await axios.post(`${backendUrl}/api/planner/send-quote`, plan);
      setStep(5);
    } catch (err) {
      toast.error("Error sending request. Please try again later.");
    } finally { 
      setIsSubmitting(false); 
    }
  };

  // MOBILE UI FIXES: Using black/40 for inset contrast, higher opacity labels, and better padding.
  const inputClass = "w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-blue-500 focus:bg-black/60 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-white/30 shadow-inner";
  const labelClass = "text-white/60 text-[10px] uppercase font-bold tracking-widest block mb-2 ml-1";
  
  // Adjusted toggle buttons for better contrast
  const btnClass = (field, val) => `px-3 py-3 sm:px-4 sm:py-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider border transition-all ${plan[field].includes(val) ? 'bg-blue-500 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-black/40 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/10 shadow-inner'}`;

  // Animation Variants
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <section id="planner" className="py-24 md:py-32 bg-[#0a0a0a] min-h-screen px-4 sm:px-6 scroll-mt-20 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto relative">
        
        {/* Progress Bar */}
        <div className="flex justify-center mb-8 gap-2 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-500 w-12 sm:w-16 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10 w-6 sm:w-8'}`} />
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            
            {/* --- STEP 1: BASICS --- */}
            {step === 1 && (
              <motion.div key="s1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-5 md:space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white italic mb-6 md:mb-8 uppercase tracking-tighter">Travel <span className="text-blue-500">Basics</span></h2>
                
                <div className="space-y-2">
                  <label className={labelClass}>Full Name</label>
                  <input required className={inputClass} placeholder="Enter your full name" value={plan.fullName} onChange={(e) => setPlan({...plan, fullName: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-4 ">
                  <div className="space-y-2">
                    <label className={labelClass}>Arrival Date</label>
                    {/* [color-scheme:dark] forces the calendar icon to be white on mobile */}
                    <input type="date" className={`${inputClass} [color-scheme:dark] text-white`} value={plan.arrivalDate} onChange={(e) => setPlan({...plan, arrivalDate: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Departure Date</label>
                    <input type="date" className={`${inputClass} [color-scheme:dark] text-white`} value={plan.departureDate} onChange={(e) => setPlan({...plan, departureDate: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className={labelClass}>Your Country</label>
                  <input required className={inputClass} placeholder="e.g. United Kingdom" value={plan.country} onChange={(e) => setPlan({...plan, country: e.target.value})} />
                </div>
                
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!plan.fullName || !plan.arrivalDate || !plan.country} 
                  className="w-full bg-blue-500 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30 mt-4 md:mt-0"
                >
                  Next Step
                </button>
              </motion.div>
            )}

            {/* --- STEP 2: GROUP & STAY --- */}
            {step === 2 && (
              <motion.div key="s2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-black text-white italic mb-6 md:mb-8 uppercase tracking-tighter">Stay & <span className="text-blue-500">Group</span></h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-4">
                  <div className="space-y-2">
                    <label className={labelClass}>WhatsApp Number (OPTIONAL)</label>
                    <input type="tel" className={inputClass} placeholder="+xx xxxxxxxx" value={plan.whatsapp} onChange={(e) => setPlan({...plan, whatsapp: e.target.value})} />
                  </div>
                  <div className="space-y-2 relative">
                    <label className={labelClass}>Number of Passengers</label>
                    <select className={`${inputClass} [color-scheme:dark] appearance-none cursor-pointer`} value={plan.pax} onChange={(e) => setPlan({...plan, pax: e.target.value})}>
                      {[...Array(50)].map((_, i) => <option key={i} value={i+1} className="bg-[#111] text-white">Pax: {i+1}</option>)}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 bottom-[18px] text-white/50 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={labelClass}>Preferred Hotel Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {["Boutique", "5 Star", "4 Star", "3 Star", "Budget"].map(c => (
                      <button key={c} onClick={() => handleMultiSelect('hotelCategories', c)} className={btnClass('hotelCategories', c)}>{c}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-4">
                  <div className="space-y-2 relative">
                    <label className={labelClass}>Rooms Required</label>
                    <select className={`${inputClass} [color-scheme:dark] appearance-none cursor-pointer`} value={plan.rooms} onChange={(e) => setPlan({...plan, rooms: e.target.value})}>
                      {[...Array(25)].map((_, i) => <option key={i} value={i+1} className="bg-[#111] text-white">Rooms: {i+1}</option>)}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 bottom-[18px] text-white/50 pointer-events-none" />
                  </div>
                  <div className="space-y-3">
                    <label className={labelClass}>Meal Plan</label>
                    <div className="flex flex-wrap gap-2">
                      {["Bed & Breakfast", "Half Board", "Full Board"].map(m => (
                        <button key={m} onClick={() => handleMultiSelect('mealPlans', m)} className={btnClass('mealPlans', m)}>{m}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3 md:gap-4 pt-2">
                  <button onClick={() => setStep(1)} className="w-1/3 bg-black/40 py-4 rounded-xl border border-white/10 font-bold uppercase text-[10px] md:text-xs text-white/80 hover:bg-black/60 hover:text-white transition">Back</button>
                  <button onClick={() => setStep(3)} className="w-2/3 bg-blue-500 py-4 rounded-xl font-black uppercase text-xs md:text-sm text-white hover:bg-blue-400 transition shadow-lg shadow-blue-500/30">Next Step</button>
                </div>
              </motion.div>
            )}

            {/* --- STEP 3: INTERESTS --- */}
            {step === 3 && (
              <motion.div key="s3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-black text-white italic mb-4 md:mb-8 uppercase tracking-tighter">Your <span className="text-blue-500">Interests</span></h2>
                <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-6">Select everything you want to experience:</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {["Culture & Heritage", "Nature", "Ancient & Archeology", "Wild Life", "Adventure", "Beach", "Shopping"].map(i => (
                    <button key={i} onClick={() => handleMultiSelect('interests', i)} className={btnClass('interests', i)}>{i}</button>
                  ))}
                </div>
                
                <div className="flex flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                  <button onClick={() => setStep(2)} className="w-1/3 bg-black/40 py-4 rounded-xl border border-white/10 font-bold uppercase text-[10px] md:text-xs text-white/80 hover:bg-black/60 hover:text-white transition">Back</button>
                  <button onClick={() => setStep(4)} className="w-2/3 bg-blue-500 py-4 rounded-xl font-black uppercase text-xs md:text-sm text-white hover:bg-blue-400 transition shadow-lg shadow-blue-500/30">Final Details</button>
                </div>
              </motion.div>
            )}

            {/* --- STEP 4: BUDGET & CONTACT --- */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 md:space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white italic mb-6 md:mb-8 uppercase tracking-tighter">Final <span className="text-blue-500">Contact</span></h2>
                
                <div className="space-y-2 relative">
                  <label className={labelClass}>Target Budget (Per Person)</label>
                  <select 
                    required
                    className={`${inputClass} [color-scheme:dark] appearance-none cursor-pointer`}
                    onChange={(e) => setPlan({...plan, budget: e.target.value})}
                    value={plan.budget}
                  >
                    <option value="" className="bg-[#111] text-white/50">Select your budget range</option>
                    <option value="$500" className="bg-[#111] text-white">$500</option>
                    <option value="$500 - $1500" className="bg-[#111] text-white">$500 - $1500</option>
                    <option value="$1500 - $2500" className="bg-[#111] text-white">$1500 - $2500</option>
                    <option value="$2500 - $3000" className="bg-[#111] text-white">$2500 - $3000</option>
                    <option value="$3000 - $5000" className="bg-[#111] text-white">$3000 - $5000</option>
                    <option value="$5000 - $7000" className="bg-[#111] text-white">$5000 - $7000</option>
                    <option value="Above $7000" className="bg-[#111] text-white">Above $7000</option>
                  </select>
                  <div className="absolute right-4 bottom-[18px] pointer-events-none text-white/50">
                    <ChevronDown size={18} />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className={labelClass}>Other Requirements</label>
                   <textarea className={`${inputClass} h-24 resize-none`} placeholder="e.g. Dietary needs, specific locations..." value={plan.otherRequirements} onChange={(e) => setPlan({...plan, otherRequirements: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className={labelClass}>Email Address</label>
                  <input required type="email" className={`${inputClass} ${plan.email && !validateEmail(plan.email) ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`} placeholder="yourname@example.com" value={plan.email} onChange={(e) => setPlan({...plan, email: e.target.value})} />
                </div>

                <div className="flex flex-row gap-3 md:gap-4 pt-4">
                  <button onClick={() => setStep(3)} className="w-1/3 bg-black/40 py-4 rounded-xl border border-white/10 font-bold uppercase text-[10px] md:text-xs text-white/80 hover:bg-black/60 hover:text-white transition">Back</button>
                  <button onClick={submitToBackend} disabled={isSubmitting || !plan.email || !plan.budget} className="w-2/3 bg-emerald-500 py-4 rounded-xl font-black uppercase text-[10px] sm:text-xs md:text-sm text-white flex items-center justify-center gap-2 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Sending..." : "Get My Quotation"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* --- STEP 5: SUCCESS --- */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 md:py-12">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle size={40} className="text-emerald-500 md:w-[50px] md:h-[50px]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">Request Received</h3>
                <p className="text-white/70 mt-4 text-sm max-w-sm mx-auto leading-relaxed">Thank you! Kavindu Travels will analyze your unique plan and contact you at <strong className="text-white font-bold">{plan.email}</strong> shortly.</p>
                
                <button 
                  onClick={() => {
                     setPlan({
                        fullName: '', arrivalDate: '', departureDate: '', country: '',
                        whatsapp: '', pax: '1', rooms: '1', hotelCategories: [],
                        mealPlans: [], interests: [], budget: '', otherRequirements: '', email: ''
                     });
                     setStep(1);
                  }} 
                  className="mt-10 text-blue-500 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:text-blue-400 transition border-b border-blue-500/30 pb-1"
                >
                  Plan Another Trip
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Planner;