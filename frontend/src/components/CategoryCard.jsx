import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ name,image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.07, rotate: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative w-[150px] h-[150px] md:w-[220px] md:h-[220px] shrink-0 rounded-3xl overflow-hidden cursor-pointer
      bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl
      border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      group"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#ff4d2d] via-orange-400 to-yellow-500 
        opacity-40 blur-2xl group-hover:opacity-80 transition-all duration-700"></div>

      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover relative z-10 
        group-hover:scale-110 group-hover:rotate-1 
        transition-transform duration-700 ease-out"
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Category Text Badge */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
        <span className="px-4 py-2 rounded-full 
          bg-white/10 backdrop-blur-md border border-white/30 
          text-sm md:text-lg font-bold tracking-wide 
          bg-clip-text text-transparent bg-gradient-to-r from-[#ff4d2d] to-orange-400
          group-hover:from-orange-400 group-hover:to-yellow-300
          transition-all duration-700">
          {name}
        </span>
      </div>

      {/* Neon Pulse Border */}
      <div className="absolute inset-0 rounded-3xl z-40 pointer-events-none
        ring-2 ring-transparent group-hover:ring-[#ff4d2d]
        group-hover:shadow-[0_0_30px_#ff4d2d66]
        group-hover:animate-[pulse_2s_infinite]
        transition-all duration-700"></div>
    </motion.div>
  );
};

export default CategoryCard;
