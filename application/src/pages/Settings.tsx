
import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { authService } from "@/services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import General设置Panel from "@/components/settings/General设置";
import UserManagement from "@/components/settings/user-management";
import { Notification设置 } from "@/components/settings/notification-settings";
import { AlertsTemplates } from "@/components/settings/alerts-templates";
import { AboutSystem } from "@/components/settings/about-system";
import DataRetention设置 from "@/components/settings/data-retention/DataRetention设置";
import { useSidebar } from "@/contexts/SidebarContext";

const 设置 = () => {
  // Use shared sidebar state
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  // Get current user
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the panel from URL query params
  const queryParams = new URL搜索Params(location.search);
  const panelParam = queryParams.get('panel');
  
  // State for active settings panel
  const [activePanel, setActivePanel] = useState<string>(panelParam || "general");
  
  // Update active panel when URL changes
  useEffect(() => {
    const panel = queryParams.get('panel');
    if (panel) {
      setActivePanel(panel);
    } else {
      setActivePanel("general");
    }
  }, [location.search]);
  
  // Handle logout
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
        <div class名称="flex-1 overflow-auto p-6 space-y-6">
          {activePanel === "general" && <General设置Panel />}
          {activePanel === "users" && <UserManagement />}
          {activePanel === "notifications" && <Notification设置 />}
          {activePanel === "templates" && <AlertsTemplates />}
          {activePanel === "data-retention" && <DataRetention设置 />}
          {activePanel === "about" && <AboutSystem />}
        </div>
      </div>
    </div>
  );
};

export default 设置;