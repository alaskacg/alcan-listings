import RegionCard from "./RegionCard";

const regions = [
  {
    name: "Fairbanks/North Star",
    description: "Fairbanks, North Pole, and surrounding communities",
    href: "/browse?region=fairbanks",
    external: false,
  },
  {
    name: "Delta Junction Area",
    description: "Delta Junction, Big Delta, and Fort Greely area",
    href: "/browse?region=delta",
    external: false,
  },
  {
    name: "Tok/Highway Corridor",
    description: "Tok, Northway, Mentasta, and the border region",
    href: "/browse?region=tok",
    external: false,
  },
  {
    name: "Denali Borough",
    description: "Healy, Anderson, Nenana, and Clear",
    href: "/browse?region=denali",
    external: false,
  },
  {
    name: "Valdez-Cordova Border",
    description: "Richardson Highway and Glennallen access",
    href: "/browse?region=valdez-cordova",
    external: false,
  },
  {
    name: "Yukon-Tanana Region",
    description: "Remote interior villages and river communities",
    href: "/browse?region=yukon-tanana",
    external: false,
  },
];

const RegionsSection = () => {
  return (
    <section className="py-20 md:py-28 mountain-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 opacity-0 animate-slide-up" style={{ animationFillMode: 'forwards' }}>
            Explore Interior Alaska
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Find listings across the Alcan corridor and Interior Alaska communities
          </p>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
