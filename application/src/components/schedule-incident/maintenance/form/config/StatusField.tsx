
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

export const 状态Field = () => {
  const { t } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('status')}</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t('select状态')} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="scheduled">{t('scheduled')}</SelectItem>
              <SelectItem value="in_progress">{t('inProgress')}</SelectItem>
              <SelectItem value="completed">{t('completed')}</SelectItem>
              <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
            </SelectContent>
          </Select>
          <Form描述>
            {t('status描述')}
          </Form描述>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
