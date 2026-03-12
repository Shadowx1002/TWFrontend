import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Camera } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Beach', 'Mountain', 'City', 'Nature'];

  const images = [
    { id: 1, category: 'Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', title: 'Maldives Paradise' },
    { id: 2, category: 'Mountain', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', title: 'Alpine Heights' },
    { id: 3, category: 'City', url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80', title: 'Tokyo Nights' },
    { id: 4, category: 'Nature', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', title: 'Forest Path' },
    { id: 5, category: 'Beach', url: 'https://images.unsplash.com/photo-1520483601560-389dff54adcd?auto=format&fit=crop&w=800&q=80', title: 'Greek Shores' },
    { id: 6, category: 'Mountain', url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80', title: 'Everest Base' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4"
          >
            <Camera size={16} /> Visual Journey
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
            CAPTURED <span className="text-blue-500">MOMENTS</span>
          </h2>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                  filter === cat 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group rounded-3xl overflow-hidden cursor-zoom-in border border-white/10"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.url} alt={img.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <Maximize2 className="text-white mx-auto mb-2" size={32} />
                    <p className="text-white font-bold uppercase tracking-widest text-xs">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition"
              >
                <X size={32} />
              </button>
              <img src={selectedImage.url} alt="" className="w-full rounded-3xl border border-white/10 shadow-2xl" />
              <div className="mt-4 text-center">
                <h4 className="text-white text-2xl font-black italic uppercase">{selectedImage.title}</h4>
                <p className="text-blue-500 font-bold">{selectedImage.category}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;