import { motion } from 'framer-motion';

const TourSkeleton = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 h-96 w-full relative overflow-hidden">
      {/* Shimmer Effect */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
      />
      <div className="h-2/3 bg-white/10 rounded-2xl mb-4" />
      <div className="h-6 w-3/4 bg-white/10 rounded-lg mb-2" />
      <div className="h-4 w-1/2 bg-white/10 rounded-lg" />
    </div>
  );
};

export default TourSkeleton;