"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="
        relative 

        px-4 sm:px-6 md:px-20
        flex flex-col items-center 
        overflow-hidden
        bg-[url('/herosvgpattern.svg')]
        bg-cover
        bg-center
        bg-no-repeat
        mb-10
      "
    >
      {/* 🌟 Launch Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full bg-gradient-to-r from-[#006D77] to-[#00A896] text-white text-center py-4 rounded-xl shadow-md mt-10 mb-8 px-2"
      >
        <h2 className="text-lg sm:text-xl tracking-wide">
          🎉 As part of our initial launch, we are giving{" "}
          <span className="underline underline-offset-4">
            All Tools for Free
          </span>.
        </h2>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mx-auto relative z-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-4 text-center md:text-left"
        >
          <p className="text-black text-xl sm:text-2xl lg:text-2xl font-light leading-snug">
            Build faster with CodeAtoms, Get Tools to Build Your Dreams.
          </p>

          <p className="text-gray-700 text-lg sm:text-lg">
            For Developers, By Developers.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center md:justify-end mt-8 md:mt-0"
        >
          <div className="w-4/5 sm:w-3/4 md:w-11/12 lg:w-full max-w-md">
            <img
              src="/images/bannerimg.png"
              alt="CodeAtoms Banner"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
