import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { 
  Plus, 
  Eye, 
  Clock, 
  AlertCircle,
  Package,
  Trash2,
  ExternalLink
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  region: string;
  status: string;
  payment_status: string;
  images: string[] | null;
  created_at: string;
  expires_at: string | null;
}

const statusStyles: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending Review", variant: "secondary" },
  active: { label: "Active", variant: "default" },
  rejected: { label: "Rejected", variant: "destructive" },
  expired: { label: "Expired", variant: "outline" },
};

const MyListings = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('id, title, price, category, region, status, payment_status, images, created_at, expires_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to load your listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', deleteId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setListings(prev => prev.filter(l => l.id !== deleteId));
      toast({
        title: "Listing Deleted",
        description: "Your listing has been removed",
      });
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 bg-muted rounded" />
              <div className="h-24 bg-muted rounded-xl" />
              <div className="h-24 bg-muted rounded-xl" />
            </div>
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                My Listings
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your listings on Alaska Listings
              </p>
            </div>
            <Link to="/post-listing">
              <Button variant="aurora" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </Link>
          </div>

          {/* Listings */}
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                No Listings Yet
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                You haven't posted any listings yet. Create your first listing to reach buyers across Alaska.
              </p>
              <Link to="/post-listing">
                <Button variant="aurora">Post Your First Listing</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {listing.images?.[0] ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground truncate">{listing.title}</h3>
                      <Badge variant={statusStyles[listing.status]?.variant || "outline"}>
                        {statusStyles[listing.status]?.label || listing.status}
                      </Badge>
                    </div>
                    
                    <p className="text-primary font-semibold mb-2">
                      ${listing.price.toLocaleString()}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Posted {format(new Date(listing.created_at), 'MMM d, yyyy')}
                      </span>
                      {listing.expires_at && (
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Expires {format(new Date(listing.expires_at), 'MMM d, yyyy')}
                        </span>
                      )}
                      {listing.payment_status !== 'paid' && (
                        <Badge variant="destructive" className="text-xs">
                          Payment Required
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    {listing.status === 'active' && listing.payment_status === 'paid' && (
                      <Link to={`/listing/${listing.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(listing.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyListings;