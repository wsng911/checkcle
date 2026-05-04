import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { pb } from '@/lib/pocketbase';
import { useToast } from '@/hooks/use-toast';
import { incidentService, 创建IncidentInput } from '@/services/incident';
import { useLanguage } from '@/contexts/LanguageContext';

// Define the schema for our incident form
export const incidentFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: '描述 is required' }),
  affected_systems: z.string().min(1, { message: 'Affected systems are required' }),
  status: z.enum(['investigating', 'found_root_cause', 'in_progress', 'monitoring', 'resolved']),
  impact: z.enum(['none', 'minor', 'major', 'critical']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  service_id: z.string().optional(),
  assigned_to: z.string().optional(),
  root_cause: z.string().optional(),
  resolution_steps: z.string().optional(),
  lessons_learned: z.string().optional(),
});

export type IncidentFormValues = z.infer<typeof incidentFormSchema>;

export const useIncidentForm = (onSuccess: () => void, on关闭: () => void) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentFormSchema),
    defaultValues: {
      title: '',
      description: '',
      affected_systems: '',
      status: 'investigating',
      impact: 'minor',
      priority: 'medium',
      service_id: '',
      assigned_to: '',
      root_cause: '',
      resolution_steps: '',
      lessons_learned: '',
    },
  });

  const on提交 = async (data: IncidentFormValues) => {
    try {
      console.log("Form data before submission:", data);
      
      const formattedData: 创建IncidentInput = {
        title: data.title,
        description: data.description,
        status: data.status,
        affected_systems: data.affected_systems,
        impact: data.impact,
        priority: data.priority,
        service_id: data.service_id,
        assigned_to: data.assigned_to,
        assigned_users: data.assigned_to, // map to server field
        root_cause: data.root_cause,
        resolution_steps: data.resolution_steps,
        lessons_learned: data.lessons_learned,
        timestamp: new Date().toISOString(),
        created_by: pb.authStore.model?.id || '',
      };
      
      console.log("Formatted data for API:", formattedData);

      await incidentService.createIncident(formattedData);
      
      toast({
        title: t('incident创建d'),
        description: t('incident创建dDesc'),
      });
      
      console.log("Incident created successfully, about to call onSuccess and on关闭");
      
      form.reset();
      on关闭();
      onSuccess();
    } catch (error) {
      console.error('Error creating incident:', error);
      
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        toast({
          title: t('error'),
          description: `${t('errorCreatingIncident')}: ${error.message}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('error'),
          description: t('errorCreatingIncident'),
          variant: 'destructive',
        });
      }
    }
  };

  return {
    form,
    on提交: form.handle提交(on提交),
  };
};
