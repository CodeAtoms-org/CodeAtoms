"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12 px-6 md:px-24">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left: Logo and Company */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Company Logo" width={40} height={40} />
            <span className="text-2xl font-bold">CodeAtoms</span>
          </div>
          <p className="text-gray-700 text-sm">
A Market for Tech People.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex flex-wrap gap-8 md:gap-16 md:w-2/3">
        <div className="flex flex-col gap-3">
<h4 className="font-semibold text-lg">CodeAtoms</h4>
            <a href="/explore" className="text-gray-700 hover:text-black transition">Explore</a>
            <a href="/profile" className="text-gray-700 hover:text-black transition">Profile</a>
          </div> 

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Company</h4>
            <a href="/about" className="text-gray-700 hover:text-black transition">About Us</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Support</h4>
            <a href="/help" className="text-gray-700 hover:text-black transition">Help Center</a>
            <a href="/contactus" className="text-gray-700 hover:text-black transition">Contact Us</a>
            <a href="/help" className="text-gray-700 hover:text-black transition">FAQs</a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Legal</h4>
            <a href="/privacy-policy" className="text-gray-700 hover:text-black transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-700 hover:text-black transition">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 border-t border-gray-300 pt-6 text-gray-600 text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} CodeAtoms. All rights reserved.
      </div>
    </footer>
  );
}
