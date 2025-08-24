import React from "react";

const BlogPopularRight = ({ blogs }) => {
  const otherBlogs = blogs?.slice(1);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Text */}
      <p className="text-white/70 mb-4">
        Fauna & Flora has been using the collective knowledge and experience
        to protect nature.
      </p>

      {/* Articles List */}
      <div className="flex flex-col gap-6">
        {otherBlogs?.map((blog, index) => {
          // Image (use mainImage only, since backend provides it)
          const imageSrc = blog?.mainImage?.url || "/images/default.jpg";

          // Use excerpt for preview text
          const previewText = blog?.excerpt?.slice(0, 60);

          return (
            <div key={index} className="grid grid-cols-3 gap-4 items-center">
              <img
                src={imageSrc}
                alt={blog?.title}
                className="rounded-xl w-full h-28 object-cover col-span-1 hover:shadow-[0_0_30px_#fff2]"
              />
              <div className="col-span-2 flex flex-col justify-between">
                <h4 className="font-semibold mb-1">{blog?.title}</h4>
                {previewText && (
                  <p className="text-sm text-white/60 mb-2">{previewText}...</p>
                )}
                <button
                  className="self-start cursor-pointer px-3 py-1 text-xs rounded-full border border-white/30"
                  onClick={() => {
                    window.location.href = `http://localhost:5173/blog/${blog?.slug}`;
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPopularRight;
