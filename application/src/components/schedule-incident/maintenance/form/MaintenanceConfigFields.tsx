
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  PriorityField,
  状态Field,
  ImpactLevelField,
  AssignedUsersField
} from './config';

export const MaintenanceConfigFields = () => {
  const { t } = useLanguage();
  
  return (
    <div class名称="space-y-6">
      <div class名称="text-sm font-medium">{t('configuration设置')}</div>
      
      <div class名称="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PriorityField />
        <状态Field />
      </div>

      <div class名称="grid grid-cols-1 gap-4">
        <ImpactLevelField />
      </div>
      
      <div class名称="grid grid-cols-1 gap-6 mt-4">
        <AssignedUsersField />
      </div>
    </div>
  );
};
