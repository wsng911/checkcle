import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOperationalPages, use删除OperationalPage } from '@/hooks/useOperationalPage';
import { 创建OperationalPageDialog } from './创建OperationalPageDialog';
import { 编辑OperationalPageDialog } from './编辑OperationalPageDialog';
import { OperationalPageCard } from './OperationalPageCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OperationalPageRecord } from '@/types/operational.types';
import { Activity, Plus, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from "@/contexts/LanguageContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialog取消,
  AlertDialogContent,
  AlertDialog描述,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const OperationalPageContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: pages, isLoading, error, refetch, isRefetching } = useOperationalPages();
  const deleteMutation = use删除OperationalPage();
  
  const [editingPage, set编辑ingPage] = useState<OperationalPageRecord | null>(null);
  const [editDialogOpen, set编辑DialogOpen] = useState(false);
  const [deleteDialogOpen, set删除DialogOpen] = useState(false);
  const [pageTo删除, setPageTo删除] = useState<OperationalPageRecord | null>(null);

  const handle编辑 = (page: OperationalPageRecord) => {
    set编辑ingPage(page);
    set编辑DialogOpen(true);
  };

  const handleView = (page: OperationalPageRecord) => {
    if (page.custom_domain) {
      window.open(`https://${page.custom_domain}`, '_blank');
    } else {
      // Navigate to the public status page route using the correct format
      window.open(`/public/${page.slug}`, '_blank');
    }
  };

  const handle删除 = (page: OperationalPageRecord) => {
    setPageTo删除(page);
    set删除DialogOpen(true);
  };

  const confirm删除 = async () => {
    if (pageTo删除) {
      try {
        await deleteMutation.mutateAsync(pageTo删除.id);
        set删除DialogOpen(false);
        setPageTo删除(null);
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  if (error) {
    return (
      <div class名称="container mx-auto px-4 py-8">
        <div class名称="text-center">
          <div class名称="mb-4">
            <Activity class名称="h-12 w-12 text-muted-foreground mx-auto" />
          </div>
          <h3 class名称="text-lg font-semibold mb-2">{t('failedToLoadOperationalPages')}</h3>
          <p class名称="text-muted-foreground mb-4">
            {t('loadingoperationalPages')}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw class名称="h-4 w-4 mr-2" />
            {t('tryagain')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div class名称="container mx-auto px-4 py-8">
      {/* Header */}
      <div class名称="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class名称="text-3xl font-bold tracking-tight mb-2"> {t('operationalPages')}</h1>
          <p class名称="text-muted-foreground">
            {t('describeOperation')}
          </p>
        </div>
        
        <div class名称="flex items-center gap-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw class名称={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            {t('refresh')}
          </Button>
          <创建OperationalPageDialog />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div class名称="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <div class名称="p-6">
                <Skeleton class名称="h-6 w-3/4 mb-2" />
                <Skeleton class名称="h-4 w-full mb-4" />
                <div class名称="space-y-2">
                  <Skeleton class名称="h-4 w-1/2" />
                  <Skeleton class名称="h-4 w-1/3" />
                </div>
                <div class名称="flex gap-2 mt-4">
                  <Skeleton class名称="h-8 flex-1" />
                  <Skeleton class名称="h-8 flex-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && (!pages || pages.length === 0) && (
        <Card class名称="p-12">
          <CardContent class名称="text-center">
            <div class名称="mb-4">
              <Activity class名称="h-12 w-12 text-muted-foreground mx-auto" />
            </div>
            <h3 class名称="text-lg font-semibold mb-2">{t('noOperationalPagesFound')}</h3>
            <p class名称="text-muted-foreground mb-6">
              {t('createYourFirstOperationalPage')}
            </p>
            <创建OperationalPageDialog />
          </CardContent>
        </Card>
      )}

      {/* Pages Grid */}
      {!isLoading && pages && pages.length > 0 && (
        <div class名称="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <OperationalPageCard
              key={page.id}
              page={page}
              on编辑={handle编辑}
              onView={handleView}
              on删除={handle删除}
            />
          ))}
        </div>
      )}

      {/* Stats Footer */}
      {!isLoading && pages && pages.length > 0 && (
        <div class名称="mt-8 pt-6 border-t">
          <div class名称="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <span class名称="font-medium">{t('totalPages')}:</span> {pages.length}
            </div>
            <div>
              <span class名称="font-medium">{t('totalPages')}:</span>{' '}
              {pages.filter(p => p.is_public === 'true').length}
            </div>
            <div>
              <span class名称="font-medium">{t('operational')}:</span>{' '}
              {pages.filter(p => p.status === 'operational').length}
            </div>
          </div>
        </div>
      )}

      {/* 编辑 Dialog */}
      <编辑OperationalPageDialog
        page={editingPage}
        open={editDialogOpen}
        onOpenChange={set编辑DialogOpen}
      />

      {/* 删除 确认ation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={set删除DialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteOperationalPage')}</AlertDialogTitle>
            <AlertDialog描述>
              {t('deleteOperationalPage确认').replace('{title}', pageTo删除?.title ?? '')}
            </AlertDialog描述>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialog取消>{t('cancel')}</AlertDialog取消>
            <AlertDialogAction
              onClick={confirm删除}
              class名称="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};