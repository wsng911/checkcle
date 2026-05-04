
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ServiceNotFound() {
  const navigate = useNavigate();
  
  return (
    <div class名称="flex items-center justify-center h-screen bg-background text-foreground">
      <div class名称="text-center">
        <AlertTriangle class名称="mx-auto h-12 w-12 text-yellow-500" />
        <h2 class名称="text-xl font-bold mt-4">Service Not Found</h2>
        <p class名称="mt-2 text-muted-foreground">The service you're looking for doesn't exist or has been deleted.</p>
        <Button 
          class名称="mt-4" 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
        >
          返回 to 仪表盘
        </Button>
      </div>
    </div>
  );
}
