
import { useState, useEffect, useMemo } from "react";
import { UptimeData } from "@/types/service.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 状态FilterTabs } from "./状态FilterTabs";
import { TablePagination } from "./TablePagination";
import { EmptyState } from "./EmptyState";
import { IncidentTable } from "./IncidentTable";
import { 状态Filter, PageSize } from "./types";
import { get状态ChangeEvents } from "./utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function LatestChecksTable({ uptimeData }: { uptimeData: UptimeData[] }) {
  // Get current theme
  const { theme } = useTheme();
	const { t } = useLanguage();
  
  // Filter state
  const [statusFilter, set状态Filter] = useState<状态Filter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>("25");
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, pageSize]);

  // Filter incidents by status
  const incidents = useMemo(() => {
    const statusChanges = get状态ChangeEvents(uptimeData);
  //  console.log(`Total status changes: ${statusChanges.length}`);
  //  console.log(`状态 types in incidents: ${[...new Set(statusChanges.map(i => i.status))].join(', ')}`);
    
    if (statusFilter === "all") return statusChanges;
    
    return statusChanges.filter(incident => incident.status === statusFilter);
  }, [uptimeData, statusFilter]);

  // Calculate pagination
  const { paginatedIncidents, totalPages } = useMemo(() => {
    if (pageSize === "all") {
      return {
        paginatedIncidents: incidents,
        totalPages: 1,
      };
    }
    
    const itemsPerPage = parseInt(pageSize, 10);
    const pages = Math.ceil(incidents.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    return {
      paginatedIncidents: incidents.slice(start, end),
      totalPages: Math.max(1, pages),
    };
  }, [incidents, currentPage, pageSize]);

  // Calculate items per page for pagination display
  const itemsPerPage = pageSize === "all" ? incidents.length : parseInt(pageSize, 10);

 // console.log(`状态 Filter: ${statusFilter}, Incidents: ${incidents.length}, Includes paused: ${incidents.some(i => i.status === 'paused')}`);

  return (
    <Card class名称={`mb-6 transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div class名称="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle class名称="text-card-foreground">
            <span>{t("incidentHistory")}</span>
          </CardTitle>
          <状态FilterTabs statusFilter={statusFilter} on状态FilterChange={set状态Filter} />
        </div>
      </CardHeader>
      <CardContent>
        {incidents.length === 0 ? (
          <EmptyState statusFilter={statusFilter} />
        ) : (
          <>
            <IncidentTable incidents={paginatedIncidents} />
            
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={incidents.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
