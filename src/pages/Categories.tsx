import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { Grid3X3 } from "lucide-react";
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
    description: "Cars, trucks, ATVs, snowmachines, motorcycles and more",
    icon: Car,
    href: "https://kenaiautosales.com",
    external: true,
  },
  {
    title: "Boats & Watercraft",
    description: "Fishing boats, kayaks, jet skis, and marine equipment",
    icon: Ship,
    href: "https://alaskanboats.com",
    external: true,
  },
  {
    title: "Homes for Sale",
    description: "Residential properties, cabins, and condos across Alaska",
    icon: Home,
    href: "https://kenaihomesales.com",
    external: true,
  },
  {
    title: "Land & Lots",
    description: "Acreage, homesteads, recreational land, and undeveloped lots",
    icon: TreePine,
    href: "https://kenailandsales.com",
    external: true,
  },
  {
    title: "Rentals",
    description: "Long-term rentals, vacation properties, and seasonal housing",
    icon: Building,
    href: "https://kenaipeninsularentals.com",
    external: true,
  },
  {
    title: "Mining Equipment",
    description: "Dredges, sluices, highbankers, and prospecting equipment",
    icon: Pickaxe,
    href: "https://alaskaminingequipment.com",
    external: true,
  },
  {
    title: "Guide Services",
    description: "Hunting guides, fishing charters, and adventure tour operators",
    icon: Compass,
    href: "https://alaskaguidelistings.com",
    external: true,
  },
  {
    title: "Alaska Digs",
    description: "Excavation equipment, earth movers, and construction machinery",
    icon: Mountain,
    href: "https://alaskadigs.com",
    external: true,
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
              <Grid3X3 className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Browse by Category
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Specialized marketplaces for specific types of items and services
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
                href={category.href}
                external={category.external}
                delay={index * 75}
              />
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Each category site is dedicated to a specific type of listing. When you post on aklistings.com, 
              your listing will automatically appear on the relevant category site based on your selection.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
