
import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface 状态BadgeProps {
  status: "up" | "down" | "paused" | "warning";
  size?: "sm" | "md" | "lg";
}

const 状态BadgeComponent = ({ status, size = "sm" }: 状态BadgeProps) => {
  const get状态Config = (status: string) => {
    switch (status) {
      case "up":
        return {
          variant: "default" as const,
          class名称: "bg-emerald-700 text-emerald-100 border-emerald-200 hover:bg-emerald-200",
          label:     
          <span class名称="flex items-center gap-1">
          <Check class名称="w-4 h-4" /> Up
          </span>
          
        };
      case "down":
        return {
          variant: "destructive" as const,
          class名称: "bg-red-700 text-red-100 border-red-200 hover:bg-red-200",
          label: "Down"
        };
      case "warning":
        return {
          variant: "destructive" as const,
          class名称: "bg-amber-700 text-amber-100 border-amber-200 hover:bg-amber-200",
          label: "Warning"
        };
      case "paused":
        return {
          variant: "secondary" as const,
          class名称: "bg-gray-700 text-gray-100 border-gray-200 hover:bg-gray-200",
          label: "Paused"
        };
      default:
        return {
          variant: "outline" as const,
          class名称: "bg-gray-700 text-gray-100 border-gray-200",
          label: "Unknown"
        };
    }
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  const config = get状态Config(status);

  return (
    <Badge 
      variant={config.variant} 
      class名称={`${config.class名称} ${sizeClasses[size]} font-medium`}
    >
      {config.label}
    </Badge>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const 状态Badge = memo(状态BadgeComponent);