import React, { useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertConfiguration, alertConfigService } from "@/services/alertConfigService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  Form描述,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Loader2, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface NotificationChannelDialogProps {
  open: boolean;
  on关闭: (refreshList: boolean) => void;
  editingConfig: AlertConfiguration | null;
}


const baseSchema = z.object({
  notify_name: z.string().min(1, "名称 is required"),
  notification_type: z.enum(["telegram", "discord", "slack", "signal", "google_chat", "email", "ntfy", "pushover", "notifiarr", "gotify", "webhook", "matrix"]),
  enabled: z.boolean().default(true),
  service_id: z.string().default("global"),
  template_id: z.string().optional(),
});

const telegramSchema = baseSchema.extend({
  notification_type: z.literal("telegram"),
  telegram_chat_id: z.string().min(1, "Chat ID is required"),
  bot_token: z.string().min(1, "Bot token is required"),
});

const discordSchema = baseSchema.extend({
  notification_type: z.literal("discord"),
  discord_webhook_url: z.string().url("Must be a valid URL"),
});

const slackSchema = baseSchema.extend({
  notification_type: z.literal("slack"),
  slack_webhook_url: z.string().url("Must be a valid URL"),
});

const signalSchema = baseSchema.extend({
  notification_type: z.literal("signal"),
  signal_number: z.string().min(1, "Signal number is required"),
  signal_api_endpoint: z.string().url("Must be a valid API endpoint URL"),
});

const googleChatSchema = baseSchema.extend({
  notification_type: z.literal("google_chat"),
  google_chat_webhook_url: z.string().url("Must be a valid URL"),
});

const emailSchema = baseSchema.extend({
  notification_type: z.literal("email"),
  email_address: z.string().email("Valid email is required"),
  email_sender_name: z.string().min(1, "Sender name is required"),
  smtp_server: z.string().min(1, "SMTP server is required"),
  smtp_port: z.string().min(1, "SMTP port is required"),
  smtp_password: z.string().min(1, "SMTP password is required"),
});

const ntfySchema = baseSchema.extend({
  notification_type: z.literal("ntfy"),
  ntfy_endpoint: z.string().url("Must be a valid NTFY endpoint URL"),
  api_token: z.string().optional(),
});

const pushoverSchema = baseSchema.extend({
  notification_type: z.literal("pushover"),
  api_token: z.string().min(1, "API token is required"),
  user_key: z.string().min(1, "User key is required"),
});

const notifiarrSchema = baseSchema.extend({
  notification_type: z.literal("notifiarr"),
  api_token: z.string().min(1, "API token is required"),
  channel_id: z.string().min(1, "Channel ID is required"),
});

const webhookSchema = baseSchema.extend({
  notification_type: z.literal("webhook"),
  webhook_url: z.string().url("Must be a valid URL"),
  webhook_payload_template: z.string().optional(),
});

const gotifySchema = baseSchema.extend({
  notification_type: z.literal("gotify"),
  api_token: z.string().min(1, "API token is required"),
  server_url: z.string().url("Must be a valid server URL"),
});

const matrixSchema = baseSchema.extend({
  notification_type: z.literal("matrix"),
  matrix_homeserver: z.string().url("Must be a valid homeserver URL"),
  matrix_room_id: z.string().min(1, "Room ID is required"),
  matrix_access_token: z.string().min(1, "Access token is required"),
});

const formSchema = z.discriminatedUnion("notification_type", [
  telegramSchema,
  discordSchema,
  slackSchema,
  signalSchema,
  googleChatSchema,
  emailSchema,
  ntfySchema,
  pushoverSchema,
  notifiarrSchema,
  gotifySchema,
  webhookSchema,
  matrixSchema,
]);

type FormValues = z.infer<typeof formSchema>;

