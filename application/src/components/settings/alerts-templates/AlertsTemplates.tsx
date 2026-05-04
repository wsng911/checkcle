
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { templateService, TemplateType } from "@/services/templateService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, RefreshCcw } from "lucide-react";
import { TemplateList } from "./TemplateList";
import { TemplateDialog } from "./TemplateDialog";
import { useToast } from "@/hooks/use-toast";

export const AlertsTemplates = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TemplateType>('service');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, set编辑ingTemplate] = useState<string | null>(null);
  const [editingTemplateType, set编辑ingTemplateType] = useState<TemplateType | null>(null);

  const {
    data: templates = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['notification_templates', activeTab],
    queryFn: () => templateService.getTemplates(activeTab),
  });

  const handle添加Template = (templateType: TemplateType) => {
    set编辑ingTemplate(null);
    set编辑ingTemplateType(templateType);
    setIsDialogOpen(true);
  };

  const handle编辑Template = (id: string, templateType: TemplateType) => {
    set编辑ingTemplate(id);
    set编辑ingTemplateType(templateType);
    setIsDialogOpen(true);
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing",
      description: "Updating template list...",
    });
  };

  return (
    <Card class名称="w-full">
      <CardHeader class名称="flex flex-row items-center justify-between">
        <CardTitle>Alert Templates</CardTitle>
        <div class名称="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCcw class名称="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => handle添加Template(activeTab)}>
            <Plus class名称="h-4 w-4 mr-2" />
            添加 Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TemplateType)}>
          <TabsList class名称="grid w-full grid-cols-4">
            <TabsTrigger value="service">Service Uptime</TabsTrigger>
            <TabsTrigger value="server">Server 监控ing</TabsTrigger>
            <TabsTrigger value="ssl">SSL Certificate</TabsTrigger>
            <TabsTrigger value="server_threshold">Server Threshold</TabsTrigger>
          </TabsList>
          
          <TabsContent value="service" class名称="mt-4">
            {error ? (
              <div class名称="text-center p-6">
                <p class名称="text-destructive mb-4">Error loading service templates</p>
                <Button variant="outline" onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <TemplateList 
                templates={templates} 
                isLoading={isLoading} 
                on编辑={(id) => handle编辑Template(id, 'service')}
                refetchTemplates={refetch}
                templateType="service"
              />
            )}
          </TabsContent>
          
          <TabsContent value="server" class名称="mt-4">
            {error ? (
              <div class名称="text-center p-6">
                <p class名称="text-destructive mb-4">Error loading server templates</p>
                <Button variant="outline" onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <TemplateList 
                templates={templates} 
                isLoading={isLoading} 
                on编辑={(id) => handle编辑Template(id, 'server')}
                refetchTemplates={refetch}
                templateType="server"
              />
            )}
          </TabsContent>
          
          <TabsContent value="ssl" class名称="mt-4">
            {error ? (
              <div class名称="text-center p-6">
                <p class名称="text-destructive mb-4">Error loading SSL templates</p>
                <Button variant="outline" onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <TemplateList 
                templates={templates} 
                isLoading={isLoading} 
                on编辑={(id) => handle编辑Template(id, 'ssl')}
                refetchTemplates={refetch}
                templateType="ssl"
              />
            )}
          </TabsContent>
          
          <TabsContent value="server_threshold" class名称="mt-4">
            {error ? (
              <div class名称="text-center p-6">
                <p class名称="text-destructive mb-4">Error loading server threshold templates</p>
                <Button variant="outline" onClick={() => refetch()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <TemplateList 
                templates={templates} 
                isLoading={isLoading} 
                on编辑={(id) => handle编辑Template(id, 'server_threshold')}
                refetchTemplates={refetch}
                templateType="server_threshold"
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <TemplateDialog
        open={isDialogOpen}
        templateId={editingTemplate}
        templateType={editingTemplateType}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          refetch();
          setIsDialogOpen(false);
        }}
      />
    </Card>
  );
};