import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import RecentListings from "@/components/RecentListings";
import EcosystemSites from "@/components/EcosystemSites";
import CTASection from "@/components/CTASection";
import TrustIndicators from "@/components/TrustIndicators";
import AlcanNewsPromo from "@/components/AlcanNewsPromo";
import SEOHead from "@/components/SEOHead";
import EmpireNetwork from "@/components/EmpireNetwork";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />
      <main>
        <HeroSection />
        <TrustIndicators />
        <EcosystemSites />
        <AlcanNewsPromo />
        <RecentListings />
        <CTASection />
        <EmpireNetwork currentSite="alcan-listings" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
