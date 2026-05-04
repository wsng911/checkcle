
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDownloadIncidentPdf } from '../hooks';
import { IncidentItem } from '@/services/incident';

interface DownloadPdfButtonProps {
  incident: IncidentItem;
  class名称?: string;
}

export const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({ 
  incident, 
  class名称 
}) => {
  const { t } = useLanguage();
  const { handleDownloadPDF } = useDownloadIncidentPdf();
  
  return (
    <Button
      class名称={`flex items-center gap-2 ${class名称 || ''}`}
      onClick={() => handleDownloadPDF(incident)}
      variant="outline"
    >
      <Download class名称="h-4 w-4" />
      {t('downloadPdf', 'incident')}
    </Button>
  );
};
