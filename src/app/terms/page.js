"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl text-center mb-10 text-[#006D77]">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-10">
            By accessing and using this website, you agree to comply with the following terms and conditions. Please read them carefully before using our platform.
          </p>

          <div className="space-y-8 mb-16">
            <div>
              <h2 className="text-2xl  text-[#006D77] mb-2">1. Use of Platform</h2>
              <p className="text-gray-600">
                Our platform is intended for developers, researchers, and creators to share and collaborate on projects. Users must not upload harmful, plagiarized, or offensive content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl  text-[#006D77] mb-2">2. Intellectual Property</h2>
              <p className="text-gray-600">
                You retain ownership of your uploaded projects. By uploading, you grant us permission to display and promote your content within our platform ecosystem.  
                All trademarks and logos remain the property of their respective owners.
              </p>
            </div>

            <div>
              <h2 className="text-2xl  text-[#006D77] mb-2">3. Limitation of Liability</h2>
              <p className="text-gray-600">
                We are not responsible for data loss, content misuse, or third-party actions.  
                Users are responsible for maintaining backup copies of their projects and ensuring compliance with open-source licenses.
              </p>
            </div>

            <div>
              <h2 className="text-2xl  text-[#006D77] mb-2">4. Account Termination</h2>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate accounts that violate these terms, including the use of fraudulent identities, spamming, or copyright infringement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl  text-[#006D77] mb-2">5. Updates</h2>
              <p className="text-gray-600">
                These terms may be updated from time to time. Continued use of our services after changes implies acceptance of the revised terms.
              </p>
            </div>
          </div>


          </div>
      </section>
      <Footer />
    </>
  );
}
