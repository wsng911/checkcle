
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrintIncident } from '../hooks';

interface PrintButtonProps {
  class名称?: string;
}

export const PrintButton: React.FC<PrintButtonProps> = ({ class名称 }) => {
  const { t } = useLanguage();
  const { handlePrint } = usePrintIncident();
  
  return (
    <Button
      class名称={`flex items-center gap-2 ${class名称 || ''}`}
      onClick={handlePrint}
      variant="default"
    >
      <Printer class名称="h-4 w-4" />
      {t('print', 'incident')}
    </Button>
  );
};
