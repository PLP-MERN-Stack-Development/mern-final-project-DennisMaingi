import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useTheme } from 'next-themes';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES, SUPPORTED_TIMEZONES } from '@/lib/constants';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { preferences, updatePreferences, isUpdating } = useUserPreferences();
  const { theme, setTheme } = useTheme();

  const [locale, setLocale] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    if (!preferences) return;

    // support preferences being either an AxiosResponse or a plain object
    const pref = (preferences as any)?.data ?? preferences;

    setLocale(pref?.locale ?? 'en');
    setTimezone(pref?.timezone ?? 'UTC');
    setCurrency(pref?.currency ?? 'USD');

    if (pref?.theme) {
      setTheme(pref.theme);
    }
  }, [preferences, setTheme]);

  const handleSave = () => {
    updatePreferences({
      locale,
      timezone,
      currency,
      theme: theme || 'light',
    });
    
    // Update i18n language
    i18n.changeLanguage(locale);
    
    // Update document direction for RTL languages
    document.documentElement.dir = ['ar', 'he'].includes(locale) ? 'rtl' : 'ltr';
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updatePreferences({ theme: newTheme });
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access settings</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('settings.title')}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">{t('settings.language')}</Label>
              <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">{t('settings.timezone')}</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_TIMEZONES.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">{t('settings.currency')}</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CURRENCIES.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">{t('settings.theme')}</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('light')}
                  className="flex-1"
                >
                  {t('settings.light')}
                </Button>
                <Button
                  type="button"
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('dark')}
                  className="flex-1"
                >
                  {t('settings.dark')}</Button>
                <Button
                  type="button"
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('system')}
                  className="flex-1"
                >
                  System
                </Button>
              </div>
            </div>

            <Button onClick={handleSave} disabled={isUpdating} className="w-full">
              {isUpdating ? t('common.loading') : t('settings.save')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;