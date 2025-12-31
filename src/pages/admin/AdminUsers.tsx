import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Shield,
  ShieldOff,
  RefreshCw
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profilesRes, rolesRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('user_roles').select('user_id, role'),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      setUsers(profilesRes.data || []);
      setRoles(rolesRes.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAdminRole = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      if (isCurrentlyAdmin) {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
        toast({ title: "Success", description: "Admin role removed" });
      } else {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
        toast({ title: "Success", description: "Admin role granted" });
      }
      fetchData();
    } catch (error) {
      console.error('Error toggling admin role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const getUserRole = (userId: string) => {
    return roles.find(r => r.user_id === userId)?.role || 'user';
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.full_name?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground mt-1">Manage user accounts and roles</p>
          </div>
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No users found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => {
                    const role = getUserRole(user.user_id);
                    const isAdmin = role === 'admin';
                    return (
                      <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-foreground">{user.full_name || 'No name'}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{user.phone || '—'}</td>
                        <td className="px-4 py-3">
                          {isAdmin ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary flex items-center gap-1 w-fit">
                              <Shield className="w-3 h-3" />
                              Admin
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">User</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleAdminRole(user.user_id, isAdmin)}
                              className={isAdmin ? 'text-destructive hover:text-destructive' : 'text-primary hover:text-primary'}
                            >
                              {isAdmin ? (
                                <>
                                  <ShieldOff className="w-4 h-4 mr-1" />
                                  Remove Admin
                                </>
                              ) : (
                                <>
                                  <Shield className="w-4 h-4 mr-1" />
                                  Make Admin
                                </>
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
