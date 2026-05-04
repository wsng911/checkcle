import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { 仪表盘Content } from "@/components/dashboard/仪表盘Content";
import { serviceService } from "@/services/serviceService";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "@/components/services/LoadingState";
import { useSidebar } from "@/contexts/SidebarContext";

const 仪表盘 = () => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: serviceService.get服务,
    refetchInterval: 60000,
  });

  useEffect(() => {
    const startActive服务 = async () => {
      await serviceService.startAllActive服务();
    };
    const timeoutId = setTimeout(startActive服务, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div class名称="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div class名称="flex flex-col flex-1 min-w-0">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout} 
        />
        <仪表盘Content 
          services={services}
          isLoading={isLoading}
          error={error as Error}
        />
      </div>
    </div>
  );
};

export default 仪表盘;