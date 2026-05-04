
import { useEffect, useRef } from 'react';
import { maintenanceService } from '@/services/maintenance';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { MaintenanceItem } from '@/services/types/maintenance.types';
import { maintenanceNotificationService } from '@/services/maintenance/maintenanceNotificationService';

interface Maintenance状态CheckerProps {
  maintenanceData: MaintenanceItem[];
  on状态Updated: () => void;
}

export const Maintenance状态Checker = ({ 
  maintenanceData, 
  on状态Updated 
}: Maintenance状态CheckerProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const checkedItemsRef = useRef<Set<string>>(new Set());
  const notificationSentRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!maintenanceData || maintenanceData.length === 0) return;

    const checkAndUpdate状态 = async () => {
      const currentTime = new Date();
      let hasUpdates = false;

      console.log('Maintenance状态Checker: Checking status updates at', currentTime.toISOString());
      console.log('Maintenance状态Checker: Checking', maintenanceData.length, 'maintenance items');

      for (const item of maintenanceData) {
        try {
          const startTime = new Date(item.start_time);
          const endTime = new Date(item.end_time);
          const status = item.status.toLowerCase();
          
          console.log(`Maintenance状态Checker: Item ${item.id} - 状态: ${status}, Start: ${startTime.toISOString()}, End: ${endTime.toISOString()}, Current: ${currentTime.toISOString()}`);
          
          // Check if scheduled maintenance should start (become in_progress)
          if (status === 'scheduled' && currentTime >= startTime && currentTime <= endTime) {
            const checkKey = `${item.id}-started`;
            const notificationKey = `${item.id}-start-notification`;
            
            if (!checkedItemsRef.current.has(checkKey)) {
              console.log(`Maintenance状态Checker: Starting maintenance ${item.id} at ${currentTime.toISOString()}`);
              
              // Update status to in_progress first
              await maintenanceService.updateMaintenance状态(item.id, 'in_progress');
              
              // Send start notification only once
              if (!notificationSentRef.current.has(notificationKey)) {
                try {
                  await maintenanceNotificationService.sendMaintenanceNotification({
                    maintenance: item,
                    notificationType: 'start'
                  });
                  notificationSentRef.current.add(notificationKey);
                  console.log(`Maintenance状态Checker: Start notification sent for ${item.id}`);
                } catch (notificationError) {
                  console.log('Maintenance状态Checker: Start notification failed', notificationError);
                }
              }
              
              toast({
                title: t('maintenanceInProgress'),
                description: `${item.title} ${t('isNowInProgress')}`,
              });
              
              checkedItemsRef.current.add(checkKey);
              hasUpdates = true;
            }
          }
          
          // Check if in_progress maintenance should be completed
          if (status === 'in_progress' && currentTime >= endTime) {
            const checkKey = `${item.id}-completed`;
            const notificationKey = `${item.id}-end-notification`;
            
            if (!checkedItemsRef.current.has(checkKey)) {
              console.log(`Maintenance状态Checker: Completing maintenance ${item.id} at ${currentTime.toISOString()}`);
              
              // Update status to completed first
              await maintenanceService.updateMaintenance状态(item.id, 'completed');
              
              // Send completion notification only once
              if (!notificationSentRef.current.has(notificationKey)) {
                try {
                  await maintenanceNotificationService.sendMaintenanceNotification({
                    maintenance: item,
                    notificationType: 'end'
                  });
                  notificationSentRef.current.add(notificationKey);
                  console.log(`Maintenance状态Checker: Completion notification sent for ${item.id}`);
                } catch (notificationError) {
                  console.log('Maintenance状态Checker: Completion notification failed', notificationError);
                }
              }
              
              toast({
                title: t('maintenanceCompleted'),
                description: `${item.title} ${t('hasBeenCompleted')}`,
              });
              
              checkedItemsRef.current.add(checkKey);
              hasUpdates = true;
            }
          }
        } catch (error) {
          console.error('Maintenance状态Checker: Error updating status for item', item.id, error);
          // Clear the check flags after 2 minutes to allow retry
          setTimeout(() => {
            checkedItemsRef.current.delete(`${item.id}-started`);
            checkedItemsRef.current.delete(`${item.id}-completed`);
            notificationSentRef.current.delete(`${item.id}-start-notification`);
            notificationSentRef.current.delete(`${item.id}-end-notification`);
          }, 120000);
        }
      }

      if (hasUpdates) {
        console.log('Maintenance状态Checker: 状态 updates detected, triggering refresh');
        // Force immediate refresh to update the UI
        on状态Updated();
      }
    };

    // Clear the interval if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Initial check immediately
    checkAndUpdate状态();
    
    // Check every 5 seconds for immediate status updates
    intervalRef.current = window.setInterval(checkAndUpdate状态, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [maintenanceData, on状态Updated, t, toast]);

  // Clear check flags when maintenance data changes significantly
  useEffect(() => {
    const currentIds = new Set(maintenanceData.map(item => item.id));
    
    // Clean up check flags for items that no longer exist
    const keysTo删除 = Array.from(checkedItemsRef.current).filter(key => {
      const itemId = key.split('-')[0];
      return !currentIds.has(itemId);
    });
    
    keysTo删除.forEach(key => {
      checkedItemsRef.current.delete(key);
    });
    
    // Clean up notification flags for items that no longer exist
    const notificationKeysTo删除 = Array.from(notificationSentRef.current).filter(key => {
      const itemId = key.split('-')[0];
      return !currentIds.has(itemId);
    });
    
    notificationKeysTo删除.forEach(key => {
      notificationSentRef.current.delete(key);
    });
  }, [maintenanceData]);

  return null;
};