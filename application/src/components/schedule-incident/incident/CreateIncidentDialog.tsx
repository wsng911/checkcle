
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useIncidentForm } from './hooks/useIncidentForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  IncidentBasicFields,
  IncidentAffectedFields,
  IncidentConfigFields,
  IncidentDetailsFields,
} from './form';

interface 创建IncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIncident创建d: () => void;
}

export const 创建IncidentDialog: React.FC<创建IncidentDialogProps> = ({
  open,
  onOpenChange,
  onIncident创建d,
}) => {
  const { t } = useLanguage();
  const { form, on提交 } = useIncidentForm(
    onIncident创建d,
    () => onOpenChange(false)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[700px] max-h-[90vh]">
        <ScrollArea class名称="h-[80vh]">
          <div class名称="px-1 py-2">
            <DialogHeader class名称="mb-4">
              <DialogTitle class名称="text-xl">{t('createIncident')}</DialogTitle>
              <Dialog描述>
                {t('createIncidentDesc')}
              </Dialog描述>
            </DialogHeader>
            
            <Form {...form}>
              <form on提交={on提交} class名称="space-y-6">
                <div class名称="space-y-8 pb-4">
                  <div class名称="space-y-4">
                    <h3 class名称="text-sm font-medium border-b pb-2">{t('basicInfo')}</h3>
                    <IncidentBasicFields />
                  </div>
                  
                  <div class名称="space-y-4">
                    <h3 class名称="text-sm font-medium border-b pb-2">{t('affectedSystems')}</h3>
                    <IncidentAffectedFields />
                  </div>
                  
                  <div class名称="space-y-4">
                    <h3 class名称="text-sm font-medium border-b pb-2">{t('configuration')}</h3>
                    <IncidentConfigFields />
                  </div>
                  
                  <div class名称="space-y-4">
                    <h3 class名称="text-sm font-medium border-b pb-2">{t('resolutionDetails')}</h3>
                    <IncidentDetailsFields />
                  </div>
                  
                  <DialogFooter class名称="pt-4 mt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                    >
                      {t('cancel')}
                    </Button>
                    <Button type="submit">
                      {form.formState.is提交ting ? t('creating') : t('create')}
                    </Button>
                  </DialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

