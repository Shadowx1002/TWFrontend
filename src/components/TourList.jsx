import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TourCard from './TourCard.jsx';
import TourSkeleton from './TourSkeleton.jsx';
import BookingModal from './BookingModal.jsx';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tours`);
        setTours(res.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    // THE ID IS HERE
    <section id="tours" className="py-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">
              <Sparkles size={18} /> <span>Must-Visit 2026</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              FEATURED <br /> <span className="text-blue-500">EXPERIENCES</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading 
            ? [...Array(6)].map((_, i) => <TourSkeleton key={i} />)
            : tours.map((tour) => (
                <TourCard 
                   key={tour._id} 
                   tour={tour} 
                   onBookClick={() => { setSelectedTour(tour); setIsModalOpen(true); }} 
                />
              ))
          }
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tour={selectedTour} 
      />
    </section>
  );
};

export default TourList;