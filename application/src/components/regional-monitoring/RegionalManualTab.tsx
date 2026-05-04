import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Terminal } from "lucide-react";
import { Card, CardContent, Card描述, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/utils/copyUtils";
import { useLanguage } from "@/contexts/LanguageContext";

interface RegionalManualTabProps {
  agentToken: string;
  currentPocketBaseUrl: string;
  formData: {
    region名称: string;
    agentIp: string;
  };
  agentId: string;
  onDialog关闭: () => void;
}

export const RegionalManualTab: React.FC<RegionalManualTabProps> = ({
  agentToken,
  currentPocketBaseUrl,
  formData,
  agentId,
  onDialog关闭,
}) => {
  const { t } = useLanguage();

  const getManualInstallSteps = () => {
    return [
      {
        title: t('step1DownloadPackage'),
        commands: [
          {
            label: t('downloadAmd64Notice'),
            command: 'wget https://github.com/operacle/Distributed-Regional-监控ing/releases/download/V1.0.0/distributed-regional-check-agent_1.0.0_amd64.deb'
          },
          {
            label: t('downloadArm64Notice'),
            command: 'wget https://github.com/operacle/Distributed-Regional-监控ing/releases/download/V1.0.0/distributed-regional-check-agent_1.0.0_arm64.deb'
          }
        ]
      },
      {
        title: t('step2InstallPackage'),
        commands: [
          {
            label: '',
            command: 'sudo dpkg -i distributed-regional-check-agent_1.0.0_amd64.deb\nsudo apt-get install -f'
          }
        ]
      },
      {
        title: t('step3ConfigureAgent'),
        commands: [
          {
            label: '',
            command: 'sudo nano /etc/regional-check-agent/regional-check-agent.env'
          },
          {
            label: t('addConfigurationValues'),
            command: `POCKETBASE_URL=${currentPocketBaseUrl}
AGENT_TOKEN=${agentToken}
AGENT_ID=${agentId}
REGION_NAME=${formData.region名称}
AGENT_IP=${formData.agentIp}`
          }
        ]
      },
      {
        title: t('step4StartService'),
        commands: [
          {
            label: '',
            command: 'sudo systemctl enable regional-check-agent\nsudo systemctl start regional-check-agent'
          }
        ]
      },
      {
        title: t('step5VerifyInstallation'),
        commands: [
          {
            label: '',
            command: 'sudo systemctl status regional-check-agent\ncurl http://localhost:8091/health'
          }
        ]
      }
    ];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle class名称="flex items-center gap-2">
          <Terminal class名称="h-5 w-5" />
          {t('manualInstallationSteps')}
        </CardTitle>
        <Card描述>
          {t('stepByStepManualInstallation')}
        </Card描述>
      </CardHeader>
      <CardContent class名称="space-y-4">
        <div class名称="space-y-4">
          {getManualInstallSteps().map((step, stepIndex) => (
            <div key={stepIndex} class名称="border-l-4 border-blue-500 pl-4 space-y-2">
              <div class名称="flex items-center gap-2">
                <span class名称="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {stepIndex + 1}
                </span>
                <p class名称="font-medium">{step.title}</p>
              </div>
              {step.commands.map((cmd, cmdIndex) => (
                <div key={cmdIndex} class名称="space-y-1">
                  {cmd.label && (
                    <p class名称="text-xs text-muted-foreground ml-8">{cmd.label}</p>
                  )}
                  <div class名称="ml-8 relative">
                    <pre class名称="bg-muted p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-all">
                      <code>{cmd.command}</code>
                    </pre>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      class名称="absolute top-2 right-2"
                      onClick={() => copyToClipboard(cmd.command)}
                    >
                      <Copy class名称="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div class名称="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <h4 class名称="font-medium text-blue-900 dark:text-blue-100 mb-2">Prerequisites:</h4>
          <ul class名称="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside mb-3">
            <li>Ensure you have root/sudo access on the target server</li>
            <li>Make sure wget or curl is installed for downloading files</li>
            <li>Internet connection required for downloading packages</li>
          </ul>

          <h4 class名称="font-medium text-blue-900 dark:text-blue-100 mb-2">After Installation:</h4>
          <p class名称="text-sm text-blue-800 dark:text-blue-200">
            The agent will start automatically and appear in your dashboard within a few minutes.
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
