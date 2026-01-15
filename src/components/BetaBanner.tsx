import { Sparkles, X } from "lucide-react";
import { useState } from "react";

const BetaBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-accent/90 via-primary to-accent/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" />
      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-center gap-3 text-center">
          <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <div className="text-sm md:text-base font-medium">
            <span className="font-bold">🎉 BETA LAUNCH!</span>
            {" "}All listings are <span className="underline decoration-2 underline-offset-2">FREE</span> during beta with verified email.
            {" "}Your listing stays up for the full 60 days—even after beta ends!
          </div>
          <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse hidden sm:block" />
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BetaBanner;
