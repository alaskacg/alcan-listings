import { Shield, CheckCircle, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SellerTrustBadgeProps {
  userId: string;
  sellerName: string;
  variant?: "compact" | "full";
}

const SellerTrustBadge = ({ userId, sellerName, variant = "compact" }: SellerTrustBadgeProps) => {
  const { data: listingCount } = useQuery({
    queryKey: ['seller-listings-count', userId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'active')
        .eq('payment_status', 'paid');

      if (error) throw error;
      return count || 0;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const getTrustLevel = (count: number) => {
    if (count >= 10) return { label: "Trusted Seller", color: "text-amber-500", icon: Star };
    if (count >= 5) return { label: "Verified Seller", color: "text-emerald-500", icon: CheckCircle };
    return { label: "Seller", color: "text-primary", icon: Shield };
  };

  const trustInfo = getTrustLevel(listingCount || 0);
  const TrustIcon = trustInfo.icon;

  if (variant === "compact") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary/80 text-xs font-medium cursor-help">
              <TrustIcon className={`w-3 h-3 ${trustInfo.color}`} />
              <span className="text-foreground">{sellerName}</span>
              {listingCount !== undefined && listingCount > 0 && (
                <span className="text-muted-foreground">• {listingCount}</span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px]">
            <div className="text-center">
              <p className={`font-semibold ${trustInfo.color}`}>{trustInfo.label}</p>
              <p className="text-xs text-muted-foreground">
                {listingCount === 0 
                  ? "First-time seller"
                  : `${listingCount} listing${listingCount === 1 ? '' : 's'} on Alaska Listings`
                }
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
      <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center`}>
        <TrustIcon className={`w-5 h-5 ${trustInfo.color}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{sellerName}</span>
          <span className={`text-xs font-medium ${trustInfo.color}`}>{trustInfo.label}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {listingCount === 0 
            ? "First-time seller on our platform"
            : `${listingCount} active listing${listingCount === 1 ? '' : 's'} on Alaska Listings`
          }
        </p>
      </div>
    </div>
  );
};

export default SellerTrustBadge;