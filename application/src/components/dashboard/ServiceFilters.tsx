
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  searchTerm: string;
  set搜索Term: (value: string) => void;
  servicesCount: number;
}

export const ServiceFilters = ({ 
  filter, 
  setFilter, 
  searchTerm, 
  set搜索Term,
  servicesCount 
}: ServiceFiltersProps) => {
  const { t } = useLanguage();
  return (
    <div class名称="mb-6 flex justify-between items-center">
      <div class名称="flex items-center">
        <h3 class名称="text-xl font-semibold mr-2 text-foreground">{t('currently监控ing')}</h3>
        <span class名称="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-sm">
          {servicesCount}
        </span>
      </div>
      <div class名称="flex space-x-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger class名称="w-40 bg-card border-border">
            <SelectValue placeholder={t('allTypes')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allTypes')}</SelectItem>
            <SelectItem value="HTTP">HTTP</SelectItem>
            <SelectItem value="PING">PING</SelectItem>
            <SelectItem value="TCP">TCP</SelectItem>
            <SelectItem value="DNS">DNS</SelectItem>
          </SelectContent>
        </Select>
        <div class名称="relative">
          <Input 
            class名称="w-72 bg-card border-border" 
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => set搜索Term(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
