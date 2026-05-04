
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Terminal } from "lucide-react";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/utils/copyUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ManualInstallTabProps {
  serverToken: string;
  currentPocketBaseUrl: string;
  formData: {
    server名称: string;
    osType: string;
    checkInterval: string;
  };
  serverId: string;
  onDialog关闭: () => void;
}

export const ManualInstallTab: React.FC<ManualInstallTabProps> = ({
  serverToken,
  currentPocketBaseUrl,
  formData,
  serverId,
  onDialog关闭,
}) => {
  const { t } = useLanguage();

  const getManualInstallSteps = () => {
    const scriptUrl = "https://cdn.checkcle.io/scripts/server-agent.sh";
    
    return [
      {
        title: t('downloadScript'),
        command: `curl -L -o server-agent.sh "${scriptUrl}"`
      },
      {
        title: t('makeExecutable'),
        command: `chmod +x server-agent.sh`
      },
      {
        title: t('runInstall'),
        command: `SERVER_TOKEN="${serverToken}" POCKETBASE_URL="${currentPocketBaseUrl}" SERVER_NAME="${formData.server名称}" AGENT_ID="${serverId}" sudo bash server-agent.sh`
      }
    ];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle class名称="flex items-center gap-2">
          <Terminal class名称="h-5 w-5" />
          {t('manualInstallTitle')}
        </CardTitle>
        <Card描述>
          {t('manualInstallDesc')}
        </Card描述>
      </CardHeader>
      <CardContent class名称="space-y-4">
        <div class名称="space-y-2">
          <div class名称="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class名称="font-medium">{t('server名称')}:</span> {formData.server名称}
            </div>
            <div>
              <span class名称="font-medium">{t('agentId')}:</span> {serverId}
            </div>
            <div>
              <span class名称="font-medium">{t('osType')}:</span> {formData.osType}
            </div>
            <div>
              <span class名称="font-medium">{t('checkInterval')}:</span> {formData.checkInterval}s
            </div>
          </div>
        </div>

        <div class名称="space-y-4">
          {getManualInstallSteps().map((step, index) => (
            <div key={index} class名称="space-y-2">
              <div class名称="flex items-center gap-2">
                <span class名称="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span class名称="font-medium">{step.title}</span>
              </div>
              <div class名称="ml-8 relative">
                <pre class名称="bg-muted p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-all">
                  <code>{step.command}</code>
                </pre>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  class名称="absolute top-2 right-2"
                  onClick={() => copyToClipboard(step.command)}
                >
                  <Copy class名称="h-4 w-4 mr-1" />
                  {t('copy')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div class名称="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <h4 class名称="font-medium text-blue-900 dark:text-blue-100 mb-2">{t('prerequisites')}</h4>
          <ul class名称="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside mb-3">
            <li>{t('prereqRoot')}</li>
            <li>{t('prereqCurl')}</li>
            <li>{t('prereqInternet')}</li>
          </ul>
          
          <h4 class名称="font-medium text-blue-900 dark:text-blue-100 mb-2">{t('afterInstall')}</h4>
          <p class名称="text-sm text-blue-800 dark:text-blue-200">
            {t('agentWillStart')}
          </p>
        </div>

        <div class名称="flex justify-end pt-4">
          <Button onClick={onDialog关闭}>
            {t('done')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};