import RegionCard from "./RegionCard";

const regions = [
  {
    name: "Kenai Peninsula",
    description: "From Seward to Homer, find local deals",
    href: "https://kenailistings.com",
    external: true,
  },
  {
    name: "Anchorage Area",
    description: "Anchorage, Eagle River, and Mat-Su Valley",
    href: "https://anchoragelistings.com",
    external: true,
  },
  {
    name: "Tongass Area",
    description: "Southeast Alaska's rainforest communities",
    href: "https://tongasslistings.com",
    external: true,
  },
  {
    name: "Alcan Corridor",
    description: "Along the Alaska Highway",
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
    description: "Bethel and the Yukon-Kuskokwim Delta",
    href: "https://bethellistings.com",
    external: true,
  },
  {
    name: "Prudhoe Bay Area",
    description: "North Slope and Arctic communities",
    href: "https://prudhoebaylistings.com",
    external: true,
  },
  {
    name: "Chugach Region",
    description: "Valdez, Cordova, and Prince William Sound",
    href: "https://chugachlistings.com",
    external: true,
  },
];

const RegionsSection = () => {
  return (
    <section className="py-20 md:py-28 aurora-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 opacity-0 animate-slide-up" style={{ animationFillMode: 'forwards' }}>
            Explore by Region
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Find listings in your local area across Alaska's diverse regions
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <RegionCard
              key={region.name}
              name={region.name}
              description={region.description}
              href={region.href}
              external={region.external}
              delay={200 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
