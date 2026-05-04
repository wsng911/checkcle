
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDownloadMaintenancePdf } from '../hooks';
import { MaintenanceItem } from '@/services/maintenance';

interface DownloadPdfButtonProps {
  maintenance: MaintenanceItem;
  class名称?: string;
}

export const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({ 
  maintenance, 
  class名称 
}) => {
  const { t } = useLanguage();
  const { handleDownloadPDF } = useDownloadMaintenancePdf();
  
  return (
    <Button
      class名称={`flex items-center gap-2 ${class名称 || ''}`}
      onClick={() => handleDownloadPDF(maintenance)}
      variant="outline"
    >
      <Download class名称="h-4 w-4" />
      {t('downloadPdf')}
    </Button>
  );
};
