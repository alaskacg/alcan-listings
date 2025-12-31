import { Shield, Users, MapPin, CheckCircle } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "Track record displayed on every listing",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by Alaskans, for Alaskans",
    },
    {
      icon: MapPin,
      title: "Local Focus",
      description: "Regional expertise across all of Alaska",
    },
    {
      icon: CheckCircle,
      title: "Paid Listings Only",
      description: "Committed sellers, no spam or scams",
    },
  ];

  return (
    <section className="py-12 bg-secondary/20 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {indicators.map((item, index) => (
            <div 
              key={item.title}
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;