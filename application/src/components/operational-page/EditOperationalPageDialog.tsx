import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, Dialog描述, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, Form描述, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useUpdateOperationalPage } from '@/hooks/useOperationalPage';
import { use创建状态PageComponent, use状态PageComponentsByOperationalId, use删除状态PageComponent } from '@/hooks/use状态PageComponents';
import { ComponentsSelector } from './ComponentsSelector';
import { OperationalPageRecord } from '@/types/operational.types';
import { 状态PageComponentRecord } from '@/types/statusPageComponents.types';
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, '描述 is required'),
  slug: z.string().min(1, 'Slug is required'),
  theme: z.string().min(1, 'Theme is required'),
  status: z.enum(['operational', 'degraded', 'maintenance', 'major_outage']),
  is_public: z.boolean(),
  logo_url: z.string().optional(),
  custom_domain: z.string().optional(),
  custom_css: z.string().optional(),
  page_style: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface 编辑OperationalPageDialogProps {
  page: OperationalPageRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const 编辑OperationalPageDialog = ({ page, open, onOpenChange }: 编辑OperationalPageDialogProps) => {
  const { t } = useLanguage();
  const [selectedComponents, setSelectedComponents] = useState<Partial<状态PageComponentRecord>[]>([]);
  const [isForm提交ting, setIsForm提交ting] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  
  const updateMutation = useUpdateOperationalPage();
  const createComponentMutation = use创建状态PageComponent();
  const deleteComponentMutation = use删除状态PageComponent();
  
  // Fetch existing components for this operational page
  const { data: components = [] } = use状态PageComponentsByOperationalId(page?.id || '');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      theme: 'default',
      status: 'operational',
      is_public: true,
      logo_url: '',
      custom_domain: '',
      custom_css: '',
      page_style: '',
    },
  });

  // Memoize the form reset values to prevent unnecessary re-renders
  const formValues = useMemo(() => {
    if (!page) return null;
    return {
      title: page.title,
      description: page.description,
      slug: page.slug,
      theme: page.theme,
      status: page.status,
      is_public: page.is_public === 'true',
      logo_url: page.logo_url || '',
      custom_domain: page.custom_domain || '',
      custom_css: page.custom_css || '',
      page_style: page.page_style || '',
    };
  }, [page?.id, page?.title, page?.description, page?.slug, page?.theme, page?.status, page?.is_public, page?.logo_url, page?.custom_domain, page?.custom_css, page?.page_style]);

  // Reset form when page data changes
  useEffect(() => {
    if (formValues) {
      form.reset(formValues);
    }
  }, [formValues, form]);

  // Convert components to selector format and initialize state - only when dialog opens and components change
  useEffect(() => {
    if (!open || !page?.id || !components) {
      return;
    }

    // Only update if components actually changed or haven't been loaded yet
    const componentIds = components.map(c => c.id).sort().join(',');
    const currentSelectedIds = selectedComponents.map(c => c.id).filter(Boolean).sort().join(',');
    
    if (componentIds !== currentSelectedIds || !componentsLoaded) {
 //     console.log('Loading existing components:', components);
      const existingComponentsForSelector = components.map(comp => ({
        id: comp.id,
        name: comp.name,
        description: comp.description,
        service_id: comp.service_id,
        server_id: comp.server_id,
        display_order: comp.display_order,
        operational_status_id: comp.operational_status_id,
      }));
      
      setSelectedComponents(existingComponentsForSelector);
      setComponentsLoaded(true);
    }
  }, [open, page?.id, components, componentsLoaded, selectedComponents]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setComponentsLoaded(false);
      setSelectedComponents([]);
    }
  }, [open]);

  const handleComponent删除 = useCallback(async (componentId: string) => {
    try {
   //   console.log('Deleting component:', componentId);
      await deleteComponentMutation.mutateAsync(componentId);
      
      // Update local state to remove the deleted component
      setSelectedComponents(prev => prev.filter(comp => comp.id !== componentId));
    } catch (error) {
   //   console.error('Error deleting component:', error);
    }
  }, [deleteComponentMutation]);

  const on提交 = async (data: FormData) => {
    if (!page) return;

    try {
      setIsForm提交ting(true);
      
      const payload = {
        title: data.title,
        description: data.description,
        slug: data.slug,
        theme: data.theme,
        status: data.status,
        is_public: data.is_public ? 'true' : 'false',
        logo_url: data.logo_url || '',
        custom_domain: data.custom_domain || '',
        custom_css: data.custom_css || '',
        page_style: data.page_style || '',
      };
      
   //   console.log('Updating operational page with payload:', payload);
      await updateMutation.mutateAsync({ id: page.id, data: payload });
      
      // Handle component changes
      const currentComponentIds = components.map(c => c.id);
      const newComponentsTo创建 = selectedComponents.filter(comp => !comp.id);
      const componentsTo删除 = components.filter(comp => !selectedComponents.some(selected => selected.id === comp.id));

      // 删除 removed components
      for (const component of componentsTo删除) {
    //    console.log('Deleting component during save:', component.id);
        await deleteComponentMutation.mutateAsync(component.id);
      }

      // 创建 new components
      for (const component of newComponentsTo创建) {
        const componentPayload = {
          operational_status_id: page.id,
          name: component.name || '',
          description: component.description || '',
          service_id: component.service_id || '',
          server_id: component.server_id || '',
          display_order: component.display_order || 1,
        };
        
    //    console.log('Creating component with payload:', componentPayload);
        await createComponentMutation.mutateAsync(componentPayload);
      }
      
      onOpenChange(false);
    } catch (error) {
    //  console.error('Error updating operational page:', error);
    } finally {
      setIsForm提交ting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('editOperationalPage')}</DialogTitle>
          <Dialog描述>
            {t('updateYourOperationalPage')}
          </Dialog描述>
        </DialogHeader>

        <Form {...form}>
          <form on提交={form.handle提交(on提交)} class名称="space-y-6">
            <div class名称="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('title')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('myService状态Placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('slug')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('myService状态SlugPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('description')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t('operationalPage描述Placeholder')} 
                      class名称="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div class名称="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('theme')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectTheme')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">{t('themeDefault')}</SelectItem>
                        <SelectItem value="dark">{t('themeDark')}</SelectItem>
                        <SelectItem value="light">{t('themeLight')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('status')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('select状态')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="operational">{t('statusOperational')}</SelectItem>
                        <SelectItem value="degraded">{t('statusDegraded')}</SelectItem>
                        <SelectItem value="maintenance">{t('statusMaintenance')}</SelectItem>
                        <SelectItem value="major_outage">{t('statusMajorOutage')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem class名称="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div class名称="space-y-0.5">
                    <FormLabel>{t('publicPage')}</FormLabel>
                    <Form描述>
                      {t('makePagePublic')}
                    </Form描述>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="custom_domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('customDomainOptional')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('customDomainPlaceholder')} {...field} />
                  </FormControl>
                  <Form描述>
                    {t('customDomain描述')}
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ComponentsSelector
              selectedComponents={selectedComponents}
              onComponentsChange={setSelectedComponents}
              onComponent删除={handleComponent删除}
            />

            <div class名称="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                {t('cancel')}
              </Button>
              <Button 
                type="submit" 
                disabled={isForm提交ting || updateMutation.isPending || createComponentMutation.isPending}
              >
                {isForm提交ting || updateMutation.isPending || createComponentMutation.isPending ? t('updating') : t('updatePage')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};