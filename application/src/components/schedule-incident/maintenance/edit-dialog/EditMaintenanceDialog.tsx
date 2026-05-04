
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  Dialog描述,
  DialogFooter
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { MaintenanceItem } from '@/services/types/maintenance.types';
import { useMaintenance编辑Form } from '../hooks/useMaintenance编辑Form';
import {
  MaintenanceBasicFields,
  MaintenanceTimeFields,
  MaintenanceAffectedFields,
  MaintenanceConfigFields,
  MaintenanceNotification设置Field
} from '../form';

interface 编辑MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenance: MaintenanceItem;
  onMaintenanceUpdated: () => void;
}

export const 编辑MaintenanceDialog = ({ 
  open, 
  onOpenChange,
  maintenance,
  onMaintenanceUpdated
}: 编辑MaintenanceDialogProps) => {
  const { t } = useLanguage();
  
  const handleSuccess = () => {
    console.log("编辑MaintenanceDialog: maintenance updated successfully");
    onMaintenanceUpdated();
  };
  
  const handle关闭 = () => {
    console.log("编辑MaintenanceDialog: closing dialog");
    onOpenChange(false);
  };
  
  const { form, on提交 } = useMaintenance编辑Form(maintenance, handleSuccess, handle关闭);

  // Log the form state for debugging
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values in edit dialog:", value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('editMaintenanceWindow')}</DialogTitle>
          <Dialog描述>
            {t('editMaintenanceDesc')}
          </Dialog描述>
        </DialogHeader>
        
        <Form {...form}>
          <form on提交={form.handle提交(on提交)} class名称="space-y-4">
            <MaintenanceBasicFields />
            <MaintenanceTimeFields />
            <MaintenanceAffectedFields />
            <MaintenanceConfigFields />
            <MaintenanceNotification设置Field />
            
            <DialogFooter class名称="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                {t('cancel')}
              </Button>
              <Button 
                type="submit"
                disabled={form.formState.is提交ting}
              >
                {form.formState.is提交ting ? t('updating') : t('updateMaintenance')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
