"use client";
import React from "react";
import { Calendar, User, MessageSquare } from "lucide-react";

export default function LeftContent({ blog = {}, preview = false }) {
  const [mainSrc, setMainSrc] = React.useState(null);

  // Handle main image
  React.useEffect(() => {
    if (!blog?.mainImage) {
      setMainSrc(null);
    } else if (typeof blog.mainImage === "string") {
      setMainSrc(blog.mainImage);
    } else if (blog.mainImage?.url) {
      setMainSrc(blog.mainImage.url);
    }
  }, [blog?.mainImage]);

  const dateText = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : new Date().toLocaleDateString();

  return (
    <div className="w-full space-y-6 px-0 lg:px-4">
      {/* Blog Heading */}
      <h1 className="text-3xl font-bold text-white">
        {blog?.title || "Untitled Blog"}
      </h1>

      {/* Blog Main Image */}
      {mainSrc && (
        <img
          src={mainSrc}
          alt="Blog Main"
          className="w-full rounded-2xl shadow-lg border border-gray-700"
        />
      )}

      {/* Blog Meta Info */}
      <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} /> <span>{blog?.author || "Anonymous"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} /> <span>{dateText}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={16} /> <span>No responses</span>
        </div>
      </div>

      {/* Blog Sections */}
      <div className="space-y-6 leading-relaxed text-gray-300">
        {(blog?.sections || []).map((section, index) => {
          // ✅ Paragraph
          if (section?.type === "paragraph") {
            return (
              <p key={index} className="whitespace-pre-wrap">
                {section?.content}
              </p>
            );
          }

          // ✅ Heading
          if (section?.type === "heading") {
            const level = section?.level || "h2";
            const headingStyles = {
              h1: "text-4xl font-extrabold text-white",
              h2: "text-3xl font-bold text-white",
              h3: "text-2xl font-semibold text-white",
              h4: "text-xl font-semibold text-white",
              h5: "text-lg font-medium text-white",
              h6: "text-base font-medium text-white",
            };
            const Tag = level;

            return (
              <Tag
                key={index}
                className={`${headingStyles[level] || headingStyles.h2} mt-6 first:mt-0`}
              >
                {section?.content}
              </Tag>
            );
          }

          // ✅ Image (from backend object)
          if (section?.type === "image") {
            let src = "";
            if (preview) {
              src = section?.content?.url;
            } else {
              src = section?.image?.url;
            }

            if (!src) return null;

            return (
              <img
                key={index}
                src={src}
                alt={`Blog section ${index + 1}`}
                className="w-full rounded-2xl shadow-lg border border-gray-700"
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
