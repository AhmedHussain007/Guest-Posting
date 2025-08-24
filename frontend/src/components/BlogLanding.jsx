import React from "react";

/**
 * BlogLanding
 * - Pure black background for readability
 * - Background image layer included (hidden by the black overlay)
 * - Left-aligned content
 * - Uses your requested Tailwind classes for input & button
 *
 * To let the image show through a bit, change the overlay class
 * from `bg-black` to something like `bg-black/90` or `bg-black/80`.
 */
export default function BlogLanding({ bgImage = "/bloglandingbg.jpg" }) {
  return (
    <section className="relative min-h-screen text-white">
      <div
        className="absolute w-full h-screen inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Black overlay (keeps page PURE BLACK) */}
      <div className="absolute inset-0 bg-transparent" aria-hidden="true" />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1 px-6 w-[60%] md:px-20">
          <nav className="text-sm mb-6 mt-50 md:mt-60 text-white/60">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span className="text-white/80">What We Do</span>
          </nav>

          <h1 className="text-left font-[300] text-2xl md:text-3xl lg:text-4xl font-bold leading-snug max-w-4xl">
            Nature Is Essential For The Survival Of All Life On Earth. But It’s Diminishing, Fast.
          </h1>

          {/* Input + Button */}
          <form className="mt-8 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full sm:w-96 px-4 py-3 rounded-lg bg-black text-white placeholder-gray-500 focus:outline-none ring-1 ring-white/15 shadow-[0_0_8px_rgba(255,255,255,0.18),_-6px_8px_16px_rgba(255,255,255,0.32)]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-lg text-white bg-[linear-gradient(to_right,#fff2,transparent)] hover:bg-[#fff2]"
            >
              Contact Us
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="relative border-t border-white/10 px-6 md:px-20 py-4 text-sm text-white/70 flex justify-between">
          <span>Flora Fauna</span>
          <span>What We Do</span>
        </div>
      </div>
    </section>
  );
}
