import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, DollarSign, CheckCircle, ArrowLeft, 
  Users, Star, Map, Calendar, ChevronDown, Camera, ShieldCheck
} from 'lucide-react';
import TourMap from '../components/TourMap'; // <-- Add this import

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0); // For interactive timeline

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/api/tours/${id}`);
        // Adjust this depending on your backend response structure (e.g., res.data.data.tour vs res.data)
        setTour(res.data.data ? res.data.data.tour : res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching details", err);
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-white/50 tracking-widest uppercase text-sm font-bold animate-pulse">Loading Experience...</p>
    </div>
  );

  if (!tour) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Package not found.</div>;

  // Fallback mock data if your DB doesn't have these exact fields yet
  const gallery = tour.images?.length > 0 ? tour.images : [tour.imageCover || tour.image, "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800", "https://images.unsplash.com/photo-1580910582963-71860a957a75?q=80&w=800"];
  const timeline = tour.timeline?.length > 0 ? tour.timeline : [
    { day: 1, title: "Arrival & City Welcome", description: "Arrive at the airport, meet your luxury transport, and head to your 5-star hotel to rest and enjoy a welcome dinner." },
    { day: 2, title: "Cultural Exploration", description: "Visit ancient temples, experience local cuisine, and enjoy a guided evening walking tour through the historic district." },
    { day: 3, title: "Nature & Adventure", description: "Take a scenic train ride into the mountains, followed by an afternoon wildlife safari to spot leopards and elephants." }
  ];
  const highlights = tour.highlights?.length > 0 ? tour.highlights : ["Luxury Transport", "5-Star Hotels", "Private Guide", "Wildlife Safari", "Scenic Train Ride"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navigation */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition font-bold uppercase tracking-wider text-xs">
          <ArrowLeft size={16} /> Back to Destinations
        </button>

        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[50vh] md:h-[65vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl mb-16 group"
        >
          <img src={tour.imageCover || tour.image} alt={tour.title || tour.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000 ease-in-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <span className="bg-blue-600/20 text-blue-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-blue-500/30">
              Premium Package
            </span>
            <h1 className="text-4xl md:text-7xl font-black mt-2 leading-tight tracking-tighter italic uppercase drop-shadow-lg">
              {tour.title || tour.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-6">
               <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-sm">
                 <MapPin className="text-emerald-500" size={18} /> {tour.location || tour.startLocation?.description || 'Sri Lanka'}
               </div>
               <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-sm">
                 <Clock className="text-blue-500" size={18} /> {tour.duration || tour.days} Days
               </div>
               <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-sm">
                 <Users className="text-purple-500" size={18} /> Max {tour.maxGroupSize || '10'} Ppl
               </div>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Deep Details (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview / Description */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black uppercase italic tracking-widest mb-6 border-b border-white/10 pb-4">The Experience</h2>
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                {tour.description || tour.summary || "Prepare for an unforgettable journey. Experience the perfect blend of luxury, adventure, and culture curated specifically for discerning travelers."}
              </p>
            </motion.section>

            {/* Highlights */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black uppercase italic tracking-widest mb-6 border-b border-white/10 pb-4">Highlights</h2>
              <div className="flex flex-wrap gap-4">
                {highlights.map((h, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white/80 hover:bg-white/10 transition cursor-default">
                    <Star className="text-yellow-500" size={16} /> {h}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* --- INTERACTIVE ROUTE MAP --- */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black uppercase italic tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                 <MapPin className="text-blue-500" /> Route Map
              </h2>
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-0">
                <TourMap startLocation={tour.startLocation} timeline={timeline} />
              </div>
            </motion.section>

            {/* Interactive Timeline / Journey */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
               <h2 className="text-3xl font-black uppercase italic tracking-widest mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                 <Map className="text-emerald-500" /> Tour Plan
               </h2>
               
               <div className="space-y-4">
                 {timeline.map((day, idx) => (
                   <div 
                      key={idx} 
                      className={`border rounded-3xl overflow-hidden transition-all duration-500 ${activeDay === idx ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-white/5'}`}
                   >
                     <button 
                       onClick={() => setActiveDay(activeDay === idx ? null : idx)}
                       className="w-full flex items-center justify-between p-6 text-left"
                     >
                       <div className="flex items-center gap-6">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${activeDay === idx ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                           {day.day}
                         </div>
                         <h3 className="text-xl font-bold uppercase tracking-wider">{day.title}</h3>
                       </div>
                       <ChevronDown className={`transition-transform duration-300 ${activeDay === idx ? 'rotate-180 text-blue-500' : 'text-white/30'}`} />
                     </button>
                     
                     <AnimatePresence>
                       {activeDay === idx && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }} 
                           animate={{ height: 'auto', opacity: 1 }} 
                           exit={{ height: 0, opacity: 0 }}
                           className="px-6 pb-6 pt-0"
                         >
                           <div className="pl-18 ml-18 border-t border-white/10 pt-4">
                             <p className="text-white/60 leading-relaxed">{day.description}</p>
                             
                             {/* Optional Stops within the day */}
                             {day.stops && day.stops.length > 0 && (
                               <div className="mt-6 grid sm:grid-cols-2 gap-4">
                                 {day.stops.map((stop, sIdx) => (
                                   <div key={sIdx} className="bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                                     <img src={stop.image || "https://placehold.co/100"} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                     <div>
                                       <p className="text-xs text-emerald-500 font-bold uppercase">{stop.type}</p>
                                       <p className="font-bold text-sm">{stop.name}</p>
                                     </div>
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 ))}
               </div>
            </motion.section>

            {/* Gallery */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black uppercase italic tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                 <Camera className="text-purple-500" /> Destination Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {gallery.slice(0, 4).map((img, i) => (
                  <div key={i} className={`rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? 'col-span-2 h-64' : 'h-48'}`}>
                    <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* RIGHT COLUMN: Sticky Booking / Pricing Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Main Booking Card */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-md relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>

                <div className="mb-8">
                  <p className="text-white/40 uppercase text-xs font-black tracking-widest mb-2">Starting Price</p>
                  <div className="flex items-end gap-2">
                    <p className="text-5xl font-black text-blue-500 tracking-tighter">${tour.price}</p>
                    <p className="text-sm text-white/40 font-bold uppercase tracking-widest mb-1">/ person</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full w-fit">
                    <ShieldCheck size={16} /> Secure Booking
                  </div>
                </div>

                <div className="space-y-6 mb-8 border-t border-white/10 pt-8">
                  <h3 className="text-white/40 uppercase text-xs font-black tracking-widest italic">What's Included</h3>
                  <ul className="space-y-4">
                    {['Luxury Accommodation', 'Private Guide', 'Transport & Fuel', 'Entrance Fees', 'Daily Breakfast'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-bold text-white/80">
                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => navigate('/#planner')} 
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
                >
                  Book Your Journey
                </button>
              </motion.div>

              {/* Need Help Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl text-center"
              >
                <p className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Need Customization?</p>
                <p className="text-xs text-white/60 mb-4 leading-relaxed">Our travel experts can tailor this exact itinerary to match your specific dates and preferences.</p>
                <button className="text-xs font-black uppercase tracking-widest text-white border-b border-white/30 hover:border-white transition pb-1">
                  Contact an Expert
                </button>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourDetails;