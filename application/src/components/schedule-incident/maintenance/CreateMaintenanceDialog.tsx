
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
import { useMaintenanceForm } from './hooks/useMaintenanceForm';
import {
  MaintenanceBasicFields,
  MaintenanceTimeFields,
  MaintenanceAffectedFields,
  MaintenanceConfigFields,
  MaintenanceNotification设置Field
} from './form';

interface 创建MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMaintenance创建d: () => void;
}

export const 创建MaintenanceDialog = ({ 
  open, 
  onOpenChange,
  onMaintenance创建d 
}: 创建MaintenanceDialogProps) => {
  const { t } = useLanguage();
  
  const handleSuccess = () => {
    console.log("创建MaintenanceDialog: maintenance created successfully");
    onMaintenance创建d();
  };
  
  const handle关闭 = () => {
    console.log("创建MaintenanceDialog: closing dialog");
    onOpenChange(false);
  };
  
  const { form, on提交 } = useMaintenanceForm(handleSuccess, handle关闭);

  // Log the form state for debugging
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('createMaintenanceWindow')}</DialogTitle>
          <Dialog描述>
            {t('createMaintenanceDesc')}
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
                {form.formState.is提交ting ? t('creating') : t('createMaintenance')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
