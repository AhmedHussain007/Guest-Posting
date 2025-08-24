import React from "react";

export default function ServicesRight({ selectedCategory }) {
  const services = [
    { title: "Web Development", desc: "Modern responsive websites", category: "Web Development", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
    { title: "Mobile Apps", desc: "Cross-platform mobile applications", category: "Mobile Apps", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
    { title: "UI/UX Design", desc: "Beautiful and user-friendly designs", category: "UI/UX Design", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
    { title: "AI Solutions", desc: "Machine learning & automation", category: "AI & Machine Learning", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
    { title: "Cloud Services", desc: "Scalable cloud infrastructure", category: "Web Development", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
    { title: "SEO Optimization", desc: "Boost your website ranking", category: "Web Development", img: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" },
  ];

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <main className="lg:w-2/3 w-full p-6">
      <h2 className="text-xl font-semibold text-white mb-6 text-center">
        Our Services
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredServices.map((service, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-xl p-4 shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:bg-white/10 transition text-center"
          >
            {/* Service Image */}
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Service Title */}
            <h3 className="text-lg font-semibold text-white">
              {service.title}
            </h3>

            {/* Service Description */}
            <p className="text-sm text-gray-300 mt-2 mb-4">
              {service.desc}
            </p>

            {/* Add to Cart Button */}
            <button
              className="bg-[linear-gradient(to_right,#fff2,transparent)] hover:bg-[#fff2] px-5 py-2 rounded-lg text-white text-sm font-medium transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
