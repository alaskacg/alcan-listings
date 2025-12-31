import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Save,
  RefreshCw,
  CreditCard,
  Settings,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';

interface Setting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  description: string | null;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => prev.map(s => 
      s.setting_key === key ? { ...s, setting_value: value } : s
    ));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      for (const setting of settings) {
        const { error } = await supabase
          .from('site_settings')
          .update({ 
            setting_value: setting.setting_value,
            updated_by: user?.id 
          })
          .eq('setting_key', setting.setting_key);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getSetting = (key: string) => settings.find(s => s.setting_key === key);

  const stripeSettings = settings.filter(s => s.setting_key.startsWith('stripe'));
  const siteSettings = settings.filter(s => ['site_name', 'contact_email'].includes(s.setting_key));
  const listingSettings = settings.filter(s => ['listing_price', 'listing_duration_days', 'enable_payments'].includes(s.setting_key));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure your site settings</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchSettings} variant="outline" size="sm">
              <RefreshCw className="w-3 h-3 mr-1" />
              Refresh
            </Button>
            <Button onClick={saveSettings} variant="aurora" size="sm" disabled={saving}>
              <Save className="w-3 h-3 mr-1" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground text-sm">Loading settings...</div>
        ) : (
          <div className="space-y-6">
            {/* Stripe Settings */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-aurora-deep/20 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-aurora-deep" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Stripe Configuration</h2>
                  <p className="text-xs text-muted-foreground">Configure your Stripe payment keys</p>
                </div>
              </div>

              <div className="space-y-4">
                {stripeSettings.map((setting) => (
                  <div key={setting.setting_key} className="space-y-2">
                    <Label htmlFor={setting.setting_key} className="flex items-center justify-between">
                      <span>{setting.description || setting.setting_key}</span>
                      {setting.setting_type === 'secret' && (
                        <button
                          type="button"
                          onClick={() => toggleSecretVisibility(setting.setting_key)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {showSecrets[setting.setting_key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </Label>
                    <Input
                      id={setting.setting_key}
                      type={setting.setting_type === 'secret' && !showSecrets[setting.setting_key] ? 'password' : 'text'}
                      value={setting.setting_value || ''}
                      onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                      placeholder={`Enter ${setting.setting_key.replace(/_/g, ' ')}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Site Settings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Site Information</h2>
                  <p className="text-sm text-muted-foreground">General site settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteSettings.map((setting) => (
                  <div key={setting.setting_key} className="space-y-2">
                    <Label htmlFor={setting.setting_key}>{setting.description || setting.setting_key}</Label>
                    <Input
                      id={setting.setting_key}
                      type="text"
                      value={setting.setting_value || ''}
                      onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Listing Settings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-aurora-gold/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-aurora-gold" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Listing Configuration</h2>
                  <p className="text-sm text-muted-foreground">Configure listing pricing and duration</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listingSettings.filter(s => s.setting_type !== 'boolean').map((setting) => (
                    <div key={setting.setting_key} className="space-y-2">
                      <Label htmlFor={setting.setting_key}>{setting.description || setting.setting_key}</Label>
                      <Input
                        id={setting.setting_key}
                        type={setting.setting_type === 'number' ? 'number' : 'text'}
                        value={setting.setting_value || ''}
                        onChange={(e) => updateSetting(setting.setting_key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Enable Payments Toggle */}
                {getSetting('enable_payments') && (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <Label className="text-base">Enable Payment Processing</Label>
                      <p className="text-sm text-muted-foreground">
                        Turn on to require payment for listing submissions
                      </p>
                    </div>
                    <Switch
                      checked={getSetting('enable_payments')?.setting_value === 'true'}
                      onCheckedChange={(checked) => updateSetting('enable_payments', checked.toString())}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
