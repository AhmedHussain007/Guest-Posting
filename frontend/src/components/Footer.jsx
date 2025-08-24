import React from "react";

const Footer = ({ cond = false }) => {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-6 text-white">

      {/* Top Section with Subscribe */}
      {
        cond ? (
          ""
        ) : (
          <div className="max-w-5xl mx-auto mb-12">
            <div className="rounded-2xl shadow-xl p-8 md:p-12 text-center relative bg-black">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 -z-10"></div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Grow your business fast with <br /> Rareblocks UI Kit.
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full sm:w-96 px-4 py-3 rounded-lg bg-black text-white placeholder-gray-500 focus:outline-none ring-1 ring-white/15 shadow-[0_0_8px_rgba(255,255,255,0.18),_-6px_8px_16px_rgba(255,255,255,0.32)]"
                />
                <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Bottom Links Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">About</a></li>
            <li><a href="#" className="hover:text-gray-400">Features</a></li>
            <li><a href="#" className="hover:text-gray-400">Works</a></li>
            <li><a href="#" className="hover:text-gray-400">Career</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Help</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
            <li><a href="#" className="hover:text-gray-400">Delivery Details</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Free eBooks</a></li>
            <li><a href="#" className="hover:text-gray-400">Development Tutorial</a></li>
            <li><a href="#" className="hover:text-gray-400">How to – Blog</a></li>
            <li><a href="#" className="hover:text-gray-400">Youtube Playlist</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-400">Free eBooks</a></li>
            <li><a href="#" className="hover:text-gray-400">Development Tutorial</a></li>
            <li><a href="#" className="hover:text-gray-400">How to – Blog</a></li>
            <li><a href="#" className="hover:text-gray-400">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
