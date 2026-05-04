
import { useEffect } from "react";
import { Service } from "@/types/service.types";
import { 服务TableView } from "./服务TableView";
import { 服务Pagination } from "./服务Pagination";
import { Service删除Dialog } from "./Service删除Dialog";
import { ServiceHistoryDialog } from "./ServiceHistoryDialog";
import { Service编辑Dialog } from "./Service编辑Dialog";
import { useService操作, useDialogState } from "./hooks";
import { use服务Pagination } from "@/hooks/use服务Pagination";

interface 服务TableContainerProps {
  services: Service[];
}

export const 服务TableContainer = ({ services }: 服务TableContainerProps) => {
  const {
    services: local服务,
    selectedService,
    isDeleting,
    setSelectedService,
    update服务,
    handleViewDetail,
    handlePauseResume,
    handle编辑,
    handle删除,
    confirm删除,
    handleMuteAlerts
  } = useService操作(services);

  const {
    isHistoryDialogOpen,
    is删除DialogOpen,
    is编辑DialogOpen,
    setIsHistoryDialogOpen,
    setIs删除DialogOpen,
    handle编辑DialogChange,
    handle删除DialogChange
  } = useDialogState();

  const {
    paginated服务,
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    handlePageChange,
    handlePageSizeChange,
  } = use服务Pagination({ services: local服务 });

  // Update local services state when props change
  useEffect(() => {
    update服务(services);
  }, [services]);

  // Handler functions that combine local state management
  const on编辑 = (service: Service) => {
    const selectedService = handle编辑(service);
    setTimeout(() => {
      handle编辑DialogChange(true);
    }, 0);
  };
  
  const on删除 = (service: Service) => {
    handle删除(service);
    setIs删除DialogOpen(true);
  };
  
  const openHistoryDialog = (service: Service) => {
    setSelectedService(service);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div class名称="flex-1 flex flex-col h-full">
      <服务TableView 
        services={paginated服务}
        onViewDetail={handleViewDetail}
        onPauseResume={handlePauseResume}
        on编辑={on编辑}
        on删除={on删除}
        onMuteAlerts={handleMuteAlerts}
      />

      <服务Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <ServiceHistoryDialog 
        isOpen={isHistoryDialogOpen}
        onOpenChange={setIsHistoryDialogOpen}
        selectedService={selectedService}
      />

      <Service删除Dialog 
        isOpen={is删除DialogOpen}
        onOpenChange={(open) => handle删除DialogChange(open, isDeleting)}
        selectedService={selectedService}
        on确认删除={confirm删除}
        isDeleting={isDeleting}
      />

      <Service编辑Dialog
        open={is编辑DialogOpen}
        onOpenChange={handle编辑DialogChange}
        service={selectedService}
      />
    </div>
  );
}