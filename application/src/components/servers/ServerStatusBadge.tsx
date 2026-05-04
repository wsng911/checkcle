
import { Badge } from "@/components/ui/badge";

interface Server状态BadgeProps {
  status: 'up' | 'down' | 'warning' | 'paused';
}

export const Server状态Badge = ({ status }: Server状态BadgeProps) => {
  const get状态Config = (status: string) => {
    switch (status) {
      case 'up':
        return {
          label: 'Online',
          class名称: 'bg-green-600 text-green-100 border-green-200'
        };
      case 'down':
        return {
          label: 'Offline',
          class名称: 'bg-red-600 text-red-100 border-red-200'
        };
      case 'warning':
        return {
          label: 'Warning',
          class名称: 'bg-yellow-600 text-yellow-800 border-yellow-200'
        };
        case 'paused':
        return {
          label: 'Paused',
          class名称: 'bg-gray-600 text-gray-100 border-gray-200'
        };
      default:
        return {
          label: 'Unknown',
          class名称: 'bg-gray-600 text-gray-100 border-gray-200'
        };
    }
  };

  const config = get状态Config(status);

  return (
    <Badge variant="outline" class名称={config.class名称}>
      {config.label}
    </Badge>
  );
};