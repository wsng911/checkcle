import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useServiceSchema, ServiceFormData } from "./types";
import { ServiceBasicFields } from "./ServiceBasicFields";
import { ServiceTypeField } from "./ServiceTypeField";
import { ServiceConfigFields } from "./ServiceConfigFields";
import { ServiceNotificationFields } from "./ServiceNotificationFields";
import { ServiceForm操作 } from "./ServiceForm操作";
import { serviceService } from "@/services/serviceService";
import { Service } from "@/types/service.types";
import { ServiceRegionalFields } from "./ServiceRegionalFields";
import { getServiceFormDefaults, mapServiceToFormData, mapFormDataToServiceData } from "./serviceFormUtils";
import { useQueryClient } from "@tanstack/react-query";
import {useLanguage} from "@/contexts/LanguageContext.tsx";

interface ServiceFormProps {
  onSuccess: () => void;
  on取消: () => void;
  initialData?: Service | null;
  is编辑?: boolean;
  on提交Start?: () => void;
}

export function ServiceForm({ 
  onSuccess, 
  on取消, 
  initialData, 
  is编辑 = false,
  on提交Start
}: ServiceFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [is提交ting, setIs提交ting] = useState(false);
  const queryClient = useQueryClient();

	const serviceSchema = useServiceSchema();

  // Initialize form with default values
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: getServiceFormDefaults(),
    mode: "onBlur",
  });

  // Populate form when initialData changes (separate from initialization)
  useEffect(() => {
    if (initialData && is编辑) {
      const formData = mapServiceToFormData(initialData);
      form.reset(formData);

      // Log for debugging
    //  console.log("Populating form with data:", { 
    //    type: formData.type, 
    //    url: formData.url, 
    //    port: formData.port, 
    //    regionalAgents: formData.regionalAgents,
    //    regional监控ingEnabled: formData.regional监控ingEnabled,
    //    regional_status: initialData.regional_status,
    //    region_name: initialData.region_name,
    //    agent_id: initialData.agent_id,
     //   notification_status: initialData.notification_status,
     //   notificationChannels: formData.notificationChannels
    //  });
    }
  }, [initialData, is编辑, form]);

  const handle提交 = async (data: ServiceFormData) => {
    if (is提交ting) return;
    
    setIs提交ting(true);
    if (on提交Start) on提交Start();
    
    try {
     // console.log("Form data being submitted:", data);
      
      const serviceData = mapFormDataToServiceData(data);
     // console.log("Service data being sent:", serviceData);
      
      if (is编辑 && initialData) {
        // Update existing service
        await serviceService.updateService(initialData.id, serviceData);
        
        toast({
          title: "Service updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        // 创建 new service
        await serviceService.createService(serviceData);
        
        toast({
          title: "Service created",
          description: `${data.name} has been added to monitoring.`,
        });
      }
      
      // Force immediate refresh of services data
      queryClient.setQueryData(["services"], (oldData: any) => {
        // Invalidate the cache to force a fresh fetch
        return undefined;
      });
      
      // Invalidate and refetch services query
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      await queryClient.refetchQueries({ queryKey: ["services"] });

      onSuccess();
      if (!is编辑) {
        form.reset();
      }
    } catch (error) {
     // console.error(`Error ${is编辑 ? 'updating' : 'creating'} service:`, error);
      toast({
        title: `Failed to ${is编辑 ? 'update' : 'create'} service`,
        description: `An error occurred while ${is编辑 ? 'updating' : 'creating'} the service.`,
        variant: "destructive",
      });
    } finally {
      setIs提交ting(false);
    }
  };

  return (
    <Form {...form}>
      <form on提交={form.handle提交(handle提交)} class名称="space-y-6 pb-6">
        <div class名称="space-y-6">
          <div class名称="space-y-4">
            <h3 class名称="text-sm font-medium text-muted-foreground border-b pb-2">{t('basicInformation')}</h3>
            <ServiceBasicFields form={form} />
            <ServiceTypeField form={form} />
          </div>
          
          <div class名称="space-y-4">
            <h3 class名称="text-sm font-medium text-muted-foreground border-b pb-2">{t('configuration')}</h3>
            <ServiceConfigFields form={form} />
          </div>

          <div class名称="space-y-4">
            <h3 class名称="text-sm font-medium text-muted-foreground border-b pb-2">{t('regional监控ing')}</h3>
            <ServiceRegionalFields form={form} />
          </div>
          
          <div class名称="space-y-4">
            <h3 class名称="text-sm font-medium text-muted-foreground border-b pb-2">{t('notifications')}</h3>
            <ServiceNotificationFields form={form} />
          </div>
        </div>
        
        <ServiceForm操作 
          is提交ting={is提交ting} 
          on取消={on取消} 
          submitLabel={is编辑 ? t("updateService") : t("createService")}
        />
      </form>
    </Form>
  );
}