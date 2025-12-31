import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegionCard from "@/components/RegionCard";
import { MapPin } from "lucide-react";

const regions = [
  {
    name: "Kenai Peninsula",
    description: "From Seward to Homer, covering the Kenai Peninsula Borough",
    href: "https://kenailistings.com",
    external: true,
  },
  {
    name: "Anchorage Area",
    description: "Anchorage, Eagle River, Girdwood and Mat-Su Valley",
    href: "https://anchoragelistings.com",
    external: true,
  },
  {
    name: "Tongass Area",
    description: "Southeast Alaska including Juneau, Ketchikan, and Sitka",
    href: "https://tongasslistings.com",
    external: true,
  },
  {
    name: "Alcan Corridor",
    description: "Along the Alaska Highway from the border to Fairbanks",
    href: "https://alcanlistings.com",
    external: true,
  },
  {
    name: "Bristol Bay Area",
    description: "Bristol Bay and surrounding fishing communities",
    href: "https://bristolbaylistings.com",
    external: true,
  },
  {
    name: "Bethel Area",
    description: "Bethel and the Yukon-Kuskokwim Delta region",
    href: "https://bethellistings.com",
    external: true,
  },
  {
    name: "Prudhoe Bay Area",
    description: "North Slope and Arctic coastal communities",
    href: "https://prudhoebaylistings.com",
    external: true,
  },
  {
    name: "Chugach Region",
    description: "Valdez, Cordova, and Prince William Sound area",
    href: "https://chugachlistings.com",
    external: true,
  },
];

const Regions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Explore by Region
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find listings in your local area. Each regional site focuses on local buyers and sellers.
            </p>
          </div>

          {/* Region Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {regions.map((region, index) => (
              <RegionCard
                key={region.name}
                name={region.name}
                description={region.description}
                href={region.href}
                external={region.external}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Each regional site is part of the Alaska Listings network. Post once on aklistings.com 
              and your listing will appear on the appropriate regional and category sites based on 
              your selection.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Regions;
