
import { useState } from 'react';
import { Card, CardContent, Card描述, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Server } from 'lucide-react';
import { 状态PageComponentRecord } from '@/types/statusPageComponents.types';
import { useQuery } from '@tanstack/react-query';
import { serviceService } from '@/services/serviceService';
import { useLanguage } from "@/contexts/LanguageContext";

interface ComponentsSelectorProps {
  selectedComponents: Partial<状态PageComponentRecord>[];
  onComponentsChange: (components: Partial<状态PageComponentRecord>[]) => void;
  onComponent删除?: (componentId: string) => void;
}

export const ComponentsSelector = ({ selectedComponents, onComponentsChange, onComponent删除 }: ComponentsSelectorProps) => {
  const { t } = useLanguage();
  const [show添加Form, setShow添加Form] = useState(false);
  const [newComponent, setNewComponent] = useState({
    name: '',
    description: '',
    service_id: '',
    server_id: '',
    display_order: selectedComponents.length + 1,
  });

  // Fetch uptime services for the dropdown
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: serviceService.get服务,
  });

  const addComponent = () => {
    if (!newComponent.name.trim()) return;

    const component: Partial<状态PageComponentRecord> = {
      ...newComponent,
      operational_status_id: '', // Will be set when page is created
    };

    onComponentsChange([...selectedComponents, component]);
    setNewComponent({
      name: '',
      description: '',
      service_id: '',
      server_id: '',
      display_order: selectedComponents.length + 2,
    });
    setShow添加Form(false);
  };

  const removeComponent = async (index: number) => {
    const component = selectedComponents[index];
    
    // If component has an ID, it exists in database and needs to be deleted
    if (component.id && onComponent删除) {
      await onComponent删除(component.id);
    } else {
      // For new components not yet saved, just remove from local state
      const updated = selectedComponents.filter((_, i) => i !== index);
      onComponentsChange(updated);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle class名称="flex items-center gap-2">
          <Server class名称="h-5 w-5" />
          {t('statusPageComponents')}
        </CardTitle>
        <Card描述>
          {t('add监控ingComponentsDesc')}
        </Card描述>
      </CardHeader>
      <CardContent class名称="space-y-4">
        {selectedComponents.length > 0 && (
          <div class名称="space-y-2">
            <Label>{t('selectedComponents')}</Label>
            <div class名称="space-y-2">
              {selectedComponents.map((component, index) => (
                <div key={component.id || index} class名称="flex items-center justify-between p-3 border rounded-lg">
                  <div class名称="flex-1">
                    <div class名称="font-medium">{component.name}</div>
                    {component.description && (
                      <div class名称="text-sm text-muted-foreground">{component.description}</div>
                    )}
                    <div class名称="flex gap-2 mt-1">
                      {component.service_id && (
                        <Badge variant="secondary" class名称="text-xs">
                          {t('service')}: {services.find(s => s.id === component.service_id)?.name || component.service_id}
                        </Badge>
                      )}
                      {component.server_id && (
                        <Badge variant="secondary" class名称="text-xs">
                          {t('server')}: {component.server_id}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComponent(index)}
                  >
                    <X class名称="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!show添加Form ? (
          <Button
            variant="outline"
            onClick={() => setShow添加Form(true)}
            class名称="w-full"
          >
            <Plus class名称="h-4 w-4 mr-2" />
            {t('addComponent')}
          </Button>
        ) : (
          <div class名称="border rounded-lg p-4 space-y-4">
            <div class名称="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="component-name">{t('component名称')}</Label>
                <Input
                  id="component-name"
                  placeholder={t('component名称Placeholder')}
                  value={newComponent.name}
                  onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="display-order">{t('displayOrder')}</Label>
                <Input
                  id="display-order"
                  type="number"
                  value={newComponent.display_order}
                  onChange={(e) => setNewComponent({ ...newComponent, display_order: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="component-description">{t('descriptionOptional')}</Label>
              <Textarea
                id="component-description"
                placeholder={t('descriptionPlaceholder')}
                value={newComponent.description}
                onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
              />
            </div>

            <div class名称="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service-id">{t('uptimeServiceOptional')}</Label>
                <Select onValueChange={(value) => setNewComponent({ ...newComponent, service_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectUptimeService')} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div class名称="flex items-center gap-2">
                          <div class名称={`w-2 h-2 rounded-full ${
                            service.status === 'up' ? 'bg-green-500' : 
                            service.status === 'down' ? 'bg-red-500' : 
                            'bg-yellow-500'
                          }`} />
                          {service.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="server-id">{t('serverIdOptional')}</Label>
                <Input
                  id="server-id"
                  placeholder={t('serverIdPlaceholder')}
                  value={newComponent.server_id}
                  onChange={(e) => setNewComponent({ ...newComponent, server_id: e.target.value })}
                />
              </div>
            </div>

            <div class名称="flex gap-2">
              <Button onClick={addComponent} disabled={!newComponent.name.trim()}>
                {t('addComponent')}
              </Button>
              <Button variant="outline" onClick={() => setShow添加Form(false)}>
                {t('cancel')}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};