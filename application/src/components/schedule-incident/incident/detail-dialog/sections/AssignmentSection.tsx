
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IncidentItem } from '@/services/incident';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/services/userService';
import { getUserInitials } from './utils';

interface AssignmentSectionProps {
  incident: IncidentItem | null;
  assignedUser?: User | null;
}

export const AssignmentSection: React.FC<AssignmentSectionProps> = ({ incident, assignedUser }) => {
  const { t } = useLanguage();
  
  if (!incident) return null;
  
  return (
    <div class名称="space-y-2">
      <h3 class名称="font-semibold text-lg">{t('assignment')}</h3>
      
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
  );
};

