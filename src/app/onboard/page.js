import AuthPage from "./cli";

export const metadata = {
  title: "Login | CodeAtoms",
  description:
    "Join CodeAtoms, the developer tools marketplace. Sign up or log in to discover, share, and sell cutting-edge tools, APIs, and SaaS products.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  alternates: {
    canonical: "https://www.codeatoms.org/onboard",
  },

  };
export default function OnboardPage() {
  

  return (
    <AuthPage />
  );
}
