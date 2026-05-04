
import { Activity, AlertTriangle, CheckCircle, Pause, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 状态Filter } from "./types";
import { useTheme } from "@/contexts/ThemeContext";

interface 状态FilterTabsProps {
  statusFilter: 状态Filter;
  on状态FilterChange: (value: 状态Filter) => void;
}

export function 状态FilterTabs({
  statusFilter,
  on状态FilterChange
}: 状态FilterTabsProps) {
  // Get current theme to apply appropriate styling
  const { theme } = useTheme();
  
  return (
    <Tabs 
      value={statusFilter} 
      onValueChange={value => on状态FilterChange(value as 状态Filter)} 
      class名称="w-full"
    >
      <TabsList class名称={`grid grid-cols-5 w-full max-w-md rounded-full ${
        theme === 'dark' ? 'bg-secondary' : 'bg-slate-100'
      }`}>
        <TabsTrigger 
          value="all" 
          class名称="rounded-full flex items-center gap-1 data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-[#D6BCFA] text-[#8E9196]"
        >
          <Activity class名称="h-4 w-4" />
          <span>All</span>
        </TabsTrigger>
        <TabsTrigger 
          value="up" 
          class名称="rounded-full flex items-center gap-1 data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-[#D6BCFA] text-[#8E9196]"
        >
          <CheckCircle class名称="h-4 w-4" />
          <span>Up</span>
        </TabsTrigger>
        <TabsTrigger 
          value="down" 
          class名称="rounded-full flex items-center gap-1 data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-[#D6BCFA] text-[#8E9196]"
        >
          <X class名称="h-4 w-4" />
          <span>Down</span>
        </TabsTrigger>
        <TabsTrigger 
          value="warning" 
          class名称="rounded-full flex items-center gap-1 data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-[#D6BCFA] text-[#8E9196]"
        >
          <AlertTriangle class名称="h-4 w-4" />
          <span>Warning</span>
        </TabsTrigger>
        <TabsTrigger 
          value="paused" 
          class名称="rounded-full flex items-center gap-1 data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-[#D6BCFA] text-[#8E9196]"
        >
          <Pause class名称="h-4 w-4" />
          <span>Paused</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
