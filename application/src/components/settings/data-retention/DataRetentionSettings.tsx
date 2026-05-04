
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, Card描述, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, Alert描述 } from "@/components/ui/alert";
import { Loader2, Database, Trash2, AlertTriangle, Globe, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { dataRetentionService } from "@/services/dataRetentionService";

interface Retention设置 {
  uptimeRetentionDays: number;
  serverRetentionDays: number;
}

const DataRetention设置 = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [settings, set设置] = useState<Retention设置>({
    uptimeRetentionDays: 30,
    serverRetentionDays: 30
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUptimeShrinking, setIsUptimeShrinking] = useState(false);
  const [isServerShrinking, setIsServerShrinking] = useState(false);
  const [isFullShrinking, setIsFullShrinking] = useState(false);
  const [lastCleanup, setLastCleanup] = useState<string | null>(null);

  // Check if user is super admin
  const currentUser = authService.getCurrentUser();
  const isSuperAdmin = currentUser?.role === "superadmin";

  useEffect(() => {
    if (isSuperAdmin) {
      load设置();
    }
  }, [isSuperAdmin]);

  const load设置 = async () => {
    try {
      setIsLoading(true);
      const result = await dataRetentionService.getRetention设置();
      if (result) {
        set设置({
          uptimeRetentionDays: result.uptimeRetentionDays || 30,
          serverRetentionDays: result.serverRetentionDays || 30
        });
        setLastCleanup(result.lastCleanup);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load retention settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handle保存 = async () => {
    try {
      setIsSaving(true);
      await dataRetentionService.updateRetention设置(settings);
      toast({
        title: "设置 saved",
        description: "Data retention settings have been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save retention settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUptimeShrink = async () => {
    try {
      setIsUptimeShrinking(true);
      const result = await dataRetentionService.manualUptimeCleanup();
      
      toast({
        title: "Uptime cleanup completed",
        description: `删除d ${result.deletedRecords} old uptime records`,
      });
      
      // Reload settings to get updated last cleanup time
      await load设置();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform uptime data cleanup",
        variant: "destructive",
      });
    } finally {
      setIsUptimeShrinking(false);
    }
  };

  const handleServerShrink = async () => {
    try {
      setIsServerShrinking(true);
      const result = await dataRetentionService.manualServerCleanup();
      
      toast({
        title: "Server cleanup completed",
        description: `删除d ${result.deletedRecords} old server records`,
      });
      
      // Reload settings to get updated last cleanup time
      await load设置();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform server data cleanup",
        variant: "destructive",
      });
    } finally {
      setIsServerShrinking(false);
    }
  };

  const handleFullShrink = async () => {
    try {
      setIsFullShrinking(true);
      const result = await dataRetentionService.manualCleanup();
      
      toast({
        title: "Database cleanup completed",
        description: `删除d ${result.deletedRecords} old records`,
      });
      
      // Reload settings to get updated last cleanup time
      await load设置();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform database cleanup",
        variant: "destructive",
      });
    } finally {
      setIsFullShrinking(false);
    }
  };

  // Show permission notice for admin users
  if (!isSuperAdmin) {
    return (
      <div class名称="p-4">
        <Card>
          <CardHeader>
            <CardTitle class名称="flex items-center gap-2">
              <Database class名称="h-5 w-5" />
              {t("dataRetention")}
            </CardTitle>
          </CardHeader>
          <CardContent class名称="space-y-4">
            <Alert class名称="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <AlertTriangle class名称="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <Alert描述 class名称="text-blue-700 dark:text-blue-300">
                <span class名称="font-medium">{t("permissionNotice")}</span> {t("permissionNoticeDataRetention")}
              </Alert描述>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div class名称="p-4 flex items-center justify-center">
        <Loader2 class名称="h-6 w-6 animate-spin mr-2" />
        {t("loadingRetention设置")}
      </div>
    );
  }

  return (
    <div class名称="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class名称="flex items-center gap-2">
            <Database class名称="h-5 w-5" />
            {t("dataRetention")}
          </CardTitle>
          <Card描述>
            {t("dataRetention描述")}
          </Card描述>
        </CardHeader>
        <CardContent class名称="space-y-6">
          <div class名称="space-y-4">
            <div>
              <Label htmlFor="uptimeRetention">{t("uptimeRetentionLabel")}</Label>
              <Input
                id="uptimeRetention"
                type="number"
                min="1"
                max="365"
                value={settings.uptimeRetentionDays}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || isNaN(Number(value))) {
                    return;
                  }
                  set设置(prev => ({
                    ...prev,
                    uptimeRetentionDays: Number(value)
                  }));
                }}
                class名称="mt-1"
              />
              <p class名称="text-sm text-muted-foreground mt-1">
                {t("uptimeRetentionHelp")}
              </p>
            </div>

            <div>
              <Label htmlFor="serverRetention">{t("serverRetentionLabel")}</Label>
              <Input
                id="serverRetention"
                type="number"
                min="1"
                max="365"
                value={settings.serverRetentionDays}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || isNaN(Number(value))) {
                    return;
                  }
                  set设置(prev => ({
                    ...prev,
                    serverRetentionDays: Number(value)
                  }));
                }}
                class名称="mt-1"
              />
              <p class名称="text-sm text-muted-foreground mt-1">
                {t("serverRetentionHelp")}
              </p>
            </div>
          </div>

          {lastCleanup && (
            <Alert>
              <Database class名称="h-4 w-4" />
              <Alert描述>
                {t("lastCleanup")}: {new Date(lastCleanup).toLocaleString()}
              </Alert描述>
            </Alert>
          )}
        </CardContent>
        <CardFooter class名称="flex justify-end">
          <Button
            onClick={handle保存}
            disabled={isSaving}
            class名称="flex items-center gap-2"
          >
            {isSaving ? (
              <Loader2 class名称="h-4 w-4 animate-spin" />
            ) : null}
            {t("save")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataRetention设置;