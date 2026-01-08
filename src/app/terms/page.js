import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | CodeAtoms",
  description:
    "Read the terms and conditions governing the use of CodeAtoms, the developer tools marketplace.",
};

export default function Terms() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-2xl md:text-3xl text-center mb-6 text-[#006D77]">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-10 text-center">
            By accessing or using CodeAtoms, you agree to be bound by these Terms
            and Conditions. Please read them carefully before using the platform.
          </p>
          <div className="space-y-10 mb-16">

            {/* 1 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                1. Platform Overview
              </h2>
              <p className="text-gray-600">
                CodeAtoms is a marketplace that enables developers and creators
                to list, sell, and distribute tools, while allowing users to
                discover and purchase those tools. CodeAtoms acts solely as a
                platform provider and does not develop, own, or control the
                tools listed unless explicitly stated.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                2. User Accounts
              </h2>
              <p className="text-gray-600">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities conducted under your
                account. You agree to provide accurate, current, and complete
                information at all times.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                3. Tool Listings and Uploads
              </h2>
              <p className="text-gray-600">
                Sellers are solely responsible for the accuracy, functionality,
                security, licensing, and legality of the tools they upload.
                CodeAtoms does not guarantee that any tool will function as
                expected or meet a buyer's requirements.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                4. Tool Performance and Failures
              </h2>
              <p className="text-gray-600">
                CodeAtoms is not responsible for tool failures, bugs, security
                vulnerabilities, incompatibilities, data loss, or damages
                resulting from the use of any tool purchased or downloaded
                through the platform. All tools are provided “as is” by their
                respective sellers.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                5. Payments and Commissions
              </h2>
              <p className="text-gray-600">
                Payments are processed through third-party payment providers.
                CodeAtoms charges a platform commission on each successful sale,
                as communicated at the time of listing. CodeAtoms is not
                responsible for payment processor failures or delays.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                6. Refunds and Disputes
              </h2>
              <p className="text-gray-600">
                Refund eligibility, if any, is determined by the seller's stated
                refund policy and CodeAtoms' dispute resolution guidelines.
                CodeAtoms reserves the right to mediate disputes but is not
                obligated to issue refunds.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                7. Support and Communication
              </h2>
              <p className="text-gray-600">
                CodeAtoms provides a support system to facilitate communication
                between buyers and sellers. Sellers are responsible for providing
                support for their tools unless otherwise stated.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                8. Intellectual Property
              </h2>
              <p className="text-gray-600">
                Sellers retain ownership of their tools and content. By uploading
                content, you grant CodeAtoms a non-exclusive license to host,
                display, and promote it on the platform. Buyers receive only the
                rights granted under the tool's license.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                9. Prohibited Activities
              </h2>
              <p className="text-gray-600">
                Users must not upload malicious code, infringing content,
                misleading listings, or engage in fraud, abuse, or platform
                manipulation. Violations may result in immediate suspension or
                termination.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                10. Account Suspension and Termination
              </h2>
              <p className="text-gray-600">
                CodeAtoms reserves the right to suspend or terminate accounts
                that violate these terms, pose security risks, or harm platform
                integrity, without prior notice.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                11. Limitation of Liability
              </h2>
              <p className="text-gray-600">
                To the maximum extent permitted by law, CodeAtoms shall not be
                liable for indirect, incidental, consequential, or special
                damages arising from your use of the platform or any tool
                obtained through it.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                12. Changes to Terms
              </h2>
              <p className="text-gray-600">
                CodeAtoms may update these Terms & Conditions at any time.
                Continued use of the platform after changes constitutes
                acceptance of the updated terms.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="text-xl text-[#006D77] mb-2">
                13. Contact
              </h2>
              <p className="text-gray-600">
                If you have questions regarding these Terms & Conditions, contact
                us at{" "}
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
