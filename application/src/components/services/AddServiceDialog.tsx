
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceForm } from "./ServiceForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

interface 添加ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function 添加ServiceDialog({ open, onOpenChange }: 添加ServiceDialogProps) {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const handleSuccess = async () => {
    // Immediately invalidate and refetch services data
    await queryClient.invalidateQueries({ queryKey: ["services"] });
    await queryClient.refetchQueries({ queryKey: ["services"] });
    onOpenChange(false);
  };

  const handle取消 = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle class名称="text-xl">{t("createNewService")}</DialogTitle>
          <Dialog描述>
            {t("createNewServiceDesc")}
          </Dialog描述>
        </DialogHeader>
        <ScrollArea class名称="flex-1 pr-4 overflow-auto" style={{ height: "calc(80vh - 180px)" }}>
          <div class名称="pr-2">
            <ServiceForm onSuccess={handleSuccess} on取消={handle取消} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}