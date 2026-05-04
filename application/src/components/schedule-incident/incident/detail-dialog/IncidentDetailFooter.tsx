
import React from 'react';
import { IncidentItem } from '@/services/incident';
import { Separator } from '@/components/ui/separator';
import { 关闭Button, DownloadPdfButton, PrintButton } from './components';
import { useLanguage } from '@/contexts/LanguageContext';

interface IncidentDetailFooterProps {
  on关闭: () => void;
  incident: IncidentItem;
}

export const IncidentDetailFooter: React.FC<IncidentDetailFooterProps> = ({
  on关闭,
  incident,
}) => {
  const { t } = useLanguage();

  return (
    <div class名称="print:hidden">
      <Separator class名称="my-6" />
      <div class名称="flex justify-between items-center">
        <关闭Button on关闭={on关闭} />
        <div class名称="flex gap-2">
          <DownloadPdfButton incident={incident} />
          <PrintButton />
        </div>
      </div>
    </div>
  );
};
