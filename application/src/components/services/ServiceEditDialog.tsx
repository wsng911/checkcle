
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceForm } from "./ServiceForm";
import { Service } from "@/types/service.types";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service编辑DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

export function Service编辑Dialog({ open, onOpenChange, service }: Service编辑DialogProps) {
	const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [is提交ting, setIs提交ting] = useState(false);
  
  // Reset submission state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setIs提交ting(false);
    }
  }, [open]);
  
  const handleSuccess = () => {
    // Invalidate the services query to trigger a refetch
    queryClient.invalidateQueries({ queryKey: ["services"] });
    setIs提交ting(false);
    onOpenChange(false);
  };

  const handle取消 = () => {
    if (!is提交ting) {
      onOpenChange(false);
    }
  };

  // Only render the form if dialog is open and service data exists
  // This prevents form validation errors when dialog is closed
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Only allow closing if not currently submitting
      if (!is提交ting || !newOpen) {
        onOpenChange(newOpen);
      }
    }}>
      <DialogContent class名称="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle class名称="text-xl">{t("editService")}</DialogTitle>
          <Dialog描述>
	          {t("editServiceDesc")}
          </Dialog描述>
        </DialogHeader>
        {open && service && (
          <ScrollArea class名称="flex-1 pr-4 overflow-auto" style={{ height: "calc(80vh - 180px)" }}>
            <div class名称="pr-2">
              <ServiceForm 
                onSuccess={handleSuccess} 
                on取消={handle取消}
                initialData={service}
                is编辑={true}
                on提交Start={() => setIs提交ting(true)}
              />
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}