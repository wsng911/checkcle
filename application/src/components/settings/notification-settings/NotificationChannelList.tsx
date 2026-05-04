
import { AlertConfiguration } from "@/services/alertConfigService";
import { Bell, 编辑, Trash2 } from "lucide-react";
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { alertConfigService } from "@/services/alertConfigService";
import { pb } from "@/lib/pocketbase";

interface CombinedChannel extends Partial<AlertConfiguration> {
  isWebhook?: boolean;
  url?: string;
  method?: string;
  description?: string;
}

interface NotificationChannelListProps {
  channels: CombinedChannel[];
  on编辑: (config: AlertConfiguration) => void;
  on删除: (id: string) => void;
}

export const NotificationChannelList = ({
  channels,
  on编辑,
  on删除
}: NotificationChannelListProps) => {
  const [optimisticStates, setOptimisticStates] = useState<Record<string, boolean>>({});

  const toggleEnabled = async (config: CombinedChannel) => {
    if (!config.id) return;
    
    const currentEnabled = typeof config.enabled === 'string'
      ? config.enabled === "true" || config.enabled === "on"
      : !!config.enabled;
    
    // Apply optimistic update immediately
    setOptimisticStates(prev => ({
      ...prev,
      [config.id!]: !currentEnabled
    }));
    
    try {
      if (config.isWebhook) {
        // Handle webhook toggle
        const newEnabled = currentEnabled ? "off" : "on";
        await pb.collection('webhook').update(config.id, {
          enabled: newEnabled
        });
      } else {
        // Handle alert config toggle
        await alertConfigService.updateAlertConfiguration(config.id, {
          enabled: !currentEnabled
        });
      }
  
    } catch (error) {
      setOptimisticStates(prev => ({
        ...prev,
        [config.id!]: currentEnabled
      }));
    }
  };

  const getChannelTypeLabel = (type: string | undefined) => {
    switch(type) {
      case "telegram": return "Telegram";
      case "discord": return "Discord";
      case "slack": return "Slack";
      case "signal": return "Signal";
      case "google_chat": return "Google Chat";
      case "email": return "邮箱";
      case "pushover": return "Pushover";
      case "notifiarr": return "Notifiarr";
      case "webhook": return "Webhook";
      case "matrix": return "Matrix";
      default: return type || "Unknown";
    }
  };

  const getChannelDetails = (config: CombinedChannel) => {
    if (config.isWebhook) {
      return `${config.method || 'POST'} ${config.url || ''}`;
    }
    
    switch(config.notification_type) {
      case "telegram":
        return config.telegram_chat_id || '';
      case "discord":
      case "slack":
      case "google_chat":
        return config.discord_webhook_url || config.slack_webhook_url || config.google_chat_webhook_url || '';
      case "signal":
        return config.signal_number || '';
      case "email":
        return config.email_address || '';
      case "matrix":
        return config.matrix_room_id || '';
      default:
        return '';
    }
  };

  if (channels.length === 0) {
    return (
      <div class名称="flex flex-col items-center justify-center py-10 text-center">
        <Bell class名称="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class名称="text-lg font-medium">No notification channels configured</h3>
        <p class名称="text-muted-foreground mt-2">
          添加 a notification channel to get alerts when your services go down.
        </p>
      </div>
    );
  }

  return (
    <div class名称="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建d</TableHead>
            <TableHead class名称="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channels.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell class名称="font-medium">{channel.notify_name}</TableCell>
              <TableCell>
                <Badge variant="outline">{getChannelTypeLabel(channel.notification_type)}</Badge>
              </TableCell>
              <TableCell class名称="max-w-xs truncate text-sm text-muted-foreground">
                {getChannelDetails(channel)}
              </TableCell>
               <TableCell>
                <Switch 
                  checked={
                    channel.id && optimisticStates.hasOwnProperty(channel.id)
                      ? optimisticStates[channel.id]
                      : typeof channel.enabled === 'string'
                        ? channel.enabled === "true" || channel.enabled === "on"
                        : !!channel.enabled
                  }
                  onCheckedChange={() => toggleEnabled(channel)}
                />
              </TableCell>
              <TableCell>
                {channel.created ? new Date(channel.created).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell class名称="text-right">
                <div class名称="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => on编辑(channel as AlertConfiguration)}
                    disabled={channel.isWebhook} 
                  >
                    <编辑 class名称="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      if (channel.id && confirm("Are you sure you want to delete this notification channel?")) {
                        on删除(channel.id)
                      }
                    }}
                  >
                    <Trash2 class名称="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};