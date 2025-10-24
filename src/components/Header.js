"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // adjust path if needed
import { Menu, X } from "lucide-react"; // hamburger icons

export default function Header() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#006D77] border-b border-b-gray-200">
      <div className="mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl text-white hover:text-gray-200 transition font-bold">
          CodeAtoms
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex text-white space-x-6 items-center">
          <Link href="/explore" className="hover:text-gray-200 transition">
            Explore
          </Link>
          {user ? (
            <Link href="/profile" className="hover:text-gray-200 transition">
              Profile
            </Link>
          ) : (
            <Link href="/onboard" className="hover:text-gray-200 transition">
              Login
            </Link>
          )}
        </nav>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#006D77] px-6 pb-4 flex flex-col space-y-3 text-white">
          <Link href="/explore" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
            Explore
          </Link>
          {user ? (
            <Link href="/profile" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          ) : (
            <Link href="/onboard" className="hover:text-gray-200 transition" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
