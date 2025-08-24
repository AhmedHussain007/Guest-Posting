import React, { useMemo, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import LeftContent from "@/components/BlogLeftSideBar";
import { useCreateBlogMutation } from "@/apis/blogApi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- Schema ---
const sectionSchema = z
  .object({
    type: z.enum(["heading", "paragraph", "image"]),
    level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional(),
    content: z.any(),
  })
  .superRefine((section, ctx) => {
    if (section.type === "paragraph" || section.type === "heading") {
      if (typeof section.content !== "string" || section.content.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["content"],
          message: "Text content is required",
        });
      }
    }
    if (section.type === "image") {
      if (!(section.content instanceof File)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["content"],
          message: "Image file is required",
        });
      }
    }
  });

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  mainImage: z.instanceof(File, { message: "Main image is required" }),
  sections: z.array(sectionSchema).min(1, "Add at least one section"),
});

// --- Component ---
const BlogWriterPage = () => {
  const [createBlog, { isLoading: createBlogIsLoading }] = useCreateBlogMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      mainImage: null,
      sections: [],
    },
    resolver: zodResolver(blogSchema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  // --- Live Preview with temporary URLs ---
  const previewBlog = useMemo(() => {
    const blog = form.watch();
    if (!blog) return blog;

    const mainImageUrl =
      blog.mainImage instanceof File
        ? URL.createObjectURL(blog.mainImage)
        : blog.mainImage?.url || blog.mainImage;

    const sectionsWithUrls = blog.sections.map((section) => {
      if (section.type === "image") {
        if (section.content instanceof File) {
          return { ...section, content: { url: URL.createObjectURL(section.content) } };
        } else if (typeof section.content === "string") {
          return { ...section, content: { url: section.content } };
        } else if (section.content?.url) {
          return section; // already has url
        }
      }
      return section;
    });

    return {
      ...blog,
      mainImage: mainImageUrl,
      sections: sectionsWithUrls,
    };
  }, [form.watch()]);


  // --- Cleanup temporary URLs to prevent memory leaks ---
  useEffect(() => {
    return () => {
      const blog = form.getValues();

      if (blog.mainImage instanceof File) URL.revokeObjectURL(blog.mainImage);

      blog.sections.forEach((section) => {
        if (section.type === "image" && section.content instanceof File) {
          URL.revokeObjectURL(section.content);
        }
      });
    };
  }, []);

  // --- Form Submission ---
  const onSubmit = async (data) => {
    toast.dismiss();
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("mainImage", data.mainImage);

      const sectionsPayload = [];

      data.sections.forEach((section) => {
        if (section.type === "paragraph" || section.type === "heading") {
          sectionsPayload.push({
            type: section.type,
            content: section.content,
            ...(section.type === "heading" ? { level: section.level } : {}),
          });
        } else if (section.type === "image" && section.content instanceof File) {
          sectionsPayload.push({ type: "image" });
          formData.append("sectionImages", section.content); // <-- same key for all
        }
      });

      formData.append("sections", JSON.stringify(sectionsPayload));

      const res = await createBlog(formData).unwrap();

      toast.success(res?.message || "Blog added successfully!");
      form.reset({ title: "", author: "", mainImage: null, sections: [] });
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };


  return (
    <div className="bg-black">
      <Header />
      <div className="h-screen py-16 bg-black flex items-center justify-center">
        <div className="w-full bg-black h-full flex p-4 px-12 gap-8">
          {/* LEFT SIDE - Blog Preview */}
          <div className="relative hidden lg:flex w-2/3 flex-col p-6 bg-black rounded-lg overflow-y-auto border border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-white">Live Preview</h2>
            <LeftContent blog={previewBlog} preview={true} />
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="max-w-md m-auto w-1/3 flex flex-col h-[90vh] items-center overflow-y-auto text-white">
            <p className="mt-4 text-xl font-bold tracking-tight text-white">
              Write a New Blog
            </p>

            <div className="my-7 w-full flex items-center justify-center overflow-hidden text-gray-300">
              <Separator className="bg-gray-700" />
              <span className="text-sm px-2">FORM</span>
              <Separator className="bg-gray-700" />
            </div>

            <Form {...form}>
              <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Blog Title</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black border border-gray-700 text-white placeholder:text-gray-500"
                          placeholder="Enter blog title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Author */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Author</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black border border-gray-700 text-white placeholder:text-gray-500"
                          placeholder="Enter author name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Main Image */}
                <FormField
                  control={form.control}
                  name="mainImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Main Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="bg-black border border-gray-700 text-white file:text-gray-300"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Dynamic Sections */}
                <div>
                  <FormLabel className="text-gray-200">Blog Sections</FormLabel>
                  <div className="space-y-3">
                    {fields.map((section, index) => (
                      <div
                        key={section.id}
                        className="p-3 border border-gray-700 rounded-lg space-y-2"
                      >
                        {/* Paragraph */}
                        {section.type === "paragraph" && (
                          <FormField
                            control={form.control}
                            name={`sections.${index}.content`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Paragraph</FormLabel>
                                <FormControl>
                                  <Input
                                    className="bg-black border border-gray-700 text-white placeholder:text-gray-500"
                                    placeholder="Write a paragraph..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Heading */}
                        {section.type === "heading" && (
                          <>
                            <FormField
                              control={form.control}
                              name={`sections.${index}.level`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Heading Level</FormLabel>
                                  <FormControl>
                                    <select
                                      {...field}
                                      className="w-full bg-black border border-gray-700 text-white p-2 rounded"
                                    >
                                      <option value="h1">H1</option>
                                      <option value="h2">H2</option>
                                      <option value="h3">H3</option>
                                      <option value="h4">H4</option>
                                      <option value="h5">H5</option>
                                      <option value="h6">H6</option>
                                    </select>
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`sections.${index}.content`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-200">Heading Text</FormLabel>
                                  <FormControl>
                                    <Input
                                      className="bg-black border border-gray-700 text-white placeholder:text-gray-500"
                                      placeholder="Write heading text..."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        {/* Image */}
                        {section.type === "image" && (
                          <FormField
                            control={form.control}
                            name={`sections.${index}.content`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-200">Upload Image</FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="bg-black border border-gray-700 text-white file:text-gray-300"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        field.onChange(file);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                        )}

                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Remove Section
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Add buttons */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                      onClick={() => append({ type: "heading", level: "h2", content: "" })}
                    >
                      + Heading
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                      onClick={() => append({ type: "paragraph", content: "" })}
                    >
                      + Paragraph
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                      onClick={() => append({ type: "image", content: null })}
                    >
                      + Image
                    </Button>
                  </div>
                </div>

                {/* Submit */}
                <LoadingButton
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200"
                  isLoading={createBlogIsLoading}
                >
                  Add Blog
                </LoadingButton>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogWriterPage;
