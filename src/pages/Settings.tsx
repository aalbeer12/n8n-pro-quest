import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SEOMeta } from '@/components/seo/seo-meta';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Settings as SettingsIcon, User, CreditCard, Bell, Globe, Shield, Trash2, Upload, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  username: string;
  display_name: string | null;
  bio: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  avatar_url: string | null;
  is_public: boolean;
}

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const { subscribed, subscriptionTier, subscriptionEnd, loading: subLoading } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    username: '',
    display_name: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
    website_url: '',
    avatar_url: '',
    is_public: true
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          username: data.username || '',
          display_name: data.display_name || '',
          bio: data.bio || '',
          github_url: data.github_url || '',
          linkedin_url: data.linkedin_url || '',
          website_url: data.website_url || '',
          avatar_url: data.avatar_url || '',
          is_public: data.is_public !== false
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async (data?: Partial<Profile>) => {
    if (!user) return;

    setLoading(true);
    try {
      const updateData = data || {
        display_name: profile.display_name || null,
        bio: profile.bio || null,
        github_url: profile.github_url || null,
        linkedin_url: profile.linkedin_url || null,
        website_url: profile.website_url || null,
        is_public: profile.is_public,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: t('settings.success'),
        description: t('settings.profileUpdated'),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('settings.error'),
        description: t('settings.updateError'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      await updateProfile({ avatar_url: data.publicUrl });

      toast({
        title: t('settings.success'),
        description: t('notifications.avatarUploaded'),
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: t('settings.error'),
        description: t('settings.updateError'),
        variant: 'destructive',
      });
    }
  };

  const manageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: t('settings.error'),
        description: t('settings.subscriptionError'),
        variant: 'destructive',
      });
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEOMeta 
        title={t('settings.title')}
        description={t('settings.description')}
        canonical={`${window.location.origin}/${i18n.language}/settings`}
      />
      
      <div className="container max-w-4xl mx-auto py-8 px-6">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t('settings.profile.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.profile.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90">
                    <Camera className="w-3 h-3 text-primary-foreground" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{t('settings.profile.avatar')}</h4>
                  <p className="text-sm text-muted-foreground">{t('settings.profile.changeAvatar')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('settings.profile.username')}</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    {t('settings.profile.usernameHelp')}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_name">{t('settings.profile.displayName')}</Label>
                  <Input
                    id="display_name"
                    value={profile.display_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, display_name: e.target.value }))}
                    placeholder={t('settings.profile.displayNamePlaceholder')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">{t('settings.profile.bio')}</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder={t('settings.profile.bioPlaceholder')}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="github">{t('settings.profile.github')}</Label>
                  <Input
                    id="github"
                    value={profile.github_url}
                    onChange={(e) => setProfile(prev => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">{t('settings.profile.linkedin')}</Label>
                  <Input
                    id="linkedin"
                    value={profile.linkedin_url}
                    onChange={(e) => setProfile(prev => ({ ...prev, linkedin_url: e.target.value }))}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">{t('settings.profile.website')}</Label>
                  <Input
                    id="website"
                    value={profile.website_url}
                    onChange={(e) => setProfile(prev => ({ ...prev, website_url: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="public-profile">{t('settings.profile.publicProfile')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.profile.publicProfileHelp')}
                  </p>
                </div>
                <Switch
                  id="public-profile"
                  checked={profile.is_public}
                  onCheckedChange={(checked) => setProfile(prev => ({ ...prev, is_public: checked }))}
                />
              </div>

              <Button onClick={() => updateProfile()} disabled={loading}>
                {loading ? t('common.loading') : t('common.save')}
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {t('settings.subscription.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.subscription.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('settings.subscription.currentPlan')}</p>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionTier === 'free' ? 'Free' : subscriptionTier}
                  </p>
                </div>
                <Badge variant={subscribed ? "default" : "secondary"}>
                  {subscribed ? t('settings.subscription.active') : t('settings.subscription.inactive')}
                </Badge>
              </div>
              
              {subscriptionEnd && (
                <p className="text-sm text-muted-foreground">
                  {t('settings.subscription.renewsOn')}: {new Date(subscriptionEnd).toLocaleDateString()}
                </p>
              )}

              <Button onClick={manageSubscription} variant="outline">
                {t('settings.subscription.manage')}
              </Button>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t('settings.language.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.language.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t('settings.language.current')}</p>
                  <p className="text-sm text-muted-foreground">
                    {i18n.language === 'en' ? 'English' : 'Español'}
                  </p>
                </div>
                <LanguageSwitcher />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t('settings.notifications.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.notifications.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>{t('settings.notifications.dailyChallenge')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.dailyChallengeHelp')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>{t('settings.notifications.achievements')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.achievementsHelp')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>{t('settings.notifications.streakReminders')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notifications.streakRemindersHelp')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('settings.privacy.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.privacy.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  {t('settings.privacy.exportData')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  {t('settings.privacy.downloadData')}
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-destructive">
                  {t('settings.privacy.dangerZone')}
                </h4>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('settings.privacy.deleteAccount')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;