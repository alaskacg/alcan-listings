import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Grid3X3, Search, Star } from "lucide-react";
import heroImage from "@/assets/hero-aurora.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Alaska Northern Lights" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Static aurora glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora-teal/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-aurora-deep/15 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-foreground opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Alaska Listings
          </h1>

          {/* Animated Tagline - Below title */}
          <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <p className="font-sans text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase animate-shimmer font-medium">
              Alaska's Premier Private Listings Marketplace
            </p>
          </div>

          {/* Browse Options Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
            <Link to="/regions" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 border border-border/50 hover:border-primary/50">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-primary group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Explore by Region</span>
              </div>
            </Link>
            <Link to="/categories" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 border border-border/50 hover:border-primary/50">
                <Grid3X3 className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-aurora-gold group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Explore by Category</span>
              </div>
            </Link>
            <Link to="/browse" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 border border-border/50 hover:border-primary/50">
                <Search className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-aurora-cyan group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Browse All Listings</span>
              </div>
            </Link>
            <Link to="/browse?featured=true" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-accent/10 border border-border/50 hover:border-accent/50">
                <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-accent fill-accent/30 group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Featured Listings</span>
              </div>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <Link to="/browse">
              <Button variant="aurora" size="lg" className="group">
                Browse Listings
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/post-listing">
              <Button variant="glass" size="lg">
                Post Your Listing — $10
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-10 opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
            <div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">13</div>
              <div className="text-muted-foreground text-xs">Specialized Sites</div>
            </div>
            <div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">8</div>
              <div className="text-muted-foreground text-xs">Major Regions</div>
            </div>
            <div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">60</div>
              <div className="text-muted-foreground text-xs">Day Listings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
