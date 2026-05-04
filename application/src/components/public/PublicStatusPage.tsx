
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { usePublic状态PageData } from './hooks/usePublic状态PageData';
import { 状态PageHeader } from './状态PageHeader';
import { Current状态Section } from './Current状态Section';
import { Components状态Section } from './Components状态Section';
import { OverallUptimeSection } from './OverallUptimeSection';
import { Public状态PageFooter } from './Public状态PageFooter';
import { useLanguage } from '@/contexts/LanguageContext';

export const Public状态Page = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
//  console.log('Public状态Page - slug from params:', slug);
  
  const { page, components, services, uptimeData, loading, error } = usePublic状态PageData(slug);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // The usePublic状态PageData hook handles data refetching
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (page) {
      const root = document.documentElement;
      
      // 移除 any existing theme classes
      root.classList.remove('dark', 'light');
      
      // Apply the selected theme
      if (page.theme === 'dark') {
        root.classList.add('dark');
      } else if (page.theme === 'light') {
        root.classList.add('light');
      }
      // For 'default' theme, don't add any class (uses system preference)
    }
    
    // Cleanup on unmount
    return () => {
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
    };
  }, [page?.theme]);

 // console.log('Public状态Page state:', { loading, error, page: !!page, components: components.length, services: services.length });

  if (loading) {
    return (
      <div class名称="min-h-screen bg-background flex items-center justify-center">
        <div class名称="text-center space-y-4">
          <div class名称="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <div class名称="space-y-2">
            <p class名称="text-lg font-medium text-foreground">{t('loading状态Page', 'public')}</p>
            <p class名称="text-sm text-muted-foreground">{t('fetchingRealtime状态', 'public')}</p>
            <p class名称="text-xs text-muted-foreground">{t('slugLabel', 'public')}: {slug || 'No slug provided'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div class名称="min-h-screen bg-background flex items-center justify-center">
        <div class名称="text-center space-y-6 max-w-md">
          <div class名称="mx-auto h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertCircle class名称="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div class名称="space-y-2">
            <h1 class名称="text-2xl font-bold text-foreground">{t('statusPageNotFound', 'public')}</h1>
            <p class名称="text-muted-foreground">
              {error || t('notFound描述', 'public')}
            </p>
            <p class名称="text-xs text-muted-foreground">{t('slugLabel', 'public')}: {slug || 'No slug provided'}</p>
          </div>
          <div class名称="flex gap-3 justify-center">
            <Button onClick={() => window.history.back()} variant="outline">
              {t('go返回', 'public')}
            </Button>
            <Button onClick={() => window.location.reload()} class名称="gap-2">
              <RefreshCw class名称="h-4 w-4" />
              {t('retry', 'public')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class名称="min-h-screen bg-background text-foreground">
      {/* Header */}
      <状态PageHeader page={page} />

      {/* Main Content */}
      <main class名称="max-w-4xl mx-auto px-4 py-8">
        {/* Current 状态 */}
        <Current状态Section page={page} components={components} services={services} />

        {/* Components 状态 */}
        <Components状态Section 
          components={components} 
          services={services} 
          uptimeData={uptimeData} 
        />

        {/* Overall Uptime History */}
        <OverallUptimeSection uptimeData={uptimeData} />

        {/* Footer */}
        <Public状态PageFooter page={page} />
      </main>

      {/* Custom CSS */}
      {page.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: page.custom_css }} />
      )}
    </div>
  );
};