
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error,
  onRefresh,
  isRefreshing
}) => {
  const { t } = useLanguage();

  if (!error) return null;

  return (
    <div class名称="text-center py-8">
      <p class名称="text-muted-foreground mb-4">{error}</p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh}
        class名称="flex items-center gap-2"
        disabled={isRefreshing}
      >
        <RefreshCw class名称={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {t('tryAgain')}
      </Button>
    </div>
  );
};
