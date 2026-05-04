
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { regionalService } from "@/services/regionalService";
import { MapPin, Loader2, BarChart3 } from "lucide-react";

interface RegionalAgentFilterProps {
  selectedAgent: string;
  onAgentChange: (agent: string) => void;
}

export function RegionalAgentFilter({ selectedAgent, onAgentChange }: RegionalAgentFilterProps) {
  const { data: regionalAgents = [], isLoading } = useQuery({
    queryKey: ['regional-services'],
    queryFn: regionalService.getRegional服务,
  });

  // Filter only online agents
  const onlineAgents = regionalAgents.filter(agent => agent.connection === 'online');

  const getCurrentAgentDisplay = () => {
    if (!selectedAgent || selectedAgent === "all") {
      return "All 监控ing";
    }
    
    const [region名称] = selectedAgent.split("|");
    const agent = onlineAgents.find(agent => 
      `${agent.region_name}|${agent.agent_id}` === selectedAgent
    );
    
    if (agent) {
      return `${agent.region_name} (${agent.agent_ip_address})`;
    }
    
    return region名称 || "All 监控ing";
  };

  return (
    <div class名称="w-64">
      <label class名称="text-sm font-medium flex items-center gap-2 mb-2">
        <MapPin class名称="h-4 w-4" />
        监控ing Source
      </label>
      <Select 
        onValueChange={onAgentChange} 
        value={selectedAgent || "all"}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder={
            isLoading 
              ? "Loading agents..." 
              : getCurrentAgentDisplay()
          } />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              <div class名称="flex items-center gap-2">
                <Loader2 class名称="h-4 w-4 animate-spin" />
                Loading agents...
              </div>
            </SelectItem>
          ) : (
            <>
              <SelectItem value="all">
                <div class名称="flex items-center gap-2">
                  <BarChart3 class名称="h-4 w-4 text-purple-500" />
                  <span class名称="font-medium">All 监控ing</span>
                </div>
              </SelectItem>
              {onlineAgents.length > 0 && onlineAgents.map((agent) => (
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
      {onlineAgents.length === 0 && !isLoading && (
        <p class名称="text-xs text-amber-600 mt-1">
          No regional agents available. Using default monitoring only.
        </p>
      )}
    </div>
  );
}