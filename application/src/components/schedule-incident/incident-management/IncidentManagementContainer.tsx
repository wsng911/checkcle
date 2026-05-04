
import React, { useState, useCallback, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIncidentData } from '../hooks/useIncidentData';
import { IncidentItem } from '@/services/incident';
import { useToast } from '@/hooks/use-toast';
import { 概览Cards } from './概览Cards';
import { Header操作 } from './Header操作';
import { TabContent } from './TabContent';
import { LoadingState } from '@/components/services/LoadingState';
import { IncidentDetailDialog } from '../incident/detail-dialog/IncidentDetailDialog';

interface IncidentManagementContainerProps {
  refreshTrigger?: number;
}

export const IncidentManagementContainer: React.FC<IncidentManagementContainerProps> = ({ 
  refreshTrigger = 0 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [manualRefresh, setManualRefresh] = useState(0);
  
  // Use a ref to debounce multiple refresh requests
  const refreshTimerRef = useRef<number | null>(null);
  
  // Combine the external refresh trigger with our internal one
  const combinedRefreshTrigger = refreshTrigger + manualRefresh;
  
  const { 
    filter, 
    setFilter, 
    incidentData, 
    overviewStats, 
    isEmpty,
    loading,
    error,
    initialized,
    isRefreshing
  } = useIncidentData({ refreshTrigger: combinedRefreshTrigger });

  // Handle incident updates with debouncing
  const handleIncidentUpdated = useCallback(() => {
    console.log('Incident updated, triggering refresh');
    
    // Clear any existing timer
    if (refreshTimerRef.current !== null) {
      window.clearTimeout(refreshTimerRef.current);
    }
    
    // Set a new timer to debounce multiple quick updates
    refreshTimerRef.current = window.setTimeout(() => {
      setManualRefresh(prev => prev + 1);
      refreshTimerRef.current = null;
      
      toast({
        title: t('incidentUpdated'),
        description: t('incidentUpdateSuccess'),
      });
    }, 300);
    
  }, [t, toast]);

  // Handle tab changes
  const handleTabChange = useCallback((value: string) => {
    console.log(`Tab changed to: ${value}`);
    setFilter(value);
  }, [setFilter]);

  // Handle view incident details
  const handleViewIncidentDetails = useCallback((incident: IncidentItem) => {
    setSelectedIncident(incident);
    setDetailDialogOpen(true);
  }, []);

  // Handle manual refresh
  const handleManualRefresh = useCallback(() => {
    console.log('Manual refresh triggered by user');
    setManualRefresh(prev => prev + 1);
  }, []);

  // Handle detail dialog close with refresh
  const handleDetailDialog关闭 = useCallback((open: boolean) => {
    setDetailDialogOpen(open);
    if (!open) {
      // When dialog closes, refresh data
      handleManualRefresh();
    }
  }, [handleManualRefresh]);

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (refreshTimerRef.current !== null) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  // Show full-page loading state during initial load
  if (loading && !initialized) {
    return <LoadingState />;
  }

  return (
    <>
      {/* 概览 Cards */}
      <概览Cards 
        overviewStats={overviewStats} 
        loading={loading} 
        initialized={initialized} 
      />

      <Card>
        <CardHeader>
          <Header操作 
            onRefresh={handleManualRefresh} 
            isRefreshing={isRefreshing} 
          />
        </CardHeader>
        <CardContent>
          <Tabs value={filter} class名称="w-full" onValueChange={handleTabChange}>
            <TabsList class名称="mb-6">
              <TabsTrigger value="unresolved">{t('unresolvedIncidents')}</TabsTrigger>
              <TabsTrigger value="resolved">{t('resolvedIncidents')}</TabsTrigger>
            </TabsList>

            <TabsContent value="unresolved" class名称="space-y-4">
              <TabContent 
                error={error}
                isEmpty={isEmpty}
                data={incidentData}
                loading={loading}
                initialized={initialized}
                isRefreshing={isRefreshing}
                onIncidentUpdated={handleIncidentUpdated}
                onViewDetails={handleViewIncidentDetails}
                onRefresh={handleManualRefresh}
              />
            </TabsContent>
            
            <TabsContent value="resolved" class名称="space-y-4">
              <TabContent 
                error={error}
                isEmpty={isEmpty}
                data={incidentData}
                loading={loading}
                initialized={initialized}
                isRefreshing={isRefreshing}
                onIncidentUpdated={handleIncidentUpdated}
                onViewDetails={handleViewIncidentDetails}
                onRefresh={handleManualRefresh}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Incident Detail Dialog */}
      <IncidentDetailDialog 
        open={detailDialogOpen}
        onOpenChange={handleDetailDialog关闭}
        incident={selectedIncident}
      />
    </>
  );
};
