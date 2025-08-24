import React, { useState } from "react";
import "./GlassCards.css";

const cards = [
  {
    text: "High-Quality Guest Posts",
    rotation: -15,
    details:
      "We provide well-written guest posts tailored to your niche, boosting your website’s authority and SEO ranking.",
    svg: (
      <svg viewBox="0 0 496 512" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M165.9 397.4c0 ..."></path>
      </svg>
    ),
  },
  {
    text: "SEO Optimized",
    rotation: 5,
    details:
      "Our content is fully optimized with SEO strategies to help you rank higher on Google and drive organic traffic.",
    svg: (
      <svg viewBox="0 0 640 512" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M392.8 1.2c-17-4.9 ..."></path>
      </svg>
    ),
  },
  {
    text: "Earn Authority",
    rotation: 25,
    details:
      "Get backlinks from authoritative sites to improve your credibility and brand trust in your industry.",
    svg: (
      <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 64C28.7 64 ..."></path>
      </svg>
    ),
  },
  {
    text: "Affordable Plans",
    rotation: -10,
    details:
      "Choose from flexible pricing options that suit every budget, whether you’re a startup or a growing brand.",
    svg: (
      <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 48C141 ..."></path>
      </svg>
    ),
  },
];

export default function WhyChooseUsCards() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section style={{ width: "100%", padding: "4rem 2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>
        Why Choose Us?
      </h2>
      <p style={{ maxWidth: "600px", margin: "1rem auto", color: "#ddd" }}>
        We specialize in guest posting services that build credibility, improve
        SEO, and drive real traffic to your website. Here’s what sets us apart:
      </p>

      <div className="container px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="glass relative p-6 rounded-xl shadow-lg flex flex-col justify-start items-start h-auto"
            style={{ "--r": card.rotation }}
          >
            <h4 className="text-lg text-white font-semibold mb-2">{card.text}</h4>
            <p className="text-sm text-gray-300 mb-4">{card.details.slice(0, 60)}...</p>
            <button
              className="card-btn absolute bottom-4 bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-full transition"
              onClick={() => setActiveCard(card)}
            >
              Click Me
            </button>
          </div>
        ))}
      </div>




      {/* Popup Modal */}
      {activeCard && (
        <div className="modal-overlay" onClick={() => setActiveCard(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{activeCard.text}</h3>
            <p>{activeCard.details}</p>
            <button className="close-btn" onClick={() => setActiveCard(null)}>
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
