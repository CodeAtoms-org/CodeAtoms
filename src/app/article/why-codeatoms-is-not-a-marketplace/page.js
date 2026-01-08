import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Why CodeAtoms Is Not a Marketplace",
  description:
    "CodeAtoms is not a typical marketplace. It exists to handle the business operations of developer tools so builders can focus on product, not payments, licensing, or support.",

robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true, 
    }},
    alternates: {
      canonical: "https://www.codeatoms.org/article/why-codeatoms-is-not-a-marketplace",
    },

};

const navItems = [

  { id: "marketplace-problem", label: "The Marketplace Problem" },
  { id: "not-a-marketplace", label: "Why CodeAtoms Is Different" },
  { id: "ops-outsourcing", label: "Operations, Not Exposure" },
  { id: "what-we-handle", label: "What CodeAtoms Handles" },
  { id: "who-its-for", label: "Who This Is For" },
  { id: "closing", label: "A Clear Distinction" },
];

export default function WhyCodeAtomsIsNotAMarketplace() {
  return (
    <>
      <Header />
       <div className="absolute top-0 left-0 w-60 h-60 bg-[#83C5BE]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#006D77]/10 rounded-full blur-3xl"></div>


      <main className="mt-20 text-black mx-4 max-w-6xl md:mx-auto py-16">
        <h2 className="mb-4">CODEATOMS GUIDES</h2>

        {/* INTRO */}
        <section id="intro" className="mb-16 text-lg">
          <h1 className="text-4xl font-bold mb-6">
            Why CodeAtoms Is Not a Marketplace
          </h1>

          <p className="text-gray-600">
            At first glance, CodeAtoms may look like a marketplace.

            Developer tools are listed. People can discover them. Transactions
            happen.

            But that surface-level similarity hides a very different intent.

            CodeAtoms was not built to be a place where tools compete for
            attention. It was built to remove the operational burden that comes
            with selling developer tools professionally.
          </p>
        </section>

        <div className="bg-[#006D77] text-white text-lg rounded-lg p-6 mb-20">
          <p className="text-sm mb-2">POSITIONING</p>

          <h3 className="text-3xl font-semibold mb-4">
            Marketplaces optimize for exposure.  
            CodeAtoms optimizes for operations.
          </h3>

          <p className="text-base leading-relaxed">
            The difference matters more than it seems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
          <article className="lg:col-span-8 space-y-12">

            {/* MARKETPLACE PROBLEM */}
            <section id="marketplace-problem">
              <h2 className="text-3xl font-semibold mb-6">
                The Problem With Traditional Marketplaces
              </h2>

              <p className="text-gray-600 mb-4">
                Most marketplaces are designed around discovery.
              </p>

              <p className="text-gray-600 mb-4">
                They help buyers browse, compare, and choose. That works well
                for physical goods and consumer products.
              </p>

              <p className="text-gray-600 mb-4">
                Developer tools are different.
              </p>

              <p className="text-gray-600">
                A developer tool doesn't fail because it wasn't seen. It fails
                because once someone wants to buy it, the experience feels
                fragile, unclear, or unprofessional.
              </p>
            </section>

            {/* NOT A MARKETPLACE */}
            <section id="not-a-marketplace">
              <h2 className="text-3xl font-semibold mb-6">
                CodeAtoms Is Not Built Around Listings
              </h2>

              <p className="text-gray-600 mb-4">
                CodeAtoms is not trying to be another place where tools fight
                for visibility.
              </p>

              <p className="text-gray-600 mb-4">
                It exists for a different reason: to make selling developer
                tools feel stable, trustworthy, and professional  without
                forcing builders to become operators.
              </p>

              <p className="text-gray-600">
                In that sense, CodeAtoms is closer to infrastructure than a
                marketplace.
              </p>
            </section>

            {/* OPS OUTSOURCING */}
            <section id="ops-outsourcing">
              <h2 className="text-3xl font-semibold mb-6">
                CodeAtoms Is an Operations Outsourcer
              </h2>

              <p className="text-gray-600 mb-4">
                The hardest part of monetizing a developer tool is rarely the
                code.
              </p>

              <p className="text-gray-600 mb-4">
                It's everything around the code: payments, licenses, access,
                support workflows, and trust.
              </p>

              <p className="text-gray-600">
                CodeAtoms exists to take ownership of those business operations
                so developers don't have to.
              </p>
            </section>

            {/* WHAT WE HANDLE */}
            <section id="what-we-handle">
              <h2 className="text-3xl font-semibold mb-6">
                What CodeAtoms Handles for Developer Tools
              </h2>

              <p className="text-gray-600 mb-4">
                Instead of asking developers to build and maintain operational
                systems, CodeAtoms centralizes them.
              </p>

              <p className="text-gray-600">
                This includes payments, licensing, customer access, structured
                support flows, and the trust layer required for teams and
                companies to buy with confidence.
              </p>
            </section>

            {/* WHO ITS FOR */}
            <section id="who-its-for">
              <h2 className="text-3xl font-semibold mb-6">
                Who This Model Is For
              </h2>

              <p className="text-gray-600 mb-4">
                This approach is for developers who want to sell tools
                professionally but don't want to build a company by default.
              </p>

              <p className="text-gray-600 mb-4">
                It's for builders who want optionality  the ability to
                monetize now and decide later what the tool becomes.
              </p>

              <p className="text-gray-600">
                And it's for teams who understand that operations should
                support product, not consume it.
              </p>
            </section>

            {/* CLOSING */}
            <section id="closing">
              <h2 className="text-3xl font-semibold mb-6">
                A Clear Distinction
              </h2>

              <p className="text-gray-600 mb-4">
                Marketplaces focus on exposure.
              </p>

              <p className="text-gray-600 mb-4">
                CodeAtoms focuses on execution.
              </p>

              <p className="text-gray-600">
                That distinction is intentional  and it defines everything
                CodeAtoms is built to do.
              </p>

              <p className="text-gray-600 mt-4">
                In simple terms: <strong>CodeAtoms is not where your tool is shown.  
                It's where your tool is run.</strong>
              </p>
            </section>

          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
