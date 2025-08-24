import React, { useState } from "react";
import BlogLanding from "@/components/BlogLanding";
import BlogLatest from "@/components/BlogLatest";
import BlogPopular from "@/components/BlogPopular";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blogs = ({ blogs = [] }) => {

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

  const [visibleCount, setVisibleCount] = useState(3); // show 3 initially

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3); // load 3 more
  };

  return (
    <div className="bg-black">
      <Header />
      <BlogLanding />
      <BlogPopular blogs={blogs} />

      {/* Blog Latest Section with Load More */}
      <BlogLatest
        title="Latest What We Do"
        description="Fauna & Flora has been using the collective knowledge and experience to protect nature."
        blogs={blogs.slice(0, visibleCount)}
      />

      {visibleCount < blogs.length && (
        <div className="text-center py-6 bg-transparent">
          <button
            onClick={loadMore}
            className="bg-[linear-gradient(to_right,#fff2,transparent)] border-[1px] border-[#000] hover:bg-[#fff2] px-6 py-2 text-white rounded-lg transition shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          >
            Load More
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Blogs;
