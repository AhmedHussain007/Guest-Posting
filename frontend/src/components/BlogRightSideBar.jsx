import React from "react";

export default function RightSidebar({ blogs }) {
  return (
    <aside className="lg:w-3/7 w-full space-y-8 px-6 lg:px-6">
      {/* Admin Profile */}
      <div className="bg-white/5 rounded-2xl p-6 shadow-lg text-center">
        <img
          src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
          alt="Admin"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-white">Erin Carter</h3>
        <p className="text-sm text-gray-400">Travel Blogger</p>
        <p className="mt-2 text-gray-300 text-sm">
          Meet Erin Carter, a passionate explorer and storyteller...
        </p>
      </div>

      {/* You May Like Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">You May Like</h3>
        {blogs?.map((blog, i) => (
          <div
            key={i}
            className="flex gap-4 items-center hover:text-blue-400 transition cursor-pointer"
            onClick={() =>
              (window.location.href = `http://localhost:5173/blog/${blog?.slug}`)
            }
          >
            <img
              src={blog?.mainImage?.url || "/images/default.jpg"}
              alt={blog?.title}
              className="w-20 h-14 rounded-lg object-cover"
            />
            <p className="text-sm">{blog?.title}</p>
          </div>
        ))}
      </div>

      {/* Promotional Box */}
      <div className="bg-purple-600 rounded-2xl p-6 text-center shadow-lg">
        <p className="text-white font-semibold mb-2">
          Your Promotional Content goes here
        </p>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
          Buy Template
        </button>
      </div>
    </aside>
  );
}
