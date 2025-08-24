import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlassCards from "@/components/WhyChooseUsCards";
import PricingCards from "@/components/PricingSection";
import AccordionDemo from "@/components/FAQs";
import ProcessLaptop from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeLanding from "@/components/HomeLanding";

export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verifyStatus = queryParams.get("verify"); // 'success' or 'failed'

  useEffect(() => {
    if (verifyStatus === "success") {
      toast.success("✅ Email verified successfully!");
    } else if (verifyStatus === "failed") {
      toast.error("❌ Verification link invalid or expired.");
    }
  }, [verifyStatus]);

  return (
    <div
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
        width: "100%",
      }}
    >
      <div>
        <Header />
        <HomeLanding />
        <GlassCards />
        <PricingCards />
        <AccordionDemo />
        <ProcessLaptop />
        <Testimonials />
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
}
