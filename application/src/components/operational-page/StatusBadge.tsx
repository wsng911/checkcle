
import { Badge } from '@/components/ui/badge';
import { OperationalPageRecord } from '@/types/operational.types';

interface 状态BadgeProps {
  status: OperationalPageRecord['status'];
}

export const 状态Badge = ({ status }: 状态BadgeProps) => {
  const get状态Config = (status: OperationalPageRecord['status']) => {
    switch (status) {
      case 'operational':
        return {
          label: 'Operational',
          class名称: 'bg-green-100 text-green-800 hover:bg-green-200',
        };
      case 'degraded':
        return {
          label: 'Degraded Performance',
          class名称: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        };
      case 'maintenance':
        return {
          label: 'Under Maintenance',
          class名称: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        };
      case 'major_outage':
        return {
          label: 'Major Outage',
          class名称: 'bg-red-100 text-red-800 hover:bg-red-200',
        };
      default:
        return {
          label: 'Unknown',
          class名称: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        };
    }
  };

  const config = get状态Config(status);

  return (
    <Badge class名称={config.class名称}>
      {config.label}
    </Badge>
  );
};