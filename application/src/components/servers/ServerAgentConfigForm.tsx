
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyUtils";
import { OSSelector } from "./OSSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServerAgentConfigFormProps {
  formData: {
    server名称: string;
    description: string;
    osType: string;
    checkInterval: string;
    retryAttempt: string;
    dockerEnabled: boolean;
    notificationEnabled: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    server名称: string;
    description: string;
    osType: string;
    checkInterval: string;
    retryAttempt: string;
    dockerEnabled: boolean;
    notificationEnabled: boolean;
  }>>;
  serverId: string;
  serverToken: string;
  currentPocketBaseUrl: string;
  is提交ting: boolean;
  on提交: (e: React.FormEvent) => void;
}

export const ServerAgentConfigForm: React.FC<ServerAgentConfigFormProps> = ({
  formData,
  setFormData,
  serverId,
  serverToken,
  currentPocketBaseUrl,
  is提交ting,
  on提交,
}) => {
  const { t } = useLanguage();

  return (
    <form on提交={on提交} class名称="space-y-4">
      <div class名称="grid grid-cols-2 gap-4">
        <div class名称="space-y-2">
          <Label htmlFor="server名称">{t('server名称')} *</Label>
          <Input
            id="server名称"
            placeholder={t('server名称Placeholder')}
            value={formData.server名称}
            onChange={(e) => setFormData(prev => ({ ...prev, server名称: e.target.value }))}
            required
          />
          <p class名称="text-xs text-muted-foreground">{t('server名称Desc')}</p>
        </div>
        
        <div class名称="space-y-2">
          <Label htmlFor="serverId">{t('serverAgentId')}</Label>
          <div class名称="flex gap-2">
            <Input
              id="serverId"
              value={serverId}
              readOnly
              class名称="font-mono text-sm bg-muted"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(serverId)}
            >
              <Copy class名称="h-4 w-4" />
            </Button>
          </div>
          <p class名称="text-xs text-muted-foreground">{t('serverAgentIdDesc')}</p>
        </div>
      </div>
      
      <div class名称="grid grid-cols-2 gap-4">
        <div class名称="space-y-2">
          <Label>{t('operatingSystem')} *</Label>
          <OSSelector
            value={formData.osType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, osType: value }))}
          />
        </div>

        <div class名称="space-y-4">
          <div class名称="space-y-2">
            <Label htmlFor="checkInterval">{t('checkInterval')}</Label>
            <Select
              value={formData.checkInterval}
              onValueChange={(value) => setFormData(prev => ({ ...prev, checkInterval: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectInterval')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">{t('interval30s')}</SelectItem>
                <SelectItem value="60">{t('interval1m')}</SelectItem>
                <SelectItem value="120">{t('interval2m')}</SelectItem>
                <SelectItem value="300">{t('interval5m')}</SelectItem>
              </SelectContent>
            </Select>
            <p class名称="text-xs text-muted-foreground">{t('checkIntervalDesc')}</p>
          </div>

          <div class名称="space-y-2">
            <Label htmlFor="retryAttempt">{t('retryAttempts')}</Label>
            <Select
              value={formData.retryAttempt}
              onValueChange={(value) => setFormData(prev => ({ ...prev, retryAttempt: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectRetryAttempts')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('attempt1')}</SelectItem>
                <SelectItem value="2">{t('attempt2')}</SelectItem>
                <SelectItem value="3">{t('attempt3')}</SelectItem>
                <SelectItem value="5">{t('attempt5')}</SelectItem>
              </SelectContent>
            </Select>
            <p class名称="text-xs text-muted-foreground">{t('retryAttemptsDesc')}</p>
          </div>

          <div class名称="space-y-2">
            <Label>{t('serverToken')}</Label>
            <div class名称="flex gap-2">
              <Input value={serverToken} readOnly class名称="font-mono text-sm bg-muted" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(serverToken)}
              >
                <Copy class名称="h-4 w-4" />
              </Button>
            </div>
            <p class名称="text-xs text-muted-foreground">{t('serverTokenDesc')}</p>
          </div>

          <div class名称="space-y-2">
            <Label>{t('systemUrl')}</Label>
            <div class名称="flex gap-2">
              <Input value={currentPocketBaseUrl} readOnly class名称="font-mono text-sm bg-muted" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(currentPocketBaseUrl)}
              >
                <Copy class名称="h-4 w-4" />
              </Button>
            </div>
            <p class名称="text-xs text-muted-foreground">{t('systemUrlDesc')}</p>
          </div>
        </div>
      </div>
     
      <div class名称="pt-4">
        <Button type="submit" disabled={is提交ting} class名称="w-full">
          {is提交ting ? t('creatingAgent') : t('createServerAgent')}
        </Button>
      </div>
    </form>
  );
};