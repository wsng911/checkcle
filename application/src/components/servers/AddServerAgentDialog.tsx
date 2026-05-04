
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentEndpoint } from "@/lib/pocketbase";
import { ServerAgentConfigForm } from "./ServerAgentConfigForm";
import { OneClickInstallTab } from "./OneClickInstallTab";
import { DockerOneClickTab } from "./DockerOneClickTab";
import { ManualInstallTab } from "./ManualInstallTab";
import { useLanguage } from "@/contexts/LanguageContext";

interface 添加ServerAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgent添加ed: () => void;
}

export const 添加ServerAgentDialog: React.FC<添加ServerAgentDialogProps> = ({
  open,
  onOpenChange,
  onAgent添加ed,
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [is提交ting, setIs提交ting] = useState(false);
  const [activeTab, setActiveTab] = useState("configure");

  const currentPocketBaseUrl = getCurrentEndpoint();
  const [formData, setFormData] = useState({
    server名称: "",
    description: "",
    osType: "",
    checkInterval: "60",
    retryAttempt: "3",
    dockerEnabled: false,
    notificationEnabled: true,
  });

  const generateNewCredentials = () => ({
    serverToken: `srv_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    serverId: `agent_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  });

  const [serverToken, setServerToken] = useState(() =>
    `srv_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  );

  const [serverId, setServerId] = useState(() =>
    `agent_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  );

  // Refresh credentials and reset form whenever the dialog opens
  React.useEffect(() => {
    if (open) {
      const newCredentials = generateNewCredentials();
      setServerToken(newCredentials.serverToken);
      setServerId(newCredentials.serverId);
      setActiveTab("configure");
      setFormData({
        server名称: "",
        description: "",
        osType: "",
        checkInterval: "60",
        retryAttempt: "3",
        dockerEnabled: false,
        notificationEnabled: true,
      });
    }
  }, [open]);

  const handle提交 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (is提交ting) return;

    if (!formData.server名称 || !formData.osType) {
      toast({
        title: t('validationError'),
        description: t('fillRequiredFields'),
        variant: "destructive",
      });
      return;
    }

    setIs提交ting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: t('serverAgent创建d'),
        description: t('serverAgent创建dDesc').replace('{name}', formData.server名称),
      });
      setActiveTab("one-click");
      onAgent添加ed();
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failedTo创建Agent'),
        variant: "destructive",
      });
    } finally {
      setIs提交ting(false);
    }
  };

  const handleDialog关闭 = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialog关闭}>
      <DialogContent class名称="sm:max-w-[900px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle class名称="flex items-center gap-2">
            <Server class名称="h-5 w-5" />
            {t('addServer监控ingAgent')}
          </DialogTitle>
          <Dialog描述>
            {t('configureAgentDesc')}
          </Dialog描述>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} class名称="w-full">
          <TabsList class名称="grid w-full grid-cols-4">
            <TabsTrigger value="configure">{t('configureAgent')}</TabsTrigger>
            <TabsTrigger value="one-click">{t('oneClickInstall')}</TabsTrigger>
            <TabsTrigger value="docker-one-click">{t('dockerOneClick')}</TabsTrigger>
            <TabsTrigger value="manual">{t('manualInstallation')}</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" class名称="space-y-6">
            <ServerAgentConfigForm
              formData={formData}
              setFormData={setFormData}
              serverId={serverId}
              serverToken={serverToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              is提交ting={is提交ting}
              on提交={handle提交}
            />
          </TabsContent>

          <TabsContent value="one-click" class名称="space-y-6">
            <OneClickInstallTab
              serverToken={serverToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              formData={formData}
              serverId={serverId}
              onDialog关闭={handleDialog关闭}
            />
          </TabsContent>

          <TabsContent value="docker-one-click" class名称="space-y-6">
            <DockerOneClickTab
              serverToken={serverToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              formData={formData}
              serverId={serverId}
              onDialog关闭={handleDialog关闭}
            />
          </TabsContent>

          <TabsContent value="manual" class名称="space-y-6">
            <ManualInstallTab
              serverToken={serverToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              formData={formData}
              serverId={serverId}
              onDialog关闭={handleDialog关闭}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};