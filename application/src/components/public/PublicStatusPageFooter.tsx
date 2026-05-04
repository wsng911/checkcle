
import { OperationalPageRecord } from '@/types/operational.types';
import { format } from 'date-fns';
import { Clock, Shield, Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Public状态PageFooterProps {
  page: OperationalPageRecord;
}

export const Public状态PageFooter = ({ page }: Public状态PageFooterProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <footer class名称="mt-12 pt-8 border-t border-border">
      <div class名称="space-y-6">
        {/* 状态 Information */}
        <div class名称="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-muted/30 rounded-lg border">
          <div class名称="flex items-center gap-3">
            <div class名称="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Shield class名称="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div class名称="font-medium text-foreground">Real-time 监控ing</div>
              <div class名称="text-sm text-muted-foreground">24/7 automated checks</div>
            </div>
          </div>
          
          <div class名称="flex items-center gap-3">
            <div class名称="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Zap class名称="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div class名称="font-medium text-foreground">Instant Updates</div>
              <div class名称="text-sm text-muted-foreground">状态 changes in real-time</div>
            </div>
          </div>
          
          <div class名称="flex items-center gap-3">
            <div class名称="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Clock class名称="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div class名称="font-medium text-foreground">Historical Data</div>
              <div class名称="text-sm text-muted-foreground">90-day performance history</div>
            </div>
          </div>
        </div>

        {/* 操作 */}
        <div class名称="flex items-center justify-between">
          <div class名称="flex items-center gap-4 text-sm text-muted-foreground">
            <div class名称="flex items-center gap-2">
              <Clock class名称="h-4 w-4" />
              <span>Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm:ss')} UTC</span>
            </div>
            <div class名称="flex items-center gap-2">
              <div class名称="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>监控ing active</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleRefresh} class名称="gap-2">
            <RefreshCw class名称="h-4 w-4" />
            Refresh 状态
          </Button>
        </div>

        {/* Disclaimer */}
        <div class名称="text-center text-xs text-muted-foreground p-4 bg-muted/20 rounded-lg">
          <p>
            This status page provides real-time information about our systems and services. 
            Historical data reflects the last 90 days of monitoring. For support inquiries, please contact our team.
          </p>
          {page.custom_domain && (
            <p class名称="mt-2">
              Powered by automated monitoring • 状态 page for {page.title}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};