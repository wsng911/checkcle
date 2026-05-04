
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { Service } from "@/types/service.types";
import { serviceService } from "@/services/serviceService"; 
import { useToast } from "@/hooks/use-toast";

interface Service监控ingButtonProps {
  service: Service;
  on状态Change?: (new状态: "up" | "down" | "paused" | "warning") => void;
}

export function Service监控ingButton({ service, on状态Change }: Service监控ingButtonProps) {
  const [is监控ing, setIs监控ing] = useState(service.status !== "paused");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update local state when service prop changes
  useEffect(() => {
    setIs监控ing(service.status !== "paused");
  }, [service.status]);

  const handleToggle监控ing = async () => {
    try {
      setIsLoading(true);
      
      if (is监控ing) {
        // Pause monitoring
      //  console.log(`Pausing monitoring for service ${service.id} (${service.name})`);
        await serviceService.pause监控ing(service.id);
        setIs监控ing(false);
        
        if (on状态Change) on状态Change("paused");
        
        // Notification handling removed - will be handled by backend
       // console.log("Service paused - notifications will be handled by backend");
        
        toast({
          title: "监控ing paused",
          description: `监控ing for ${service.name} has been paused.`,
        });
      } else {
        // Start/resume monitoring
      //  console.log(`Starting monitoring for service ${service.id} (${service.name})`);
        
        // First ensure we update the status in the database to not be paused anymore
        await serviceService.resume监控ing(service.id);
        setIs监控ing(true);
        
        // Perform an immediate check
        await serviceService.start监控ingService(service.id);
        
        toast({
          title: "监控ing resumed",
          description: `监控ing for ${service.name} has been resumed. First check is running now.`,
        });
      }
    } catch (error) {
     // console.error("Error toggling monitoring:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to change monitoring status. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline" 
      size="sm"
      onClick={handleToggle监控ing}
      disabled={isLoading}
      class名称={is监控ing ? "bg-red-900/20 hover:bg-red-900/30" : "bg-green-900/20 hover:bg-green-900/30"}
    >
      {isLoading ? (
        "Processing..."
      ) : is监控ing ? (
        <>
          <Pause class名称="h-4 w-4 mr-2" />
          Pause 监控ing
        </>
      ) : (
        <>
          <Play class名称="h-4 w-4 mr-2" />
          Start 监控ing
        </>
      )}
    </Button>
  );
}