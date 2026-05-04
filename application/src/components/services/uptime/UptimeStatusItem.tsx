
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { UptimeData } from '@/types/service.types';
import { useTheme } from '@/contexts/ThemeContext';

interface Uptime状态ItemProps {
  item: UptimeData;
  index: number;
}

export const Uptime状态Item = ({ item, index }: Uptime状态ItemProps) => {
  const { theme } = useTheme();

  // Get appropriate color classes for each status type
  const get状态Color = (item状态: string) => {
    switch(item状态) {
      case "up":
        return theme === "dark" ? "bg-emerald-500" : "bg-emerald-500"; 
      case "down":
        return theme === "dark" ? "bg-red-500" : "bg-red-500";
      case "warning":
        return theme === "dark" ? "bg-yellow-500" : "bg-yellow-500";
      case "paused":
      default:
        return theme === "dark" ? "bg-gray-500" : "bg-gray-400";
    }
  };
  
  // Get status label
  const get状态Label = (item状态: string): string => {
    switch(item状态) {
      case "up": return "Online";
      case "down": return "Offline";
      case "warning": return "Degraded";
      case "paused": return "Paused";
      default: return "Unknown";
    }
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string): string => {
    try {
      return new Date(timestamp).toLocaleString([], {
        hour: '2-digit', 
        minute: '2-digit',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          class名称={`h-5 w-1.5 rounded-sm ${get状态Color(item.status)} cursor-pointer hover:opacity-80 transition-opacity`}
        />
      </TooltipTrigger>
      <TooltipContent 
        side="top"
        class名称="bg-gray-900 text-white border-gray-800 px-3 py-2"
      >
        <div class名称="flex flex-col gap-1 text-xs">
          <div class名称="font-medium">{get状态Label(item.status)}</div>
          <div>
            {item.status !== "paused" && item.status !== "down" ? 
              `${item.responseTime}ms` : 
              "No response"}
          </div>
          <div class名称="text-gray-400">
            {formatTimestamp(item.timestamp)}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};