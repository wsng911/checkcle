
import React, { memo, useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Incident状态Dropdown } from '../Incident状态Dropdown';
import { Incident操作Menu } from '../Incident操作Menu';
import { IncidentItem } from '@/services/incident';
import { AssignedUserCell } from './IncidentTableUtils';

interface IncidentTableRowProps {
  item: IncidentItem;
  formatDate: (date: string | undefined) => string;
  getAffectedSystemsArray: (systems: string | undefined) => string[];
  onViewDetails?: (incident: IncidentItem) => void;
  on编辑Incident?: (incident: IncidentItem) => void;
  onIncidentUpdated: () => void;
  t: (key: string) => string;
}

export const IncidentTableRow = memo(({ 
  item, 
  formatDate, 
  getAffectedSystemsArray, 
  onViewDetails, 
  on编辑Incident,
  onIncidentUpdated, 
  t
}: IncidentTableRowProps) => {
  // Use local state for optimistic UI updates
  const [localItem, setLocalItem] = useState(item);
  
  // Update local state when props change
  React.useEffect(() => {
    setLocalItem(item);
  }, [item]);
  
  // Handle status updates locally
  const handle状态Updated = () => {
    console.log("状态 updated in TableRow, calling onIncidentUpdated");
    onIncidentUpdated();
  };
  
  return (
    <TableRow 
      key={localItem.id} 
      class名称="hover:bg-muted/40 cursor-pointer"
      onClick={() => onViewDetails && onViewDetails(localItem)}
    >
      <TableCell class名称="font-medium max-w-[200px] truncate">
        {localItem.title || localItem.description || '-'}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Incident状态Dropdown
          status={localItem.impact_status || localItem.status || 'investigating'}
          id={localItem.id}
          on状态Updated={handle状态Updated}
        />
      </TableCell>
      <TableCell>
        <Badge variant={
          localItem.priority?.toLowerCase() === 'critical' ? 'destructive' :
          localItem.priority?.toLowerCase() === 'high' ? 'default' :
          localItem.priority?.toLowerCase() === 'medium' ? 'secondary' : 'outline'
        }>
          {t(localItem.priority?.toLowerCase() || 'low')}
        </Badge>
      </TableCell>
      <TableCell>{formatDate(localItem.created)}</TableCell>
      <TableCell>
        <div class名称="flex flex-wrap gap-1">
          {getAffectedSystemsArray(localItem.affected_systems).map((system, idx) => (
            <Badge key={`${localItem.id}-system-${idx}`} variant="outline">{system}</Badge>
          ))}
          {getAffectedSystemsArray(localItem.affected_systems).length === 0 && '-'}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={
          localItem.impact?.toLowerCase() === 'critical' ? 'destructive' :
          localItem.impact?.toLowerCase() === 'high' ? 'default' :
          localItem.impact?.toLowerCase() === 'medium' ? 'secondary' : 'outline'
        }>
          {t(localItem.impact?.toLowerCase() || 'low')}
        </Badge>
      </TableCell>
      <TableCell>
        <AssignedUserCell userId={localItem.assigned_users || localItem.assigned_to} />
      </TableCell>
      <TableCell class名称="text-right" onClick={(e) => e.stopPropagation()}>
        <div class名称="flex justify-end items-center space-x-2">
          {onViewDetails && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(localItem);
              }}
              class名称="h-8 w-8 p-0"
            >
              <Eye class名称="h-4 w-4" />
              <span class名称="sr-only">{t('view')}</span>
            </Button>
          )}
          <Incident操作Menu 
            item={localItem} 
            onIncidentUpdated={onIncidentUpdated}
            onViewDetails={onViewDetails}
            on编辑Incident={on编辑Incident}
          />
        </div>
      </TableCell>
    </TableRow>
  );
});

IncidentTableRow.display名称 = 'IncidentTableRow';
