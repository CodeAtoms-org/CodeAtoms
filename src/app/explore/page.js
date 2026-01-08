import ToolsSection from "./cli";

import { Suspense } from "react";


export const metadata = {
  title: "Explore Tools | CodeAtoms",
  description:
    "Discover a wide range of developer tools, APIs, and SaaS products on CodeAtoms.",
  keywords: [
    "CodeAtoms",
    "developer tools",
    "APIs for developers",
    "SaaS products",
    "CLI tools",
    "developer utilities",
    "software tools for developers",
    "buy developer tools",
    "sell developer tools",
    "developer software marketplace",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  alternates: {
    canonical: "https://www.codeatoms.org/explore",
  },

  openGraph: {
    title: "Explore Tools | CodeAtoms",
    description:
      "Discover a wide range of developer tools, APIs, and SaaS products on CodeAtoms.",
    url: "https://www.codeatoms.org/explore",
    siteName: "CodeAtoms",
    type: "website",
    images: [
      {
        url: "https://www.codeatoms.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Explore Developer Tools on CodeAtoms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Tools | CodeAtoms",
    description:
      "Discover a wide range of developer tools, APIs, and SaaS products on CodeAtoms.",
    images: ["https://www.codeatoms.org/og-image.png"],
    creator: "@CodeAtomsHQ",
  },


};

export default function ToolsPage() {


  return (
    <Suspense fallback={<Loading />}>
      <ToolsSection />
    </Suspense>
  );
}


function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading support…</p>
    </div>
  );
}
