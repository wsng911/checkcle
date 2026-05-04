
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Play, Pause, Square, Trash2, BarChart3, RefreshCw } from "lucide-react";
import { DockerContainer } from "@/types/docker.types";
import { useLanguage } from "@/contexts/LanguageContext";

interface DockerRow操作Props {
  container: DockerContainer;
  container状态: 'running' | 'stopped' | 'warning';
  onContainerAction: (action: string, containerId: string, container名称: string) => void;
  onViewMetrics: (container: DockerContainer) => void;
}

export const DockerRow操作 = ({ container, container状态, onContainerAction, onViewMetrics }: DockerRow操作Props) => {
  const { t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" class名称="h-8 w-8 p-0 hover:bg-muted">
          <span class名称="sr-only">{t('openMenu', 'docker')}</span>
          <MoreHorizontal class名称="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class名称="w-48 bg-popover border-border shadow-md">
        <DropdownMenuItem 
          onClick={() => onViewMetrics(container)}
          class名称="cursor-pointer hover:bg-muted"
        >
          <BarChart3 class名称="mr-2 h-4 w-4" />
          {t('viewMetrics', 'docker')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onContainerAction('view-detail', container.id, container.name)}
          class名称="cursor-pointer hover:bg-muted"
        >
          <Eye class名称="mr-2 h-4 w-4" />
          {t('viewDetails', 'docker')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};