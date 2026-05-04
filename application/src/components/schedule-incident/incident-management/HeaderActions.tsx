
import React from 'react';
import { Card描述, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Header操作Props {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Header操作: React.FC<Header操作Props> = ({ onRefresh, isRefreshing }) => {
  const { t } = useLanguage();
  
  return (
    <div class名称="flex flex-row items-center justify-between">
      <div>
        <CardTitle>{t('incidentManagement')}</CardTitle>
        <Card描述>
          {t('incidentsManagementDesc')}
        </Card描述>
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onRefresh} 
        class名称="ml-auto"
        title={t('refreshData')}
        disabled={isRefreshing}
      >
        <RefreshCw class名称={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span class名称="sr-only">{t('refresh')}</span>
      </Button>
    </div>
  );
};
