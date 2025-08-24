import React from "react";
import { useNavigate } from "react-router-dom";

const BlogLatest = ({ title, description, blogs }) => {
  const navigate = useNavigate();
  return (
    <section className="py-12 px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-3xl text-white font-bold">{title}</h2>
          <p className="text-gray-500 max-w-lg">{description}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, index) => {
            const mainImageSrc = blog?.mainImage?.url || "/images/default.jpg";
            const previewText = blog?.excerpt?.slice(0, 100);
            const createdDate = blog?.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "";

            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition hover:scale-105"
              >
                {/* Image */}
                <img
                  src={mainImageSrc}
                  alt={blog?.title}
                  className="w-full h-64 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-lg mb-2">{blog?.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{createdDate}</p>
                  {previewText && <p className="text-white mb-4">{previewText}...</p>}

                  {/* Read More Button */}
                  <button
                    className="bg-[linear-gradient(to_right,#fff2,transparent)] hover:bg-[#fff2] px-4 py-2 text-white text-sm rounded-lg transition cursor-pointer"
                    onClick={() => navigate(`/blog/${blog?.slug}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogLatest;
