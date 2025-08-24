import React from "react";
import LeftContent from "@/components/BlogLeftSideBar";
import RightSidebar from "@/components/BlogRightSideBar";
import BlogLanding from "@/components/BlogLanding";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogLatest from "@/components/BlogLatest";
import { useParams } from "react-router-dom";

export default function Blog({ blogs = [] }) {
  const { id } = useParams();
  console.log(blogs);
  if (!blogs || blogs.length === 0) {
    return (
      <div className="bg-black text-white flex justify-center items-center h-screen">
        Loading blog...
      </div>
    );
  }

  // const blogs = [
  //   {
  //     id: "1",
  //     title: "One Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "2",
  //     title: "Two Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "3",
  //     title: "Three Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "4",
  //     title: "Four Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "5",
  //     title: "Five Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "/bloglandingbg.jpg",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "6",
  //     title: "Six Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "/bloglandingbg.jpg",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },

  //   {
  //     id: "7",
  //     title: "Seven Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "8",
  //     title: "Eight Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "/bloglandingbg.jpg",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   },
  //   {
  //     id: "9",
  //     title: "Nine Day To Take A Photo With Your Favourite",
  //     author: "Ezrat Popy",
  //     mainImage: "/bloglandingbg.jpg",
  //     sections: [
  //       { type: "paragraph", content: "Good Day To Take A Photo With The Fellow Surfers\n\nThis trip of self-discovery takes place both literally and figuratively on the ocean, which is big and always changing..." },
  //       { type: "paragraph", content: "\"As you paddle out into the ocean, each deliberate stroke not only propels you away from the cacophony of everyday life but puts you in a state of heightened awareness.\"" },
  //       { type: "paragraph", content: "Pass Some Quality Time At The Sea Shore\n\nIn an era marked by increasing globalization and accessibility, the concept of travel has transformed into more than just a leisurely escape..." },
  //       { type: "image", content: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsb2d8ZW58MHx8MHx8fDA%3D" }
  //     ]
  //   }
  // ];


  const mainBlog = blogs.find(blog => blog.slug === id);
  const mayLike = blogs.filter(blog => blog.slug !== id).slice(0, 4);
  const popularblogs = blogs.filter(blog =>
    blog.slug !== id && !mayLike.some(mb => mb.slug === blog.slug)
  );
  console.log(id)
  console.log(blogs);
  console.log("main blog : ", mainBlog);
  return (
    <div className="bg-black">
      <Header />
      <BlogLanding />
      <div className="w-full flex flex-col lg:flex-row gap-8 px-20 py-10 bg-transparent text-gray-200">
        <LeftContent blog={mainBlog} />
        <RightSidebar blogs={mayLike.slice(0, 4)} />
      </div>

      {/* Blog Latest Section */}
      <BlogLatest
        title="Popular Blogs"
        description="Fauna & Flora has been using the collective knowledge and experience to protect nature."
        blogs={popularblogs.slice(0, 3)}
      />

      <Footer />
    </div>
  );
}
