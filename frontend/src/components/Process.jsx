import React from "react";
import { Archive, ChartNoAxesCombined, Flag } from "lucide-react";

export default function GuestPostingSteps() {
  return (
    <section className="w-full mt-6 relative md:px-10 lg:px-14">
      <h2 className="text-center my-8 text-white inset-0 flex items-center justify-center text-5xl md:text-7xl select-none"
        style={{ fontFamily: '"Dancing Script", cursive' }}>
        What Clients Say About Us?
      </h2>
      <div className="relative w-full">
        {/* The curved line */}
        <svg
          className="w-full h-[450px]"
          viewBox="0 0 23 11"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M 0 5
              Q 1 7 4 7
              C 7 7 8 6 11 2
              S 19 10 22 3
              C 23 1 23.3333 3.6667 24 4
            "
            stroke="#1E90FF"
            strokeWidth="0.1"
            fill="none"
          />
        </svg>

        {/* Circles with icons */}
        {/* Step 1 Icon */}
        <div
          className="absolute bg-white rounded-full flex items-center justify-center shadow-md
             w-10 h-10
             left-[15%] top-[50%] md:left-[15%] md:top-[59%] lg:left-[15%] lg:top-[59%]"
        >
          <Flag className="text-blue-500 w-6 h-6" />
        </div>

        {/* Step 2 Icon */}
        <div
          className="absolute bg-white rounded-full flex items-center justify-center shadow-md
             w-10 h-10
             left-[49%] top-[4%] md:left-[50%] md:top-[7%] lg:left-[50%] lg:top-[7%]"
        >
          <ChartNoAxesCombined className="text-blue-500 w-6 h-6" />
        </div>

        {/* Step 3 Icon */}
        <div
          className="absolute bg-white rounded-full flex items-center justify-center shadow-md
             w-10 h-10
             left-[80%] top-[36%] md:left-[82%] md:top-[42%] lg:left-[82%] lg:top-[42%]"
        >
          <Archive className="text-blue-500 w-6 h-6" />
        </div>


        {/* ✅ Text Content for each step */}

        <div className="absolute text-center w-34 md:w-50 lg:w-65 left-[1%] top-[32%] md:left-[6%] md:top-[25%] lg:left-[6%] lg:top-[25%]">
          <h2 className="font-semibold md:text-2xl lg:text-3xl text-white"> General concept </h2>
          <p className="hidden md:block text-sm my-1 text-gray-300">
            Far far away, behind mountains, far from the countries Vokalia.
          </p>
        </div>

        <div className="absolute text-center w-40 md:w-50 lg:w-65 left-[34%] top-[61%] md:left-[48%] md:top-[42%] lg:left-[48%] lg:top-[42%]">
          <h2 className="font-semibold md:text-2xl lg:text-3xl text-white"> Post product </h2>
          <p className="hidden md:block text-sm my-1 text-gray-300">
            Far far away, behind mountains, far from the countries Vokalia.
          </p>
        </div>

        <div
          className="absolute text-center w-30 md:w-50 lg:w-65
             left-[65%] top-[-8%] md:left-[70%] md:top-[13%] lg:left-[70%] lg:top-[13%]"
        >
          <h2 className="font-semibold md:text-2xl lg:text-3xl text-white">
            Design process
          </h2>
          <p className="hidden md:block text-sm my-1 text-gray-300">
            Far far away, behind mountains, far from the countries Vokalia.
          </p>
        </div>

        {/* Steps */}

        <div className="absolute text-7xl md:text-9xl lg:text-9xl font-bold text-gray-700/40 select-none left-[15%] top-[0%] md:left-[28%] md:top-[5%] lg:left-[28%] lg:top-[5%]">
          1
        </div>

        <div className="absolute text-6xl md:text-9xl lg:text-9xl font-bold text-gray-700/40 select-none left-[53%] top-[31%] md:left-[45%] md:top-[25%] lg:left-[45%] lg:top-[25%]">
          2
        </div>

        <div className="absolute text-6xl md:text-9xl lg:text-9xl font-bold text-gray-700/40 select-none left-[80%] top-[4%] md:left-[66%] md:top-[-5%] lg:left-[66%] lg:top-[-5%]">
          3
        </div>


      </div>
    </section>
  );
}
