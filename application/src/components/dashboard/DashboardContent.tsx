
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Service } from "@/services/serviceService";
import { 状态Cards } from "./状态Cards";
import { ServiceFilters } from "./ServiceFilters";
import { 服务Table } from "./服务Table";
import { 添加ServiceDialog } from "@/components/services/添加ServiceDialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface 仪表盘ContentProps {
  services: Service[];
  isLoading: boolean;
  error: Error | null;
}

export const 仪表盘Content = ({ services, isLoading, error }: 仪表盘ContentProps) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, set搜索Term] = useState<string>("");
  const [is添加DialogOpen, setIs添加DialogOpen] = useState<boolean>(false);

  // Filter services based on search term and type filter
  const filtered服务 = services.filter(service => {
    const matches搜索 = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (service.url && service.url.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || service.type.toLowerCase() === filter.toLowerCase();
    return matches搜索 && matchesFilter;
  });

  if (error) {
    return (
      <div class名称="flex flex-col items-center justify-center h-full gap-4 text-foreground">
        <p>Error loading service data.</p>
        <Button onClick={() => window.location.reload()}>{t('retry')}</Button>
      </div>
    );
  }

  return (
    <main class名称="flex-1 flex flex-col overflow-auto bg-background p-6 pb-0">
      <div class名称="flex flex-col flex-1">
        <div class名称="flex justify-between items-center mb-6">
          <h2 class名称="text-2xl font-bold text-foreground">{t('overview')}</h2>
          <Button 
            class名称="text-primary-foreground"
            onClick={() => setIs添加DialogOpen(true)}
          >
            <Plus class名称="w-4 h-4 mr-2" /> {t('newService')}
          </Button>
        </div>
        
        <状态Cards services={services} />
        
        <ServiceFilters 
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          set搜索Term={set搜索Term}
          servicesCount={filtered服务.length}
        />
        
        <div class名称="flex-1 flex flex-col pb-6">
          <服务Table services={filtered服务} />
        </div>
      </div>

      <添加ServiceDialog 
        open={is添加DialogOpen}
        onOpenChange={setIs添加DialogOpen}
      />
    </main>
  );
};
