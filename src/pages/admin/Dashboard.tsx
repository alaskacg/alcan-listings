import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  List, 
  Users, 
  DollarSign, 
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface Stats {
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  totalUsers: number;
  totalRevenue: number;
  recentPayments: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalListings: 0,
    activeListings: 0,
    pendingListings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch listings stats
        const { data: listings } = await supabase.from('listings').select('status, payment_status');
        const totalListings = listings?.length || 0;
        const activeListings = listings?.filter(l => l.status === 'active' && l.payment_status === 'paid').length || 0;
        const pendingListings = listings?.filter(l => l.status === 'pending').length || 0;

        // Fetch users count
        const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

        // Fetch payments
        const { data: payments } = await supabase.from('payments').select('amount, status, created_at');
        const totalRevenue = payments?.filter(p => p.status === 'completed').reduce((sum, p) => sum + Number(p.amount), 0) || 0;
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const recentPayments = payments?.filter(p => new Date(p.created_at) > weekAgo).length || 0;

        setStats({
          totalListings,
          activeListings,
          pendingListings,
          totalUsers: usersCount || 0,
          totalRevenue,
          recentPayments,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Listings', value: stats.totalListings, icon: List, color: 'text-primary' },
    { label: 'Active Listings', value: stats.activeListings, icon: TrendingUp, color: 'text-aurora-green' },
    { label: 'Pending Review', value: stats.pendingListings, icon: Clock, color: 'text-aurora-gold' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-aurora-cyan' },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-aurora-gold' },
    { label: 'Recent Payments', value: stats.recentPayments, icon: AlertCircle, color: 'text-aurora-deep' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome to the Alaska Listings admin panel</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <div className="h-3 bg-muted rounded w-1/2 mb-3" />
                <div className="h-6 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground text-xs font-medium">{stat.label}</span>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="/admin/listings"
              className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
            >
              <List className="w-6 h-6 mx-auto mb-2 text-primary" />
              <span className="text-xs font-medium">Manage Listings</span>
            </a>
            <a
              href="/admin/users"
              className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
            >
              <Users className="w-6 h-6 mx-auto mb-2 text-aurora-cyan" />
              <span className="text-xs font-medium">View Users</span>
            </a>
            <a
              href="/admin/payments"
              className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
            >
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-aurora-gold" />
              <span className="text-xs font-medium">Payment History</span>
            </a>
            <a
              href="/admin/settings"
              className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
            >
              <AlertCircle className="w-6 h-6 mx-auto mb-2 text-aurora-deep" />
              <span className="text-xs font-medium">Site Settings</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
