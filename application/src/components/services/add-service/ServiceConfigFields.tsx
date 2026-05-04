
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form描述 } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./types";
import { ServiceUrlField } from "./ServiceUrlField";
import { useState } from "react";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

interface ServiceConfigFieldsProps {
  form: UseFormReturn<ServiceFormData>;
}

export function ServiceConfigFields({ form }: ServiceConfigFieldsProps) {
  const { t } = useLanguage();
  const [isCustomInterval, setIsCustomInterval] = useState(false);
  const intervalValue = form.watch("interval");

  const handleIntervalChange = (value: string) => {
    if (value === "custom") {
      setIsCustomInterval(true);
      form.setValue("interval", "");
    } else {
      setIsCustomInterval(false);
      form.setValue("interval", value);
    }
  };

  return (
    <div class名称="space-y-4">
      <ServiceUrlField form={form} />
      
      <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("checkInterval")}</FormLabel>
              {!isCustomInterval ? (
                <FormControl>
                  <Select onValueChange={handleIntervalChange} value={isCustomInterval ? "custom" : field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 {t("seconds")}</SelectItem>
                      <SelectItem value="60">1 {t("minute")}</SelectItem>
                      <SelectItem value="300">5 {t("minutes")}</SelectItem>
                      <SelectItem value="900">15 {t("minutes")}</SelectItem>
                      <SelectItem value="1800">30 {t("minutes")}</SelectItem>
                      <SelectItem value="3600">1 {t("hour")}</SelectItem>
                      <SelectItem value="custom">{t("custom")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              ) : (
                <div class名称="space-y-2">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("checkIntervalPlaceholder")}
                      value={field.value}
                      onChange={field.onChange}
                      min="10"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomInterval(false);
                      form.setValue("interval", "60");
                    }}
                    class名称="text-sm text-blue-600 hover:text-blue-800"
                  >
	                  {t("backToPresets")}
                  </button>
                </div>
              )}
              <Form描述 class名称="text-xs">
                {isCustomInterval 
                  ? t("checkIntervalDescCustom")
                  : t("checkIntervalDesc")
                }
              </Form描述>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="retries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("retryAttempts")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value ?? "3"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 {t("attempt")}</SelectItem>
                    <SelectItem value="2">2 {t("attempts")}</SelectItem>
                    <SelectItem value="3">3 {t("attempts")}</SelectItem>
                    <SelectItem value="5">5 {t("attempts")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <Form描述 class名称="text-xs">
	              {t("retryAttemptsDesc")}
              </Form描述>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}