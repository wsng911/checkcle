
import { TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { DockerContainer } from "@/types/docker.types";
import { Docker状态Badge } from "../Docker状态Badge";
import { DockerRow操作 } from "./DockerRow操作";
import { dockerService } from "@/services/dockerService";

interface DockerTableRowProps {
  container: DockerContainer;
  onRowClick: (container: DockerContainer) => void;
  onContainerAction: (action: string, containerId: string, container名称: string) => void;
  onViewMetrics: (container: DockerContainer) => void;
}

export const DockerTableRow = ({ container, onRowClick, onContainerAction, onViewMetrics }: DockerTableRowProps) => {
  const cpuPercentage = container.cpu_usage;
  const memoryPercentage = Math.round((container.ram_used / container.ram_total) * 100);
  const diskPercentage = Math.round((container.disk_used / container.disk_total) * 100);
  const container状态 = dockerService.get状态FromDocker状态(container.status);

  const formatPercentage = (used: number, total: number) => {
    if (total === 0) return "0%";
    return `${Math.round((used / total) * 100)}%`;
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-500";
    if (percentage >= 70) return "text-amber-500";
    return "text-emerald-500";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <TableRow 
      class名称="hover:bg-muted/50 transition-colors border-border cursor-pointer"
      onClick={() => onRowClick(container)}
    >
      <TableCell class名称="font-medium">
        <div class名称="space-y-1">
          <div class名称="font-semibold text-sm sm:text-base text-foreground">{container.name}</div>
          <div class名称="text-xs sm:text-sm text-muted-foreground">
            <div class名称="font-mono">{container.docker_id}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Docker状态Badge status={container状态} />
      </TableCell>
      <TableCell>
        <div class名称="space-y-2">
          <div class名称="flex items-center justify-between gap-3">
            <Progress 
              value={cpuPercentage} 
              class名称="flex-1 h-2 bg-muted/50"
              indicatorClass名称={getProgressColor(cpuPercentage)}
            />
            <span class名称={`font-semibold text-sm min-w-[40px] text-right ${getUsageColor(cpuPercentage)}`}>
              {cpuPercentage}%
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div class名称="space-y-2">
          <div class名称="flex items-center justify-between gap-3">
            <Progress 
              value={memoryPercentage} 
              class名称="flex-1 h-2 bg-muted/50"
              indicatorClass名称={getProgressColor(memoryPercentage)}
            />
            <span class名称={`font-semibold text-sm min-w-[40px] text-right ${getUsageColor(memoryPercentage)}`}>
              {formatPercentage(container.ram_used, container.ram_total)}
            </span>
          </div>
          <div class名称="text-xs text-muted-foreground font-mono">
            {dockerService.formatBytes(container.ram_used)} / {dockerService.formatBytes(container.ram_total)}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div class名称="space-y-2">
          <div class名称="flex items-center justify-between gap-3">
            <Progress 
              value={diskPercentage} 
              class名称="flex-1 h-2 bg-muted/50"
              indicatorClass名称={getProgressColor(diskPercentage)}
            />
            <span class名称={`font-semibold text-sm min-w-[40px] text-right ${getUsageColor(diskPercentage)}`}>
              {formatPercentage(container.disk_used, container.disk_total)}
            </span>
          </div>
          <div class名称="text-xs text-muted-foreground font-mono">
            {dockerService.formatBytes(container.disk_used)} / {dockerService.formatBytes(container.disk_total)}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span class名称="text-xs sm:text-sm font-medium font-mono">
          {dockerService.formatUptime(container.uptime)}
        </span>
      </TableCell>
      <TableCell>
        <span class名称="text-xs sm:text-sm text-muted-foreground">
          {new Date(container.last_checked).toLocaleString()}
        </span>
      </TableCell>
      <TableCell class名称="text-center" onClick={(e) => e.stopPropagation()}>
        <DockerRow操作 
          container={container}
          container状态={container状态}
          onContainerAction={onContainerAction}
          onViewMetrics={onViewMetrics}
        />
      </TableCell>
    </TableRow>
  );
};