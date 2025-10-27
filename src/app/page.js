
import BelowSection from "@/components/BelowSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MainSection from "@/components/MainSection";


export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <h1 className="hidden">CodeAtoms</h1>
<p className="hidden">CodeAtoms is a modern marketplace built for tech people, by tech people. Discover, share, and sell the best developer tools, APIs, and SaaS products — all in one place.</p>
      <HeroSection/>
      <MainSection/>
<BelowSection />
<Footer/>

    </main>
  );
}
