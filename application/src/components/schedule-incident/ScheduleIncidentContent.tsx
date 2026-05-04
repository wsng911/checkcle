
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, CalendarClock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScheduledMaintenanceTab } from "./ScheduledMaintenanceTab";
import { IncidentManagementTab } from "./IncidentManagementTab";
import { 创建MaintenanceDialog } from './maintenance/创建MaintenanceDialog';
import { 创建IncidentDialog } from './incident/创建IncidentDialog';
import { useToast } from '@/hooks/use-toast';
import { initMaintenanceNotifications, stopMaintenanceNotifications } from '@/services/maintenance/maintenanceNotificationService';

export const ScheduleIncidentContent = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("maintenance");
  const [createMaintenanceDialogOpen, set创建MaintenanceDialogOpen] = useState(false);
  const [createIncidentDialogOpen, set创建IncidentDialogOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [incidentRefreshTrigger, setIncidentRefreshTrigger] = useState(0);

  // Initialize maintenance notifications when the component mounts
  useEffect(() => {
   // console.log("Initializing maintenance notifications");
    initMaintenanceNotifications();
    
    // Clean up when the component unmounts
    return () => {
     // console.log("Cleaning up maintenance notifications");
      stopMaintenanceNotifications();
    };
  }, []);

  const handle创建ButtonClick = () => {
    if (activeTab === "maintenance") {
      set创建MaintenanceDialogOpen(true);
    } else {
      set创建IncidentDialogOpen(true);
    }
  };

  const handleMaintenance创建d = () => {
    // Refresh data by incrementing the refresh trigger
    const newTriggerValue = refreshTrigger + 1;
   // console.log("Maintenance created, refreshing data with new trigger value:", newTriggerValue);
    setRefreshTrigger(newTriggerValue);
    
    // Show success toast
    toast({
      title: t('success'),
      description: t('maintenance创建dSuccess'),
    });
  };

  const handleIncident创建d = () => {
    // Refresh data by incrementing the refresh trigger
    const newTriggerValue = incidentRefreshTrigger + 1;
   // console.log("Incident created, refreshing data with new trigger value:", newTriggerValue);
    setIncidentRefreshTrigger(newTriggerValue);
    
    // Show success toast
    toast({
      title: t('success'),
      description: t('incident创建dSuccess'),
    });
  };

  return (
    <main class名称="flex-1 flex flex-col overflow-auto bg-background p-6">
      <div class名称="flex flex-col gap-6">
        <div class名称="flex justify-between items-center">
          <h2 class名称="text-2xl font-bold text-foreground">
            {t('scheduleIncidentManagement')}
          </h2>
          <Button 
            class名称="text-primary-foreground"
            onClick={handle创建ButtonClick}
          >
            <Plus class名称="w-4 h-4 mr-2" /> 
            {activeTab === "maintenance" ? t('createMaintenanceWindow') : t('createIncident')}
          </Button>
        </div>
        
        <Tabs 
          defaultValue="maintenance" 
          class名称="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList class名称="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="maintenance">
              <CalendarClock class名称="w-4 h-4 mr-2" />
              {t('scheduledMaintenance')}
            </TabsTrigger>
            <TabsTrigger value="incidents">
              <AlertCircle class名称="w-4 h-4 mr-2" />
              {t('incidentManagement')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="maintenance" class名称="space-y-4">
            <ScheduledMaintenanceTab refreshTrigger={refreshTrigger} />
          </TabsContent>
          
          <TabsContent value="incidents" class名称="space-y-4">
            <IncidentManagementTab refreshTrigger={incidentRefreshTrigger} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Maintenance creation dialog */}
      <创建MaintenanceDialog 
        open={createMaintenanceDialogOpen}
        onOpenChange={set创建MaintenanceDialogOpen}
        onMaintenance创建d={handleMaintenance创建d}
      />

      {/* Incident creation dialog */}
      <创建IncidentDialog 
        open={createIncidentDialogOpen}
        onOpenChange={set创建IncidentDialogOpen}
        onIncident创建d={handleIncident创建d}
      />
    </main>
  );
};
