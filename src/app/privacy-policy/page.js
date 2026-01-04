import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | CodeAtoms",
  description:
    "Understand how CodeAtoms collects, uses, and protects your personal data across our developer tools marketplace.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-2xl md:text-3xl text-center mb-6 text-[#006D77]">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-10 ">
            At CodeAtoms, your privacy is important to us. This Privacy Policy
            explains how we collect, use, store, and protect your personal
            information when you use our marketplace.
          </p>

          <div className="space-y-10">

            {/* 1 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-2">
                We collect information that you voluntarily provide when using
                CodeAtoms, including but not limited to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Name, email address, and account details</li>
                <li>Profile information for buyers and sellers</li>
                <li>Uploaded tools, files, documentation, and metadata</li>
                <li>Support tickets, messages, and communication history</li>
                <li>Transaction and purchase-related information</li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-2">
                We use collected information to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Operate and maintain the CodeAtoms marketplace</li>
                <li>Enable buying, selling, and downloading of tools</li>
                <li>Provide customer and seller support</li>
                <li>Process payments and payouts</li>
                <li>Improve platform performance and user experience</li>
                <li>Ensure platform safety, moderation, and compliance</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                3. File Uploads and Tool Hosting
              </h2>
              <p className="text-gray-600">
                When you upload tools, files, or documentation to CodeAtoms, the
                content is stored securely and made available according to your
                visibility and licensing settings. You are responsible for
                ensuring that uploaded content does not contain sensitive or
                personal information you do not wish to share.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                4. Support and Communication
              </h2>
              <p className="text-gray-600">
                Messages, support tickets, and communications between buyers,
                sellers, and CodeAtoms support are stored to resolve issues,
                provide assistance, and maintain platform quality.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                5. Cookies and Analytics
              </h2>
              <p className="text-gray-600">
                CodeAtoms uses cookies and similar technologies to understand
                usage patterns, improve functionality, and personalize your
                experience. You can manage cookie preferences through your
                browser settings.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                6. Data Security
              </h2>
              <p className="text-gray-600">
                We implement reasonable technical and organizational safeguards
                to protect your data. While we strive to secure your information,
                no system can guarantee absolute security.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                7. Data Sharing
              </h2>
              <p className="text-gray-600">
                We do not sell your personal data. Information may be shared with
                trusted service providers only when necessary to operate the
                platform, process payments, or comply with legal obligations.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                8. Your Rights
              </h2>
              <p className="text-gray-600">
                You may request access, correction, or deletion of your personal
                data where applicable. Certain data may be retained for legal,
                security, or operational reasons.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                9. Policy Updates
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. Continued
                use of the platform after updates constitutes acceptance of the
                revised policy.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                10. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have questions or concerns about this Privacy Policy,
                please contact us at{" "}
                <span className="text-[#006D77]">
                  hello@codeatoms.com
                </span>.
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
