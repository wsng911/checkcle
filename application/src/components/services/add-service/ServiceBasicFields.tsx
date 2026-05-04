
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./types";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

interface ServiceBasicFieldsProps {
  form: UseFormReturn<ServiceFormData>;
}

export function ServiceBasicFields({ form }: ServiceBasicFieldsProps) {
  const { t } = useLanguage();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('service名称')}</FormLabel>
          <FormControl>
            <Input 
              placeholder={t('service名称Desc')}
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}