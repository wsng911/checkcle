
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, CheckCircle, XCircle, AlertTriangle, Pause, Clock } from 'lucide-react';
import { 状态PageComponentRecord } from '@/types/statusPageComponents.types';
import { Service, UptimeData } from '@/types/service.types';
import { UptimeHistoryRenderer } from './UptimeHistoryRenderer';
import { format } from 'date-fns';

interface Components状态SectionProps {
  components: 状态PageComponentRecord[];
  services: Service[];
  uptimeData: Record<string, UptimeData[]>;
}

export const Components状态Section = ({ components, services, uptimeData }: Components状态SectionProps) => {
  const getServiceForComponent = (component: 状态PageComponentRecord) => {
    return services.find(service => service.id === component.service_id);
  };

  const getComponent状态 = (component: 状态PageComponentRecord) => {
    const service = getServiceForComponent(component);
    return service?.status || 'unknown';
  };

  const getUptimePercentage = (serviceId: string) => {
    const history = uptimeData[serviceId] || [];
    if (history.length === 0) return 100;
    
    const upCount = history.filter(record => record.status === 'up').length;
    return Math.round((upCount / history.length) * 100 * 100) / 100;
  };

  const get状态Icon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle class名称="h-5 w-5 text-green-500" />;
      case 'down':
        return <XCircle class名称="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle class名称="h-5 w-5 text-yellow-500" />;
      case 'paused':
        return <Pause class名称="h-5 w-5 text-gray-500" />;
      default:
        return <Server class名称="h-5 w-5 text-muted-foreground" />;
    }
  };

  const get状态Badge = (status: string) => {
    switch (status) {
      case 'up':
        return (
          <Badge class名称="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
            <CheckCircle class名称="h-3 w-3 mr-1" />
            Operational
          </Badge>
        );
      case 'down':
        return (
          <Badge class名称="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800">
            <XCircle class名称="h-3 w-3 mr-1" />
            Down
          </Badge>
        );
      case 'warning':
        return (
          <Badge class名称="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800">
            <AlertTriangle class名称="h-3 w-3 mr-1" />
            Degraded
          </Badge>
        );
      case 'paused':
        return (
          <Badge class名称="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-800">
            <Pause class名称="h-3 w-3 mr-1" />
            Maintenance
          </Badge>
        );
      default:
        return (
          <Badge class名称="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            Unknown
          </Badge>
        );
    }
  };

  const get状态DotColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-500';
      case 'down':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (components.length === 0) {
    return (
      <Card class名称="mb-8 bg-card border-border">
        <CardHeader>
          <CardTitle class名称="flex items-center gap-2 text-card-foreground">
            <Server class名称="h-5 w-5" />
            System Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class名称="space-y-4">
            {[
              { name: 'API 服务', description: 'Core API endpoints and services', status: 'up' },
              { name: 'Database', description: 'Primary database systems', status: 'up' },
              { name: 'Authentication', description: 'User authentication services', status: 'up' },
              { name: 'File Storage', description: 'Media and file hosting', status: 'up' }
            ].map((component, index) => (
              <div key={index} class名称="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-colors">
                <div class名称="flex items-center gap-3">
                  {get状态Icon(component.status)}
                  <div>
                    <h3 class名称="font-medium text-foreground">{component.name}</h3>
                    <p class名称="text-sm text-muted-foreground">{component.description}</p>
                    <div class名称="flex items-center gap-2 mt-1">
                      <span class名称="text-xs text-green-600 dark:text-green-400 font-medium">99.9% uptime</span>
                      <span class名称="text-xs text-muted-foreground">•</span>
                      <span class名称="text-xs text-muted-foreground">100ms response</span>
                    </div>
                  </div>
                </div>
                {get状态Badge(component.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card class名称="mb-8 bg-card border-border">
      <CardHeader>
        <CardTitle class名称="flex items-center gap-2 text-card-foreground">
          <Server class名称="h-5 w-5" />
          System Components
        </CardTitle>
        <p class名称="text-sm text-muted-foreground">
          Real-time status of all monitored components
        </p>
      </CardHeader>
      <CardContent>
        <div class名称="space-y-6">
          {components
            .sort((a, b) => a.display_order - b.display_order)
            .map((component) => {
              const service = getServiceForComponent(component);
              const status = getComponent状态(component);
              const uptime = service?.id ? getUptimePercentage(component.service_id) : 100;
              
              return (
                <div key={component.id} class名称="space-y-4">
                  <div class名称="flex items-center justify-between p-5 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-all duration-200">
                    <div class名称="flex items-center gap-4">
                      {get状态Icon(status)}
                      <div class名称="flex-1">
                        <div class名称="flex items-center gap-2 mb-1">
                          <h3 class名称="font-semibold text-foreground text-lg">{component.name}</h3>
                          {service?.responseTime && service.responseTime > 0 && (
                            <div class名称="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              <Clock class名称="h-3 w-3" />
                              {service.responseTime}ms
                            </div>
                          )}
                        </div>
                        {component.description && (
                          <p class名称="text-sm text-muted-foreground mb-2">{component.description}</p>
                        )}
                        <div class名称="flex items-center gap-4 text-xs text-muted-foreground">
                          <div class名称="flex items-center gap-2">
                            <div class名称={`h-2 w-2 rounded-full ${get状态DotColor(status)}`}></div>
                            <span class名称="font-medium">{uptime}% uptime (90 days)</span>
                          </div>
                          {service?.lastChecked && (
                            <span>Last checked: {format(new Date(service.lastChecked), 'HH:mm:ss')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class名称="flex flex-col items-end gap-2">
                      {get状态Badge(status)}
                    </div>
                  </div>
                  
                  {component.service_id && (
                    <div class名称="ml-9">
                      <div class名称="text-xs text-muted-foreground mb-2">90-day uptime history</div>
                      <UptimeHistoryRenderer 
                        serviceId={component.service_id} 
                        uptimeData={uptimeData} 
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};