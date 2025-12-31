import { ExternalLink, Globe, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const ecosystemSites = [
  { name: "Alaska Listings", url: "https://aklistings.com", description: "Statewide Marketplace", featured: true },
  { name: "Alaska Mining Equipment", url: "https://alaskaminingequipment.com", description: "Mining & Prospecting" },
  { name: "Alaskan Boats", url: "https://alaskanboats.com", description: "Boats & Watercraft" },
  { name: "Alaska Digs", url: "https://alaskadigs.com", description: "Excavation Equipment" },
  { name: "Alaska Guide Listings", url: "https://alaskaguidelistings.com", description: "Guide Services" },
  { name: "Kenai Auto Sales", url: "https://kenaiautosales.com", description: "Vehicles" },
  { name: "Kenai Home Sales", url: "https://kenaihomesales.com", description: "Real Estate" },
  { name: "Kenai Land Sales", url: "https://kenailandsales.com", description: "Land & Property" },
];

const EcosystemSites = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Mountain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Network</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Alaska Listings Network
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Alcan Listings is part of the Alaska Listings family of marketplace websites
          </p>
        </div>

        {/* Sites Grid - Responsive masonry-like layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {ecosystemSites.map((site, index) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-card border rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-fade-in ${
                site.featured 
                  ? 'border-primary/50 hover:border-primary hover:shadow-primary/10' 
                  : 'border-border/50 hover:border-primary/50 hover:shadow-primary/10'
              }`}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-muted-foreground truncate">{site.description}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-1" />
                </div>
                <h3 className={`font-display text-sm font-semibold transition-colors line-clamp-2 ${
                  site.featured ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`}>
                  {site.name}
                </h3>
                {site.featured && (
                  <span className="mt-2 text-[10px] uppercase tracking-wider text-primary/80 font-medium">
                    Parent Site
                  </span>
                )}
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSites;
