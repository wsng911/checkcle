
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  AlertCircle, 
  CheckCircle, 
  Gauge, 
  搜索, 
  Wrench,
  LucideIcon
} from 'lucide-react';

interface Incident状态BadgeProps {
  status: string;
}

type 状态Config = {
  label: string;
  variant: 'outline' | 'default' | 'secondary' | 'destructive';
  icon: LucideIcon;
  class名称?: string;
}

export const Incident状态Badge = ({ status }: Incident状态BadgeProps) => {
  const { t } = useLanguage();
  
  // Normalize the status string
  const normalized状态 = (status || '').toLowerCase();
  
  // 状态 configuration map
  const statusConfigs: Record<string, 状态Config> = {
    'investigating': {
      label: t('investigating'),
      variant: 'destructive',
      icon: 搜索,
      class名称: 'bg-red-100 border-red-200 text-red-700 hover:bg-red-100',
    },
    'identified': {
      label: t('identified'),
      variant: 'secondary',
      icon: AlertCircle,
      class名称: 'bg-amber-100 border-amber-200 text-amber-700 hover:bg-amber-100',
    },
    'found_root_cause': {
      label: t('rootCauseFound'),
      variant: 'secondary',
      icon: AlertCircle,
      class名称: 'bg-amber-100 border-amber-200 text-amber-700 hover:bg-amber-100',
    },
    'completed': {
      label: t('completed'),
      variant: 'default',
      icon: CheckCircle,
      class名称: 'bg-green-100 border-green-200 text-green-700 hover:bg-green-100',
    },
    'in_progress': {
      label: t('inProgress'),
      variant: 'default',
      icon: Wrench,
      class名称: 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-100',
    },
    'inprogress': {
      label: t('inProgress'),
      variant: 'default',
      icon: Wrench,
      class名称: 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-100',
    },
    'monitoring': {
      label: t('monitoring'),
      variant: 'outline',
      icon: Gauge,
      class名称: 'bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-100',
    },
    'resolved': {
      label: t('resolved'),
      variant: 'default',
      icon: CheckCircle,
      class名称: 'bg-green-100 border-green-200 text-green-700 hover:bg-green-100',
    }
  };
  
  // Find the appropriate config, defaulting to investigating if not found
  const get状态Config = (): 状态Config => {
    for (const [key, config] of Object.entries(statusConfigs)) {
      if (normalized状态.includes(key)) {
        return config;
      }
    }
    return statusConfigs['investigating'];
  };
  
  const config = get状态Config();
  const Icon = config.icon;
  
  return (
    <Badge 
      variant={config.variant} 
      class名称={`flex items-center gap-1 ${config.class名称}`}
    >
      <Icon class名称="h-3 w-3" />
      <span>{config.label}</span>
    </Badge>
  );
};
