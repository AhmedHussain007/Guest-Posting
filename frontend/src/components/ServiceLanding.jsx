import React from "react";

export default function ServicesLanding() {
  return (
    <section
      className="relative w-full h-[80vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 lg:px-20 text-left">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Build Smarter Digital Solutions
        </h1>

        {/* Small Text */}
        <p className="text-lg text-gray-300 mb-8">
          From web development to AI solutions, our services empower your
          business to grow, scale, and succeed in today’s digital world.
        </p>

        {/* Button */}
        <button
          className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md
          hover:bg-blue-700 transition"
        >
          Explore Services
        </button>
      </div>
    </section>
  );
}
