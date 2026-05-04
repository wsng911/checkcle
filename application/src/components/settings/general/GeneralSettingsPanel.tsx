import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, Card描述, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 设置, Mail, ShieldAlert } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSystem设置 } from "@/hooks/useSystem设置";
import { General设置 } from "@/services/settingsService";
import { Alert, Alert描述 } from "@/components/ui/alert";
import { authService } from "@/services/authService";
import System设置Tab from './System设置Tab';
import Mail设置Tab from './Mail设置Tab';
import { General设置PanelProps } from './types';

const General设置Panel: React.FC<General设置PanelProps> = () => {
  const { t } = useLanguage();
  const [is编辑ing, setIs编辑ing] = useState(false);
  const [activeTab, setActiveTab] = useState("system");
  
  // Get current user to check permissions
  const currentUser = authService.getCurrentUser();
  const isSuperAdmin = currentUser?.role === "superadmin";
  
  const {
    settings,
    isLoading,
    error,
    update设置,
    isUpdating,
  } = useSystem设置();

  const form = useForm<General设置>({
    defaultValues: {
      meta: {
        app名称: '',
        appURL: '',
        sender名称: '',
        sender添加ress: '',
        hideControls: false
      },
      smtp: {
        enabled: false,
        port: 587,
        host: '',
        username: '',
        password: '',
        authMethod: '',
        tls: true,
        local名称: ''
      }
    }
  });

  useEffect(() => {
    if (settings && isSuperAdmin) {
      // Initialize form with existing settings, using system_name for app名称 if meta.app名称 is not set
      const app名称 = settings.meta?.app名称 || settings.system_name || '';
      
      form.reset({
        ...settings,
        meta: {
          app名称: app名称,
          appURL: settings.meta?.appURL || '',
          sender名称: settings.meta?.sender名称 || '',
          sender添加ress: settings.meta?.sender添加ress || '',
          hideControls: settings.meta?.hideControls || false
        },
        smtp: settings.smtp || {
          enabled: false,
          port: 587,
          host: '',
          username: '',
          password: '',
          authMethod: '',
          tls: true,
          local名称: ''
        }
      });
    }
  }, [settings, form, isSuperAdmin]);

  const handle保存 = async (formData: General设置) => {
    try {
      // Prepare data for PocketBase settings update (no ID needed)
      const dataTo保存 = {
        ...formData,
        system_name: formData.meta?.app名称 || settings?.system_name
      };
      
      console.log('Saving settings data:', dataTo保存);
      await update设置(dataTo保存);
      setIs编辑ing(false);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handle编辑Click = () => {
    console.log('编辑 button clicked, setting is编辑ing to true');
    setIs编辑ing(true);
  };

  const handle取消Click = () => {
    console.log('取消 button clicked, setting is编辑ing to false');
    setIs编辑ing(false);
    // Reset form to original values
    if (settings) {
      const app名称 = settings.meta?.app名称 || settings.system_name || '';
      form.reset({
        ...settings,
        meta: {
          app名称: app名称,
          appURL: settings.meta?.appURL || '',
          sender名称: settings.meta?.sender名称 || '',
          sender添加ress: settings.meta?.sender添加ress || '',
          hideControls: settings.meta?.hideControls || false
        },
        smtp: settings.smtp || {
          enabled: false,
          port: 587,
          host: '',
          username: '',
          password: '',
          authMethod: '',
          tls: true,
          local名称: ''
        }
      });
    }
  };

  // Show permission notice for admin users
  if (!isSuperAdmin) {
    return (
      <div class名称="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("general设置", "menu")}</CardTitle>
          </CardHeader>
          <CardContent class名称="space-y-4">
            <Alert class名称="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <ShieldAlert class名称="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <Alert描述 class名称="text-blue-700 dark:text-blue-300">
                <span class名称="font-medium">{t("permissionNotice")}</span> {t("permissionNotice添加User")}
              </Alert描述>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <div class名称="p-4">{t("loading设置")}</div>;
  }

  if (error) {
    return <div class名称="p-4 text-red-500">{t("loading设置Error")}</div>;
  }

  return (
    <div class名称="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("general设置", "menu")}</CardTitle>
        </CardHeader>
        <CardContent class名称="space-y-4">
          <Form {...form}>
            <form on提交={form.handle提交(handle保存)}>
              <Tabs value={activeTab} onValueChange={setActiveTab} class名称="w-full">
                <TabsList class名称="w-full mb-4">
                  <TabsTrigger value="system" class名称="flex items-center gap-2 flex-1">
                    <设置 class名称="h-4 w-4" />
                    {t("system设置", "settings")}
                  </TabsTrigger>
                  <TabsTrigger value="mail" class名称="flex items-center gap-2 flex-1">
                    <Mail class名称="h-4 w-4" />
                    {t("mail设置", "settings")}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="system">
                  <System设置Tab 
                    form={form} 
                    is编辑ing={is编辑ing} 
                    settings={settings} 
                  />
                </TabsContent>
                
                <TabsContent value="mail">
                  <Mail设置Tab 
                    form={form} 
                    is编辑ing={is编辑ing} 
                    settings={settings}
                  />
                </TabsContent>
              </Tabs>
              
              {is编辑ing && (
                <div class名称="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={handle取消Click} disabled={isUpdating}>
                    {t("cancel", "common")}
                  </Button>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? t("saving", "settings") : t("save", "settings")}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        
        {!is编辑ing && (
          <CardFooter>
            <Button type="button" onClick={handle编辑Click}>
              {t("edit", "common")}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default General设置Panel;