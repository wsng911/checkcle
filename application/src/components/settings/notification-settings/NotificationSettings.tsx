
import React, { useState, useEffect } from "react";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { AlertConfiguration, alertConfigService } from "@/services/alertConfigService";
import { WebhookConfiguration, webhookService } from "@/services/webhookService";
import { NotificationChannelDialog } from "./NotificationChannelDialog";
import { NotificationChannelList } from "./NotificationChannelList";
import { pb } from "@/lib/pocketbase";
import { useLanguage } from "@/contexts/LanguageContext";

interface CombinedChannel extends Partial<AlertConfiguration> {
  isWebhook?: boolean;
  url?: string;
  method?: string;
  description?: string;
}

const Notification设置 = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [alertConfigs, setAlertConfigs] = useState<AlertConfiguration[]>([]);
  const [webhookConfigs, setWebhookConfigs] = useState<WebhookConfiguration[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [editingConfig, set编辑ingConfig] = useState<AlertConfiguration | null>(null);

  const fetchNotificationChannels = async () => {
    setIsLoading(true);
    try {
      // Fetch alert configurations
      const configs = await alertConfigService.getAlertConfigurations();
      setAlertConfigs(configs);

      // Fetch webhooks
      try {
        const webhookResponse = await pb.collection('webhook').getList(1, 50);
        setWebhookConfigs(webhookResponse.items as WebhookConfiguration[]);
      } catch (webhookError) {
        setWebhookConfigs([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationChannels();
  }, []);

  const handle添加New = () => {
    set编辑ingConfig(null);
    setDialogOpen(true);
  };

  const handle编辑 = (config: AlertConfiguration) => {
    set编辑ingConfig(config);
    setDialogOpen(true);
  };

  const handle删除 = async (id: string) => {
    // Check if it's a webhook first
    const isWebhook = webhookConfigs.find(w => w.id === id);
    
    if (isWebhook) {
      // Handle webhook deletion
      if (confirm("Are you sure you want to delete this webhook?")) {
        try {
          await pb.collection('webhook').delete(id);
          fetchNotificationChannels();
        } catch (error) {
          console.error("Error deleting webhook:", error);
        }
      }
    } else {
      // Handle alert config deletion
      const success = await alertConfigService.deleteAlertConfiguration(id);
      if (success) {
        fetchNotificationChannels();
      }
    }
  };

  const handleDialog关闭 = (refreshList: boolean) => {
    setDialogOpen(false);
    if (refreshList) {
      fetchNotificationChannels();
    }
  };

  const getCombinedChannels = (): CombinedChannel[] => {
    const combined: CombinedChannel[] = [];
    
    // 添加 alert configurations
    alertConfigs.forEach(config => {
      combined.push(config);
    });
    
    // 添加 webhooks as notification channels
    webhookConfigs.forEach(webhook => {
      combined.push({
        id: webhook.id,
        notify_name: webhook.name,
        notification_type: "webhook" as const,
        enabled: webhook.enabled === "on",
        created: webhook.created,
        updated: webhook.updated,
        isWebhook: true,
        url: webhook.url,
        method: webhook.method,
        description: webhook.description
      });
    });
    
    return combined;
  };

  const getFilteredConfigs = () => {
    const combined = getCombinedChannels();
    if (currentTab === "all") return combined;
    return combined.filter(config => config.notification_type === currentTab);
  };

  return (
    <Card class名称="w-full">
      <CardHeader>
        <div class名称="flex items-center justify-between">
          <div>
            <CardTitle>{t("titleNotification")}</CardTitle>
            <Card描述>
              {t("descriptionChannels服务")}
            </Card描述>
          </div>
          <Button onClick={handle添加New}>
            <Plus class名称="mr-2 h-4 w-4" /> {t("addChannel")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="all" 
          value={currentTab}
          onValueChange={setCurrentTab}
          class名称="w-full"
        >
          <TabsList class名称="mb-4">
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            <TabsTrigger value="telegram">{t("telegram")}</TabsTrigger>
            <TabsTrigger value="discord">{t("discord")}</TabsTrigger>
            <TabsTrigger value="slack">{t("slack")}</TabsTrigger>
            <TabsTrigger value="signal">{t("signal")}</TabsTrigger>
            <TabsTrigger value="google_chat">{t("googleChat")}</TabsTrigger>
            <TabsTrigger value="email">{t("email")}</TabsTrigger>
            <TabsTrigger value="webhook">{t("webhook")}</TabsTrigger>
            <TabsTrigger value="matrix">{t("matrix")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab} class名称="mt-0">
            {isLoading ? (
              <div class名称="flex items-center justify-center py-8">
                <Loader2 class名称="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <NotificationChannelList 
                channels={getFilteredConfigs()} 
                on编辑={handle编辑}
                on删除={handle删除}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <NotificationChannelDialog 
        open={dialogOpen} 
        on关闭={handleDialog关闭} 
        editingConfig={editingConfig}
      />
    </Card>
  );
};

export default Notification设置;