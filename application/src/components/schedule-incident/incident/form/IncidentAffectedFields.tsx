
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { IncidentFormValues } from '../hooks/useIncidentForm';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const IncidentAffectedFields: React.FC = () => {
  const { t } = useLanguage();
  const { control } = useFormContext<IncidentFormValues>();

  return (
    <div class名称="space-y-4">
      <FormField
        control={control}
        name="affected_systems"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('affectedSystems')}</FormLabel>
            <FormControl>
              <Input placeholder={t('enterAffectedSystems')} {...field} />
            </FormControl>
            <FormMessage />
            <p class名称="text-sm text-muted-foreground">{t('separateSystemsWithComma')}</p>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="root_cause"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('rootCause')}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t('enterRootCause')}
                class名称="min-h-[80px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
