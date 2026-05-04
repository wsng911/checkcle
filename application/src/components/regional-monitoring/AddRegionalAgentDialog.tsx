import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Dialog描述, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCurrentEndpoint } from "@/lib/pocketbase";
import { RegionalAgentConfigForm } from "./RegionalAgentConfigForm";
import { RegionalOneClickTab } from "./RegionalOneClickTab";
import { RegionalManualTab } from "./RegionalManualTab";

interface 添加RegionalAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgent添加ed: () => void;
}

export const 添加RegionalAgentDialog: React.FC<添加RegionalAgentDialogProps> = ({
  open,
  onOpenChange,
  onAgent添加ed
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("configure");
  const [formData, setFormData] = useState({
    region名称: "",
    agentIp: "",
  });
  const [agentToken, setAgentToken] = useState("");
  const [agentId, setAgentId] = useState("");
  const [currentPocketBaseUrl, setCurrentPocketBaseUrl] = useState("");
  const [is提交ting, setIs提交ting] = useState(false);

  // Generate new credentials when dialog opens or after successful creation
  const generateNewCredentials = () => {
    const newToken = `rgn_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newAgentId = `regional_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setAgentToken(newToken);
    setAgentId(newAgentId);
  };

  useEffect(() => {
    if (open) {
      const endpoint = getCurrentEndpoint();
      setCurrentPocketBaseUrl(endpoint);
      generateNewCredentials();
    }
  }, [open]);

  const handle提交 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.region名称.trim() || !formData.agentIp.trim()) return;

    setIs提交ting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('success'),
        description: t('agent创建dSuccessfully'),
      });
      setActiveTab("one-click");
      generateNewCredentials();
      
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
    setFormData({
      region名称: "",
      agentIp: "",
    });
    setActiveTab("configure");
    generateNewCredentials();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialog关闭}>
      <DialogContent class名称="sm:max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{t('addRegional监控ingAgent')}</DialogTitle>
          <Dialog描述>
            {t('deployRegional监控ingAgent')}
          </Dialog描述>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} class名称="w-full">
          <TabsList class名称="grid w-full grid-cols-3">
            <TabsTrigger value="configure">{t('configureAgent')}</TabsTrigger>
            <TabsTrigger value="one-click">{t('oneClickInstallTab')}</TabsTrigger>
            <TabsTrigger value="manual">{t('manualInstallTab')}</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" class名称="space-y-6">
            <RegionalAgentConfigForm
              formData={formData}
              setFormData={setFormData}
              agentId={agentId}
              agentToken={agentToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              is提交ting={is提交ting}
              on提交={handle提交}
            />
          </TabsContent>

          <TabsContent value="one-click" class名称="space-y-6">
            <RegionalOneClickTab
              agentToken={agentToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              formData={formData}
              agentId={agentId}
              onDialog关闭={handleDialog关闭}
            />
          </TabsContent>

          <TabsContent value="manual" class名称="space-y-6">
            <RegionalManualTab
              agentToken={agentToken}
              currentPocketBaseUrl={currentPocketBaseUrl}
              formData={formData}
              agentId={agentId}
              onDialog关闭={handleDialog关闭}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};