
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTemplateForm } from "./hooks/useTemplateForm";
import { ServerTemplateFields } from "./form/ServerTemplateFields";
import { ServiceTemplateFields } from "./form/ServiceTemplateFields";
import { SslTemplateFields } from "./form/SslTemplateFields";
import { ServerThresholdFields } from "./form/ServerThresholdFields";
import { Loader2, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateType, templateTypeConfigs } from "@/services/templateService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {z} from "zod";

interface TemplateDialogProps {
  open: boolean;
  templateId: string | null;
  templateType: TemplateType | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  templateId,
  templateType: initialTemplateType,
  onOpenChange,
  onSuccess,
}) => {
  const [selectedTemplateType, setSelectedTemplateType] = useState<TemplateType>(initialTemplateType || 'service');
  
  const {
    form,
    is编辑Mode,
    isLoadingTemplate,
    is提交ting,
    on提交
  } = useTemplateForm({
    templateId,
    templateType: selectedTemplateType,
    open,
    onOpenChange,
    onSuccess
  });

  // Update template type when prop changes or dialog opens
  useEffect(() => {
    if (initialTemplateType) {
      setSelectedTemplateType(initialTemplateType);
    } else if (open && !is编辑Mode) {
      setSelectedTemplateType('service');
    }
  }, [initialTemplateType, open, is编辑Mode]);

  // Handle template type change
  const handleTemplateTypeChange = (newType: TemplateType) => {
    if (!is编辑Mode) {
      setSelectedTemplateType(newType);
      form.setValue('templateType', newType);
    }
  };

  const renderTemplateFields = () => {
    switch (selectedTemplateType) {
      case 'server':
        return <ServerTemplateFields control={form.control} />;
      case 'service':
        return <ServiceTemplateFields control={form.control} />;
      case 'ssl':
        return <SslTemplateFields control={form.control} />;
      case 'server_threshold':
        return <ServerThresholdFields control={form.control} />;
      default:
        return null;
    }
  };

  const renderPlaceholderGuide = () => {

    const config = templateTypeConfigs[selectedTemplateType];
    if (!config) return null;

    return (
      <Card>
        <CardHeader class名称="pb-3">
          <CardTitle class名称="text-sm font-medium">Available Placeholders</CardTitle>
        </CardHeader>
        <CardContent>
          <p class名称="text-sm text-muted-foreground mb-3">
            {config.description}. Use these placeholders in your messages:
          </p>
          <div class名称="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {config.placeholders.map((placeholder) => (
              <div key={placeholder} class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">{placeholder}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{is编辑Mode ? "编辑 Template" : "添加 Template"}</DialogTitle>
        </DialogHeader>
        
        {isLoadingTemplate ? (
          <div class名称="flex items-center justify-center py-8">
            <Loader2 class名称="h-8 w-8 animate-spin text-primary" />
            <span class名称="ml-2">Loading template data...</span>
          </div>
        ) : (
          <Form {...form}>
            <form on提交={form.handle提交(on提交)} class名称="space-y-6 flex-1 flex flex-col">
              <div class名称="relative flex-1">
                <ScrollArea class名称="pr-4 overflow-auto" style={{ height: "calc(80vh - 180px)" }}>
                  <div class名称="space-y-6 pb-6 pr-4">
                    {/* Basic Fields */}
                    <div class名称="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template 名称</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter template name" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="templateType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template Type</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={handleTemplateTypeChange}
                                value={selectedTemplateType}
                                disabled={is编辑Mode}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select template type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="server">Server 监控ing</SelectItem>
                                  <SelectItem value="service">Service Uptime</SelectItem>
                                  <SelectItem value="ssl">SSL Certificate</SelectItem>
                                  <SelectItem value="server_threshold">Server Threshold</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {selectedTemplateType !== 'server_threshold' && (
                        <FormField
                          control={form.control}
                          name="placeholder"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Custom Placeholder</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Optional custom placeholder"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    
                    <Tabs defaultValue="messages">
                      <TabsList class名称="grid w-full grid-cols-2">
                        <TabsTrigger value="messages">{selectedTemplateType === 'server_threshold' ? 'Thresholds' : 'Messages'}</TabsTrigger>
                        <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="messages" class名称="pt-4">
                        {renderTemplateFields()}
                      </TabsContent>
                      
                      <TabsContent value="placeholders" class名称="pt-4">
                        {renderPlaceholderGuide()}
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>
                <div class名称="absolute bottom-2 right-4 text-muted-foreground opacity-60">
                  <ChevronDown class名称="h-4 w-4 animate-bounce" />
                </div>
              </div>
              
              <DialogFooter class名称="mt-2 pt-2 border-t border-border">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)} 
                  disabled={is提交ting}
                >
                  取消
                </Button>
                <Button 
                  type="submit" 
                  disabled={is提交ting || isLoadingTemplate}
                  class名称="relative"
                >
                  {is提交ting && (
                    <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {is提交ting 
                    ? (is编辑Mode ? "Updating..." : "Creating...") 
                    : (is编辑Mode ? "Update Template" : "创建 Template")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};