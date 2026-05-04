import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { pb } from "@/lib/pocketbase";
import { Service } from "@/types/service.types";
import { serviceService } from "@/services/serviceService";
import { recordMute状态Change } from "@/services/monitoring/utils/notificationUtils";

export function useService操作(initial服务: Service[]) {
  const [services, set服务] = useState<Service[]>(initial服务);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Update services state when props change
  const update服务 = (new服务: Service[]) => {
    if (JSON.stringify(services) !== JSON.stringify(new服务)) {
      set服务(new服务);
    }
  };

  const handleViewDetail = (service: Service) => {
   // console.log(`Navigating to service detail for service ID: ${service.id}`);
    navigate(`/service/${service.id}`);
  };
  
  const handlePauseResume = async (service: Service) => {
    try {
      if (service.status === "paused") {
        // Resume monitoring
        await serviceService.start监控ingService(service.id);
        toast({
          title: "Service resumed",
          description: `${service.name} monitoring has been resumed successfully.`,
        });
        
        // Update local state - ensure status is properly typed as "up"
        const updated服务 = services.map(s => 
          s.id === service.id ? { ...s, status: "up" as const } : s
        );
        set服务(updated服务);
      } else {
        // Pause monitoring
        await serviceService.pause监控ing(service.id);
        
        // Get the pause time and update local state
        const pauseTime = new Date().toISOString();
        const updated服务 = services.map(s => 
          s.id === service.id ? { ...s, status: "paused" as const, lastChecked: pauseTime } : s
        );
        set服务(updated服务);
        
        toast({
          title: "Service paused",
          description: `${service.name} monitoring has been paused successfully.`,
        });
      }
      
      // Invalidate the services query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (error) {
      console.error("Error updating service status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update service status. Please try again.",
      });
    }
  };
  
  const handle编辑 = (service: Service) => {
    setSelectedService({...service}); // 创建 a copy to avoid reference issues
    return service;
  };
  
  const handle删除 = (service: Service) => {
    setSelectedService(service);
    return service;
  };
  
  // Modified to return Promise<void> instead of Promise<boolean>
  const confirm删除 = async (): Promise<void> => {
    if (!selectedService || isDeleting) return;
    
    try {
      setIsDeleting(true);
      
      // First try to pause monitoring for this service to prevent any concurrency issues
      if (selectedService.status !== "paused") {
        await serviceService.pause监控ing(selectedService.id);
      }
      
      // Set a timeout to prevent hanging UI
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("删除 request timed out")), 10000);
      });
      
      const deletePromise = pb.collection('services').delete(selectedService.id);
      await Promise.race([deletePromise, timeoutPromise]);
      
      toast({
        title: "Service deleted",
        description: `${selectedService.name} has been deleted successfully.`,
      });
      
      // Update local state
      const updated服务 = services.filter(s => s.id !== selectedService.id);
      set服务(updated服务);
      
      // Invalidate the services query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["services"] });
      
      setSelectedService(null);
    } catch (error) {
    //  console.error("Error deleting service:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete service. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMuteAlerts = async (service: Service) => {
    try {
      // Check alerts status - check both fields for backward compatibility
      const isMuted = service.alerts === "muted" || service.muteAlerts === true;
      
      // Toggle the mute alerts status for this specific service
      const newMute状态 = !isMuted;
      
     // console.log(`${newMute状态 ? "Muting" : "Unmuting"} alerts for service ${service.id} (${service.name})`);
      
      // First update the local state immediately for better UI responsiveness
      // Using proper type casting to ensure TypeScript knows we're creating valid Service objects
      const updated服务 = services.map(s => {
        if (s.id === service.id) {
          return {
            ...s,
            muteAlerts: newMute状态,
            alerts: newMute状态 ? "muted" as const : "unmuted" as const
          };
        }
        return s;
      });
      
      set服务(updated服务);
      
      // Record the mute status change (this will also update the service record)
      await recordMute状态Change(service.id, service.name, newMute状态);
      
      // Show a toast message
      toast({
        title: newMute状态 ? "Alerts muted" : "Alerts unmuted",
        description: `Notifications for ${service.name} are now ${newMute状态 ? "muted" : "enabled"}.`,
      });
      
      // Immediately invalidate the services query to trigger a refetch
      // This ensures our local state matches the database state
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      
    } catch (error) {
    //  console.error("Error updating alert settings:", error);
      
      // Revert the local state change if the server update failed
      const reverted服务 = services.map(s => {
        if (s.id === service.id) {
          return {
            ...s,
            muteAlerts: service.muteAlerts,
            alerts: service.alerts
          };
        }
        return s;
      });
      
      set服务(reverted服务);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${!service.muteAlerts ? "mute" : "unmute"} alerts for ${service.name}. Please try again.`,
      });
    }
  };

  return {
    services,
    selectedService,
    isDeleting,
    setSelectedService,
    update服务,
    handleViewDetail,
    handlePauseResume,
    handle编辑,
    handle删除,
    confirm删除,
    handleMuteAlerts
  };
}