
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IncidentItem } from '@/services/incident';
import { User } from '@/services/userService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Incident状态Badge } from '../../Incident状态Badge';
import { getUserInitials } from './utils';

interface BasicInfoSectionProps {
  incident: IncidentItem | null;
  assignedUser?: User | null;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ incident, assignedUser }) => {
  const { t } = useLanguage();
  
  if (!incident) return null;
  
  return (
    <div class名称="space-y-2 print-compact-text">
      <h3 class名称="font-semibold text-lg">{t('basicInfo')}</h3>
      
      <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4 print-grid">
        <div>
          <h4 class名称="text-sm font-medium text-muted-foreground">{t('title')}</h4>
          <p class名称="mt-1">{incident.title || '-'}</p>
        </div>
        
        <div>
          <h4 class名称="text-sm font-medium text-muted-foreground">{t('status')}</h4>
          <div class名称="mt-1">
            <Incident状态Badge status={incident.status || incident.impact_status || 'investigating'} />
          </div>
        </div>
        
        <div>
          <h4 class名称="text-sm font-medium text-muted-foreground">{t('serviceId')}</h4>
          <p class名称="mt-1">{incident.service_id || '-'}</p>
        </div>
        
        <div>
          <h4 class名称="text-sm font-medium text-muted-foreground">{t('assignedTo')}</h4>
          <div class名称="mt-1">
            {assignedUser ? (
              <div class名称="flex items-center gap-2">
                <Avatar class名称="h-6 w-6">
                  <AvatarImage src={assignedUser.avatar} alt={assignedUser.full_name || assignedUser.username} />
                  <AvatarFallback>{getUserInitials(assignedUser)}</AvatarFallback>
                </Avatar>
                <span>{assignedUser.full_name || assignedUser.username}</span>
              </div>
            ) : (incident.assigned_users || incident.assigned_to) ? (
              <span>{incident.assigned_users || incident.assigned_to}</span>
            ) : (
              <span class名称="text-muted-foreground italic">{t('unassigned')}</span>
            )}
          </div>
        </div>
      </div>
        
      <div class名称="mt-2">
        <h4 class名称="text-sm font-medium text-muted-foreground">{t('description')}</h4>
        <p class名称="mt-1 whitespace-pre-line print-description">{incident.description || '-'}</p>
      </div>
    </div>
  );
};

