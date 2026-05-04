
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Pause, AlertTriangle } from "lucide-react";
import { Service } from "@/services/serviceService";
import { useTheme } from "@/contexts/ThemeContext";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

interface 状态CardsProps {
  services: Service[];
}

export const 状态Cards = ({ services }: 状态CardsProps) => {
	const { t } = useLanguage();

  // Count services by status
  const up服务 = services.filter(s => s.status === "up").length;
  const down服务 = services.filter(s => s.status === "down").length;
  const paused服务 = services.filter(s => s.status === "paused").length;
  const warning服务 = services.filter(s => s.responseTime > 1000).length;
  
  // Get current theme to adjust card styles
  const { theme } = useTheme();
  
  return (
    <div class名称="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
      {/* Up 服务 Card */}
      <Card 
        class名称={`border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          theme === 'dark' ? 'dark-card' : ''
        } relative z-10`}
        style={{
          background: theme === 'dark' 
            ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(102, 187, 106, 0.6) 100%)" 
            : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #66bb6a 100%)"
        }}
      >
        {/* Grid Pattern Overlay */}
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div class名称="w-full h-full" 
            style={{ 
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), 
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">{t("up服务")}</CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{up服务}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <ArrowUp class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
      
      {/* Down 服务 Card */}
      <Card 
        class名称={`border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          theme === 'dark' ? 'dark-card' : ''
        } relative z-10`}
        style={{
          background: theme === 'dark'
            ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(239, 83, 80, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #ef5350 100%)"
        }}
      >
        {/* Grid Pattern Overlay */}
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div class名称="w-full h-full" 
            style={{ 
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), 
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">{t("down服务")}</CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{down服务}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <ArrowDown class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
      
      {/* Paused 服务 Card */}
      <Card 
        class名称={`border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          theme === 'dark' ? 'dark-card' : ''
        } relative z-10`}
        style={{
          background: theme === 'dark'
            ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(66, 165, 245, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #42a5f5 100%)"
        }}
      >
        {/* Grid Pattern Overlay */}
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div class名称="w-full h-full" 
            style={{ 
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), 
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">{t("paused服务")}</CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{paused服务}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <Pause class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
      
      {/* Warning 服务 Card */}
      <Card 
        class名称={`border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          theme === 'dark' ? 'dark-card' : ''
        } relative z-10`}
        style={{
          background: theme === 'dark'
            ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(255, 183, 77, 0.6) 100%)"
            : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #ffb74d 100%)"
        }}
      >
        {/* Grid Pattern Overlay */}
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div class名称="w-full h-full" 
            style={{ 
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), 
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">{t("warning服务")}</CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{warning服务}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <AlertTriangle class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
