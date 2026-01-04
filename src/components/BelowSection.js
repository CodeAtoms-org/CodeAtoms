"use client";
import { motion } from "framer-motion";

export default function BelowSection() {
  const benefits = [
    {
      title: "Curated Tools",
      image: "/images/benefits1.png",
    },
    {
      title: "Save Time & Effort",
      image: "/images/benefits2.png",
    },
    {
      title: "Boost Creativity",
      image: "/images/benefits3.png",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your account to start uploading and selling your tools.",
    },
    {
      step: 2,
      title: "List your Tool",
      description: "Provide details about your tool, set a price, and make it available to the community.",
    },
    {
      step: 3,
      title: "Reach Customers",
      description: "Reach a wide audience, earn revenue, and grow your developer brand.",
    },
  ];

  return (
    <>
      {/* Benefits Section */}
      <section className="px-10 md:px-20 py-20">
        <div className="mx-auto flex flex-col gap-4 text-start md:text-center">
          <p className="text-sm text-[#006D77] uppercase">
            CodeAtoms
          </p>
          <h2 className="text-lg md:text-xl lg:text-xl text-gray-900">
            "Every great idea deserves the right tools - so you can build boldly, Freely, and innovate without limits."
          </h2>
        </div>

      </section>
      

      {/* For Developers Section */}
    
    </>
  );
}
