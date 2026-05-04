
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialog取消,
  AlertDialogContent,
  AlertDialog描述,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Service } from "@/types/service.types";
import { useTheme } from "@/contexts/ThemeContext";
import { Loader2 } from "lucide-react";

interface Service删除DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: Service | null;
  on确认删除: () => Promise<void>;
  isDeleting?: boolean;
}

export const Service删除Dialog = ({
  isOpen,
  onOpenChange,
  selectedService,
  on确认删除,
  isDeleting = false,
}: Service删除DialogProps) => {
  const { theme } = useTheme();
  
  const handle确认 = async () => {
    if (!isDeleting) {
      await on确认删除();
    }
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent class名称={`${theme === 'dark' ? 'bg-gray-900 text-white border-gray-800' : 'bg-background text-foreground border-border'}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this service?</AlertDialogTitle>
          <AlertDialog描述 class名称={theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}>
            This action cannot be undone. This will permanently delete{' '}
            <span class名称={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-foreground'}>
              {selectedService?.name}
            </span>{' '}
            and all of its uptime records.
          </AlertDialog描述>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialog取消 
            class名称={theme === 'dark' ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' : 'bg-secondary'}
            disabled={isDeleting}
          >
            取消
          </AlertDialog取消>
          <AlertDialogAction
            onClick={handle确认}
            disabled={isDeleting}
            class名称={theme === 'dark' ? 'bg-red-900 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'}
          >
            {isDeleting ? (
              <>
                <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              '删除'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
