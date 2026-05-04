
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 搜索, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DockerTable搜索Props {
  searchTerm: string;
  on搜索Change: (value: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const DockerTable搜索 = ({ searchTerm, on搜索Change, onRefresh, isLoading }: DockerTable搜索Props) => {
  const { t } = useLanguage();
  return (
    <div class名称="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div class名称="relative flex-1 sm:flex-initial">
        <搜索 class名称="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t('search容器Placeholder', 'docker')}
          value={searchTerm}
          onChange={(e) => on搜索Change(e.target.value)}
          class名称="pl-10 sm:w-64 bg-background border-border"
        />
      </div>
      <Button
        onClick={onRefresh}
        disabled={isLoading}
        variant="outline"
        size="default"
        class名称="w-full sm:w-auto bg-background border-border hover:bg-muted"
      >
        <RefreshCw class名称={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        <span class名称="sm:inline">{t('refresh', 'docker')}</span>
      </Button>
    </div>
  );
};