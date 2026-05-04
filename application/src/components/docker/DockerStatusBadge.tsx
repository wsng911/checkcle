
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface Docker状态BadgeProps {
  status: 'running' | 'stopped' | 'warning';
}

export const Docker状态Badge = ({ status }: Docker状态BadgeProps) => {
  const { t } = useLanguage();
  const get状态Config = (status: string) => {
    switch (status) {
      case 'running':
        return {
          variant: 'default' as const,
          class名称: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
          label: t('running', 'docker')
        };
      case 'stopped':
        return {
          variant: 'secondary' as const,
          class名称: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
          label: t('stopped', 'docker')
        };
      case 'warning':
        return {
          variant: 'destructive' as const,
          class名称: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
          label: t('warning', 'docker')
        };
      default:
        return {
          variant: 'outline' as const,
          class名称: 'bg-gray-100 text-gray-600 border-gray-200',
          label: t('unknown', 'docker')
        };
    }
  };

  const config = get状态Config(status);

  return (
    <Badge 
      variant={config.variant} 
      class名称={`${config.class名称} font-medium text-xs px-2 py-1`}
    >
      {config.label}
    </Badge>
  );
};