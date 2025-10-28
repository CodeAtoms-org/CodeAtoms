"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Help() {
  const faqs = [
    {
      q: "How can I upload my project?",
      a: "Simply sign in to your account and navigate to Profile and then the 'Upload Tool' section. Fill in the required details about your project and submit it for review.",
    },
    {
      q: "Is there any cost to use the platform?",
      a: "No, our core platform is completely free to use.",
    },
    
    {
      q: "How do I report an issue or bug?",
      a: "You can use the 'Contact Us' page to report any issues. Our support team will review and respond within 24 to 48 hours.",
    },
    {
      q: "How can I get featured on the homepage?",
      a: "Featured projects are selected based on innovation, documentation quality, and community impact. Focus on clarity and open collaboration for the best chance.",
    },
    {
      q: "How can I get paid?",
      a: "You will get paid through the payment method you set up in your profile once your project is purchased by users.",
    },
    {
      q: "How much take will CodeAtoms take from my sales?",
      a: "CodeAtoms takes a 20% commission on each sale made through the platform.",
    },
  ];

  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl  text-center mb-10 text-[#006D77]">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Welcome to our Help Center. Here you can find answers to frequently asked questions, guidance on using the platform, and ways to reach our support team.
          </p>

          {/* FAQs */}
          <div className="space-y-8 mb-16">
            <h2 className="text-2xl  text-[#006D77] mb-4">Frequently Asked Questions</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                <h3 className="text-lg  text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Support Section */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl  text-[#006D77] mb-4">Need Further Assistance?</h2>
            <p className="text-gray-600 mb-6">
              Cannot find what you are looking for? Our support team is always ready to help.
            </p>
            <a
              href="/contactus"
              className="inline-block bg-[#006D77] text-white px-6 py-3 rounded-xl  hover:bg-[#00545C] transition-all duration-300"
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
