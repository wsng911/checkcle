
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarClock } from 'lucide-react';

export const EmptyMaintenanceState = () => {
  const { t } = useLanguage();
  
  return (
    <div class名称="flex flex-col items-center justify-center py-12 text-gray-500">
      <CalendarClock class名称="w-12 h-12 mb-4" />
      <h3 class名称="text-lg font-medium mb-2">{t('noScheduledMaintenance')}</h3>
      <p class名称="text-sm text-center max-w-md">
        {t('noMaintenanceWindows')}
      </p>
    </div>
  );
};
