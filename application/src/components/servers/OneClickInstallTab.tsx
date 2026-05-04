
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Download } from "lucide-react";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/utils/copyUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface OneClickInstallTabProps {
  serverToken: string;
  currentPocketBaseUrl: string;
  formData: {
    server名称: string;
    osType: string;
    checkInterval: string;
    retryAttempt: string;
  };
  serverId: string;
  onDialog关闭: () => void;
}

export const OneClickInstallTab: React.FC<OneClickInstallTabProps> = ({
  serverToken,
  currentPocketBaseUrl,
  formData,
  serverId,
  onDialog关闭,
}) => {
  const { t } = useLanguage();

  const getOneClickInstallCommand = () => {
    const scriptUrl = "https://cdn.checkcle.io/scripts/server-agent.sh";

    return `curl -L -o server-agent.sh "${scriptUrl}"
chmod +x server-agent.sh
SERVER_TOKEN="${serverToken}" \\
POCKETBASE_URL="${currentPocketBaseUrl}" \\
SERVER_NAME="${formData.server名称}" \\
AGENT_ID="${serverId}" \\
OS_TYPE="${formData.osType}" \\
CHECK_INTERVAL="${formData.checkInterval}" \\
RETRY_ATTEMPTS="${formData.retryAttempt}" \\
sudo -E bash ./server-agent.sh`;
  };

  const handleCopyCommand = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Copy button clicked'); // Debug log
    const command = getOneClickInstallCommand();
    console.log('Copying command:', command); // Debug log
    await copyToClipboard(command);
  };

  return (
    <Card class名称="border-green-500/20 bg-green-0/50 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle class名称="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Download class名称="h-5 w-5" />
          {t('oneClickInstallTitle')}
        </CardTitle>
        <Card描述 class名称="text-green-600 dark:text-green-300">
          {t('oneClickInstallDesc')}
        </Card描述>
      </CardHeader>
      <CardContent class名称="space-y-4">
        <div class名称="space-y-2">
          <Label class名称="text-green-700 dark:text-green-400">{t('quickInstallCommand')}</Label>
          <div class名称="relative">
            <pre class名称="bg-black-50 dark:bg-green-100/950 border border-green-200 dark:border-green-800 p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-all text-green-800 dark:text-green-200">
              <code>{getOneClickInstallCommand()}</code>
            </pre>
            <Button
              type="button"
              variant="outline"
              size="sm"
              class名称="absolute top-2 right-2 bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900 text-green-700 dark:text-green-400"
              onClick={handleCopyCommand}
            >
              <Copy class名称="h-4 w-4 mr-1" />
              {t('copy')}
            </Button>
          </div>
        </div>
        
        <div class名称="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 p-3 rounded-md">
          <p class名称="font-medium mb-1">{t('runCommandOnServer')}</p>
          <ol class名称="list-decimal list-inside space-y-1 text-xs">
            <li>{t('sshIntoServer')}</li>
            <li>{t('pasteAndRun')}</li>
            <li>{t('agentInstalled')}</li>
          </ol>
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