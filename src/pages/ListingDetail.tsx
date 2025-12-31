import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  User,
  ChevronLeft,
  ChevronRight,
  Tag,
  ShieldCheck
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import SellerTrustBadge from "@/components/SellerTrustBadge";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  region: string;
  images: string[] | null;
  created_at: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  user_id: string;
}

const categoryLabels: Record<string, string> = {
  vehicles: "Vehicles & Autos",
  boats: "Boats & Watercraft",
  homes: "Homes for Sale",
  land: "Land & Lots",
  rentals: "Rentals",
  mining: "Mining Equipment",
  guides: "Guide Services",
  excavation: "Excavation Equipment",
  general: "General",
};

const regionLabels: Record<string, string> = {
  kenai: "Kenai Peninsula",
  anchorage: "Anchorage Area",
  tongass: "Tongass Area",
  alcan: "Alcan Corridor",
  bristol: "Bristol Bay Area",
  bethel: "Bethel Area",
  prudhoe: "Prudhoe Bay Area",
  chugach: "Chugach Region",
  statewide: "Statewide",
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .eq('status', 'active')
          .eq('payment_status', 'paid')
          .single();

        if (error) throw error;
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const nextImage = () => {
    if (listing?.images && listing.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === listing.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (listing?.images && listing.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? listing.images!.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="aspect-[4/3] rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Listing Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              This listing may have expired or been removed.
            </p>
            <Link to="/browse">
              <Button variant="aurora">Browse All Listings</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <Link 
            to="/browse" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden">
                {listing.images && listing.images.length > 0 ? (
                  <>
                    <img
                      src={listing.images[currentImageIndex]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    {listing.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {listing.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-primary' : 'bg-background/60'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {listing.images && listing.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {listing.title}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  ${listing.price.toLocaleString()}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {categoryLabels[listing.category] || listing.category}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {regionLabels[listing.region] || listing.region}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Posted {format(new Date(listing.created_at), 'MMM d, yyyy')}
                </Badge>
              </div>

              {/* Description */}
              <div className="bg-card rounded-xl p-5 border border-border">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-card rounded-xl p-5 border border-border">
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">Contact Seller</h2>
                
                {/* Seller Trust Badge */}
                <div className="mb-4">
                  <SellerTrustBadge 
                    userId={listing.user_id} 
                    sellerName={listing.contact_name}
                    variant="full"
                  />
                </div>

                <div className="space-y-3">
                  <a 
                    href={`mailto:${listing.contact_email}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>{listing.contact_email}</span>
                  </a>
                  
                  {listing.contact_phone && (
                    <a 
                      href={`tel:${listing.contact_phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span>{listing.contact_phone}</span>
                    </a>
                  )}
                </div>

                {/* Safety Tips */}
                <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Safety Tips</p>
                      <ul className="space-y-0.5">
                        <li>• Meet in public, well-lit locations</li>
                        <li>• Bring a friend when possible</li>
                        <li>• Trust your instincts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <Button 
                variant="aurora" 
                size="lg" 
                className="w-full"
                asChild
              >
                <a href={`mailto:${listing.contact_email}?subject=Inquiry: ${listing.title}`}>
                  Contact Seller
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingDetail;