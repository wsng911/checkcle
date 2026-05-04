
import { Card, CardContent, Card描述, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OperationalPageRecord } from '@/types/operational.types';
import { 状态Badge } from './状态Badge';
import { Globe, ExternalLink, Eye, 设置, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from "@/contexts/LanguageContext";

interface OperationalPageCardProps {
  page: OperationalPageRecord;
  on编辑?: (page: OperationalPageRecord) => void;
  onView?: (page: OperationalPageRecord) => void;
  on删除?: (page: OperationalPageRecord) => void;
}

export const OperationalPageCard = ({ page, on编辑, onView, on删除 }: OperationalPageCardProps) => {
  const { t } = useLanguage();

  return (
    <Card class名称="hover:shadow-lg transition-shadow duration-200">
      <CardHeader class名称="pb-3">
        <div class名称="flex items-start justify-between">
          <div class名称="flex-1">
            <CardTitle class名称="text-lg font-semibold mb-1">{page.title}</CardTitle>
            <Card描述 class名称="text-sm text-muted-foreground">
              {page.description}
            </Card描述>
          </div>
          <状态Badge status={page.status} />
        </div>
      </CardHeader>
      
      <CardContent class名称="space-y-4">
        <div class名称="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class名称="font-medium text-muted-foreground">{t('slug')}:</span>
            <p class名称="mt-1">{page.slug}</p>
          </div>
          <div>
            <span class名称="font-medium text-muted-foreground">{t('theme')}:</span>
            <p class名称="mt-1 capitalize">{page.theme}</p>
          </div>
          <div>
            <span class名称="font-medium text-muted-foreground">{t('public')}:</span>
            <div class名称="mt-1">
              <Badge variant={page.is_public === 'true' ? 'default' : 'secondary'}>
                {page.is_public === 'true' ? t('yes') : t('no')}
              </Badge>
            </div>
          </div>
          <div>
            <span class名称="font-medium text-muted-foreground">{t('updated')}:</span>
            <p class名称="mt-1">{format(new Date(page.updated), 'MMM dd, yyyy')}</p>
          </div>
        </div>

        {page.custom_domain && (
          <div class名称="flex items-center gap-2 p-2 bg-muted rounded-md">
            <Globe class名称="h-4 w-4 text-muted-foreground" />
            <span class名称="text-sm font-medium">{page.custom_domain}</span>
            <ExternalLink class名称="h-3 w-3 text-muted-foreground" />
          </div>
        )}

        <div class名称="flex gap-2 pt-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(page)}
              class名称="flex-1"
            >
              <Eye class名称="h-4 w-4 mr-2" />
              {t('view')}
            </Button>
          )}
          {on编辑 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => on编辑(page)}
              class名称="flex-1"
            >
              <设置 class名称="h-4 w-4 mr-2" />
              {t('edit')}
            </Button>
          )}
          {on删除 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => on删除(page)}
              class名称="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 class名称="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};