// models/Blog.js
const mongoose = require("mongoose");
const slugify = require("slugify");

const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["heading", "paragraph", "image"],
    },
    // Only for headings
    level: {
      type: String,
      enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    // For heading and paragraph text
    content: {
      type: String,
      trim: true,
    },
    // For image sections
    image: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },
  },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true, unique: true, sparse: true },
    author: { type: String, required: true, trim: true },
    excerpt: { type: String, trim: true },
    // mainImage saved as cloud info
    mainImage: {
      url: { type: String, required: true, trim: true },
      publicId: { type: String, trim: true },
    },
    sections: {
      type: [SectionSchema],
      validate: {
        validator: function (sections) {
          if (!Array.isArray(sections) || sections.length === 0) return false;
          for (const s of sections) {
            if (!["heading", "paragraph", "image"].includes(s.type)) return false;
            if ((s.type === "heading" || s.type === "paragraph") && (!s.content || s.content.trim() === "")) return false;
            if (s.type === "heading" && (!s.level || !/^h[1-6]$/.test(s.level))) return false;
            if (s.type === "image" && (!s.image || !s.image.url)) return false;
          }
          return true;
        },
        message: "Invalid sections array",
      },
    },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Pre-validate: generate slug & excerpt
BlogSchema.pre("validate", function (next) {
  if (this.isModified("title") && (!this.slug || this.slug.trim() === "")) {
    const base = slugify(this.title, { lower: true, strict: true });
    // append short timestamp to help uniqueness (optional)
    this.slug = `${base}-${Date.now().toString().slice(-5)}`;
  }

  if (!this.excerpt && Array.isArray(this.sections)) {
    const firstPara = this.sections.find((s) => s.type === "paragraph" && s.content);
    if (firstPara) this.excerpt = firstPara.content.slice(0, 160);
  }

  next();
});

module.exports = mongoose.models?.Blog || mongoose.model("Blog", BlogSchema);
