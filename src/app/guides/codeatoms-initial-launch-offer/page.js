import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Sparkles, Star, Gift, Rocket } from "lucide-react";


export const metadata = {
  title: "CodeAtoms Initial Launch Offer",
  description:
    "Discover the exclusive benefits of CodeAtoms' Initial Launch Offer for early users and developers.",
};
export default function HowToPublishYourTool() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 px-6 md:px-20 py-16 relative overflow-hidden">

        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#006D77]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#83C5BE]/20 rounded-full blur-2xl"></div>

        <article className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#006D77] mb-10 flex items-center gap-3">
            CodeAtoms Initial Launch Offer
          </h1>

          <div className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-6 border border-gray-100">
            <p className="text-gray-700 text-md leading-relaxed mb-5">
              CodeAtoms is excited to share our <span className="font-semibold text-[#006D77]">Initial Launch Offer</span>, made especially for early users. This offer gives you exclusive rewards and benefits as we introduce our platform to developers around the world.
            </p>
            <p className="text-gray-700 text-md leading-relaxed mb-5">
              By joining early, you’ll get <span className="text-[#006D77] font-medium">special features, lower fees, and priority support</span>. We want to build a helpful and active developer community — and this offer is our way of thanking everyone who joins us from the start.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-[#006D77] mt-12 mb-6 flex items-center gap-2">
            <Sparkles className="text-[#006D77]" /> Special Offers for Our Early Launchers
          </h2>

          <div className="grid gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-md text-[#006D77] flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#006D77]" /> 1. Homepage Feature
              </h3>
              <p className="text-gray-600 mt-2">
                Get your tool featured on the CodeAtoms homepage for more visibility and reach. It’s a great way to show your work to a larger audience.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-md text-[#006D77] flex items-center gap-2">
                <Star className="w-5 h-5 text-[#006D77]" /> 2. Low Platform Fee
              </h3>
              <p className="text-gray-600 mt-2">
                During our launch period, CodeAtoms will take only a <span className="font-semibold text-[#006D77]">5% platform fee</span> from your sales instead of the usual 15%. That means you keep <span className="font-semibold">95% of your earnings</span>.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-md text-[#006D77] flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#006D77]" /> 3. Extended Support
              </h3>
              <p className="text-gray-600 mt-2">
                Get extended support during the launch phase. Our team will help you with onboarding, publishing, and anything else you need to make things smooth.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-md text-[#006D77] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#006D77]" /> 4. Marketing Features
              </h3>
              <p className="text-gray-600 mt-2">
                Your tool could be featured in our marketing campaigns — giving you more visibility and helping you reach new users around the world.
              </p>
            </div>
          </div>

          <div className="bg-[#006D77]/5 p-6 rounded-2xl mt-10 border border-[#006D77]/10">
            <p className="text-gray-700 text-md">
              Don’t miss this chance to be part of the <span className="font-semibold text-[#006D77]">CodeAtoms launch</span>. Join today and grow with a community that supports innovation and creativity.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-[#006D77] mt-14 mb-6 flex items-center gap-2">
            <Rocket className="text-[#006D77]" /> How to Get the Offer
          </h2>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl border p-6 shadow-sm">
            <p className="text-gray-700 text-md leading-relaxed mb-4">
              To get this offer, just <span className="font-medium text-[#006D77]">sign up</span> on CodeAtoms and publish your tool during the launch period. The benefits will be added to your account automatically. You can see a step-by-step guide{" "}
              <a href="/guides/how-to-publish-your-tool" className="text-[#006D77] underline font-medium">
                here.
              </a>
            </p>
            <p className="text-gray-700 text-md leading-relaxed mb-4">
              Have any questions? You can contact our support team anytime at{" "}
              <a href="/contactus" className="text-[#006D77] underline font-medium">
                Contact Us
              </a>
              .
            </p>
            <p className="text-gray-700 text-md">
              Be part of something big — publish your tool today and join the CodeAtoms movement.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