const notificationTypeOptions = [
  { 
    value: "telegram", 
    label: "Telegram", 
    description: "Send notifications via Telegram bot",
    icon: "/upload/notification/telegram.png"
  },
  { 
    value: "discord", 
    label: "Discord", 
    description: "Send notifications to Discord webhook",
    icon: "/upload/notification/discord.png"
  },
  { 
    value: "slack", 
    label: "Slack", 
    description: "Send notifications to Slack webhook",
    icon: "/upload/notification/slack.png"
  },
  { 
    value: "signal", 
    label: "Signal", 
    description: "Send notifications via Signal",
    icon: "/upload/notification/signal.png"
  },
  { 
    value: "google_chat", 
    label: "Google Chat", 
    description: "Send notifications to Google Chat webhook",
    icon: "/upload/notification/google.png"
  },
  { 
    value: "email", 
    label: "邮箱", 
    description: "Send notifications via email",
    icon: "/upload/notification/email.png"
  },
  { 
    value: "ntfy", 
    label: "NTFY", 
    description: "Send notifications via NTFY push service",
    icon: "/upload/notification/ntfy.png" 
  },
  { 
    value: "pushover", 
    label: "Pushover", 
    description: "Send push notifications via Pushover",
    icon: "/upload/notification/pushover.png" 
  },

  { 
    value: "notifiarr", 
    label: "Notifiarr", 
    description: "Send notifications via Notifiarr",
    icon: "/upload/notification/notifiarr.png" 
  },
  { 
    value: "gotify", 
    label: "Gotify", 
    description: "Send push notifications via Gotify",
    icon: "/upload/notification/gotify.png" 
  },
  {
    value: "webhook",
    label: "Webhook",
    description: "Send notifications to custom webhook",
    icon: "/upload/notification/webhook.png"
  },
  {
    value: "matrix",
    label: "Matrix",
    description: "Send notifications to a Matrix chat room",
    icon: "/upload/notification/matrix.png"
  },
];

const webhookPayloadTemplates = {
  server: `{
  "alert_type": "server",
  "server_name": "\${server_name}",
  "status": "\${status}",
  "cpu_usage": "\${cpu_usage}",
  "ram_usage": "\${ram_usage}",
  "disk_usage": "\${disk_usage}",
  "network_usage": "\${network_usage}",
  "cpu_temp": "\${cpu_temp}",
  "disk_io": "\${disk_io}",
  "threshold": "\${time}",
  "message": "Server \${server_name} alert: \${status}"
}`,
  service: `{
  "alert_type": "service",
  "service_name": "\${service_name}",
  "status": "\${status}",
  "response_time": "\${response_time}",
  "url": "\${url}",
  "uptime": "\${uptime}",
  "downtime": "\${downtime}",
  "timestamp": "\${time}",
  "message": "Service \${service_name} is \${status}"
}`,
  ssl: `{
  "alert_type": "ssl",
  "domain": "\${domain}",
  "certificate_name": "\${certificate_name}",
  "expiry_date": "\${expiry_date}",
  "days_left": "\${days_left}",
  "issuer": "\${issuer}",
  "serial_number": "\${serial_number}",
  "timestamp": "\${time}",
  "message": "SSL certificate for \${domain} expires in \${days_left} days"
}`
};

const defaultPayloadTemplate = `{
  "alert_type": "general",
  "service_name": "\${service_name}",
  "status": "\${status}",
  "message": "\${message}",
  "timestamp": "\${time}"
}`;

