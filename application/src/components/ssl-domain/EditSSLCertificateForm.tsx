
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, Form描述, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { SSLCertificate } from "@/types/ssl.types";
import { Loader2, Bell, X } from "lucide-react";
import { toast } from "sonner";
import { alertConfigService, AlertConfiguration } from "@/services/alertConfigService";
import { sslNotificationTemplateService, SslNotificationTemplate } from "@/services/sslNotificationTemplateService";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
  warning_threshold: z.coerce.number().min(1, "Warning threshold must be at least 1 day"),
  expiry_threshold: z.coerce.number().min(1, "Expiry threshold must be at least 1 day"),
  notification_channels: z.array(z.string()).default([]),
  alert_template: z.string().optional(),
  check_interval: z.coerce.number().int().min(1).max(30).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface 编辑SSLCertificateFormProps {
  certificate: SSLCertificate;
  on提交: (data: SSLCertificate) => void;
  on取消: () => void;
  isPending: boolean;
}

export const 编辑SSLCertificateForm = ({ certificate, on提交, on取消, isPending }: 编辑SSLCertificateFormProps) => {
  const { t } = useLanguage();
  const [alertConfigs, setAlertConfigs] = useState<AlertConfiguration[]>([]);
  const [sslTemplates, setSslTemplates] = useState<SslNotificationTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Parse existing notification channels from certificate data
  const parseNotificationChannels = (cert: SSLCertificate): string[] => {
    const channels: string[] = [];
    
    // Check notification_id field first (multi-channel support)
    if (cert.notification_id && cert.notification_id.trim()) {
      channels.push(...cert.notification_id.split(',').map(id => id.trim()).filter(Boolean));
    }
    // Fallback to notification_channel field
    else if (cert.notification_channel && cert.notification_channel.trim()) {
      channels.push(...cert.notification_channel.split(',').map(id => id.trim()).filter(Boolean));
    }
    return channels;
  };

  // Get the alert template from certificate data
  const getAlertTemplate = (cert: SSLCertificate): string => {
    let templateId = "";
    
    // Check template_id field first (new field for PocketBase)
    if (cert.template_id && cert.template_id.trim()) {
      templateId = cert.template_id;
    }
    // Fallback to alert_template field
    else if (cert.alert_template && cert.alert_template.trim()) {
      templateId = cert.alert_template;
    }

    return templateId || "none";
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: certificate.domain,
      warning_threshold: certificate.warning_threshold,
      expiry_threshold: certificate.expiry_threshold,
      notification_channels: parseNotificationChannels(certificate),
      alert_template: getAlertTemplate(certificate),
      check_interval: certificate.check_interval || 1,
    },
  });

  const notificationChannels = form.watch("notification_channels") || [];

  // Fetch notification channels and SSL templates when form loads
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch notification channels
        const configs = await alertConfigService.getAlertConfigurations();
        const enabledConfigs = configs.filter(config => {
          if (typeof config.enabled === 'string') {
            return config.enabled === "true";
          }
          return config.enabled === true;
        });
        setAlertConfigs(enabledConfigs);

        // Fetch SSL notification templates
        const templates = await sslNotificationTemplateService.getTemplates();
        setSslTemplates(templates);
      } catch (error) {
        toast.error(t('failedToLoadCertificates'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [t]);

  // Update form values when certificate data changes
  useEffect(() => {
    if (certificate) {
      const channels = parseNotificationChannels(certificate);
      const template = getAlertTemplate(certificate);
      
      form.reset({
        domain: certificate.domain,
        warning_threshold: certificate.warning_threshold,
        expiry_threshold: certificate.expiry_threshold,
        notification_channels: channels,
        alert_template: template,
        check_interval: certificate.check_interval || 1,
      });
      
    }
  }, [certificate, form]);

  const handleChannel添加 = (channelId: string) => {
    const currentChannels = form.getValues("notification_channels") || [];
    if (!currentChannels.includes(channelId)) {
      const newChannels = [...currentChannels, channelId];
      form.setValue("notification_channels", newChannels);
    }
  };

  const handleChannel移除 = (channelId: string) => {
    const currentChannels = form.getValues("notification_channels") || [];
    const newChannels = currentChannels.filter(id => id !== channelId);
    form.setValue("notification_channels", newChannels);
  };

  const getSelectedChannel名称s = () => {
    return (notificationChannels || []).map(channelId => {
      const config = alertConfigs.find(c => c.id === channelId);
      return config ? `${config.notify_name} (${config.notification_type})` : channelId;
    });
  };

  const handle提交 = (data: FormValues) => {  
    // Merge the updated values with the original certificate
    const updatedCertificate: SSLCertificate = {
      ...certificate,
      ...data,
      
      notification_channel: data.notification_channels.length > 0 ? data.notification_channels.join(',') : '',
      notification_id: data.notification_channels.length > 0 ? data.notification_channels.join(',') : '',
      template_id: data.alert_template && data.alert_template !== 'none' ? data.alert_template : '',
      warning_threshold: Number(data.warning_threshold),
      expiry_threshold: Number(data.expiry_threshold),
      check_interval: data.check_interval ? Number(data.check_interval) : undefined
    };
    
    on提交(updatedCertificate);
  };

  return (
    <Form {...form}>
      <form on提交={form.handle提交(handle提交)} class名称="space-y-4">
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('domain名称')}</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="example.com" 
                  disabled={true}
                />
              </FormControl>
              <Form描述>
                {t('domainCannotChange')}
              </Form描述>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div class名称="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="warning_threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('warningThresholdDays')}</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="number"
                    min="1"
                    placeholder="30" 
                  />
                </FormControl>
                <Form描述>
                  {t('daysBeforeExpiration')}
                </Form描述>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="expiry_threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('expiryThresholdDays')}</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="number"
                    min="1"
                    placeholder="7" 
                  />
                </FormControl>
                <Form描述>
                  {t('daysBeforeCritical')}
                </Form描述>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="check_interval"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Interval (Days)</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type="number"
                    min="1"
                    max="30"
                    placeholder="1" 
                  />
                </FormControl>
                <Form描述>
                  How often to check
                </Form描述>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="notification_channels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('notificationChannel')}</FormLabel>
              <Form描述>
                Select multiple notification channels for this SSL certificate
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
                  disabled={isLoading}
                  value=""
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('chooseChannel')} />
                  </SelectTrigger>
                  <SelectContent>
                    {alertConfigs
                      .filter(config => config.id && !notificationChannels?.includes(config.id))
                      .map((config) => (
                        <SelectItem key={config.id} value={config.id || "unknown"}>
                          {config.notify_name} ({config.notification_type})
                        </SelectItem>
                      ))}
                    {alertConfigs.filter(config => config.id && !notificationChannels?.includes(config.id)).length === 0 && (
                      <SelectItem value="no-available-channels" disabled>No available channels</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <Form描述 class名称="flex items-center gap-1">
                <Bell class名称="h-4 w-4" /> 
                {t('whereToSend')}
              </Form描述>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alert_template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alert Template</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value || "none"}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoading ? "Loading templates..." : "Select an alert template"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {sslTemplates?.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                    {sslTemplates?.length === 0 && !isLoading && (
                      <SelectItem value="no-templates-available" disabled>No templates found</SelectItem>
                    )}
                    {isLoading && (
                      <SelectItem value="loading-templates-placeholder" disabled>Loading templates...</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <Form描述>
                Choose a template for SSL certificate alert messages
              </Form描述>
              <FormMessage />
            </FormItem>
          )}
        />

        <div class名称="flex justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={on取消}
            disabled={isPending}
          >
            {t('cancel')}
          </Button>
          <Button 
            type="submit" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 class名称="mr-2 h-4 w-4 animate-spin" /> {t('updating')}
              </>
            ) : (
              t('saveChanges')
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};