
import { format } from "date-fns";
import { UptimeData } from "@/types/service.types";
import { get状态Info } from "./utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface IncidentTableProps {
  incidents: UptimeData[];
}

export function IncidentTable({ incidents }: IncidentTableProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  if (incidents.length === 0) {
    return null;
  }

  return (
    <Table class名称={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>
      <TableHeader class名称={theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}>
        <TableRow class名称={theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}>
          <TableHead class名称={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{t("time")}</TableHead>
          <TableHead class名称={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{t("status")}</TableHead>
          <TableHead class名称={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{t("responseTime")}</TableHead>
          <TableHead class名称={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{t("errorMessage")}</TableHead>
          <TableHead class名称={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{t("details")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incidents.map((check, index) => {
          const statusInfo = get状态Info(check.status);
          const timestamp = new Date(check.timestamp);
          
          return (
            <TableRow key={check.id || `incident-${index}`} class名称={theme === 'dark' ? 'border-gray-800 hover:bg-gray-800/30' : 'border-gray-200 hover:bg-gray-50'}>
              <TableCell>
                <div class名称="flex flex-col">
                  <span>{format(timestamp, 'MMM dd, yyyy')}</span>
                  <span class名称={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {format(timestamp, 'h:mm a')}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div class名称="flex items-center">
                  {statusInfo.badge}
                </div>
              </TableCell>
              <TableCell class名称={`font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {check.status !== "paused" && check.responseTime > 0 
                  ? `${check.responseTime}ms` 
                  : "N/A"}
              </TableCell>
              <TableCell class名称={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-[200px]`}>
                {check.error_message ? (
                  <div class名称="truncate" title={check.error_message}>
                    {check.error_message}
                  </div>
                ) : (
                  <span class名称={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>-</span>
                )}
              </TableCell>
              <TableCell class名称={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-[250px]`}>
                {check.details ? (
                  <div class名称="truncate" title={check.details}>
                    {check.details}
                  </div>
                ) : (
                  <span class名称={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>-</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}