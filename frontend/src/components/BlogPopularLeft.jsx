import React from "react";

const BlogPopularLeft = ({ blogs }) => {
  const blog = blogs?.[0]; // featured blog

  return (
    <div>
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Popular Articles</h2>

      {/* Featured Article Image */}
      <img
        src={blog?.mainImage?.url || "/images/default.jpg"}
        alt={blog?.title}
        className="w-full rounded-2xl mb-6 object-cover
         transition-transform duration-300
         hover:scale-105 hover:border-white
         hover:shadow-[0_0_30px_#fff2]"
      />

      {/* Article Title */}
      <h3 className="text-xl font-semibold mb-3">{blog?.title}</h3>

      {/* Author */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 text-sm rounded-full border border-white/30">
          {blog?.author || "Unknown Author"}
        </span>
      </div>

      {/* Excerpt */}
      {blog?.excerpt && <p className="text-white mb-4">{blog.excerpt}</p>}

      {/* Read More Button */}
      <button
        className="bg-[linear-gradient(to_right,#fff2,transparent)] border-[1px] border-[#000] hover:bg-[#fff2] px-6 py-2 text-white rounded-lg transition shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        onClick={() => {
          window.location.href = `http://localhost:5173/blog/${blog?.slug}`;
        }}
      >
        Read More
      </button>
    </div>
  );
};

export default BlogPopularLeft;
