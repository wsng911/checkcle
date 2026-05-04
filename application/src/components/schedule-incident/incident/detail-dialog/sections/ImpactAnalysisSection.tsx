
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IncidentItem } from '@/services/incident';
import { Badge } from '@/components/ui/badge';

interface ImpactAnalysisSectionProps {
  incident: IncidentItem | null;
  assignedUser?: any | null;
}

export const ImpactAnalysisSection: React.FC<ImpactAnalysisSectionProps> = ({ incident }) => {
  const { t } = useLanguage();
  
  if (!incident) return null;
  
  return (
    <div class名称="space-y-2">
      <h3 class名称="font-semibold text-lg">{t('impactAnalysis')}</h3>
      
      <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class名称="text-sm font-medium text-muted-foreground">{t('impact')}</h4>
          <div class名称="mt-1">
            <Badge variant={
              incident.impact?.toLowerCase() === 'critical' ? 'destructive' :
              incident.impact?.toLowerCase() === 'high' ? 'default' :
              incident.impact?.toLowerCase() === 'medium' ? 'secondary' : 'outline'
            }>
              {t(incident.impact?.toLowerCase() || 'low')}
            </Badge>
          </div>
        </div>
        
        <div>
          <h4 class名称="text-sm font-medium text-muted-foreground">{t('priority')}</h4>
          <div class名称="mt-1">
            <Badge variant={
              incident.priority?.toLowerCase() === 'critical' ? 'destructive' :
              incident.priority?.toLowerCase() === 'high' ? 'default' :
              incident.priority?.toLowerCase() === 'medium' ? 'secondary' : 'outline'
            }>
              {t(incident.priority?.toLowerCase() || 'low')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

