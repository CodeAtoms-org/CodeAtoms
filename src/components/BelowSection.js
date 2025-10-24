"use client";
import { motion } from "framer-motion";

export default function BelowSection() {
    const steps = [
        {
            step: 1,
            title: "Sign Up",
            description: "Create your account to start connecting with global suppliers and buyers.",
        },
        {
            step: 2,
            title: "List your Products",
            description: "Easily upload and showcase your tools to reach a wider audience.",
        },
        {
            step: 3,
            title: "Sell & Grow",
            description: "Manage your sales and grow your business with our platform's support.",
        },
    ];

    return (
        <>
            {/* Previous Cards Section */}
            <section className="px-10 md:px-20 py-20">
                <div className="mx-auto flex flex-col gap-10 text-start md:text-center">
  <p className="text-sm text-[#006D77] uppercase">
    CodeAtoms
  </p>
  
  <h2 className="text-lg md:text-xl lg:text-2xl text-gray-900">
    "Great ideas need the right tools—build, create, and innovate with what you need at your fingertips."
  </h2>
</div>

            </section>

            {/* Steps Section */}
            <section className="w-full bg-[#013637] py-16">
                <div className="mx-auto flex flex-col gap-8 px-10 md:px-16 lg:px-20">
                    {/* Left Text & Heading */}
                    <div className="text-center md:text-left">
                        <p className="text-sm uppercase text-white mb-2">Steps</p>
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-white">
                            Upload your Tool
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
