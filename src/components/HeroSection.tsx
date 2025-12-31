import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Grid3X3, Search, Star } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-mountain.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Interior Alaska Mountain Highway" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Static mountain glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mountain-slate/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-mountain-granite/15 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <motion.h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Alcan Listings
          </motion.h1>

          {/* Animated Tagline - Below title */}
          <motion.div 
            className="mb-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.p 
              className="font-sans text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase font-medium text-mountain-mist"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="inline-block"
              >
                Interior Alaska's Premier Private Listings Marketplace
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Browse Options Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link to="/regions" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 border border-border/50 hover:border-primary/50">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-primary group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Explore by Region</span>
              </div>
            </Link>
            <Link to="/categories" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 border border-border/50 hover:border-primary/50">
                <Grid3X3 className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-mountain-gold group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Explore by Category</span>
              </div>
            </Link>
            <Link to="/browse" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 border border-border/50 hover:border-primary/50">
                <Search className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-mountain-steel group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Browse All Listings</span>
              </div>
            </Link>
            <Link to="/browse?featured=true" className="group">
              <div className="bg-glass rounded-lg p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:bg-accent/10 border border-border/50 hover:border-accent/50">
                <Star className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-accent fill-accent/30 group-hover:animate-float" />
                <span className="font-display text-xs md:text-sm text-foreground block">Featured Listings</span>
              </div>
            </Link>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link to="/browse">
              <Button variant="aurora" size="lg" className="group text-white font-semibold shadow-lg">
                Browse Listings
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/post-listing">
              <Button variant="glass" size="lg">
                Post Your Listing — $10
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">6</div>
              <div className="text-muted-foreground text-xs">Interior Regions</div>
            </div>
            <div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">8</div>
              <div className="text-muted-foreground text-xs">Categories</div>
            </div>
            <div>
              <div className="font-display text-xl md:text-2xl font-bold text-foreground">60</div>
              <div className="text-muted-foreground text-xs">Day Listings</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-3 bg-foreground/50 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
