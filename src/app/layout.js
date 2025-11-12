import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeAtoms | The Developer Tools Marketplace",
  description:
    "CodeAtoms is a developer marketplace where you can discover, buy, and sell the best developer tools, APIs, and SaaS products.",
  keywords: [
    "developer tools",
    "developer marketplace",
    "AI tools for developers",
    "SaaS marketplace",
    "open source tools",
    "software tools for programmers",
    "CodeAtoms",
    "developer tools marketplace",
    "AI developer apps",
  ],
  authors: [{ name: "Abhinav Sharma", url: "https://www.codeatoms.org" }],
  openGraph: {
    title: "CodeAtoms | The Developer Tools Marketplace",
    description:
      "Build faster with CodeAtoms, the marketplace for developers",
    url: "https://www.codeatoms.org",
    siteName: "CodeAtoms",
    images: [
      {
        url: "https://www.codeatoms.org/og-image.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "CodeAtoms | Marketplace for Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeAtoms | The Developer Tools Marketplace",
    description:
      "Build faster with CodeAtoms, the marketplace for developers",
    creator: "@codeatoms", // your Twitter handle if you have one
    images: ["https://www.codeatoms.org/og-image.png"], // replace with actual image
  },
  metadataBase: new URL("https://www.codeatoms.org"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true, 
    }},
    alternates: {
      canonical: "https://www.codeatoms.org",
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Microsoft Clarity Script */}
        <link rel="icon" href="/favicon.ico" />
       
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            if (!window.location.host.includes('localhost')) {
               (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "twmyccomvj");
    }

            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CodeAtoms",
              url: "https://www.codeatoms.org",
              logo: "https://www.codeatoms.org/logo.png",
              sameAs: [
                "https://github.com/codeatoms-org",
                "https://twitter.com/codeatoms",
              ],
              description:
                "Build faster with CodeAtoms, the marketplace for developers",
              founder: {
                "@type": "Person",
                name: "Abhinav Sharma",
                url: "https://www.codeatoms.org",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "hello@codeatoms.org",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
