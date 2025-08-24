import React from "react";
import { Star } from "lucide-react"; // for star icon (or you can use any other)
import "./Testimonials.css";


export default function Testimonials() {
  return (
    <div>
      <h2 className="text-center my-2 text-white inset-0 flex items-center justify-center text-5xl md:text-7xl select-none"
        style={{ fontFamily: '"Dancing Script", cursive' }}>
        Testimonials
      </h2>
      <div className="hidden md:flex lg:flex w-full select-none relative justify-center h-screen items-center">
        <h2 className="z-10 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[33%] inset-0 flex items-center justify-center text-5xl md:text-7xl select-none"
          style={{ fontFamily: '"Dancing Script", cursive' }}>
          What Clients Say About Us?
        </h2>

        <div className="z-index-100 w-full md:w-[90%] lg:w-[85%] lg:h-[90%] border border-gray-700 rounded-2xl p-20 relative text-white">

          <div className="absolute">
            <div className="flex justify-start mt-10 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>

          {/* Review Card 1 */}
          <div className="absolute top-10 right-10">
            <div className="glass-card p-6 w-[350px] rounded-xl shadow-lg shadow-blue-500/30">
              <p className="text-xs opacity-70 mb-3">(01)</p>
              <p className="text-sm leading-relaxed mb-4">
                We celebrated our anniversary on board — it was magical. Private chef,
                sunset views, crystal-clear waters… absolutely perfect. It felt like
                having a floating five-star hotel. The yacht was stunning, the staff
                was so attentive. Best vacation of our lives!
              </p>
              <p className="text-xs text-gray-300">— Liam & Emily, Dubai</p>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="absolute bottom-10 left-10">
            <div className="glass-card p-6 w-[350px] rounded-xl shadow-lg shadow-blue-500/30">
              <p className="text-xs opacity-70 mb-3">(02)</p>
              <p className="text-sm leading-relaxed mb-4">
                The yacht trip was unforgettable — the crew made us feel like royalty.
                From snorkeling in hidden coves to dining under the stars, every moment
                was breathtaking. Can’t wait to book again!
              </p>
              <p className="text-xs text-gray-300">— Sophia & James, London</p>
            </div>
          </div>

          <div className="absolute bottom-20 right-10">
            <div className="flex flex-col md:flex-row justify-center gap-12 mt-12 text-center">
              <div>
                <h3 className="text-3xl font-bold">1200+</h3>
                <p className="text-gray-400">Reviews</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">10,000+</h3>
                <p className="text-gray-400">Happy Clients</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
