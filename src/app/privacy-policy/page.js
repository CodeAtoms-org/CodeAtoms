"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto">


          {/* Privacy Policy */}
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#006D77]">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-10">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#006D77] mb-2">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information such as your name, email, and uploaded project data to improve your experience on our platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#006D77] mb-2">2. How We Use Information</h2>
              <p className="text-gray-600">
                We use your data to provide platform services, enhance performance, and communicate updates or opportunities relevant to your interests.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#006D77] mb-2">3. Data Protection</h2>
              <p className="text-gray-600">
                We implement strict security measures to safeguard user data. However, users should also take precautions when sharing sensitive information publicly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#006D77] mb-2">4. Cookies</h2>
              <p className="text-gray-600">
                Our website uses cookies to personalize content and analyze traffic. You can disable cookies in your browser settings at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#006D77] mb-2">5. Contact</h2>
              <p className="text-gray-600">
                If you have questions regarding this policy, please contact us at{" "}
                <span className="font-semibold text-[#006D77]">privacy@necrozmalabs.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
