import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | CodeAtoms",
  description:
    "Learn more about CodeAtoms the developer tool marketplace. Our mission, vision, and the team dedicated to support developers worldwide.",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true, 
    }},
    alternates: {
      canonical: "https://www.codeatoms.org/about",
    },

  openGraph: {
    title: "About Us | CodeAtoms",
    description:
      "Discover the story behind CodeAtoms, our mission to empower developers, and the team driving innovation in the developer tool marketplace.",
    url: "https://www.codeatoms.org/about",
    siteName: "CodeAtoms",
    type: "website",
    images: [
      {
        url: "https://www.codeatoms.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "About CodeAtoms Developer Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | CodeAtoms",
    description:
      "Learn more about CodeAtoms the developer tool marketplace. Our mission, vision, and the team dedicated to support developers worldwide.",
    images: ["https://www.codeatoms.org/og-image.png"],
    creator: "@CodeAtomsHQ",
  },
};

export default function About() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl mb-8 text-center text-[#006D77]">
            About CodeAtoms
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
  CodeAtoms is built around a simple belief: Developers create the most value
  when they are allowed to focus on building.
</p>


          {/* Mission Section */}
         <div className="grid gap-12 items-center mb-20">
  <div>
    <h2 className="text-2xl mb-4 text-[#006D77]">Why CodeAtoms Exists</h2>
    <p className="text-gray-600 leading-relaxed mb-4">
      A Thing Worth Making
Software today runs on developer tools created by people who care deeply about solving real problems. These tools often begin as focused solutions, built with clarity and intent, not with the goal of forming a company.

    </p>
    <p className="text-gray-600 leading-relaxed mb-4">
      Yet, as soon as a tool becomes valuable, developers are expected to take on responsibilities far beyond building. Payments, licensing, support, compliance, and trust infrastructure quickly become part of the job.
    </p>
    <p className="text-gray-600 leading-relaxed">
     CodeAtoms is worth making because developers should be allowed to focus on building useful tools, while the operational work required to sell them is handled professionally and reliably.
    </p>
  </div>
</div>


          {/* Vision Section */}
          

          <div className="mb-20">
  <h2 className="text-2xl mb-6 text-[#006D77] text-start">
    Our Founder
  </h2>

  <div className="flex flex-col md:flex-row py-10 items-start gap-10">
    
    {/* Left: Founder Image & Name */}
    <div className="flex-shrink-0 text-center px-16  md:text-start">
      <img
        src="/images/ceoimage.png"
        alt="Abhinav Sharma"
        className="w-50 h-70 rounded-2xl object-cover mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900">
        Abhinav Sharma
      </h3>
      <p className="text-gray-500">
        Founder & CEO
      </p>
    </div>

    {/* Right: Founder Story */}
    <div className="text-gray-600 text-start py-6 leading-relaxed">
      <p className="mb-4"> CodeAtoms did not start as a product idea. It started with a belief I kept hearing.
</p>


      <p className="mb-4">
        Many people believe that a meaningful company can only be built with large teams, capital, and scale from the beginning. That a single builder cannot create something serious or long lasting on their own.
      </p>

      <p className="mb-4">
        I wanted to prove that a single person can build a real company by focusing on the right problems and making careful choices. CodeAtoms is the result of that thinking. It is built slowly, deliberately, and with respect for developers and the work they do.
      </p>
      <p className="">
        As a developer myself, I cared about clarity, trust, and usefulness more than speed or noise. CodeAtoms reflects that approach. It is built to last, and it is built with the belief that meaningful companies can begin with one focused builder.
      </p>
    </div>

  </div>
</div>

<div className="">
  <h2 className="text-2xl mb-6 text-[#006D77] text-start">
    Join Us on Our Journey
  </h2>
  <p className="text-gray-600  mx-auto leading-relaxed">
   CodeAtoms helps developers sell and share their tools without taking on the full operational burden of running a business. Payments, access, licensing, and trust are treated as infrastructure, not distractions.

  </p>
  <p className="text-gray-600 mx-auto leading-relaxed mt-4">
    This contribution allows creators to publish their work with confidence and buyers to purchase tools with clarity and trust, improving the experience on both sides.
More importantly, it supports a healthier ecosystem, where developers can create value sustainably, decide how far they want to scale, and remain focused on the work that matters most.
  </p>
  </div>

         
        </div>
      </section>
      <Footer />
    </>
  );
}
