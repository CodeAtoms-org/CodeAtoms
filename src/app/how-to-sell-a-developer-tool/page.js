import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How to Sell a Developer Tool | CodeAtoms",
  description:
    "A practical, step-by-step guide to selling your developer tool. Learn where to sell, how to list on CodeAtoms, and effective marketing strategies.",
  keywords: [
    "sell developer tool",
    "developer tool sales",
    "developer tool marketplace",
    "CodeAtoms selling guide",
    "how to market developer tools",
    "developer tool distribution",
    "indie developer sales",
    "how to monetize developer tools",
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://www.codeatoms.org/how-to-sell-a-developer-tool",
  },
  openGraph: {
    title: "How to Sell a Developer Tool | CodeAtoms",
    description:
      "A practical, step-by-step guide to selling your developer tool. Learn where to sell, how to list on CodeAtoms, and effective marketing strategies.",
    url: "https://www.codeatoms.org/how-to-sell-a-developer-tool",
    siteName: "CodeAtoms",
    images: [
      {
        url: "https://www.codeatoms.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeAtoms Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "article",
  }
};

const navItems = [
  { id: "why", label: "Why Selling a Developer Tool Is Hard" },
  { id: "step-1", label: "Step 1: Decide Where You Will Sell" },
  { id: "step-2", label: "Step 2: List Your Tool on CodeAtoms" },
  { id: "step-3", label: "Step 3: Market Your Developer Tool" },
];

export default function SellDeveloperToolPage() {
  return (
    <>
      <Header />

      <main className="mt-20 text-black mx-4 max-w-6xl md:mx-auto py-16">
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#006D77]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#83C5BE]/20 rounded-full blur-2xl"></div>

        <h2 className="mb-4">CODEATOMS GUIDES</h2>

        {/* INTRO */}
        <section id="intro">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold">
              How to Sell a Developer Tool
            </h1>
          </div>

          <p className="text-lg mb-14 text-gray-600">
            Building a developer tool is a technical challenge.
            Selling it is an execution challenge.
            <br /><br />
            This guide explains exactly how to sell a developer tool
            and get real users to successfully buy and use it.
            <br /><br />
            This page is not about monetization theory.
            It is a step-by-step execution guide explaining exactly how
            to sell a developer tool and get real users to successfully buy and use it.
          </p>
        </section>

        {/* NOTE */}
        <div className="bg-[#006D77] text-white rounded-lg p-6 mb-20">
          <p className="text-sm">NOTE:</p>
          <h3 className="text-3xl font-semibold mb-4">
            Selling Is a Trust Problem
          </h3>

          <h4 className="text-xl font-medium mb-4">
            Developers Don't Buy , They Verify
          </h4>

          <p className="text-base leading-relaxed">
            "Selling" a developer tool is not like selling consumer software.
            Developers don't respond to marketing pitches or sales tactics.
            They want to verify that the tool works for their specific use case,
            integrates with their workflow, and is worth the investment of time and money.
            <br /><br />
            Therefore, selling a developer tool is fundamentally about
            building trust through transparency, ease of access,
            and clear value demonstration.
          </p>
        </div>

        <div className="grid max-w-6xl mx-auto grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT NAV */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border bg-gray-50 p-6">
              <h3 className="text-lg font-semibold mb-4">On this page</h3>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-gray-600 hover:text-black transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* CONTENT */}
          <article className="lg:col-span-8 space-y-16">

            {/* WHY */}
            <section id="why">
              <h2 className="text-3xl font-semibold mb-6">
                Why Selling a Developer Tool Is Hard
              </h2>

              <p className="text-gray-600 mb-4">
                Selling a developer tool is fundamentally different from
                selling consumer software.
              </p>

              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Developers are skeptical of marketing claims</li>
                <li>They expect instant access after purchase</li>
                <li>They hate manual steps and unclear flows</li>
                <li>They verify before they buy</li>
              </ul>

              <p className="text-gray-600 mt-4">
                Therefore, selling a developer tool requires
                a focus on trust, transparency, and  access.
              </p>
            </section>

            {/* STEP 1 */}
            <section id="step-1">
              <h2 className="text-3xl font-semibold mb-6">
                Step 1: Decide Where You Will Sell
              </h2>

              <p className="text-gray-600 mb-4">
                Before marketing or promotion, you must decide where
                the transaction happens.
              </p>

              <p className="text-gray-600 mb-4">
                Selling directly means managing payments, taxes,
                access control, licensing, delivery, and support.
                This turns you into a business operator.
              </p>

              <p className="text-gray-600 ">
                For most developers, <span className="font-bold">selling through a trusted marketplace
                is the fastest and cleanest execution path. </span>
                Marketplaces handle payments, taxes, access,
                and delivery, so you can focus on building and marketing.
              </p>
            </section>

            {/* STEP 2 */}
            <section id="step-2">
              <h2 className="text-3xl font-semibold mb-6">
                Step 2: List Your Tool on CodeAtoms
              </h2>

              <p className="text-gray-600 mb-4">
                On CodeAtoms, you list your developer tool with clear
                use cases, technical details, and access expectations.
              </p>

              <p className="text-gray-600 mb-4">
                CodeAtoms handles payments, buyer access, delivery,
                and trust , so you can focus on the product.
              </p>

              <a
                href="/guides/how-to-publish-your-tool"
                className="inline-flex items-center gap-3 bg-[#006D77] px-6 py-3 text-white font-medium hover:bg-[#005b63] transition"
              >
                Learn How to Publish on CodeAtoms →
              </a>
            </section>


            {/* STEP 3 */}
<section id="step-3">
  <h2 className="text-3xl font-semibold mb-6">
    Step 3: Market Your Developer Tool (Execution Plan)
  </h2>

  <p className="text-gray-600 mb-4">
    Marketing a developer tool is not about shouting louder.
    It is about showing up where developers already discuss problems.
  </p>

  <p className="text-gray-600 mb-6">
    For developer tools, the most effective platforms are:
    Reddit and X (Twitter). LinkedIn can help , but it is secondary.
  </p>

  {/* REDDIT */}
  <h3 className="text-2xl font-semibold mb-4">
    Reddit: Problem-First Marketing
  </h3>

  <p className="text-gray-600 mb-4">
    Reddit works because developers openly talk about real problems.
    They don't want tools. They want solutions.
  </p>

  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
    <li>Find subreddits where your target developers hang out</li>
    <li>Read posts daily to understand recurring pain points</li>
    <li>Comment with real solutions , not links</li>
    <li>Share your tool only when it naturally solves the problem</li>
  </ul>

  <p className="text-gray-600 mb-6">
    If your post feels like marketing, it will fail.
    If it feels like help, it will convert.
  </p>

  {/* X / TWITTER */}
  <h3 className="text-2xl font-semibold mb-4">
    X (Twitter): Build in Public Distribution
  </h3>

  <p className="text-gray-600 mb-4">
    X works because developers follow developers.
    It is a long-term distribution engine, not a launch platform.
  </p>

  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
    <li>Share what you are building and why</li>
    <li>Post small learnings from real usage</li>
    <li>Talk about problems before talking about features</li>
    <li>Link to your tool only when context makes sense</li>
  </ul>

  <p className="text-gray-600 mb-6">
    Consistency beats virality.
    One useful post per day compounds over time.
  </p>

  {/* LINKEDIN */}
  <h3 className="text-2xl font-semibold mb-4">
    LinkedIn: Secondary but Strategic
  </h3>

  <p className="text-gray-600 mb-4">
    LinkedIn is useful for credibility, not discovery.
  </p>

  <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
    <li>Share lessons learned building the tool</li>
    <li>Explain technical decisions in simple terms</li>
    <li>Avoid hype-driven or motivational content</li>
  </ul>

  <p className="text-gray-600 mb-6">
    LinkedIn helps validate your work.
    Reddit and X help distribute it.
  </p>

  {/* FINAL */}
  <p className="text-gray-600">
    The best marketing strategy for developer tools is simple:
    <br />
    Solve real problems in public, consistently.
  </p>
</section>


          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
