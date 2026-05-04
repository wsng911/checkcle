
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./types";
import { useQuery } from "@tanstack/react-query";
import { regionalService } from "@/services/regionalService";
import { MapPin, Loader2, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext.tsx";

interface ServiceRegionalFieldsProps {
  form: UseFormReturn<ServiceFormData>;
}

export function ServiceRegionalFields({ form }: ServiceRegionalFieldsProps) {
	const { t } = useLanguage();
  const regional监控ingEnabled = form.watch("regional监控ingEnabled");
  const currentRegionalAgents = form.watch("regionalAgents") || [];

  const { data: regionalAgents = [], isLoading } = useQuery({
    queryKey: ['regional-services'],
    queryFn: regionalService.getRegional服务,
    enabled: regional监控ingEnabled,
  });

  // Filter only online agents and exclude the default localhost agent (ID 1)
  const onlineAgents = regionalAgents.filter(agent => 
    agent.connection === 'online' && agent.agent_id !== "1"
  );

  // Get available agents (not already selected)
  const availableAgents = onlineAgents.filter(agent => 
    !currentRegionalAgents.includes(`${agent.region_name}|${agent.agent_id}`)
  );

  // Get agent display name
  const getAgentDisplay名称 = (agentValue: string) => {
    const [region名称, agentId] = agentValue.split("|");
    const agent = onlineAgents.find(agent => 
      `${agent.region_name}|${agent.agent_id}` === agentValue
    );
    
    if (agent) {
      return `${agent.region_name} (${agent.agent_ip_address})`;
    }
    
    // If agent is not found in online agents, it might be offline but still assigned
    if (region名称 && agentId) {
      return `${region名称} (Agent ${agentId}) - Offline`;
    }
    
    return agentValue;
  };

  // 添加 regional agent
  const addRegionalAgent = (agentValue: string) => {
    if (agentValue && agentValue !== "select") {
      const currentAgents = form.getValues("regionalAgents") || [];
      if (!currentAgents.includes(agentValue)) {
        form.setValue("regionalAgents", [...currentAgents, agentValue]);
      }
    }
  };

  // 移除 regional agent
  const removeRegionalAgent = (agentValue: string) => {
    const currentAgents = form.getValues("regionalAgents") || [];
    form.setValue("regionalAgents", currentAgents.filter(agent => agent !== agentValue));
  };

  return (
    <div class名称="space-y-4">
      <FormField
        control={form.control}
        name="regional监控ingEnabled"
        render={({ field }) => (
          <FormItem class名称="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class名称="space-y-0.5">
              <FormLabel class名称="text-base font-medium flex items-center gap-2">
                <MapPin class名称="h-4 w-4" />
	              {t("regional监控ing")}
              </FormLabel>
              <div class名称="text-sm text-muted-foreground">
	              {t("regional监控ingDesc")}
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value || false}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  // Clear agents when disabling regional monitoring
                  if (!checked) {
                    form.setValue("regionalAgents", []);
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {regional监控ingEnabled && (
        <FormField
          control={form.control}
          name="regionalAgents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("regionalAgents")}</FormLabel>
              
              {/* Display selected agents */}
              {currentRegionalAgents.length > 0 && (
                <div class名称="flex flex-wrap gap-2 mb-3">
                  {currentRegionalAgents.map((agentValue) => (
                    <Badge key={agentValue} variant="secondary" class名称="flex items-center gap-2">
                      <div class名称="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span class名称="text-sm">{getAgentDisplay名称(agentValue)}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        class名称="h-4 w-4 p-0 ml-1"
                        onClick={() => removeRegionalAgent(agentValue)}
                      >
                        <X class名称="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* 添加 new agent selector */}
              <Select 
                onValueChange={addRegionalAgent}
                value="select"
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      isLoading 
                        ? t("regionalAgentsLoading")
                        : availableAgents.length > 0 
                          ? t("regionalAgentsAvailablePlaceholder")
                          : currentRegionalAgents.length > 0 
                            ? t("regionalAgentsAllSelected")
                            : t("regionalAgentsNoAvailable")
                    } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      <div class名称="flex items-center gap-2">
                        <Loader2 class名称="h-4 w-4 animate-spin" />
	                      t("regionalAgentsLoading")
                      </div>
                    </SelectItem>
                  ) : availableAgents.length === 0 ? (
                    <SelectItem value="no-agents" disabled>
                      {currentRegionalAgents.length > 0 
                        ? t("regionalAgentsAllSelected")
                        : t("regionalAgentsNoOnlineAvailable")
                      }
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value="select" disabled>
                        <div class名称="flex items-center gap-2">
                          <Plus class名称="h-4 w-4 text-muted-foreground" />
                          <span class名称="text-muted-foreground">Select an agent to add...</span>
                        </div>
                      </SelectItem>
                      {availableAgents.map((agent) => (
                        <SelectItem key={agent.id} value={`${agent.region_name}|${agent.agent_id}`}>
                          <div class名称="flex items-center gap-2">
                            <div class名称="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span class名称="font-medium">{agent.region_name}</span>
                            <span class名称="text-muted-foreground">({agent.agent_ip_address})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
              
              <FormMessage />
              
              {regional监控ingEnabled && onlineAgents.length === 0 && !isLoading && (
                <p class名称="text-sm text-amber-600">
	                {t("regionalAgentsNotFoundMessage")}
                </p>
              )}
              
              {currentRegionalAgents.length === 0 && regional监控ingEnabled && (
                <p class名称="text-sm text-orange-600">
	                {t("regionalAgentsNotSelectedMessage")}
                </p>
              )}
              
              {currentRegionalAgents.length > 0 && (
                <p class名称="text-sm text-green-600">
                  Service assigned to {currentRegionalAgents.length} regional agent{currentRegionalAgents.length > 1 ? 's' : ''}.
                </p>
              )}
            </FormItem>
          )}
        />
      )}
    </div>
  );
}