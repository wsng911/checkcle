
import React, { useState } from 'react';
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
import { MoreHorizontal, Eye, 编辑, Trash, Play, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import { MaintenanceItem } from '@/services/types/maintenance.types';
import { maintenanceService } from '@/services/maintenance';
import { MaintenanceDetailDialog } from './detail-dialog/MaintenanceDetailDialog';
import { 编辑MaintenanceDialog } from './edit-dialog/编辑MaintenanceDialog';

interface Maintenance操作MenuProps {
  item: MaintenanceItem;
  onMaintenanceUpdated: () => void;
}

export const Maintenance操作Menu = ({ item, onMaintenanceUpdated }: Maintenance操作MenuProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, set编辑DialogOpen] = useState(false);
  const [deleteDialogOpen, set删除DialogOpen] = useState(false);

  const handle状态Change = async (new状态: string) => {
    try {
      await maintenanceService.updateMaintenance状态(item.id, new状态);
      toast({
        title: t('statusUpdated'),
        description: t('maintenance状态Updated'),
      });
      onMaintenanceUpdated();
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      toast({
        title: t('error'),
        description: t('errorUpdatingMaintenance状态'),
        variant: 'destructive',
      });
    }
  };

  const handle删除 = async () => {
    try {
      await maintenanceService.deleteMaintenance(item.id);
      toast({
        title: t('maintenance删除d'),
        description: t('maintenance删除dDesc'),
      });
      onMaintenanceUpdated();
    } catch (error) {
      console.error('Error deleting maintenance:', error);
      toast({
        title: t('error'),
        description: t('errorDeletingMaintenance'),
        variant: 'destructive',
      });
    } finally {
      set删除DialogOpen(false);
    }
  };

  // Convert status to lowercase for consistent comparison
  const status = item.status.toLowerCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" class名称="h-8 w-8 p-0">
            <span class名称="sr-only">{t('actions')}</span>
            <MoreHorizontal class名称="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDetailDialogOpen(true)}>
            <Eye class名称="mr-2 h-4 w-4" />
            {t('view')}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => set编辑DialogOpen(true)}>
            <编辑 class名称="mr-2 h-4 w-4" />
            {t('edit')}
          </DropdownMenuItem>
          
          {status === 'scheduled' && (
            <DropdownMenuItem onClick={() => handle状态Change('in_progress')}>
              <Play class名称="mr-2 h-4 w-4" />
              {t('markAsInProgress')}
            </DropdownMenuItem>
          )}
          
          {(status === 'scheduled' || status === 'in_progress') && (
            <DropdownMenuItem onClick={() => handle状态Change('completed')}>
              <CheckCircle class名称="mr-2 h-4 w-4" />
              {t('markAsCompleted')}
            </DropdownMenuItem>
          )}
          
          {status !== 'cancelled' && (
            <DropdownMenuItem onClick={() => handle状态Change('cancelled')}>
              <X class名称="mr-2 h-4 w-4" />
              {t('markAs取消led')}
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => set删除DialogOpen(true)}
            class名称="text-red-600 focus:text-red-600"
          >
            <Trash class名称="mr-2 h-4 w-4" />
            {t('delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <MaintenanceDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        maintenance={item}
      />
      
      <编辑MaintenanceDialog
        open={editDialogOpen}
        onOpenChange={set编辑DialogOpen}
        maintenance={item}
        onMaintenanceUpdated={onMaintenanceUpdated}
      />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={set删除DialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirm删除')}</AlertDialogTitle>
            <AlertDialog描述>
              {t('deleteMaintenance确认ation')}
              <span class名称="font-semibold"> {item.title}</span>?
              {t('thisActionCannotBeUndone')}
            </AlertDialog描述>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialog取消>{t('cancel')}</AlertDialog取消>
            <AlertDialogAction onClick={handle删除} class名称="bg-red-600 hover:bg-red-700">
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
