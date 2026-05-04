import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface RegionalAgentConfigFormProps {
  formData: {
    region名称: string;
    agentIp: string;
  };
  setFormData: (data: { region名称: string; agentIp: string }) => void;
  agentId: string;
  agentToken: string;
  currentPocketBaseUrl: string;
  is提交ting: boolean;
  on提交: (e: React.FormEvent) => void;
}

export const RegionalAgentConfigForm: React.FC<RegionalAgentConfigFormProps> = ({
  formData,
  setFormData,
  agentId,
  agentToken,
  currentPocketBaseUrl,
  is提交ting,
  on提交,
}) => {
  const { t } = useLanguage();

  return (
    <form on提交={on提交} class名称="space-y-6">
      <div class名称="space-y-4">
        <div>
          <Label htmlFor="region名称">{t('region名称')}</Label>
          <Input
            id="region名称"
            placeholder={t('region名称Placeholder')}
            value={formData.region名称}
            onChange={(e) => setFormData({ ...formData, region名称: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="agentIp">{t('agentServerIp添加ress')}</Label>
          <Input
            id="agentIp"
            placeholder={t('agentIpPlaceholder')}
            value={formData.agentIp}
            onChange={(e) => setFormData({ ...formData, agentIp: e.target.value })}
            required
          />
        </div>

        <div class名称="grid grid-cols-2 gap-4">
          <div>
            <Label class名称="text-sm font-medium">{t('agentId')}</Label>
            <div class名称="relative">
              <Input
                value={agentId}
                readOnly
                class名称="font-mono text-sm bg-muted/50 border-muted-foreground/20 pr-10"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                class名称="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                onClick={() => copyToClipboard(agentId)}
              >
                <Copy class名称="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div>
            <Label class名称="text-sm font-medium">{t('apiEndpoint')}</Label>
            <div class名称="relative">
              <Input
                value={currentPocketBaseUrl}
                readOnly
                class名称="font-mono text-sm bg-muted/50 border-muted-foreground/20 pr-10"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                class名称="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                onClick={() => copyToClipboard(currentPocketBaseUrl)}
              >
                <Copy class名称="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label class名称="text-sm font-medium">{t('authenticationToken')}</Label>
          <div class名称="relative">
            <Input
              value={agentToken}
              readOnly
              class名称="font-mono text-sm bg-muted/50 border-muted-foreground/20 pr-10"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              class名称="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
              onClick={() => copyToClipboard(agentToken)}
            >
              <Copy class名称="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div class名称="flex justify-end space-x-2">
        <Button type="submit" disabled={is提交ting}>
          {is提交ting ? t('creating') : t('createAgent')}
        </Button>
      </div>
    </form>
  );
};
