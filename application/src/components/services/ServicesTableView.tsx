
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Service } from "@/types/service.types";
import { ServiceRow } from "@/components/services/ServiceRow";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface 服务TableViewProps {
  services: Service[];
  onViewDetail: (service: Service) => void;
  onPauseResume: (service: Service) => Promise<void>;
  on编辑: (service: Service) => void;
  on删除: (service: Service) => void;
  onMuteAlerts?: (service: Service) => Promise<void>;
}

export const 服务TableView = ({ 
  services,
  onViewDetail,
  onPauseResume,
  on编辑,
  on删除,
  onMuteAlerts
}: 服务TableViewProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div class名称={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg overflow-hidden border border-border shadow-sm`}>
      <div class名称="overflow-auto">
        <Table>
          <TableHeader class名称={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} sticky top-0 z-10`}>
            <TableRow class名称={`${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("service名称")}</TableHead>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("serviceType")}</TableHead>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("service状态")}</TableHead>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("responseTime")}</TableHead>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("uptime")}</TableHead>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("lastChecked")}</TableHead>
              <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceRow 
                  key={service.id}
                  service={service}
                  onViewDetail={onViewDetail}
                  onPauseResume={onPauseResume}
                  on编辑={on编辑}
                  on删除={on删除}
                  onMuteAlerts={onMuteAlerts}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} class名称={`text-center py-8 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {t("no服务")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};