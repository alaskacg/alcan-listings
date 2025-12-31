import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Check, 
  X, 
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  category: string;
  region: string;
  price: number;
  status: string;
  payment_status: string;
  contact_email: string;
  created_at: string;
  expires_at: string | null;
}

const AdminListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [statusFilter]);

  const updateListingStatus = async (id: string, status: string) => {
    try {
      const updates: { status: string; expires_at?: string } = { status };
      
      if (status === 'active') {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 60);
        updates.expires_at = expiresAt.toISOString();
      }

      const { error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Listing ${status === 'active' ? 'approved' : 'rejected'}`,
      });
      fetchListings();
    } catch (error) {
      console.error('Error updating listing:', error);
      toast({
        title: "Error",
        description: "Failed to update listing",
        variant: "destructive",
      });
    }
  };

  const deleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Listing deleted",
      });
      fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(search.toLowerCase()) ||
    listing.contact_email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string, paymentStatus: string) => {
    if (paymentStatus !== 'paid') {
      return <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">Unpaid</span>;
    }
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-aurora-green/20 text-aurora-green">Active</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-aurora-gold/20 text-aurora-gold">Pending</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">Rejected</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">Expired</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Listings</h1>
            <p className="text-muted-foreground mt-1">Manage all listings</p>
          </div>
          <Button onClick={fetchListings} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Listings Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : filteredListings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No listings found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Region</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Created</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-foreground">{listing.title}</div>
                          <div className="text-sm text-muted-foreground">{listing.contact_email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{listing.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{listing.region}</td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">${listing.price}</td>
                      <td className="px-4 py-3">{getStatusBadge(listing.status, listing.payment_status)}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(listing.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {listing.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Approve"
                                onClick={() => updateListingStatus(listing.id, 'active')}
                                className="text-aurora-green hover:text-aurora-green"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Reject"
                                onClick={() => updateListingStatus(listing.id, 'rejected')}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => deleteListing(listing.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminListings;
