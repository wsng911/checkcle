
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Play, Pause, 编辑, Bell, BellOff, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Service } from "@/types/service.types";
import { serviceService } from "@/services/serviceService";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceRow操作Props {
  service: Service;
  onViewDetail: (service: Service) => void;
  onPauseResume: (service: Service) => Promise<void>;
  on编辑: (service: Service) => void;
  on删除: (service: Service) => void;
  onMuteAlerts?: (service: Service) => Promise<void>;
}

export const ServiceRow操作 = ({ 
  service, 
  onViewDetail,
  onPauseResume,
  on编辑,
  on删除,
  onMuteAlerts
}: ServiceRow操作Props) => {
  const { toast } = useToast();
	const { t } = useLanguage();

  // Handle pause/resume directly from dropdown
  const handlePauseResume = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      if (service.status === "paused") {
        // Resume monitoring
   //     console.log(`Resuming monitoring for service ${service.id} (${service.name}) from dropdown`);
        
        // First ensure we update the status
        await serviceService.resume监控ing(service.id);
        
        // Then start monitoring service (performs an immediate check)
        await serviceService.start监控ingService(service.id);
        
        toast({
          title: "监控ing resumed",
          description: `监控ing for ${service.name} has been resumed. First check is running now.`,
        });
      } else {
        // Pause monitoring
     //   console.log(`Pausing monitoring for service ${service.id} (${service.name}) from dropdown`);
        await serviceService.pause监控ing(service.id);
        
        toast({
          title: "监控ing paused",
          description: `监控ing for ${service.name} has been paused.`,
        });
      }
      
      // Call the parent handler to refresh the UI
      onPauseResume(service);
    } catch (error) {
   //   console.error("Error toggling monitoring:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change monitoring status. Please try again.",
      });
    }
  };

  // Check alerts status - check both fields for backward compatibility
  const alertsMuted = service.alerts === "muted" || service.muteAlerts === true;

  // Handle mute/unmute alerts
  const handleMuteAlerts = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onMuteAlerts) {
      try {
    //    console.log(`Attempting to ${alertsMuted ? 'unmute' : 'mute'} alerts for service ${service.id} (${service.name})`);
        await onMuteAlerts(service);
      } catch (error) {
     //   console.error("Error toggling alerts:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to change alert settings. Please try again.",
        });
      }
    }
  };

  return (
    <div class名称="flex space-x-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            title="More options"
            class名称="opacity-70 hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal class名称="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          class名称="w-48"
        >
          <DropdownMenuItem 
            class名称="flex items-center gap-2 cursor-pointer text-base py-2.5"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(service);
            }}
          >
            <Eye class名称="h-4 w-4" />
            <span>{t("viewDetail")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            class名称="flex items-center gap-2 cursor-pointer text-base py-2.5"
            onClick={handlePauseResume}
          >
            {service.status === "paused" ? (
              <>
                <Play class名称="h-4 w-4" />
                <span>{t("resume监控ing")}</span>
              </>
            ) : (
              <>
                <Pause class名称="h-4 w-4" />
                <span>{t("pause监控ing")}</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            class名称="flex items-center gap-2 cursor-pointer text-base py-2.5"
            onClick={(e) => {
              e.stopPropagation();
              on编辑(service);
            }}
          >
            <编辑 class名称="h-4 w-4" />
            <span>{t("edit")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            class名称="flex items-center gap-2 cursor-pointer text-base py-2.5"
            onClick={handleMuteAlerts}
          >
            {alertsMuted ? (
              <>
                <Bell class名称="h-4 w-4" />
                <span>{t("unmuteAlerts")}</span>
              </>
            ) : (
              <>
                <BellOff class名称="h-4 w-4" />
                <span>{t("muteAlerts")}</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            class名称="flex items-center gap-2 text-destructive cursor-pointer text-base py-2.5"
            onClick={(e) => {
              e.stopPropagation();
              on删除(service);
            }}
          >
            <Trash2 class名称="h-4 w-4" />
            <span>{t("delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};