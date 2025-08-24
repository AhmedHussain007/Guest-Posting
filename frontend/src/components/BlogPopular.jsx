import React from "react";
import BlogPopularRight from "./BlogPopularRight";
import BlogPopularLeft from "./BlogPopularLeft";

export default function BlogPopular({ blogs }) {
  return (
    <section className="relative min-h-screen text-white bg-black px-6 md:px-20 py-16">
      <div className="grid grid-cols-1 md:flex gap-12">
        <BlogPopularLeft className="md:w-4/7" blogs={blogs} />
        <BlogPopularRight className="md:w-3/7" blogs={blogs.slice(0, 5)} />
      </div>
    </section>
  );
}
