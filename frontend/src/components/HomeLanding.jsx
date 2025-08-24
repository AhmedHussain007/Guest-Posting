import React from "react";
import { motion } from "framer-motion";

export default function HomeLanding() {
  return (
    <section
      className="relative h-[75vh] w-full flex items-center"
      style={{
        backgroundImage: "url('/bloglandingbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-8 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Build Smarter <br /> With Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:text-lg lg:text-xl text-gray-300 mb-8"
        >
          We provide cutting-edge solutions in Web Development, Mobile Apps, AI,
          and more to help your business grow.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[linear-gradient(to_right,#fff2,transparent)] border-[1px] border-[#000] hover:bg-[#fff2] px-8 py-3 text-white rounded-full transition shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}
