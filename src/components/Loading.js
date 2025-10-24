"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo or Brand */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3 mb-8"
      >
        
        <span className="text-2xl font-bold text-[#006D77]">CodeAtoms</span>
      </motion.div>

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#006D77] border-t-transparent rounded-full"
      />

      {/* Loading Text */}
      <p className="mt-6 text-gray-600 text-lg font-medium tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
}
