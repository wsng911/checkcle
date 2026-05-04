
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { DockerContainer } from "@/types/docker.types";
import { DockerMetricsDialog } from "./DockerMetricsDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  DockerTable搜索, 
  DockerTableHeader, 
  DockerTableRow, 
  DockerEmptyState 
} from "./table";

interface Docker容器TableProps {
  containers: DockerContainer[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const Docker容器Table = ({ containers, isLoading, onRefresh }: Docker容器TableProps) => {
  const { t } = useLanguage();
  const [searchTerm, set搜索Term] = useState("");
  const [selectedContainer, setSelectedContainer] = useState<DockerContainer | null>(null);
  const [metricsDialogOpen, setMetricsDialogOpen] = useState(false);

  const filtered容器 = containers.filter(container =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.docker_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.hostname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContainerAction = (action: string, containerId: string, container名称: string) => {
    console.log(`${action} action for container ${container名称} (${containerId})`);
    // TODO: Implement container actions
  };

  const handleRowClick = (container: DockerContainer) => {
    setSelectedContainer(container);
    setMetricsDialogOpen(true);
  };

  const handleViewMetrics = (container: DockerContainer) => {
    setSelectedContainer(container);
    setMetricsDialogOpen(true);
  };

  return (
    <>
      <Card class名称="w-full bg-transparent border-0 shadow-none">
        <CardHeader class名称="pb-4 px-0">
          <div class名称="flex flex-col gap-4">
            <div class名称="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle class名称="text-lg sm:text-xl font-semibold">{t('docker容器', 'docker')}</CardTitle>
              <DockerTable搜索
                searchTerm={searchTerm}
                on搜索Change={set搜索Term}
                onRefresh={onRefresh}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent class名称="p-0">
          <div class名称="overflow-x-auto">
            <div class名称="min-w-full inline-block align-middle">
              <div class名称="overflow-hidden border border-border rounded-lg shadow-sm">
                <Table>
                  <DockerTableHeader />
                  <TableBody>
                    {filtered容器.length === 0 ? (
                      <DockerEmptyState searchTerm={searchTerm} />
                    ) : (
                      filtered容器.map((container) => (
                        <DockerTableRow
                          key={container.id}
                          container={container}
                          onRowClick={handleRowClick}
                          onContainerAction={handleContainerAction}
                          onViewMetrics={handleViewMetrics}
                        />
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DockerMetricsDialog
        container={selectedContainer}
        open={metricsDialogOpen}
        onOpenChange={setMetricsDialogOpen}
      />
    </>
  );
};