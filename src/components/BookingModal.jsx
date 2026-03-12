import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Mail, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, tour }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!tour) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {isSubmitted ? (
              <div className="w-full p-24 text-center">
                <CheckCircle className="text-blue-500 mx-auto mb-6" size={80} />
                <h2 className="text-4xl font-black text-white">READY TO FLY!</h2>
                <p className="text-white/40 mt-2">Check your email for the itinerary.</p>
              </div>
            ) : (
              <>
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  <img src={tour.image} className="h-full w-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-10 relative">
                  <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white"><X /></button>
                  <h2 className="text-3xl font-black text-white mb-2 uppercase italic">{tour.title}</h2>
                  <p className="text-blue-500 font-bold text-xl mb-8">${tour.price} <span className="text-sm text-white/30">/ per guest</span></p>
                  
                  <form onSubmit={(e) => {e.preventDefault(); setIsSubmitted(true)}} className="space-y-6">
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500" placeholder="Full Name" />
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500" placeholder="Email Address" />
                    <div className="flex gap-4">
                      <input required type="date" className="w-1/2 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none" />
                      <input required type="number" placeholder="Guests" className="w-1/2 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none" />
                    </div>
                    <button className="w-full bg-blue-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Confirm My Spot</button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;