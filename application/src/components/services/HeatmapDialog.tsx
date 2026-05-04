
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeatmapChart } from "./HeatmapChart";
import { UptimeData } from "@/types/service.types";
import { addMonths, subMonths, format } from "date-fns";

interface HeatmapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service名称: string;
  uptimeData: UptimeData[];
}

export const HeatmapDialog = ({
  open,
  onOpenChange,
  service名称,
  uptimeData
}: HeatmapDialogProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setSelectedMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => addMonths(prev, 1));
  };

  const handleCurrentMonth = () => {
    setSelectedMonth(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader class名称="pb-4">
          <DialogTitle class名称="text-xl font-semibold text-white">
            Health Heatmap - {service名称}
          </DialogTitle>
          <Dialog描述 class名称="text-gray-400">
            Monthly overview of service health status with daily breakdown
          </Dialog描述>
        </DialogHeader>
        
        <div class名称="space-y-6">
          {/* Month Navigation */}
          <div class名称="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousMonth}
              class名称="flex items-center gap-2 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
            >
              <ChevronLeft class名称="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCurrentMonth}
              class名称="bg-slate-700 text-white hover:bg-slate-600"
            >
              Current Month
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              class名称="flex items-center gap-2 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
            >
              Next
              <ChevronRight class名称="h-4 w-4" />
            </Button>
          </div>
          
          {/* Heatmap Chart */}
          <HeatmapChart 
            uptimeData={uptimeData} 
            selectedMonth={selectedMonth}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};