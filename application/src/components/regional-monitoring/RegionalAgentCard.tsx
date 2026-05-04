
import React from "react";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, Wifi, WifiOff, MoreVertical, Trash2, Terminal, Copy } from "lucide-react";
import { RegionalService } from "@/types/regional.types";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface RegionalAgentCardProps {
  agent: RegionalService;
  on删除: () => void;
}

export const RegionalAgentCard: React.FC<RegionalAgentCardProps> = ({ agent, on删除 }) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  // Check if this is the default agent that cannot be removed
  const isDefaultAgent = agent.agent_id === "1" || agent.region_name === "Default";

  const copyAgentId = async () => {
    try {
      await navigator.clipboard.writeText(agent.agent_id);
      toast({
        title: t('copied'),
        description: t('copied描述'),
      });
    } catch (error) {
      toast({
        title: t('copyFailed'),
        description: t('copyFailed描述'),
        variant: "destructive",
      });
    }
  };

  const getConnection状态 = () => {
    if (agent.connection === 'online') {
      return {
        icon: <Wifi class名称="h-4 w-4" />,
        label: t('online'),
        variant: 'default' as const,
        class名称: 'bg-green-100 text-green-800 hover:bg-green-100'
      };
    } else {
      return {
        icon: <WifiOff class名称="h-4 w-4" />,
        label: t('offline'),
        variant: 'secondary' as const,
        class名称: 'bg-red-100 text-red-800 hover:bg-red-100'
      };
    }
  };

  const connection状态 = getConnection状态();

  return (
    <Card class名称="relative">
      <CardHeader class名称="pb-3">
        <div class名称="flex items-start justify-between">
          <div class名称="flex items-center space-x-2">
            <MapPin class名称="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle class名称="text-lg flex items-center gap-2">
                {agent.region_name}
                {isDefaultAgent && (
                  <Badge variant="outline" class名称="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {t('defaultBadge')}
                  </Badge>
                )}
              </CardTitle>
              <Card描述 class名称="flex items-center gap-1 text-sm">
                {agent.agent_ip_address}
              </Card描述>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical class名称="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={copyAgentId}>
                <Copy class名称="mr-2 h-4 w-4" />
                {t('copyAgentId')}
              </DropdownMenuItem>
              {!isDefaultAgent && (
                <DropdownMenuItem onClick={on删除} class名称="text-red-600">
                  <Trash2 class名称="mr-2 h-4 w-4" />
                  {t('removeAgent')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent class名称="space-y-4">
        <div class名称="flex items-center justify-between">
          <Badge 
            variant={connection状态.variant}
            class名称={connection状态.class名称}
          >
            {connection状态.icon}
            <span class名称="ml-1">{connection状态.label}</span>
          </Badge>
          
          <Badge variant="outline" class名称="text-xs">
            {agent.status}
          </Badge>
        </div>
        
        <div class名称="space-y-2">
          <div class名称="flex justify-between text-sm">
            <span class名称="text-muted-foreground">{t('agentId')}</span>
            <span class名称="font-mono text-xs">{agent.agent_id.substring(0, 12)}...</span>
          </div>
          
          <div class名称="flex justify-between text-sm">
            <span class名称="text-muted-foreground">{t('lastUpdated')}</span>
            <span class名称="text-xs">
              {formatDistanceToNow(new Date(agent.updated), { addSuffix: true })}
            </span>
          </div>
        </div>
        
        {agent.connection === 'online' && (
          <div class名称="pt-2 border-t">
            <div class名称="flex items-center text-xs text-green-600">
              <div class名称="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
              {t('active监控ing')}
            </div>
          </div>
        )}
        
        {agent.connection === 'offline' && (
          <div class名称="pt-2 border-t">
            <div class名称="flex items-center text-xs text-red-600">
              <div class名称="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
              {t('connectionLost')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};