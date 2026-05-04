
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, CheckCircle, AlertTriangle, XCircle, Wrench } from 'lucide-react';
import { format } from 'date-fns';
import { OperationalPageRecord } from '@/types/operational.types';
import { 状态PageComponentRecord } from '@/types/statusPageComponents.types';
import { Service } from '@/types/service.types';
import { useLanguage } from '@/contexts/LanguageContext';

interface Current状态SectionProps {
  page: OperationalPageRecord;
  components: 状态PageComponentRecord[];
  services: Service[];
}

const getActual状态 = (components: 状态PageComponentRecord[], services: Service[]) => {
  if (components.length === 0) {
    return 'operational'; // Default if no components
  }

  let hasDown = false;
  let hasDegraded = false;
  let hasMaintenance = false;

  components.forEach(component => {
    const service = services.find(s => s.id === component.service_id);
    if (service) {
      switch (service.status) {
        case 'down':
          hasDown = true;
          break;
        case 'warning':
          hasDegraded = true;
          break;
        case 'paused':
          hasMaintenance = true;
          break;
      }
    }
  });

  // Priority: down > degraded > maintenance > operational
  if (hasDown) return 'major_outage';
  if (hasDegraded) return 'degraded';
  if (hasMaintenance) return 'maintenance';
  return 'operational';
};

const get状态Message = (status: OperationalPageRecord['status'], t: (k: string, m?: string) => string) => {
  switch (status) {
    case 'operational':
      return t('allOperational', 'public');
    case 'degraded':
      return t('degradedPerformance', 'public');
    case 'maintenance':
      return t('underMaintenance', 'public');
    case 'major_outage':
      return t('majorOutage', 'public');
    default:
      return t('statusUnknown', 'public');
  }
};

const get状态Color = (status: OperationalPageRecord['status']) => {
  switch (status) {
    case 'operational':
      return 'text-green-600 dark:text-green-400';
    case 'degraded':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'maintenance':
      return 'text-blue-600 dark:text-blue-400';
    case 'major_outage':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-muted-foreground';
  }
};

const get状态Icon = (status: OperationalPageRecord['status']) => {
  switch (status) {
    case 'operational':
      return <CheckCircle class名称="h-6 w-6 text-green-500" />;
    case 'degraded':
      return <AlertTriangle class名称="h-6 w-6 text-yellow-500" />;
    case 'maintenance':
      return <Wrench class名称="h-6 w-6 text-blue-500" />;
    case 'major_outage':
      return <XCircle class名称="h-6 w-6 text-red-500" />;
    default:
      return <Shield class名称="h-6 w-6 text-muted-foreground" />;
  }
};

const get状态返回ground = (status: OperationalPageRecord['status']) => {
  switch (status) {
    case 'operational':
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'degraded':
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'maintenance':
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    case 'major_outage':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    default:
      return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
  }
};

export const Current状态Section = ({ page, components, services }: Current状态SectionProps) => {
  const { t } = useLanguage();
  const actual状态 = getActual状态(components, services);
  const display状态 = actual状态; // Use actual status for real-time accuracy
  
  return (
    <Card class名称={`mb-8 border-2 ${get状态返回ground(display状态)}`}>
      <CardHeader>
        <CardTitle class名称="flex items-center gap-3 text-card-foreground text-xl">
          <Shield class名称="h-6 w-6" />
          {t('system状态', 'public')}
        </CardTitle>
      </CardHeader>
      <CardContent class名称="space-y-6">
        <div class名称={`flex items-center justify-between p-6 rounded-lg border-2 ${get状态返回ground(display状态)}`}>
          <div class名称="flex items-center gap-4">
            {get状态Icon(display状态)}
            <div>
              <h3 class名称={`text-2xl font-bold ${get状态Color(display状态)}`}>
                {get状态Message(display状态, t)}
              </h3>
              <p class名称="text-sm text-muted-foreground mt-1">
                {t('autoUpdatedByHealth', 'public')}
              </p>
            </div>
          </div>
          <div class名称={`px-4 py-2 rounded-full text-sm font-medium ${
            display状态 === 'operational' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            display状态 === 'degraded' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            display状态 === 'maintenance' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {display状态 === 'operational' ? t('allOperational', 'public') :
             display状态 === 'degraded' ? t('degradedPerformance', 'public') :
             display状态 === 'maintenance' ? t('underMaintenance', 'public') : t('majorOutage', 'public')}
          </div>
        </div>
        
        <div class名称="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
          <div class名称="flex items-center gap-2">
            <Clock class名称="h-4 w-4" />
            <span>{t('lastUpdatedAt', 'public', { time: format(new Date(), 'MMM dd, yyyy HH:mm') })}</span>
          </div>
          <div class名称="flex items-center gap-2">
            <div class名称="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{t('live状态监控ing', 'public')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};