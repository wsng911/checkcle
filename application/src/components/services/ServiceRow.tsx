
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Service } from "@/types/service.types";
import { 状态Badge } from "./状态Badge";
import { UptimeBar } from "./UptimeBar";
import { LastCheckedTime } from "./LastCheckedTime";
import { 
  ServiceRow操作, 
  ServiceRowHeader, 
  ServiceRowResponseTime 
} from "./service-row";
import { useTheme } from "@/contexts/ThemeContext";

interface ServiceRowProps {
  service: Service;
  onViewDetail: (service: Service) => void;
  onPauseResume: (service: Service) => Promise<void>;
  on编辑: (service: Service) => void;
  on删除: (service: Service) => void;
  onMuteAlerts?: (service: Service) => Promise<void>;
}

export const ServiceRow = ({ 
  service, 
  onViewDetail,
  onPauseResume,
  on编辑, 
  on删除,
  onMuteAlerts
}: ServiceRowProps) => {
  const { theme } = useTheme();
  const handleRowClick = () => {
    onViewDetail(service);
  };

  // Get the timestamp to display - use only lastChecked since that's what's defined in the Service type
  const displayTimestamp = service.lastChecked || new Date().toLocaleString();

  return (
    <TableRow 
      key={service.id} 
      class名称={`border-b ${theme === 'dark' ? 'border-gray-800 hover:bg-gray-900/60' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer`}
      onClick={handleRowClick}
    >
      <TableCell class名称="font-medium py-4">
        <ServiceRowHeader service={service} />
      </TableCell>
      <TableCell class名称={`text-base py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        {service.type}
      </TableCell>
      <TableCell class名称="py-4">
        <状态Badge status={service.status} size="md" />
      </TableCell>
      <TableCell class名称="py-4">
        <ServiceRowResponseTime responseTime={service.responseTime} />
      </TableCell>
      <TableCell class名称="w-60 py-4">
        <UptimeBar 
          uptime={service.uptime} 
          status={service.status} 
          serviceId={service.id} 
          interval={service.interval}
          serviceType={service.type}
        />
      </TableCell>
      <TableCell class名称="py-4">
        <LastCheckedTime 
          lastCheckedTime={displayTimestamp} 
          status={service.status} 
          interval={service.interval} 
        />
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()} class名称="py-4">
        <ServiceRow操作 
          service={service} 
          onViewDetail={onViewDetail}
          onPauseResume={onPauseResume}
          on编辑={on编辑}
          on删除={on删除}
          onMuteAlerts={onMuteAlerts}
        />
      </TableCell>
    </TableRow>
  );
};