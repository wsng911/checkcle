
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

export const DockerTableHeader = () => {
  const { t } = useLanguage();
  return (
    <TableHeader>
      <TableRow class名称="border-border bg-muted/30">
        <TableHead class名称="min-w-[200px] font-semibold">{t('container', 'docker')}</TableHead>
        <TableHead class名称="min-w-[100px] font-semibold">{t('status', 'docker')}</TableHead>
        <TableHead class名称="min-w-[140px] font-semibold">{t('cpuUsage', 'docker')}</TableHead>
        <TableHead class名称="min-w-[160px] font-semibold">{t('memory', 'docker')}</TableHead>
        <TableHead class名称="min-w-[160px] font-semibold">{t('disk', 'docker')}</TableHead>
        <TableHead class名称="min-w-[100px] font-semibold">{t('uptime', 'docker')}</TableHead>
        <TableHead class名称="min-w-[160px] font-semibold">{t('lastChecked', 'docker')}</TableHead>
        <TableHead class名称="min-w-[80px] text-center font-semibold">{t('actions', 'docker')}</TableHead>
      </TableRow>
    </TableHeader>
  );
};