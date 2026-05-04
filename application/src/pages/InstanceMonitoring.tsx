import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ServerStatsCards } from "@/components/servers/ServerStatsCards";
import { ServerTable } from "@/components/servers/ServerTable";
import { 添加ServerAgentDialog } from "@/components/servers/添加ServerAgentDialog";
import { serverService } from "@/services/serverService";
import { Server, ServerStats } from "@/types/server.types";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Instance监控ing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState<ServerStats>({
    total: 0,
    online: 0,
    offline: 0,
    warning: 0
  });
  
  const [currentUser] = useState(authService.getCurrentUser());
  const [addDialogOpen, set添加DialogOpen] = useState(false);
  
  const { data: servers = [], isLoading, error, refetch } = useQuery<Server[]>({
    queryKey: ['servers'],
    queryFn: serverService.getServers,
    refetchInterval: 30000
  });
  
  useEffect(() => {
    if (servers.length > 0) {
      serverService.getServerStats(servers).then(setStats);
    }
  }, [servers]);
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div class名称="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div class名称="flex flex-col flex-1 min-w-0">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout} 
        />
        <main class名称="flex-1 overflow-auto">
          <div class名称="p-4 lg:p-8 space-y-6">
            <div class名称="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class名称="min-w-0 flex-1">
                <h1 class名称="text-2xl font-bold text-foreground">
                  {t('instance监控ing')}
                </h1>
                <p class名称="text-muted-foreground mt-1 text-sm">
                  {t('describe监控Instance')}
                </p>
              </div>
              <Button onClick={() => set添加DialogOpen(true)} class名称="flex-shrink-0">
                <Plus class名称="mr-2 h-4 w-4" />
                {t('addServerAgent')}
              </Button>
            </div>

            <ServerStatsCards stats={stats} />
            <ServerTable servers={servers} isLoading={isLoading} onRefresh={refetch} />
          </div>
        </main>
      </div>

      <添加ServerAgentDialog
        open={addDialogOpen}
        onOpenChange={set添加DialogOpen}
        onAgent添加ed={refetch}
      />
    </div>
  );
};

export default Instance监控ing;