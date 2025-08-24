import react from 'react';

export default function ServicesLeft({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "AI & Machine Learning",
  ];

  return (
    <aside className="lg:w-1/3 w-full p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>

      {categories.map((cat, i) => (
        <div
          key={i}
          onClick={() => setSelectedCategory(cat)}
          className={`p-4 rounded-xl cursor-pointer transition text-gray-300
          ${selectedCategory === cat ? "bg-[#fff2] text-white" : "bg-white/5 hover:bg-white/10"}`}
        >
          {cat}
        </div>
      ))}
    </aside>
  );
}
