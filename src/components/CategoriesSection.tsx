import CategoryCard from "./CategoryCard";
import { 
  Car, 
  Ship, 
  Home, 
  TreePine, 
  Building, 
  Pickaxe, 
  Compass, 
  Mountain 
} from "lucide-react";

const categories = [
  {
    title: "Vehicles & Autos",
    description: "Cars, trucks, ATVs, snowmachines and more",
    icon: Car,
    href: "https://kenaiautosales.com",
    external: true,
  },
  {
    title: "Boats & Watercraft",
    description: "Fishing boats, kayaks, and marine equipment",
    icon: Ship,
    href: "https://alaskanboats.com",
    external: true,
  },
  {
    title: "Homes for Sale",
    description: "Residential properties across Alaska",
    icon: Home,
    href: "https://kenaihomesales.com",
    external: true,
  },
  {
    title: "Land & Lots",
    description: "Acreage, homesteads, and undeveloped land",
    icon: TreePine,
    href: "https://kenailandsales.com",
    external: true,
  },
  {
    title: "Rentals",
    description: "Long-term and vacation rental properties",
    icon: Building,
    href: "https://kenaipeninsularentals.com",
    external: true,
  },
  {
    title: "Mining Equipment",
    description: "Dredges, sluices, and prospecting gear",
    icon: Pickaxe,
    href: "https://alaskaminingequipment.com",
    external: true,
  },
  {
    title: "Guide Services",
    description: "Hunting, fishing, and adventure guides",
    icon: Compass,
    href: "https://alaskaguidelistings.com",
    external: true,
  },
  {
    title: "Alaska Digs",
    description: "Excavation and earth-moving equipment",
    icon: Mountain,
    href: "https://alaskadigs.com",
    external: true,
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 opacity-0 animate-slide-up" style={{ animationFillMode: 'forwards' }}>
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Specialized marketplaces for everything Alaskans need
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              href={category.href}
              external={category.external}
              delay={200 + index * 75}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
