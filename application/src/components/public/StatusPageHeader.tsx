
import { OperationalPageRecord } from '@/types/operational.types';
import { Shield, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface 状态PageHeaderProps {
  page: OperationalPageRecord;
}

export const 状态PageHeader = ({ page }: 状态PageHeaderProps) => {
  return (
    <header class名称="bg-background border-b border-border">
      <div class名称="max-w-4xl mx-auto px-4 py-8">
        <div class名称="flex items-center justify-between">
          <div class名称="flex items-center gap-4">
            {page.logo_url ? (
              <img 
                src={page.logo_url} 
                alt={`${page.title} logo`}
                class名称="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div class名称="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield class名称="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <h1 class名称="text-3xl font-bold text-foreground">{page.title}</h1>
              <p class名称="text-muted-foreground mt-1">{page.description}</p>
            </div>
          </div>
          
          <div class名称="flex items-center gap-3">
            {page.custom_domain && (
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={`https://${page.custom_domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class名称="flex items-center gap-2"
                >
                  <Globe class名称="h-4 w-4" />
                  Visit Site
                  <ExternalLink class名称="h-3 w-3" />
                </a>
              </Button>
            )}
            
            <div class名称="text-right text-sm text-muted-foreground">
              <div class名称="flex items-center gap-1">
                <div class名称="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class名称="font-medium">Live 状态</span>
              </div>
              <div class名称="text-xs">
                Auto-updated every 30s
              </div>
            </div>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div class名称="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Shield class名称="h-4 w-4" />
          <span>状态 Page</span>
          <span>•</span>
          <span class名称="text-foreground font-medium">{page.title}</span>
        </div>
      </div>
    </header>
  );
};