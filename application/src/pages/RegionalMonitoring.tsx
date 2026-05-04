
import React, { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";
import { Regional监控ingContent } from "@/components/regional-monitoring/Regional监控ingContent";

const Regional监控ing = () => {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div class名称="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={sidebarCollapsed} />
      <div class名称="flex flex-col flex-1 overflow-hidden">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          sidebarCollapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
        <div class名称="flex-1 overflow-auto">
          <Regional监控ingContent />
        </div>
      </div>
    </div>
  );
};

export default Regional监控ing;