import AboutExpertise from '@/components/AboutExpertise'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const Aboutus = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "black", }} >
      <div>
        <Header />
        <AboutSection />
        <AboutExpertise />
        <Footer />
      </div>
    </div>
  )
}

export default Aboutus
