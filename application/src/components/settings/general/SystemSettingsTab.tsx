
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { 设置TabProps } from "./types";

const System设置Tab: React.FC<设置TabProps> = ({ form, is编辑ing, settings }) => {
  const { t } = useLanguage();

  return (
    <div class名称="space-y-6">
      <div class名称="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormField
            control={form.control}
            name="meta.app名称"
            render={({ field }) => (
              <FormItem>
                <FormLabel class名称="text-sm font-medium text-foreground">
                  {t("app名称", "settings")} <span class名称="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!is编辑ing}
                    placeholder="CheckCle"
                    class名称="bg-background border-input text-foreground placeholder:text-muted-foreground disabled:bg-muted disabled:text-muted-foreground"
                    value={field.value || settings?.system_name || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <FormField
            control={form.control}
            name="meta.appURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel class名称="text-sm font-medium text-foreground">
                  {t("appURL", "settings")} <span class名称="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!is编辑ing}
                    placeholder="https://pb-api.k8sops.asia"
                    class名称="bg-background border-input text-foreground placeholder:text-muted-foreground disabled:bg-muted disabled:text-muted-foreground"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default System设置Tab;