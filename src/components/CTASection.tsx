import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, ImageIcon } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mountain-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-mountain-slate/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/50 text-accent px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">BETA - FREE LISTINGS!</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Sell? Post Your Free Listing Today
          </h2>
          
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Reach thousands of Interior Alaskans looking for exactly what you're selling. During our beta, all listings are completely FREE with a verified email!
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-glass rounded-2xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 mb-4">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                <span className="line-through text-muted-foreground mr-2">$10</span>
                <span className="text-green-500">FREE</span>
              </h3>
              <p className="text-muted-foreground text-sm">During beta with verified email</p>
            </div>
            
            <div className="bg-glass rounded-2xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">60 Day Duration</h3>
              <p className="text-muted-foreground text-sm">Stays active even after beta ends!</p>
            </div>
            
            <div className="bg-glass rounded-2xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-mountain-steel/10 mb-4">
                <ImageIcon className="w-6 h-6 text-mountain-steel" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Up to 5 Images</h3>
              <p className="text-muted-foreground text-sm">Showcase your item with multiple photos</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/post-listing">
            <Button variant="gold" size="xl" className="group">
              Post Your FREE Listing Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