export const NotificationChannelDialog = ({ 
  open, 
  on关闭,
  editingConfig 
}: NotificationChannelDialogProps) => {
  const { t } = useLanguage();
  const is编辑ing = !!editingConfig;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notify_name: "",
      notification_type: "telegram" as const,
      enabled: true,
      service_id: "global",
      template_id: "",
    },
  });

  const { watch, reset, setValue } = form;
  const notificationType = watch("notification_type");
  const [is提交ting, setIs提交ting] = React.useState(false);
  
  useEffect(() => {
    if (editingConfig) {
      // Handle string vs boolean for enabled field
      const enabled = typeof editingConfig.enabled === 'string' 
        ? editingConfig.enabled === "true" 
        : !!editingConfig.enabled;

      reset({
        ...editingConfig,
        enabled
      });
    } else if (open) {
      reset({
        notify_name: "",
        notification_type: "telegram" as const,
        enabled: true,
        service_id: "global",
        template_id: "",
      });
    }
  }, [editingConfig, open, reset]);

  const handle关闭 = () => {
    on关闭(false);
  };

  const insertTemplate = (template: string) => {
    setValue("webhook_payload_template", template);
  };

  const on提交 = async (values: FormValues) => {
    setIs提交ting(true);
    try {
      // Handle all notification types including webhook through alert_configurations
      const configData = {
        ...values,
        service_id: values.service_id || "global",
      };
      
      if (is编辑ing && editingConfig?.id) {
        await alertConfigService.updateAlertConfiguration(editingConfig.id, configData);
      } else {
        await alertConfigService.createAlertConfiguration(configData as any);
      }
      
      on关闭(true); // 关闭 with refresh
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notification channel",
        variant: "destructive"
      });
    } finally {
      setIs提交ting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => handle关闭()}>
      <DialogContent class名称="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {is编辑ing ? t("editChannel") : t("addChannelDialog")}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form on提交={form.handle提交(on提交)} class名称="space-y-6">
            <FormField
              control={form.control}
              name="notify_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("channel名称")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("channel名称Placeholder")} {...field} />
                  </FormControl>
                  <Form描述>
                    {t("channel名称Desc")}
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notification_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("channelType")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {notificationTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div class名称="flex items-center space-x-3">
                            <img 
                              src={option.icon} 
                              alt={`${option.label} icon`}
                              class名称="w-5 h-5 object-contain"
                            />
                            <div class名称="flex flex-col">
                              <span class名称="font-medium">{t(option.value)}</span>
                              <span class名称="text-xs text-muted-foreground">{t(option.description)}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {notificationType === "telegram" && (
              <>
                <FormField
                  control={form.control}
                  name="telegram_chat_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("telegramChatId")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("telegramChatIdPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("telegramChatIdDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bot_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("botToken")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("botTokenPlaceholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("botTokenDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {notificationType === "discord" && (
              <FormField
                control={form.control}
                name="discord_webhook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("discordWebhookUrl")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("discordWebhookUrlPlaceholder")} {...field} />
                    </FormControl>
                    <Form描述>
                      {t("discordWebhookUrlDesc")}
                    </Form描述>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {notificationType === "slack" && (
              <FormField
                control={form.control}
                name="slack_webhook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("slackWebhookUrl")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("slackWebhookUrlPlaceholder")} {...field} />
                    </FormControl>
                    <Form描述>
                      {t("slackWebhookUrlDesc")}
                    </Form描述>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {notificationType === "signal" && (
               <>
                <FormField
                  control={form.control}
                  name="signal_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("signalNumber")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("signalNumberPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("signalNumberDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="signal_api_endpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("signalApiEndpoint")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("signalApiEndpointPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("signalApiEndpointDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {notificationType === "google_chat" && (
              <FormField
                control={form.control}
                name="google_chat_webhook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("googleChatWebhookUrl")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("googleChatWebhookUrlPlaceholder")} {...field} />
                    </FormControl>
                    <Form描述>
                      {t("googleChatWebhookUrlDesc")}
                    </Form描述>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {notificationType === "email" && (
              <>
                <FormField
                  control={form.control}
                  name="email_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email添加ress")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("email添加ressPlaceholder")} {...field} type="email" />
                      </FormControl>
                      <Form描述>
                        {t("email添加ressDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email_sender_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("emailSender名称")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("emailSender名称Placeholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("emailSender名称Desc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div class名称="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="smtp_server"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("smtpServer")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("smtpServerPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="smtp_port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("smtpPort")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("smtpPortPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="smtp_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("smtp密码")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("smtp密码Placeholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("smtp密码Desc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

             {notificationType === "ntfy" && (
             <>
                <FormField
                  control={form.control}
                  name="ntfy_endpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ntfyEndpoint")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("ntfyEndpointPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("ntfyEndpointDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="api_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("apiTokenOptional")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("apiTokenPlaceholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("apiTokenDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {notificationType === "pushover" && (
              <>
                <FormField
                  control={form.control}
                  name="api_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("apiToken")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("apiTokenPlaceholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("apiTokenDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("pushoverUserKey")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("pushoverUserKeyPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("pushoverUserKeyDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

             {notificationType === "notifiarr" && (
              <>
                <FormField
                  control={form.control}
                  name="api_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("apiToken")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("apiTokenPlaceholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("apiTokenDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="channel_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("notifiarrChannelId")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("notifiarrChannelIdPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("notifiarrChannelIdDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {notificationType === "gotify" && (
              <>
                <FormField
                  control={form.control}
                  name="api_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("apiToken")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("apiTokenPlaceholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("apiTokenDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="server_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("gotifyServerUrl")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("gotifyServerUrlPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("gotifyServerUrlDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {notificationType === "webhook" && (
              <>
                <FormField
                  control={form.control}
                  name="webhook_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("webhookUrl")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("webhookUrlPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("webhookUrlDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div class名称="space-y-4">
                  <FormField
                    control={form.control}
                    name="webhook_payload_template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("payloadTemplate")}</FormLabel>
                        <Form描述>
                          {t("payloadTemplateDesc")}
                        </Form描述>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Card>
                    <CardHeader class名称="pb-3">
                      <CardTitle class名称="text-sm font-medium">{t("payloadTemplates")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div class名称="space-y-3">
                        <div class名称="mt-4">
                          <h4 class名称="text-sm font-medium mb-2">{t("availablePlaceholders")}</h4>
                          <div class名称="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div class名称="space-y-1">
                              <p class名称="font-medium text-muted-foreground">{t("server")}</p>
                              <div class名称="space-y-0.5">
                                <code class名称="bg-muted px-1 rounded">${'{server_name}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{cpu_usage}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{ram_usage}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{disk_usage}'}</code>
                              </div>
                            </div>
                            <div class名称="space-y-1">
                              <p class名称="font-medium text-muted-foreground">{t("service")}</p>
                              <div class名称="space-y-0.5">
                                <code class名称="bg-muted px-1 rounded">${'{service_name}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{response_time}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{url}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{uptime}'}</code>
                              </div>
                            </div>
                            <div class名称="space-y-1">
                              <p class名称="font-medium text-muted-foreground">{t("ssl")}</p>
                              <div class名称="space-y-0.5">
                                <code class名称="bg-muted px-1 rounded">${'{domain}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{expiry_date}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{days_left}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{issuer}'}</code>
                              </div>
                            </div>
                            <div class名称="space-y-1">
                              <p class名称="font-medium text-muted-foreground">{t("common")}</p>
                              <div class名称="space-y-0.5">
                                <code class名称="bg-muted px-1 rounded">${'{status}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{time}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{message}'}</code><br/>
                                <code class名称="bg-muted px-1 rounded">${'{threshold}'}</code>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            
            {notificationType === "matrix" && (
              <>
                <FormField
                  control={form.control}
                  name="matrix_homeserver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("matrixHomeserver")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("matrixHomeserverPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("matrixHomeserverDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="matrix_room_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("matrixRoomId")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("matrixRoomIdPlaceholder")} {...field} />
                      </FormControl>
                      <Form描述>
                        {t("matrixRoomIdDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="matrix_access_token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("matrixAccessToken")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("matrixAccessTokenPlaceholder")} {...field} type="password" />
                      </FormControl>
                      <Form描述>
                        {t("matrixAccessTokenDesc")}
                      </Form描述>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem class名称="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div class名称="space-y-0.5">
                    <FormLabel>{t("enabled")}</FormLabel>
                    <Form描述>
                      {t("enabledDesc")}
                    </Form描述>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={handle关闭}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={is提交ting}>
                {is提交ting && <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />}
                {is编辑ing ? t("updateChannel") : t("createChannel")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};