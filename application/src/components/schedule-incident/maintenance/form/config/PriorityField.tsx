
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  Form描述 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export const PriorityField = () => {
  const { t } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('priority')}</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('selectPriority')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="low">{t('low')}</SelectItem>
              <SelectItem value="medium">{t('medium')}</SelectItem>
              <SelectItem value="high">{t('high')}</SelectItem>
              <SelectItem value="critical">{t('critical')}</SelectItem>
            </SelectContent>
          </Select>
          <Form描述>
            {t('priority描述')}
          </Form描述>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
