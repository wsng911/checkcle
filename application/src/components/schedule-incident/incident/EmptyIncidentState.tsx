
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle } from 'lucide-react';

export const EmptyIncidentState = () => {
  const { t } = useLanguage();
  
  return (
    <div class名称="flex flex-col items-center justify-center py-12 text-gray-500">
      <AlertCircle class名称="w-12 h-12 mb-4" />
      <h3 class名称="text-lg font-medium mb-2">{t('noIncidents')}</h3>
      <p class名称="text-sm text-center max-w-md">
        {t('no服务')}
      </p>
    </div>
  );
};
