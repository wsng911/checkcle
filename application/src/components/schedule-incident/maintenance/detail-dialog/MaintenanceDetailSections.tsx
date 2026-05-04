
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MaintenanceItem } from '@/services/types/maintenance.types';
import { User } from '@/services/userService';

interface MaintenanceDetailSectionsProps {
  maintenance: MaintenanceItem;
  assignedUsers: User[];
}

export const MaintenanceDetailSections = ({ 
  maintenance, 
  assignedUsers 
}: MaintenanceDetailSectionsProps) => {
  const { t } = useLanguage();

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP p');
    } catch (error) {
      return dateString;
    }
  };

  const calculateDuration = (start: string, end: string): string => {
    try {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const durationMs = endTime.getTime() - startTime.getTime();
      
      // Convert to hours and minutes
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours === 0) {
        return `${minutes}m`;
      } else if (minutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h ${minutes}m`;
      }
    } catch (error) {
      return "N/A";
    }
  };
  
  const affected服务 = typeof maintenance.affected === 'string' 
    ? maintenance.affected.split(',').map(item => item.trim())
    : [];

  return (
    <div class名称="space-y-4 print:space-y-1 print-compact-spacing">
      {/* Print Header - Only visible when printing */}
      <div class名称="hidden print:block print-section">
        <div class名称="header-print bg-blue-800 text-white p-4 rounded-t-md">
          <div class名称="flex justify-between">
            <div>
              <h1 class名称="text-xl font-bold">Scheduled Maintenance Report</h1>
              <p class名称="text-blue-100 mt-1 print-compact-text">{maintenance.title}</p>
            </div>
            <div class名称="text-right">
              <p class名称="text-xs text-blue-100">Reference ID: {maintenance.id}</p>
              <p class名称="text-xs text-blue-100">Generated on {format(new Date(), 'PPP')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reference ID - Only visible in UI */}
      <div class名称="flex items-center justify-between text-sm print:hidden">
        <span class名称="text-muted-foreground">{t('referenceID')}</span>
        <span class名称="font-mono bg-muted px-2 py-1 rounded">{maintenance.id}</span>
      </div>
      
      {/* 描述 Section */}
      <div class名称="print:mt-0 print-section">
        <h4 class名称="text-sm font-medium text-muted-foreground mb-2 print:text-xs print:font-bold print:text-blue-800">{t('description')}</h4>
        <div class名称="bg-muted/50 p-3 rounded-md text-sm whitespace-pre-wrap print:bg-transparent print:border print:border-gray-200 print:p-1 print:rounded print:text-xs print:text-black print-description">
          {maintenance.description || t('no描述Provided')}
        </div>
      </div>
      
      <Separator class名称="print:hidden" />
      
      {/* Time Information */}
      <div class名称="print-section">
        <h4 class名称="text-sm font-medium text-muted-foreground mb-2 print:text-xs print:font-bold print:text-blue-800">{t('timeInformation')}</h4>
        <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-1 print:bg-gray-50 print:border print:border-gray-200 print:p-1 print:rounded print-compact-text">
          <div>
            <h4 class名称="text-sm font-medium text-muted-foreground mb-1 print:text-xs print:text-blue-700 print:mb-0">{t('scheduledStart')}</h4>
            <p class名称="text-sm print:text-xs print:text-black print-smaller-font">{formatDateTime(maintenance.start_time)}</p>
          </div>
          <div>
            <h4 class名称="text-sm font-medium text-muted-foreground mb-1 print:text-xs print:text-blue-700 print:mb-0">{t('scheduledEnd')}</h4>
            <p class名称="text-sm print:text-xs print:text-black print-smaller-font">{formatDateTime(maintenance.end_time)}</p>
          </div>
          <div>
            <h4 class名称="text-sm font-medium text-muted-foreground mb-1 print:text-xs print:text-blue-700 print:mb-0">{t('duration')}</h4>
            <p class名称="text-sm print:text-xs print:text-black print-smaller-font">{calculateDuration(maintenance.start_time, maintenance.end_time)}</p>
          </div>
          <div>
            <h4 class名称="text-sm font-medium text-muted-foreground mb-1 print:text-xs print:text-blue-700 print:mb-0">{t('maintenanceType')}</h4>
            <p class名称="text-sm print:text-xs print:text-black print-smaller-font capitalize">{maintenance.field}</p>
          </div>
        </div>
      </div>
      
      <Separator class名称="print:hidden" />
      
      {/* Affected 服务 */}
      <div class名称="print-section">
        <h4 class名称="text-sm font-medium text-muted-foreground mb-2 print:text-xs print:font-bold print:text-blue-800">{t('affected服务')}</h4>
        <div class名称="print:border print:border-gray-200 print:p-1 print:rounded">
          {affected服务.length > 0 ? (
            <div class名称="flex flex-wrap gap-2 print:gap-1">
              {affected服务.map((service, index) => (
                <Badge key={index} variant="outline" class名称="badge-print print:bg-blue-50 print:text-blue-800 print:border print:border-blue-200">
                  {service}
                </Badge>
              ))}
            </div>
          ) : (
            <span class名称="text-sm text-muted-foreground print:text-xs print:text-black">{t('noAffected服务')}</span>
          )}
        </div>
      </div>
      
      {/* Assigned Users - Simplified for print */}
      <div class名称="print-section">
        <h4 class名称="text-sm font-medium text-muted-foreground mb-2 print:text-xs print:font-bold print:text-blue-800">{t('assignedPersonnel')}</h4>
        <div class名称="border border-border rounded-md p-3 print:border print:border-gray-200 print:p-1 print:rounded print:bg-gray-50">
          {assignedUsers && assignedUsers.length > 0 ? (
            <div class名称="print:grid print:grid-cols-2 print:gap-1">
              {assignedUsers.map((user) => (
                <div key={user.id} class名称="flex items-center gap-2 p-2 bg-muted/30 rounded-md print:bg-transparent print:p-0 print:text-xs">
                  <div class名称="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium print:bg-blue-100 print:text-blue-800 print:w-4 print:h-4">
                    {user && (user.full_name?.[0] || user.username?.[0] || 'U').toUpperCase()}
                  </div>
                  <span class名称="print:text-xs print:font-medium print:text-black print-smaller-font">{user.full_name || user.username}</span>
                </div>
              ))}
            </div>
          ) : (
            <span class名称="text-sm text-muted-foreground print:text-xs print:text-black">{t('noAssignedUsers')}</span>
          )}
        </div>
      </div>
      
      <Separator class名称="print:hidden" />
      
      {/* Metadata - Condensed for print */}
      <div class名称="print-section">
        <h4 class名称="text-sm font-medium text-muted-foreground mb-2 print:text-xs print:font-bold print:text-blue-800">{t('additionalInformation')}</h4>
        <div class名称="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm print:grid-cols-2 print:gap-1 print:bg-gray-50 print:border print:border-gray-200 print:p-1 print:rounded print-compact-text">
          <div>
            <h4 class名称="font-medium text-muted-foreground mb-0 print:text-xs print:text-blue-700">{t('createdBy')}</h4>
            <p class名称="print:text-xs print:text-black print-smaller-font">{maintenance.created_by || t('notSpecified')}</p>
          </div>
          <div>
            <h4 class名称="font-medium text-muted-foreground mb-0 print:text-xs print:text-blue-700">{t('notificationChannel')}</h4>
            <p class名称="print:text-xs print:text-black print-smaller-font">{maintenance.notification_channel_name || t('notSpecified')}</p>
          </div>
          <div>
            <h4 class名称="font-medium text-muted-foreground mb-0 print:text-xs print:text-blue-700">{t('created')}</h4>
            <p class名称="print:text-xs print:text-black print-smaller-font">{formatDateTime(maintenance.created)}</p>
          </div>
          <div>
            <h4 class名称="font-medium text-muted-foreground mb-0 print:text-xs print:text-blue-700">{t('lastUpdated')}</h4>
            <p class名称="print:text-xs print:text-black print-smaller-font">{formatDateTime(maintenance.updated)}</p>
          </div>
        </div>
      </div>
      
      {/* Notification 设置 - Simplified for print */}
      <div class名称="text-sm bg-muted/50 p-3 rounded-md print:bg-blue-50 print:border print:border-blue-200 print:p-1 print:rounded print-section print-compact-text">
        <h4 class名称="font-medium mb-1 print:text-xs print:font-bold print:text-blue-800 print:mb-0">{t('notification设置')}</h4>
        <p class名称="print:text-xs print:text-black print-smaller-font">
          {maintenance.notify_subscribers === 'yes' 
            ? t('subscribersWillBeNotified') 
            : t('noNotifications')}
        </p>
      </div>
      
      {/* Print Footer - Only visible when printing */}
      <div class名称="hidden print:block footer-print border-t border-gray-200 text-xs text-gray-500">
        <div class名称="flex justify-between">
          <span>Maintenance ID: {maintenance.id}</span>
          <span>Printed on {format(new Date(), 'PPP')}</span>
        </div>
        <p class名称="mt-1 text-center">This document is confidential and intended for internal use only.</p>
      </div>
    </div>
  );
};
