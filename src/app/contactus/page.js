"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl  font-bold text-center mb-10 text-[#006D77]">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Whether you are an innovator, researcher, or partner — we do love to hear from you.  
            Let us collaborate to push the boundaries of what technology can do.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 ">
              <h2 className="text-2xl font-semibold mb-6 text-[#006D77]">Send us a message</h2>
              <form className="space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#006D77]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#006D77]"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#006D77]"
                />
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#006D77]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#006D77] text-white font-semibold py-3 rounded-xl hover:bg-[#00545C] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center bg-[#f8f8f8] rounded-2xl p-8 ">
              <h2 className="text-2xl font-semibold mb-6 text-[#006D77]">Get in Touch</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are always open to new ideas, collaborations, and opportunities.  
                Reach out to us using the details below, and we will respond as soon as possible.
              </p>

              <div className="space-y-4">
                <p>
                  <span className="font-semibold text-gray-800">📍 Address:</span>  
                  <br /> Necrozma Labs HQ, Bengaluru, India
                </p>
                <p>
                  <span className="font-semibold text-gray-800">📞 Phone:</span>  
                  <br /> +91 98765 43210
                </p>
                <p>
                  <span className="font-semibold text-gray-800">📧 Email:</span>  
                  <br /> contact@necrozmalabs.com
                </p>
                <p>
                  <span className="font-semibold text-gray-800">🌐 Website:</span>  
                  <br /> www.necrozmalabs.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
