import React from "react";
import { motion } from "framer-motion";

const AboutExpertise = () => {
  const cards = [
    {
      title: "Flawless Incorporation",
      text: "With our years of experience working in different business niches, our team is able to flawlessly incorporate your selected keywords into excellent quality content.",
      icon: "✅",
    },
    {
      title: "Seamless Management",
      text: "Our end to end solution allows client to completely control the number of keywords, date of posting, place of posting and much more! Seamlessly manage all guest posting operations by choosing Quality Guest Post.",
      icon: "✅",
    },
    {
      title: "Traffic Growth",
      text: "Grow your traffic immensely through our guest posting services based on keywords that you select!",
      icon: "✅", // replace with your own image
    },
    {
      title: "High SERP",
      text: "Boost your SERP rankings through availing our excellent quality guest posting services.",
      icon: "✅", // replace with your own image
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 py-10 text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Expertise in Diverse Business Verticals
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl p-6 shadow-lg border border-gray-700 bg-black/40
              ${i === 3 ? 'lg:hidden' : ''}`}
            whileHover={{
              boxShadow: "0 0 25px rgba(255,255,255,0.4)",
              borderColor: "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.3 }}
          >
            {card.icon && <div className="text-3xl mb-3">{card.icon}</div>}
            {card.image && (
              <div className="flex justify-center mb-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutExpertise;
