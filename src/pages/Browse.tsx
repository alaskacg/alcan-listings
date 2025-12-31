import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, SlidersHorizontal, X, Calendar, DollarSign, ArrowUpDown, Grid, List } from "lucide-react";
import SellerTrustBadge from "@/components/SellerTrustBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  region: string;
  images: string[];
  created_at: string;
  user_id: string;
  contact_name: string;
}

const Browse = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Search & Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [region, setRegion] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('id, title, description, price, category, region, images, created_at, user_id, contact_name')
        .eq('status', 'active')
        .eq('payment_status', 'paid');

      // Apply filters
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      if (region !== 'all') {
        query = query.eq('region', region);
      }
      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice));
      }
      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice));
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [category, region, sortBy, minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setRegion('all');
    setSortBy('newest');
    setMinPrice('');
    setMaxPrice('');
  };

  const hasActiveFilters = category !== 'all' || region !== 'all' || minPrice || maxPrice || search;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Browse Alaska Listings
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Discover what Alaskans are selling across all regions and categories
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 text-sm"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[140px] text-sm">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="boats">Boats</SelectItem>
                    <SelectItem value="homes">Homes</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="rentals">Rentals</SelectItem>
                    <SelectItem value="mining">Mining</SelectItem>
                    <SelectItem value="guides">Guides</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-[140px] text-sm">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="kenai">Kenai Peninsula</SelectItem>
                    <SelectItem value="anchorage">Anchorage Area</SelectItem>
                    <SelectItem value="tongass">Tongass Area</SelectItem>
                    <SelectItem value="alcan">Alcan Corridor</SelectItem>
                    <SelectItem value="bristol">Bristol Bay Area</SelectItem>
                    <SelectItem value="bethel">Bethel Area</SelectItem>
                    <SelectItem value="prudhoe">Prudhoe Bay Area</SelectItem>
                    <SelectItem value="chugach">Chugach Region</SelectItem>
                    <SelectItem value="statewide">Statewide</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] text-sm">
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Newest First
                      </span>
                    </SelectItem>
                    <SelectItem value="oldest">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Oldest First
                      </span>
                    </SelectItem>
                    <SelectItem value="price-low">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" /> Price: Low to High
                      </span>
                    </SelectItem>
                    <SelectItem value="price-high">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" /> Price: High to Low
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Advanced Filters Sheet */}
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      <SlidersHorizontal className="w-3 h-3 mr-1" />
                      More
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="font-display text-lg">Advanced Filters</SheetTitle>
                      <SheetDescription className="text-xs">
                        Refine your search with additional filters
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* Price Range */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Price Range</Label>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                            <Input
                              type="number"
                              placeholder="Min"
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              className="pl-7 text-sm"
                            />
                          </div>
                          <span className="text-muted-foreground text-sm">to</span>
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                            <Input
                              type="number"
                              placeholder="Max"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              className="pl-7 text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="aurora" 
                        className="w-full" 
                        size="sm"
                        onClick={() => {
                          fetchListings();
                          setFiltersOpen(false);
                        }}
                      >
                        Apply Filters
                      </Button>

                      {hasActiveFilters && (
                        <Button 
                          variant="ghost" 
                          className="w-full text-sm" 
                          size="sm"
                          onClick={() => {
                            clearFilters();
                            setFiltersOpen(false);
                          }}
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <Button type="submit" variant="aurora" size="sm" className="text-sm">
                  Search
                </Button>
              </div>
            </form>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Active filters:</span>
                {search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    Search: "{search}"
                    <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    {category}
                    <button onClick={() => setCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {region !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    {region}
                    <button onClick={() => setRegion('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                    ${minPrice || '0'} - ${maxPrice || '∞'}
                    <button onClick={() => { setMinPrice(''); setMaxPrice(''); }}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button 
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Loading...' : `${listings.length} listing${listings.length !== 1 ? 's' : ''} found`}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Listings Grid/List */}
          {loading ? (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-3" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                No Listings Found
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your filters or search terms to find what you're looking for."
                  : "Be the first to post a listing! Connect with buyers across Alaska."
                }
              </p>
              {hasActiveFilters ? (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button variant="aurora" size="sm" asChild>
                  <a href="/post-listing">Post the First Listing</a>
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {listings.map((listing) => (
                <Link 
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className={`bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  <div className={`bg-muted ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'}`}>
                    {listing.images?.[0] ? (
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-foreground text-sm line-clamp-1">{listing.title}</h3>
                      <span className="text-primary font-semibold text-sm whitespace-nowrap">
                        ${listing.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground capitalize">{listing.region.replace(/-/g, ' ')}</span>
                      <span className="text-muted-foreground">
                        {new Date(listing.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {/* Seller Trust Badge */}
                    <div className="pt-2 border-t border-border/30">
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;