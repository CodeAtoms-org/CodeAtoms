"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4 mt-8">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex justify-between  p-5 text-left "
            >
              <span className="text-lg text-gray-900">{faq.q}</span>
              <span
                className={`transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="pb-5 px-5 text-start text-gray-600">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Help() {
  const [activeRole, setActiveRole] = useState('buyer');

  const buyerFaqs = [
    {
      q: "How can I buy a tool?",
      a: "Visit the Tools page, select a tool, click the Buy option, complete the payment, and download it from your Orders page.",
    },
    {
      q: "How can I raise a support ticket?",
      a: "Go to your Orders page, open the tool, and click talk to customer support to raise a ticket.",
    },
    {
      q: "How can I report a bug or issue?",
      a: "Open the tool page and use the Report Tool option at the top-right corner to submit a report.",
    },
    {
      q: "How can I review a tool?",
      a: "Scroll to the Community Reviews section on the tool page and share your feedback. Reviews from buyers have higher weight.",
    },
    {
      q: "How can I contact CodeAtoms support?",
      a: "Visit the Help page and use the Contact Support option to reach CodeAtoms consumer support.",
    },
  ];

  const sellerFaqs = [
    {
      q: "How can I get paid?",
      a: "You will receive payments through the payment method set up in your profile after users purchase your tool.",
    },
    {
      q: "How much commission does CodeAtoms take?",
      a: "CodeAtoms takes a 15 percent commission on every successful sale.",
    },
    {
      q: "How can I get featured on the homepage?",
      a: "Featured tools are selected based on innovation, documentation quality, and community impact.",
    },
    {
      q: "Is there any cost to use the platform?",
      a: "No, CodeAtoms core platform is completely free to use.",
    },
    {
      q: "How can I upload my project?",
      a: "Sign in, go to Profile, open Upload Tool, fill in the details, and submit your tool for review.",
    },
  ];

  return (
    <>
  <Header />

  <section className="relative min-h-screen px-6 py-16 flex justify-center overflow-hidden">
  
  {/* SVG Background */}
  <div className="absolute inset-0 -z-10">
    <svg
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="grid"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="#006D77"
            strokeWidth="0.5"
            opacity="0.08"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  {/* Content */}
  <div className="w-full max-w-5xl text-center relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10">


      <h1 className="text-3xl mb-6 text-[#006D77]">
        Help Center
      </h1>

      <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
        Find answers to common questions for tool buyers and sellers on CodeAtoms.
        Select your role to get started.
      </p>

      {/* Role Selector */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setActiveRole("buyer")}
          className={`px-6 py-3 rounded-xl border transition ${
            activeRole === "buyer"
              ? "bg-[#006D77] text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          For Tool Buyers
        </button>

        <button
          onClick={() => setActiveRole("seller")}
          className={`px-6 py-3 rounded-xl border transition ${
            activeRole === "seller"
              ? "bg-[#006D77] text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          For Tool Sellers
        </button>
      </div>

      {/* FAQs */}
      {activeRole === "buyer" && <FAQAccordion faqs={buyerFaqs} />}
      {activeRole === "seller" && <FAQAccordion faqs={sellerFaqs} />}

      {/* Support Section */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center mt-16">
        <h2 className="text-2xl text-[#006D77] mb-4">
          Need Further Assistance?
        </h2>

        <p className="text-gray-600 mb-6">
          Cannot find what you are looking for? Our support team is always ready
          to help.
        </p>

        <a
          href="/contactus"
          className="inline-block bg-[#006D77] text-white px-6 py-3 rounded-xl hover:bg-[#00545C] transition"
        >
          Contact Support
        </a>
      </div>

    </div>
  </section>

  <Footer />
</>

  );
}
