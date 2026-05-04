
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIncident编辑Form } from './hooks/useIncident编辑Form';
import {
  IncidentBasicFields,
  IncidentAffectedFields,
  IncidentConfigFields,
  IncidentDetailsFields,
} from './form';
import { IncidentItem } from '@/services/incident/types';

interface 编辑IncidentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  incident: IncidentItem;
  onIncidentUpdated: () => void;
}

export const 编辑IncidentDialog: React.FC<编辑IncidentDialogProps> = ({
  open,
  onOpenChange,
  incident,
  onIncidentUpdated,
}) => {
  const { t } = useLanguage();
  
  const handle关闭 = () => {
    onOpenChange(false);
  };
  
  const { form, on提交 } = useIncident编辑Form(
    incident,
    onIncidentUpdated,
    handle关闭
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[700px] max-h-[90vh]">
        <ScrollArea class名称="h-[80vh]">
          <div class名称="px-1 py-2">
            <DialogHeader class名称="mb-4">
              <DialogTitle class名称="text-xl">{t('editIncident')}</DialogTitle>
              <Dialog描述>
                {t('editIncidentDesc')}
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
                      onClick={handle关闭}
                    >
                      {t('cancel')}
                    </Button>
                    <Button type="submit">
                      {form.formState.is提交ting ? t('updating') : t('update')}
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

