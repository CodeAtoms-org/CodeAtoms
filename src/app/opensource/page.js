import OpenSourcePage from "./cli";


export const metadata = {
  title: "Open Source Tools | CodeAtoms",
  description:
    "Explore a curated collection of open source developer tools, APIs, and SaaS products on CodeAtoms. Discover, filter, and find the perfect open source solutions to enhance your development workflow.",

  openGraph: {
    title: "Open Source Tools | CodeAtoms",
    description:
      "Explore a curated collection of open source developer tools, APIs, and SaaS products on CodeAtoms. Discover, filter, and find the perfect open source solutions to enhance your development workflow.",
    url: "https://www.codeatoms.org/opensource",
    siteName: "CodeAtoms",
    type: "website",
    images: [
      {
        url: "https://www.codeatoms.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Source Developer Tools on CodeAtoms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Tools | CodeAtoms",
    description:
      "Explore a curated collection of open source developer tools, APIs, and SaaS products on CodeAtoms. Discover, filter, and find the perfect open source solutions to enhance your development workflow.",
    images: ["https://www.codeatoms.org/og-image.png"],
    creator: "@CodeAtomsHQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true, 
    }},
    alternates: {
      canonical: "https://www.codeatoms.org/opensource",
    },
};

export default function ToolsPage() {
  

  return (
    <>
      <OpenSourcePage />
    </>
  );
}