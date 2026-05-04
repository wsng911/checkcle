
import { ArrowLeft, Globe, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 状态Badge } from "@/components/services/状态Badge";
import { Service监控ingButton } from "@/components/services/Service监控ingButton";
import { RegionalAgentFilter } from "@/components/services/RegionalAgentFilter";
import { HeatmapDialog } from "./HeatmapDialog";
import { Service, UptimeData } from "@/types/service.types";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ServiceHeaderProps {
  service: Service;
  on状态Change?: (new状态: "up" | "down" | "paused" | "warning") => void;
  selectedRegionalAgent?: string;
  onRegionalAgentChange?: (agent: string) => void;
  uptimeData?: UptimeData[];
}

export function ServiceHeader({ 
  service, 
  on状态Change, 
  selectedRegionalAgent, 
  onRegionalAgentChange,
  uptimeData = []
}: ServiceHeaderProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showHeatmap, setShowHeatmap] = useState(false);
  
  return (
    <>
      <div class名称="mb-6">
        <Button 
          variant="ghost" 
          class名称="mb-4 pl-0 hover:bg-transparent" 
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft class名称="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        
        <div class名称="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class名称="flex items-center">
            <h1 class名称="text-2xl font-bold">{service.name}</h1>
            
            {/* Pulsating Circle Animation */}
            <div class名称="relative ml-2 flex items-center">
              <span 
                class名称={cn(
                  "flex h-3 w-3 relative",
                  service.status === "up" ? "bg-green-500" : 
                  service.status === "down" ? "bg-red-500" :
                  service.status === "warning" ? "bg-yellow-500" : 
                  "bg-blue-500",
                  "rounded-full"
                )}
              />
              <span 
                class名称={cn(
                  "animate-ping absolute h-3 w-3",
                  service.status === "up" ? "bg-green-400" : 
                  service.status === "down" ? "bg-red-400" :
                  service.status === "warning" ? "bg-yellow-400" : 
                  "bg-blue-400",
                  "rounded-full opacity-75"
                )}
              />
            </div>
            
            {service.url && (
              <a 
                href={service.url} 
                target="_blank" 
                rel="noopener noreferrer"
                class名称="text-primary/80 hover:text-primary text-sm flex items-center mt-1 ml-1"
              >
                <Globe class名称="h-3 w-3 mr-1" />
                {service.url}
              </a>
            )}
          </div>
          
          <div class名称="flex items-center space-x-4">
            <状态Badge status={service.status} size="lg" />
            <Service监控ingButton service={service} on状态Change={on状态Change} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHeatmap(true)}
              class名称="bg-blue-900/20 hover:bg-blue-900/30"
            >
              <BarChart3 class名称="h-4 w-4 mr-2" />
              Heatmap
            </Button>
            {selectedRegionalAgent !== undefined && onRegionalAgentChange && (
              <RegionalAgentFilter 
                selectedAgent={selectedRegionalAgent}
                onAgentChange={onRegionalAgentChange}
              />
            )}
          </div>
        </div>
      </div>

      <HeatmapDialog
        open={showHeatmap}
        onOpenChange={setShowHeatmap}
        service名称={service.name}
        uptimeData={uptimeData}
      />
    </>
  );
}