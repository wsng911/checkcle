
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MapPin, Activity, Wifi, WifiOff } from "lucide-react";
import { regionalService } from "@/services/regionalService";
import { RegionalService } from "@/types/regional.types";
import { 添加RegionalAgentDialog } from "./添加RegionalAgentDialog";
import { RegionalAgentCard } from "./RegionalAgentCard";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const Regional监控ingContent = () => {
  const { t } = useLanguage();
  const [addDialogOpen, set添加DialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: regional服务 = [], isLoading, error } = useQuery({
    queryKey: ['regional-services'],
    queryFn: regionalService.getRegional服务,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleAgent添加ed = () => {
    queryClient.invalidateQueries({ queryKey: ['regional-services'] });
    toast({
      title: t('regionalAgent添加ed'),
      description: t('regionalAgent添加edDesc'),
    });
  };

  const handle删除Agent = async (id: string) => {
    try {
      await regionalService.deleteRegionalService(id);
      queryClient.invalidateQueries({ queryKey: ['regional-services'] });
      toast({
        title: t('agent移除d'),
        description: t('agent移除dDesc'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failedTo移除Agent'),
        variant: "destructive",
      });
    }
  };

  const onlineAgents = regional服务.filter(agent => agent.connection === 'online').length;
  const totalAgents = regional服务.length;

  return (
    <div class名称="p-6 space-y-6">
      <div class名称="flex justify-between items-center">
        <div>
          <h1 class名称="text-3xl font-bold tracking-tight">{t('regionalmonitoring')}</h1>
          <p class名称="text-muted-foreground">
            {t('descriptRegionPage')}
          </p>
        </div>
        <Button onClick={() => set添加DialogOpen(true)}>
          <Plus class名称="mr-2 h-4 w-4" />
          {t('addRegionalAgent')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div class名称="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader class名称="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class名称="text-sm font-medium">{t('totalAgents')}</CardTitle>
            <MapPin class名称="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class名称="text-2xl font-bold">{totalAgents}</div>
            <p class名称="text-xs text-muted-foreground">
              {t('regional监控ingAgents')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class名称="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class名称="text-sm font-medium">{t('onlineAgents')}</CardTitle>
            <Wifi class名称="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div class名称="text-2xl font-bold text-green-600">{onlineAgents}</div>
            <p class名称="text-xs text-muted-foreground">
              {t('currentlyConnected')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class名称="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class名称="text-sm font-medium">{t('offlineAgents')}</CardTitle>
            <WifiOff class名称="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div class名称="text-2xl font-bold text-red-600">{totalAgents - onlineAgents}</div>
            <p class名称="text-xs text-muted-foreground">
              {t('disconnectedAgents')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <div class名称="space-y-4">
        <h2 class名称="text-xl font-semibold">{t('regionalAgents')}</h2>
        
        {isLoading ? (
          <div class名称="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} class名称="animate-pulse">
                <CardHeader>
                  <div class名称="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class名称="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div class名称="space-y-2">
                    <div class名称="h-3 bg-gray-200 rounded"></div>
                    <div class名称="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : regional服务.length === 0 ? (
          <Card>
            <CardContent class名称="flex flex-col items-center justify-center py-12">
              <MapPin class名称="h-12 w-12 text-muted-foreground mb-4" />
              <h3 class名称="text-lg font-semibold mb-2">{t('noRegionalAgents')}</h3>
              <p class名称="text-muted-foreground text-center mb-4">
                {t('getStarted添加Agent')}
              </p>
              <Button onClick={() => set添加DialogOpen(true)}>
                <Plus class名称="mr-2 h-4 w-4" />
                {t('addFirstAgent')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div class名称="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regional服务.map((agent) => (
              <RegionalAgentCard 
                key={agent.id} 
                agent={agent} 
                on删除={() => handle删除Agent(agent.id)}
              />
            ))}
          </div>
        )}
      </div>

      <添加RegionalAgentDialog
        open={addDialogOpen}
        onOpenChange={set添加DialogOpen}
        onAgent添加ed={handleAgent添加ed}
      />
    </div>
  );
};