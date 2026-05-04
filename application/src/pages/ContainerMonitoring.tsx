
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { DockerStatsCards } from "@/components/docker/DockerStatsCards";
import { Docker容器Table } from "@/components/docker/Docker容器Table";
import { dockerService } from "@/services/dockerService";
import { DockerContainer, DockerStats } from "@/types/docker.types";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Container监控ing = () => {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const [stats, setStats] = useState<DockerStats>({
    total: 0,
    running: 0,
    stopped: 0,
    warning: 0
  });
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

 // console.log('Container监控ing component loaded with serverId:', serverId);

  const {
    data: containers = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['docker-containers', serverId],
    queryFn: () => {
   //   console.log('Query function called with serverId:', serverId);
      return serverId ? dockerService.get容器ByServerId(serverId) : dockerService.get容器();
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

 // console.log('Query state:', { containers, isLoading, error });

  useEffect(() => {
  //  console.log('容器 changed:', containers);
    if (containers.length > 0) {
      dockerService.getContainerStats(containers).then(newStats => {
      //  console.log('Stats calculated:', newStats);
        setStats(newStats);
      });
    }
  }, [containers]);

  const handleRefresh = () => {
  //  console.log('Manual refresh triggered');
    refetch();
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handle返回ToServers = () => {
    navigate('/instance-monitoring');
  };

  if (error) {
  //  console.error('Container monitoring error:', error);
    return (
      <div class名称="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar collapsed={sidebarCollapsed} />
        <div class名称="flex flex-col flex-1">
          <Header 
            currentUser={currentUser} 
            onLogout={handleLogout} 
            sidebarCollapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar} 
          />
          <main class名称="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
            <div class名称="text-center max-w-md w-full">
              <h2 class名称="text-xl sm:text-2xl font-bold mb-4">{t('errorLoading容器')}</h2>
              <p class名称="text-muted-foreground mb-4 text-sm sm:text-base">
                {t('unableToFetchContainerData')}
              </p>
              <div class名称="text-xs text-muted-foreground mb-4 font-mono">
                {t('errorUnknown')}: {error?.message || t('errorUnknown')}
              </div>
              <div class名称="flex gap-2 justify-center">
                <Button onClick={handleRefresh} class名称="text-sm sm:text-base">
                  {t('retry')}
                </Button>
                <Button onClick={handle返回ToServers} variant="outline" class名称="text-sm sm:text-base">
                  {t('backToServers')}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div class名称="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} />
      <div class名称="flex flex-col flex-1">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          sidebarCollapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
        <main class名称="flex-1 overflow-auto">
          <div class名称="mx-[20px] my-[20px]">
            {/* Header Section */}
            <div class名称="mb-6 lg:mb-8">
              <div class名称="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class名称="min-w-0 flex-1">
                  <div class名称="flex items-center gap-3 mb-2">
                    <Button
                      onClick={handle返回ToServers}
                      variant="outline"
                      size="sm"
                      class名称="flex items-center gap-2"
                    >
                      <ArrowLeft class名称="h-4 w-4" />
                      {t('backToServers')}
                    </Button>
                  </div>
                  <h1 class名称="text-2xl font-bold text-foreground">
                    {t('container监控ing')}
                  </h1>
                  <p class名称={`text-muted-foreground mt-1 sm:mt-2 transition-all duration-300 ${sidebarCollapsed ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {t('monitorAndManage容器')}
                    {serverId && (
                      <span class名称="block text-xs text-muted-foreground/70 mt-1">
                        {t('serverIdLabel')}: {serverId}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards Section */}
            <div class名称="mb-6 lg:mb-8">
              <DockerStatsCards stats={stats} />
            </div>
            
            {/* 容器 Table Section */}
            <div class名称="min-w-0">
              <Docker容器Table 
                containers={containers} 
                isLoading={isLoading} 
                onRefresh={handleRefresh} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Container监控ing;