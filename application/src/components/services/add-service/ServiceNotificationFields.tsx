import { FormControl, FormField, FormItem, FormLabel, Form描述 } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./types";
import { useQuery } from "@tanstack/react-query";
import { alertConfigService, AlertConfiguration } from "@/services/alertConfigService";
import { serviceNotificationTemplateService, ServiceNotificationTemplate } from "@/services/serviceNotificationTemplateService";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext.tsx";

interface ServiceNotificationFieldsProps {
  form: UseFormReturn<ServiceFormData>;
}

export function ServiceNotificationFields({ form }: ServiceNotificationFieldsProps) {
	const { t } = useLanguage();
  const [alertConfigs, setAlertConfigs] = useState<AlertConfiguration[]>([]);
  
  // Get the current form values for debugging
  const notification状态 = form.watch("notification状态");
  const notificationChannels = form.watch("notificationChannels") || [];
  const alertTemplate = form.watch("alertTemplate");
   
  // Fetch alert configurations for notification channels
  const { data: alertConfigsData } = useQuery({
    queryKey: ['alertConfigs'],
    queryFn: () => alertConfigService.getAlertConfigurations(),
  });

  // Fetch service notification templates
  const { data: serviceTemplates, isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['serviceNotificationTemplates'],
    queryFn: () => serviceNotificationTemplateService.getTemplates(),
  });
  
  // Update alert configs when data is loaded
  useEffect(() => {
    if (alertConfigsData) {
      // Only show enabled channels
      const enabledChannels = alertConfigsData.filter(config => config.enabled);
      setAlertConfigs(enabledChannels);
      
      // Debug log to check what alert configs are loaded
    }
  }, [alertConfigsData]);

  // Debug log for service templates
  useEffect(() => {
    if (serviceTemplates) {
     // console.log("Loaded service notification templates:", serviceTemplates);
    }
  }, [serviceTemplates]);

  // Log when form values change to debug
  useEffect(() => {
   // console.log("Notification values changed:", {
   //   notification状态: form.getValues("notification状态"),
   //   notificationChannels: form.getValues("notificationChannels")
   // });
  }, [form.watch("notification状态"), form.watch("notificationChannels")]);

  const handleChannel添加 = (channelId: string) => {
    const currentChannels = form.getValues("notificationChannels") || [];
    if (!currentChannels.includes(channelId)) {
      form.setValue("notificationChannels", [...currentChannels, channelId]);
    }
  };

  const handleChannel移除 = (channelId: string) => {
    const currentChannels = form.getValues("notificationChannels") || [];
    form.setValue("notificationChannels", currentChannels.filter(id => id !== channelId));
  };

  const getSelectedChannel名称s = () => {
    return (notificationChannels || []).map(channelId => {
      const config = alertConfigs.find(c => c.id === channelId);
      return config ? `${config.notify_name} (${config.notification_type})` : channelId;
    });
  };
  
  return (
    <>
      <FormField
        control={form.control}
        name="notification状态"
        render={({ field }) => (
          <FormItem class名称="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class名称="space-y-0.5">
              <FormLabel class名称="text-base">
	              {t("enableNotifications")}
              </FormLabel>
              <Form描述>
	              {t("enableNotificationsDesc")}
              </Form描述>
            </div>
            <FormControl>
              <Switch
                checked={field.value === "enabled"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "enabled" : "disabled");
                  // Clear notification channels when disabled
                  if (!checked) {
                    form.setValue("notificationChannels", []);
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="notificationChannels"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("notificationChannels")}</FormLabel>
            <Form描述>
              {notification状态 === "enabled" 
                ? t("notificationChannelsEnabledDesc")
                : t("notificationChannelsDesc")}
            </Form描述>
            
            {/* Display selected channels as badges */}
            {notificationChannels && notificationChannels.length > 0 && (
              <div class名称="flex flex-wrap gap-2 mb-2">
                {getSelectedChannel名称s().map((channel名称, index) => (
                  <Badge key={notificationChannels[index]} variant="secondary" class名称="flex items-center gap-1">
                    {channel名称}
                    <X 
                      class名称="h-3 w-3 cursor-pointer" 
                      onClick={() => handleChannel移除(notificationChannels[index])}
                    />
                  </Badge>
                ))}
              </div>
            )}
            
            <FormControl>
              <Select 
                onValueChange={handleChannel添加}
                disabled={notification状态 !== "enabled"}
                value="" // Always reset to empty after selection
              >
                <SelectTrigger class名称={notification状态 !== "enabled" ? 'opacity-50' : ''}>
                  <SelectValue placeholder={t("notificationChannelsPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {alertConfigs
                    .filter(config => !notificationChannels?.includes(config.id || ""))
                    .map((config) => (
                      <SelectItem key={config.id} value={config.id || ""}>
                        {config.notify_name} ({config.notification_type})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
            
      <FormField
        control={form.control}
        name="alertTemplate"
        render={({ field }) => {
         // console.log("Rendering alert template field with value:", field.value);
          
          return (
            <FormItem>
              <FormLabel>{t("alertTemplate")}</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                  }} 
                  value={field.value || ""}
                  disabled={notification状态 !== "enabled" || isLoadingTemplates}
                >
                  <SelectTrigger class名称={notification状态 !== "enabled" ? 'opacity-50' : ''}>
                    <SelectValue placeholder={isLoadingTemplates ? t("alertTemplateLoading") : t("alertTemplatePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTemplates?.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <Form描述>
                {notification状态 === "enabled"
                  ? t("alertTemplateEnabledDesc")
                  : t("alertTemplateDesc")}
              </Form描述>
            </FormItem>
          );
        }}
      />
    </>
  );
}