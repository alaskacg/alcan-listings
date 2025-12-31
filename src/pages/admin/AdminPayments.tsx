import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  RefreshCw,
  DollarSign
} from 'lucide-react';

interface Payment {
  id: string;
  listing_id: string | null;
  user_id: string | null;
  amount: number;
  status: string;
  stripe_payment_intent_id: string | null;
  created_at: string;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [statusFilter]);

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-aurora-green/20 text-aurora-green">Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-aurora-gold/20 text-aurora-gold">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">{status}</span>;
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.stripe_payment_intent_id?.toLowerCase().includes(search.toLowerCase()) ||
    payment.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground mt-1">Track all payment transactions</p>
          </div>
          <Button onClick={fetchPayments} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-r from-aurora-gold/20 to-aurora-gold/5 border border-aurora-gold/30 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-aurora-gold/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-aurora-gold" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
              <div className="font-display text-3xl font-bold text-foreground">${totalRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by payment ID..."
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
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Payments Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No payments found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payment ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stripe ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-foreground">
                        {payment.id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        ${Number(payment.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                      <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                        {payment.stripe_payment_intent_id || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()}
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

export default AdminPayments;
