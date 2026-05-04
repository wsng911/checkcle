import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Zap, Play } from "lucide-react";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/utils/copyUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface RegionalOneClickTabProps {
  agentToken: string;
  currentPocketBaseUrl: string;
  formData: {
    region名称: string;
    agentIp: string;
  };
  agentId: string;
  onDialog关闭: () => void;
}

export const RegionalOneClickTab: React.FC<RegionalOneClickTabProps> = ({
  agentToken,
  currentPocketBaseUrl,
  formData,
  agentId,
  onDialog关闭,
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const getOneClickCommand = () => {
    return `curl -fsSL https://raw.githubusercontent.com/operacle/checkcle/refs/heads/main/scripts/install-regional-agent.sh | sudo bash -s -- \\
  --region-name="${formData.region名称}" \\
  --agent-id="${agentId}" \\
  --agent-ip="${formData.agentIp}" \\
  --token="${agentToken}" \\
  --pocketbase-url="${currentPocketBaseUrl}"`;
  };

  const downloadScript = () => {
    const scriptContent = getOneClickCommand();
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `install-regional-agent-${agentId}.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('downloaded'),
      description: t('downloaded描述'),
    });
  };

  return (
    <Card class名称="border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle class名称="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Zap class名称="h-5 w-5" />
          {t('oneClickAutomaticInstallation')}
        </CardTitle>
        <Card描述 class名称="text-green-600 dark:text-green-300">
          {t('completeInstallation描述')}
        </Card描述>
      </CardHeader>
      <CardContent class名称="space-y-4">
        <div class名称="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-950/50 dark:border-green-800">
          <div class名称="flex items-center gap-2 text-green-800 dark:text-green-200 font-medium mb-2">
            <Play class名称="h-4 w-4" />
            {t('whatThisScriptDoes')}
          </div>
          <ul class名称="text-sm text-green-700 dark:text-green-300 space-y-1 ml-6">
            <li>• {t('scriptActionDownload')}</li>
            <li>• {t('scriptActionInstall')}</li>
            <li>• {t('scriptActionConfigure')}</li>
            <li>• {t('scriptActionStart')}</li>
            <li>• {t('scriptActionHealthChecks')}</li>
          </ul>
        </div>

        <div class名称="space-y-2">
          <Label class名称="text-green-700 dark:text-green-400">{t('runCommandOnServer')}</Label>
          <div class名称="relative">
            <Textarea
              readOnly
              value={getOneClickCommand()}
              class名称="font-mono text-sm min-h-[120px] pr-12 bg-muted/50 border-green-200 dark:border-green-800"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              class名称="absolute top-2 right-2 bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900"
              onClick={() => copyToClipboard(getOneClickCommand())}
            >
              <Copy class名称="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div class名称="flex gap-2">
          <Button onClick={downloadScript} variant="outline" class名称="flex-1">
            <Download class名称="mr-2 h-4 w-4" />
            {t('downloadCompleteScript')}
          </Button>
        </div>

        {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
          <div class名称="bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-950/20 dark:border-yellow-800">
            <p class名称="text-sm text-yellow-800 dark:text-yellow-200" dangerouslySetInnerHTML={{ __html: t('localDevelopmentNotice') }} />
          </div>
        )}

        <div class名称="flex justify-end pt-4">
          <Button onClick={onDialog关闭}>
            {t('done')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
