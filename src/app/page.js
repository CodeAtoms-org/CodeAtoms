
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
      <HeroSection/>
      <MainSection/>
<BelowSection />
<Footer/>
    </main>
  );
}
