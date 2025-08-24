const express = require("express");
const router = express.Router();
const { createBlog, getBlogs, getBlogBySlug, updateBlog } = require("../controllers/blog.controller");
const upload = require("../middlewares/upload.middleware");

// Create blog (with mainImage + section images)
router.post("/", upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "sectionImages", maxCount: 20 },
]), createBlog);

router.put( "/:slug", upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "sectionImages", maxCount: 20 },
  ]), updateBlog);

// Get all blogs
router.get("/", getBlogs);

// Get blog by slug
router.get("/:slug", getBlogBySlug);

module.exports = router;
