
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarHeaderProps {
  collapsed: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  const { theme } = useTheme();

  return (
    <div class名称={`p-4 ${theme === 'dark' ? 'border-[#1e1e1e]' : 'border-sidebar-border'} border-b flex items-center ${collapsed ? 'justify-center' : ''}`}>
      <div class名称="h-8 w-8 bg-gray-600 rounded flex items-center justify-center mr-2">
        <img
          src="/favicon_sidebar.ico"
          alt="CheckCle"
          class名称="h-6 w-6"
        />
      </div>
      {!collapsed && <h1 class名称="text-xl font-semibold">CheckCle App</h1>}
    </div>
  );
};