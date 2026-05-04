
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IncidentItem } from '@/services/incident/types';

interface IncidentDetailHeaderProps {
  incident: IncidentItem;
}

export const IncidentDetailHeader = ({ incident }: IncidentDetailHeaderProps) => {
  return (
    <DialogHeader class名称="mb-4">
      <div class名称="flex items-center gap-2">
        <DialogTitle class名称="text-xl">{incident.title || 'Incident Details'}</DialogTitle>
        <span class名称="text-sm text-muted-foreground">#{incident.id}</span>
      </div>
    </DialogHeader>
  );
};
