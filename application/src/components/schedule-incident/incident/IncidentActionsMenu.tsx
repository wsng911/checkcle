
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, 编辑, Trash, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateIncident状态, deleteIncident } from '@/services/incident/incidentOperations';
import { IncidentItem } from '@/services/incident/types';

interface Incident操作MenuProps {
  item: IncidentItem;
  onIncidentUpdated: () => void;
  onViewDetails?: (incident: IncidentItem) => void;
  on编辑Incident?: (incident: IncidentItem) => void;
}

export const Incident操作Menu = ({ 
  item, 
  onIncidentUpdated,
  onViewDetails,
  on编辑Incident
}: Incident操作MenuProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleResolveIncident = async () => {
    try {
      await updateIncident状态(item.id, 'resolved');
      toast({
        title: t('success'),
        description: t('incidentResolved'),
      });
      onIncidentUpdated();
    } catch (error) {
      console.error('Error resolving incident:', error);
      toast({
        title: t('error'),
        description: t('errorResolvingIncident'),
        variant: 'destructive',
      });
    }
  };

  const handle删除Incident = async () => {
    try {
      await deleteIncident(item.id);
      toast({
        title: t('success'),
        description: t('incident删除d'),
      });
      onIncidentUpdated();
    } catch (error) {
      console.error('Error deleting incident:', error);
      toast({
        title: t('error'),
        description: t('errorDeletingIncident'),
        variant: 'destructive',
      });
    }
  };

  const handle编辑Click = () => {
    if (on编辑Incident) {
      on编辑Incident(item);
    } else {
      console.log(`编辑 incident ${item.id}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" class名称="h-8 w-8 p-0">
          <span class名称="sr-only">{t('actions')}</span>
          <MoreHorizontal class名称="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class名称="bg-background">
        <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onViewDetails && (
          <DropdownMenuItem onClick={() => onViewDetails(item)}>
            <Eye class名称="mr-2 h-4 w-4" />
            {t('view')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handle编辑Click}>
          <编辑 class名称="mr-2 h-4 w-4" />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleResolveIncident}>
          <Check class名称="mr-2 h-4 w-4" />
          {t('resolve')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handle删除Incident}
          class名称="text-red-600 focus:text-red-600"
        >
          <Trash class名称="mr-2 h-4 w-4" />
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
