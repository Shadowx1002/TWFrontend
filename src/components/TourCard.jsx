import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/tour/${tour._id}`)}
      className="group cursor-pointer bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
          <p className="text-blue-400 font-black text-sm">${tour.price}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase font-bold tracking-widest mb-3">
          <span className="flex items-center gap-1"><MapPin size={12}/> {tour.location}</span>
          <span className="flex items-center gap-1"><Clock size={12}/> {tour.duration}</span>
        </div>
        
        <h3 className="text-2xl font-black text-white italic uppercase mb-4 group-hover:text-blue-400 transition-colors">
          {tour.title}
        </h3>
        
        <p className="text-white/50 text-sm line-clamp-2 mb-6 leading-relaxed">
          {tour.description}
        </p>

        <div className="flex items-center gap-2 text-blue-500 font-bold uppercase text-[10px] tracking-widest">
          View Details <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform"/>
        </div>
      </div>
    </div>
  );
};

// THIS IS THE LINE YOU ARE LIKELY MISSING:
export default TourCard;