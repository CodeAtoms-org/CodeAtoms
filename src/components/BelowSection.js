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
                    <h2 className="text-lg md:text-xl lg:text-2xl text-gray-900">
                        "Great ideas need the right tools—build, create, and innovate with what you need at your fingertips."
                    </h2>
                </div>

            </section>
      <section className="px-10 bg-white md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#006D77] text-xl md:text-2xl font-bold uppercase mb-10">
            Benefits of Using CodeAtoms...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white  rounded-2xl p-6 flex flex-col items-center text-center transition"
              >
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-52 h-52 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Developers Section */}
      <section className="px-10 md:px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center md:text-center">
          <h2 className="text-[#006D77] text-2xl md:text-3xl font-bold mb-4">For Developers</h2>
          <p className="text-gray-600  text-base md:text-lg">
            Earn money through your skills by selling your tools.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full bg-[#013637] py-16">
        <div className="mx-auto flex flex-col gap-8 px-10 md:px-16 lg:px-20">
          {/* Left Text & Heading */}
          <div className="text-center md:text-left">
            <p className="text-sm uppercase text-white mb-2">Steps</p>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white">
                How to Start Selling Your Tools
            </h2>
          </div>

          {/* Steps Cards in Column on Mobile */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {steps.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.step * 0.2 }}
                className="bg-[#e1eaec] rounded-2xl p-6 md:p-10 flex-1 flex flex-col md:flex-row items-start gap-6"
              >
                {/* Step Button on Left */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-[#006D77] text-white font-bold text-2xl md:text-3xl flex-shrink-0">
                  {item.step}
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-lg md:text-xl text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 break-words">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
