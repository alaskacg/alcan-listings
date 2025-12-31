import { ExternalLink, Mountain } from "lucide-react";

// Import all network site images
import alaskaImg from "@/assets/network/alaska-listings.jpg";
import kenaiImg from "@/assets/network/kenai-listings.jpg";
import chugachImg from "@/assets/network/chugach-listings.jpg";
import tongassImg from "@/assets/network/tongass-listings.jpg";
import anchorageImg from "@/assets/network/anchorage-listings.jpg";
import wasillaImg from "@/assets/network/wasilla-listings.jpg";
import prudhoeImg from "@/assets/network/prudhoe-listings.jpg";
import bristolBayImg from "@/assets/network/bristol-bay-listings.jpg";
import bethelImg from "@/assets/network/bethel-listings.jpg";
import miningImg from "@/assets/network/mining-listings.jpg";
import boatsImg from "@/assets/network/boats-listings.jpg";
import guideImg from "@/assets/network/guide-listings.jpg";

const ecosystemSites = [
  // Parent/Statewide
  { name: "Alaska Listings", url: "https://aklistings.com", description: "Statewide Marketplace", featured: true, image: alaskaImg },
  // Regional Sister Sites
  { name: "Kenai Listings", url: "https://kenailistings.com", description: "Kenai Peninsula", image: kenaiImg },
  { name: "Chugach Listings", url: "https://chugachlistings.com", description: "Chugach Region", image: chugachImg },
  { name: "Tongass Listings", url: "https://tongasslistings.com", description: "Southeast Alaska", image: tongassImg },
  { name: "Anchorage Listings", url: "https://anclistings.com", description: "Anchorage Metro", image: anchorageImg },
  { name: "Wasilla Listings", url: "https://wasillalistings.com", description: "Mat-Su Valley", image: wasillaImg },
  { name: "Prudhoe Listings", url: "https://prudhoelistings.com", description: "North Slope", image: prudhoeImg },
  { name: "Bristol Bay Listings", url: "https://bblistings.com", description: "Bristol Bay Region", image: bristolBayImg },
  { name: "Bethel Listings", url: "https://bethellistings.com", description: "Yukon-Kuskokwim Delta", image: bethelImg },
  // Specialty Sites
  { name: "Alaska Mining Equipment", url: "https://alaskaminingequipment.com", description: "Mining & Prospecting", image: miningImg },
  { name: "Alaskan Boats", url: "https://alaskanboats.com", description: "Boats & Watercraft", image: boatsImg },
  { name: "Alaska Guide Listings", url: "https://alaskaguidelistings.com", description: "Guide Services", image: guideImg },
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
              className={`group relative bg-card border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0 animate-fade-in ${
                site.featured 
                  ? 'border-primary/50 hover:border-primary hover:shadow-primary/10' 
                  : 'border-border/50 hover:border-primary/50 hover:shadow-primary/10'
              }`}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={site.image} 
                  alt={site.name}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-4">
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
