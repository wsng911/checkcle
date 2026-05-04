
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container, Play, Square, AlertTriangle } from "lucide-react";
import { DockerStats } from "@/types/docker.types";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface DockerStatsCardsProps {
  stats: DockerStats;
}

export const DockerStatsCards = ({ stats }: DockerStatsCardsProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const cards = [
    {
      title: t('total容器', 'docker'),
      value: stats.total,
      icon: Container,
      color: "text-blue-600",
      gradient: theme === 'dark' 
        ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%)" 
        : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #3b82f6 100%)"
    },
    {
      title: t('running', 'docker'),
      value: stats.running,
      icon: Play,
      color: "text-green-600",
      gradient: theme === 'dark' 
        ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(16, 185, 129, 0.6) 100%)" 
        : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #10b981 100%)"
    },
    {
      title: t('stopped', 'docker'),
      value: stats.stopped,
      icon: Square,
      color: "text-gray-600",
      gradient: theme === 'dark' 
        ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(107, 114, 128, 0.6) 100%)" 
        : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #6b7280 100%)"
    },
    {
      title: t('warning', 'docker'),
      value: stats.warning,
      icon: AlertTriangle,
      color: "text-amber-600",
      gradient: theme === 'dark' 
        ? "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, rgba(245, 158, 11, 0.6) 100%)" 
        : "linear-gradient(135deg, rgba(65, 59, 55, 0.8) 0%, #f59e0b 100%)"
    },
  ];

  return (
    <div class名称="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <Card 
            key={card.title} 
            class名称="border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative"
            style={{ background: card.gradient }}
          >
            {/* Grid Pattern Overlay */}
            <div class名称="absolute inset-0 z-0 opacity-10">
              <div 
                class名称="w-full h-full" 
                style={{ 
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
            </div>

            <CardHeader class名称="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle class名称="text-sm font-medium text-white/70">
                {card.title}
              </CardTitle>
              <div class名称="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:scale-110">
                <IconComponent class名称="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent class名称="relative z-10">
              <div class名称="flex items-center justify-between">
                <div class名称="text-2xl font-bold text-white">
                  {card.value}
                </div>
                <Badge 
                  variant="outline" 
                  class名称="text-xs font-mono font-bold px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white border border-white/30"
                >
                  {t('containersLabel', 'docker')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};