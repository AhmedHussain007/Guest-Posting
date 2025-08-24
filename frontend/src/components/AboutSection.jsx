import React from 'react'

const AboutSection = () => {
  return (
    <section className="relative py-16 px-6 md:px-20 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Tilted Card */}
        <h2 className="text-3xl md:text-4xl text-center my-2 font-bold">About Us</h2>
        <p className="text-gray-400 text-center mb-3">We are a team of passionate individuals dedicated to delivering high-quality web solutions.</p>
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 transform ">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFib3V0JTIwdXN8ZW58MHx8MHx8fDA%3D"
              alt="Team working"
              className="rounded-xl shadow-lg"
            />
          </div>
          {/* Text */}
          <div className="md:w-1/2 space-y-6 transform text-justify">
            <p className="text-gray-300">
              As a Web Development Services agency, we specialize in creating custom web
              solutions that help businesses achieve their online goals. Our team of skilled web
              developers, designers, and digital strategists work collaboratively to build websites,
              web applications, and e-commerce solutions that meet our clients’ unique needs and deliver results.
            </p>
            <p className="text-gray-400">
              Our mission is to provide our clients with the tools they need to succeed in the online marketplace.
              We are dedicated to staying up-to-date with the latest technologies and trends to ensure that we
              are always delivering the highest quality work. We believe that every business deserves a website
              that reflects their brand’s personality and effectively communicates their message to their target audience.
            </p>

            <button className="mt-4 px-6 py-3 rounded-lg bg-[linear-gradient(to_right,#fff2,transparent)] hover:bg-[#fff2] text-white font-medium transition-all duration-200">
              Get in touch
            </button>
          </div>

        </div>
      </div>
    </section>

  )
}

export default AboutSection
