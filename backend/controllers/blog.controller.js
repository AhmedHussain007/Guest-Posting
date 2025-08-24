const Blog = require("../models/blog.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, folder = "blogs") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

exports.createBlog = async (req, res) => {
  try {
    const { title, author } = req.body;

    // Basic required fields check
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    // 1. Handle main image
    if (!req.files?.mainImage || !req.files.mainImage[0]) {
      return res.status(400).json({ error: "Main image is required" });
    }
    const uploadedMain = await uploadToCloudinary(req.files.mainImage[0].buffer);

    // 2. Start building blog doc
    const blog = new Blog({
      title,
      author,
      mainImage: {
        url: uploadedMain.secure_url,
        publicId: uploadedMain.public_id,
      },
      sections: [],
    });

    // 3. Parse sections JSON (sent as a single text field "sections")
    if (!req.body.sections) {
      return res.status(400).json({ error: "Sections payload is required" });
    }

    let parsedSections;
    try {
      parsedSections = JSON.parse(req.body.sections);
      if (!Array.isArray(parsedSections) || parsedSections.length === 0) {
        return res.status(400).json({ error: "Sections must be a non-empty array" });
      }
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON in sections field" });
    }

    // 4. Map image files to image sections
    // frontend appends files in the same order as image sections appear, so we use imgIndex
    let imgIndex = 0;
    for (const section of parsedSections) {
      if (section.type === "image") {
        const fileObj = req.files?.sectionImages?.[imgIndex];
        if (!fileObj) {
          return res.status(400).json({ error: `Missing image file for image section at index ${imgIndex}` });
        }

        const uploaded = await uploadToCloudinary(fileObj.buffer);
        blog.sections.push({
          type: "image",
          image: {
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
          },
        });
        imgIndex++;
      } else {
        // paragraph or heading — sanity-check required fields before pushing
        if ((section.type === "paragraph" || section.type === "heading") && (!section.content || typeof section.content !== "string")) {
          return res.status(400).json({ error: `Invalid content for ${section.type} section` });
        }
        blog.sections.push(section);
      }
    }

    // 5. Save and return
    await blog.save();
    return res.status(201).json(blog);
  } catch (err) {
    console.error("Create blog error:", err);
    return res.status(500).json({ error: "Failed to create blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    console.log("DDDDD");
    const { slug } = req.params; // or _id if you're using that
    const { title, author } = req.body;

    const blog = await Blog.findOne({ slug }); // or findById if using _id
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // 1. Update basic fields if provided
    if (title) blog.title = title;
    if (author) blog.author = author;

    // 2. Handle main image update (optional)
    if (req.files?.mainImage && req.files.mainImage[0]) {
      // Delete old image from Cloudinary
      if (blog.mainImage?.publicId) {
        await cloudinary.uploader.destroy(blog.mainImage.publicId);
      }

      const uploadedMain = await uploadToCloudinary(req.files.mainImage[0].buffer);
      blog.mainImage = {
        url: uploadedMain.secure_url,
        publicId: uploadedMain.public_id,
      };
    }

    // 3. Parse sections JSON (optional)
    if (req.body.sections) {
      let parsedSections;
      try {
        parsedSections = JSON.parse(req.body.sections);
        if (!Array.isArray(parsedSections) || parsedSections.length === 0) {
          return res.status(400).json({ error: "Sections must be a non-empty array" });
        }
      } catch (err) {
        return res.status(400).json({ error: "Invalid JSON in sections field" });
      }

      const updatedSections = [];
      let imgIndex = 0;

      for (const section of parsedSections) {
        if (section.type === "image") {
          const fileObj = req.files?.sectionImages?.[imgIndex];

          if (fileObj) {
            // New file → upload and replace old image if exists
            if (section.image?.publicId) {
              await cloudinary.uploader.destroy(section.image.publicId);
            }
            const uploaded = await uploadToCloudinary(fileObj.buffer);
            updatedSections.push({
              type: "image",
              image: {
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
              },
            });
            imgIndex++;
          } else {
            // No new file → keep existing image data
            if (!section.image || !section.image.url) {
              return res.status(400).json({ error: "Missing existing image data for image section" });
            }
            updatedSections.push(section);
          }
        } else {
          // Paragraph or heading
          if ((section.type === "paragraph" || section.type === "heading") && (!section.content || typeof section.content !== "string")) {
            return res.status(400).json({ error: `Invalid content for ${section.type} section` });
          }
          updatedSections.push(section);
        }
      }

      blog.sections = updatedSections;
    }

    // 4. Save updated blog
    await blog.save();
    return res.status(200).json(blog);
  } catch (err) {
    console.error("Update blog error:", err);
    return res.status(500).json({ error: "Failed to update blog" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};
