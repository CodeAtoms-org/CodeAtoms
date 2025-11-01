
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: "How to Publish Your Tool on CodeAtoms",
  description:
    "A step-by-step guide on publishing your tool on CodeAtoms marketplace.",
};

export default function HowToPublishYourTool() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <article className="prose max-w-4xl mx-auto prose-headings:text-[#006D77] prose-a:text-[#006D77]">
          <h1 className="text-2xl mb-8 md:text-3xl font-bold text-[#006D77]">
            How to Publish Your Tool on CodeAtoms
          </h1>
          <p className="text-gray-600 text-md">
            Publishing your tool on CodeAtoms allows developers around the world
            to discover, use, and buy your product. This guide walks you through
            the exact process of publishing — from filling in details to
            showcasing your live demo.
          </p>

          <h2 className="font-semibold text-md mt-8 mb-8">1. Go to the Upload Tool Page</h2>
          <p className="text-md">
            From the main navigation, click on the <strong>“Profile”</strong>{" "}
            option. This page contains a publish your tool page which conatin simple form where you can enter your
            tool details such as title, description, and type.
          </p>

          <Image
            src="/images/guide-steps-1.png"
            alt="Upload tool form"
            width={700}
            height={500}
            className="rounded-xl my-6"
          />

          <h2 className="font-semibold text-md mt-8 mb-8">2. Fill in the Tool Details</h2>
          <p className="text-md">
            The <strong>Title</strong> and <strong>Tags</strong> are required. Choose a title that clearly describes your tool, and a tag
            that matches what you have built.
          </p>

          <p className="text-md">
            Use the <strong>Description</strong> field to summarize your tool
            purpose and unique features. Keep it
            concise and meaningful.
          </p>

          <Image
            src="/images/guide-steps-2.png"
            alt="Filling tool details"
            width={200}
            height={100}
            className="rounded-xl  my-6"
          />

          <h2 className="font-semibold text-md mt-8 mb-8">3. Add Extended Content (Important)</h2>
          <p className="text-md">
            The <strong>Content / Markdown</strong> section lets you include
            detailed documentation — such as setup steps, usage examples, or
            feature highlights. This field supports Markdown syntax, so you can
            format your content professionally with headers, code blocks, and
            lists.
          </p>
          <Image
            src="/images/guide-steps-3.png"
            alt="Filling tool details"
            width={700}
            height={500}
            className="rounded-xl  my-6"
          />


          <h2 className="font-semibold text-md mt-8 mb-8">4. Add Links for Demo and Purchase</h2>
          <p className="text-md">
            If you have a live demo or GitHub repository, add the link in the{" "}
            <strong>“Demo / Tool Link”</strong> field. This helps other
            developers try out your tool before buying.
          </p>
          <p className="text-md">
            This is the <strong>“Download URL”</strong> field where you can provide a direct link for users to download or purchase your tool. This could be a link to your product page, or any other relevant location.
          </p>

          

          <h2 className="font-semibold text-md mt-8 mb-8">5. Publish Your Tool</h2>
          <p className="text-md">
            Once everything is filled out, click the{" "}
            <strong>“Upload Tool”</strong> button. Your submission will be saved
            and instantly visible to others on the CodeAtoms marketplace.
          </p>

          <h2 className="font-bold mt-12 mb-10 text-center text-[#006D77] text-2xl relative">
  Tips for a Great Listing
  <div className="absolute left-1/2 -translate-x-1/2 w-20 h-1 bg-[#006D77] rounded-full mt-2"></div>
</h2>

<div className="bg-[#F7FAFA] p-8 rounded-2xl shadow-md relative overflow-hidden">
  {/* Decorative shapes */}
  <div className="absolute top-0 left-0 w-24 h-24 bg-[#006D77]/10 rounded-br-[60%]"></div>
  <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#006D77]/10 rounded-tl-[60%]"></div>

  <ul className="relative space-y-4 text-md text-gray-700 font-medium">
    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
      <span className="w-3 h-3 mt-2 bg-[#006D77] rounded-full flex-shrink-0"></span>
      <span>Use a clear and descriptive title (avoid abbreviations).</span>
    </li>
    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
      <span className="w-3 h-3 mt-2 bg-[#006D77] rounded-full flex-shrink-0"></span>
      <span>Keep your description short but informative.</span>
    </li>
    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
      <span className="w-3 h-3 mt-2 bg-[#006D77] rounded-full flex-shrink-0"></span>
      <span>Provide a working demo link or short video.</span>
    </li>
    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
      <span className="w-3 h-3 mt-2 bg-[#006D77] rounded-full flex-shrink-0"></span>
      <span>Add pricing or license details clearly.</span>
    </li>
  </ul>
</div>

        </article>
      </main>
      <Footer />
    </>
  );
}
