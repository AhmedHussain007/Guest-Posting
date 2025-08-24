import React, { useState } from "react";
import ServicesLeft from "../../components/ServicesLeft";
import ServicesRight from "@/components/ServicesRight";
import Header from "@/components/Header";
import ServicesLanding from "@/components/ServiceLanding";
import Footer from "@/components/Footer";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <ServicesLanding />
      <div className="w-full flex flex-col lg:flex-row gap-6 py-10 text-gray-200">
        <ServicesLeft
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ServicesRight selectedCategory={selectedCategory} />
      </div>
      <Footer />
    </div>
  );
}
