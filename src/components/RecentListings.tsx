import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ChevronDown, Loader2, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import SellerTrustBadge from "./SellerTrustBadge";

const ITEMS_PER_PAGE = 50;

const RecentListings = () => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: listings, isLoading } = useQuery({
    queryKey: ['recent-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, description, price, category, region, images, created_at, user_id, contact_name')
        .eq('status', 'active')
        .eq('payment_status', 'paid')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 300);
  };

  const displayedListings = listings?.slice(0, displayCount) || [];
  const hasMore = listings && displayCount < listings.length;
  const totalListings = listings?.length || 0;

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-aurora-deep/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Recent Listings</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Latest From Across Alaska
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {totalListings > 0 
              ? `Showing ${displayedListings.length} of ${totalListings} active listings`
              : "Fresh listings from our statewide network"
            }
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden border border-border/30 animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-4">
                  <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedListings.length > 0 ? (
          <>
            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedListings.map((listing, index) => (
                <Link
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 opacity-0 animate-fade-in"
                  style={{ 
                    animationDelay: `${Math.min(index * 30, 500)}ms`, 
                    animationFillMode: 'forwards' 
                  }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-aurora-deep/10">
                        <span className="text-muted-foreground text-sm">No Image</span>
                      </div>
                    )}
                    {/* Price Badge */}
                    <div className="absolute bottom-2 right-2 px-3 py-1.5 bg-background/95 backdrop-blur-sm rounded-md font-display font-bold text-foreground shadow-lg">
                      {formatPrice(listing.price)}
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-secondary/90 backdrop-blur-sm rounded text-xs font-medium text-secondary-foreground capitalize">
                      {listing.category.replace(/-/g, ' ')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="capitalize truncate">{listing.region.replace(/-/g, ' ')}</span>
                    </div>
                    <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
                      </div>
                    </div>
                    {/* Seller Trust Indicator */}
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <SellerTrustBadge 
                        userId={listing.user_id} 
                        sellerName={listing.contact_name}
                        variant="compact"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="group min-w-[200px]"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Show More Listings
                      <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-muted-foreground text-sm mt-3">
                  {listings.length - displayCount} more listings available
                </p>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-card rounded-xl border border-border/30">
            <Clock className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Listings Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Be the first to post a listing on Alaska's premier private marketplace
            </p>
            <Link to="/post-listing">
              <Button variant="aurora" size="lg">
                Post Your Listing — $10
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
