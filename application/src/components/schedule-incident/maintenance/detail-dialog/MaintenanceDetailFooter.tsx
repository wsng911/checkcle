
import React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { MaintenanceItem } from '@/services/types/maintenance.types';
import { 
  PrintButton,
  DownloadPdfButton,
  关闭Button
} from './components';

interface MaintenanceDetailFooterProps {
  maintenance: MaintenanceItem;
  on关闭: () => void;
}

export const MaintenanceDetailFooter = ({ 
  maintenance,
  on关闭
}: MaintenanceDetailFooterProps) => {
  return (
    <DialogFooter class名称="gap-2 sm:gap-2 mt-6 pt-4 border-t print:hidden">
      <PrintButton maintenance={maintenance} />
      <DownloadPdfButton maintenance={maintenance} />
      <关闭Button on关闭={on关闭} />
    </DialogFooter>
  );
};
