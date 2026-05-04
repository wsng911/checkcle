
import { UptimeData } from "@/types/service.types";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

interface HeatmapChartProps {
  uptimeData: UptimeData[];
  selectedMonth: Date;
}

export const HeatmapChart = ({ uptimeData, selectedMonth }: HeatmapChartProps) => {
  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const get状态ForDay = (day: Date) => {
    const dayData = uptimeData.filter(data => 
      isSameDay(new Date(data.timestamp), day)
    );
    
    if (dayData.length === 0) return 'no-data';
    
    // Calculate the predominant status for the day
    const statusCounts = dayData.reduce((acc, data) => {
      acc[data.status] = (acc[data.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const predominant状态 = Object.entries(statusCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    return predominant状态;
  };

  const get状态Color = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-emerald-500';
      case 'down':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'paused':
        return 'bg-slate-500';
      default:
        return 'bg-slate-700';
    }
  };

  const get状态Label = (status: string) => {
    switch (status) {
      case 'up':
        return 'Up';
      case 'down':
        return 'Down';
      case 'warning':
        return 'Warning';
      case 'paused':
        return 'Paused';
      default:
        return 'No Data';
    }
  };

  // Group days by weeks
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  daysInMonth.forEach((day, index) => {
    if (index === 0) {
      // Fill empty days at the start of the month
      const dayOfWeek = day.getDay();
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(new Date(0)); // Placeholder for empty cells
      }
    }
    
    currentWeek.push(day);
    
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });
  
  // 添加 remaining days to last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(new Date(0)); // Placeholder for empty cells
    }
    weeks.push(currentWeek);
  }

  return (
    <div class名称="space-y-6">
      {/* Header */}
      <div class名称="text-center">
        <h3 class名称="text-xl font-semibold text-white mb-2">
          Service Health - {format(selectedMonth, 'MMMM yyyy')}
        </h3>
        <p class名称="text-gray-400 text-sm">
          Daily status overview for the current month
        </p>
      </div>

      {/* Calendar Grid */}
      <div class名称="space-y-4">
        {/* Day labels */}
        <div class名称="grid grid-cols-7 gap-2 text-sm text-gray-400 font-medium">
          <div class名称="text-center py-2">Sun</div>
          <div class名称="text-center py-2">Mon</div>
          <div class名称="text-center py-2">Tue</div>
          <div class名称="text-center py-2">Wed</div>
          <div class名称="text-center py-2">Thu</div>
          <div class名称="text-center py-2">Fri</div>
          <div class名称="text-center py-2">Sat</div>
        </div>
        
        {/* Calendar days */}
        <div class名称="space-y-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} class名称="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => {
                const isPlaceholder = day.getTime() === 0;
                const status = isPlaceholder ? 'no-data' : get状态ForDay(day);
                const dayData = isPlaceholder ? [] : uptimeData.filter(data => 
                  isSameDay(new Date(data.timestamp), day)
                );
                
                return (
                  <div
                    key={dayIndex}
                    class名称={`
                      relative aspect-square rounded-lg flex items-center justify-center text-sm font-medium text-white
                      transition-all duration-200 cursor-pointer
                      ${isPlaceholder ? 'invisible' : `
                        ${get状态Color(status)} hover:scale-110 hover:shadow-lg
                      `}
                    `}
                    title={isPlaceholder ? '' : `${format(day, 'MMM d, yyyy')}: ${get状态Label(status)}${dayData.length > 0 ? ` (${dayData.length} checks)` : ''}`}
                  >
                    {isPlaceholder ? '' : format(day, 'd')}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* 状态 Legend */}
      <div class名称="flex items-center justify-center gap-6 pt-4 border-t border-gray-700">
        <span class名称="text-gray-400 text-sm font-medium">状态:</span>
        <div class名称="flex items-center gap-4">
          <div class名称="flex items-center space-x-2">
            <div class名称="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span class名称="text-gray-300 text-sm">Up</span>
          </div>
          <div class名称="flex items-center space-x-2">
            <div class名称="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span class名称="text-gray-300 text-sm">Warning</span>
          </div>
          <div class名称="flex items-center space-x-2">
            <div class名称="w-3 h-3 bg-red-500 rounded-full"></div>
            <span class名称="text-gray-300 text-sm">Down</span>
          </div>
          <div class名称="flex items-center space-x-2">
            <div class名称="w-3 h-3 bg-slate-500 rounded-full"></div>
            <span class名称="text-gray-300 text-sm">Paused</span>
          </div>
        </div>
      </div>
    </div>
  );
};