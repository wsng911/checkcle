
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { MaintenanceFormValues } from '../hooks/useMaintenanceForm';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const MaintenanceAffectedFields: React.FC = () => {
  const { t } = useLanguage();
  const { control } = useFormContext<MaintenanceFormValues>();

  return (
    <FormField
      control={control}
      name="affected"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('affected服务')}</FormLabel>
          <FormControl>
            <Input placeholder={t('enterAffected服务')} {...field} />
          </FormControl>
          <FormMessage />
          <p class名称="text-sm text-muted-foreground">{t('separate服务WithComma')}</p>
        </FormItem>
      )}
    />
  );
};
