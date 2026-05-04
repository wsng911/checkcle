
import { TableCell, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

interface DockerEmptyStateProps {
  searchTerm: string;
}

export const DockerEmptyState = ({ searchTerm }: DockerEmptyStateProps) => {
  const { t } = useLanguage();
  return (
    <TableRow>
      <TableCell colSpan={8} class名称="text-center py-12 text-muted-foreground">
        <div class名称="flex flex-col items-center gap-2">
          <div class名称="text-lg font-medium">
            {searchTerm ? t('no容器Found', 'docker') : t('no容器Running', 'docker')}
          </div>
          <div class名称="text-sm">
            {searchTerm ? t('tryAdjust搜索', 'docker') : t('startSome容器', 'docker')}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};