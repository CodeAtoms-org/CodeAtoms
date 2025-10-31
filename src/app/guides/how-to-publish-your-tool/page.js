"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function HowToPublishYourTool() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <article className="prose max-w-4xl mx-auto prose-headings:text-[#006D77] prose-a:text-[#006D77]">
          <h1 className="text-2xl mb-8 md:text-3xl font-bold text-[#006D77]">
            How to Publish Your Tool on CodeAtoms
          </h1>
          <p className="text-gray-600 text-lg">
            Publishing your tool on CodeAtoms allows developers around the world
            to discover, use, and buy your product. This guide walks you through
            the exact process of publishing — from filling in details to
            showcasing your live demo.
          </p>

          <h2 className="font-semibold mt-8 mb-8">1. Go to the Upload Tool Page</h2>
          <p>
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

          <h2 className="font-semibold mt-8 mb-8">2. Fill in the Tool Details</h2>
          <p>
            The <strong>Title</strong> and <strong>Tags</strong> are required. Choose a title that clearly describes your tool, and a tag
            that matches what you have built.
          </p>

          <p>
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

          <h2 className="font-semibold mt-8 mb-8">3. Add Extended Content (Important)</h2>
          <p>
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


          <h2 className="font-semibold mt-8 mb-8">4. Add Links for Demo and Purchase</h2>
          <p>
            If you have a live demo or GitHub repository, add the link in the{" "}
            <strong>“Demo / Tool Link”</strong> field. This helps other
            developers try out your tool before buying.
          </p>
          <p>
            This is the <strong>“Download URL”</strong> field where you can provide a direct link for users to download or purchase your tool. This could be a link to your product page, or any other relevant location.
          </p>

          

          <h2 className="font-semibold mt-8 mb-8">5. Publish Your Tool</h2>
          <p>
            Once everything is filled out, click the{" "}
            <strong>“Upload Tool”</strong> button. Your submission will be saved
            and instantly visible to others on the CodeAtoms marketplace.
          </p>

          <h2 className="font-bold mt-8 mb-8 text-center text-[#006D77]">Tips for a Great Listing</h2>
          <ul>
            <li>Use a clear and descriptive title (avoid abbreviations).</li>
            <li>Keep your description short but informative.</li>
            <li>Provide a working demo link or short video.</li>
            <li>Add pricing or license details clearly.</li>
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
