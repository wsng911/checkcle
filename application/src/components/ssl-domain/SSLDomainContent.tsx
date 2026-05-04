import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

import { SSLCertificate状态Cards } from "./SSLCertificate状态Cards";
import { SSLCertificatesTable } from "./SSLCertificatesTable";
import { LoadingState } from "@/components/services/LoadingState";
import { fetchSSLCertificates, addSSLCertificate, checkAndUpdateCertificate, refreshAllCertificates, deleteSSLCertificate } from "@/services/ssl";
import { 添加SSLCertificateForm } from "./添加SSLCertificateForm";
import { 编辑SSLCertificateForm } from "./编辑SSLCertificateForm";
import type { 添加SSLCertificateDto, SSLCertificate } from "@/types/ssl.types";
import { pb } from "@/lib/pocketbase";
import { useLanguage } from "@/contexts/LanguageContext";

export const SSLDomainContent = () => {
  const { t } = useLanguage();
  const [is添加DialogOpen, setIs添加DialogOpen] = useState(false);
  const [is编辑DialogOpen, setIs编辑DialogOpen] = useState(false);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<SSLCertificate | null>(null);
  const queryClient = useQueryClient();
  
  // Fetch SSL certificates with explicit error handling
  const { data: certificates = [], isLoading, error } = useQuery({
    queryKey: ['ssl-certificates'],
    queryFn: async () => {
      try {
        const result = await fetchSSLCertificates();
        return result;
      } catch (error) {
        toast.error(t('failedToLoadCertificates'));
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  // 添加 certificate mutation
  const addMutation = useMutation({
    mutationFn: addSSLCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setIs添加DialogOpen(false);
      toast.success(t('sslCertificate添加ed'));
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('failedTo添加Certificate'));
    }
  });

  // 编辑 certificate mutation - Updated to include notification_id and template_id
  const editMutation = useMutation({
    mutationFn: async (certificate: SSLCertificate) => {
      
      // 创建 the update data object with new fields
      const updateData = {
        warning_threshold: Number(certificate.warning_threshold),
        expiry_threshold: Number(certificate.expiry_threshold),
        notification_channel: certificate.notification_channel,
        notification_id: certificate.notification_id || '', // Multi notification channels
        template_id: certificate.template_id || '', // Alert template ID
        check_interval: certificate.check_interval,
      };
      
      
      // Update certificate in the database using PocketBase directly
      const updated = await pb.collection('ssl_certificates').update(certificate.id, updateData);
      
      // After updating the settings, refresh the certificate to ensure it's up to date
      // This will also check if notification needs to be sent based on updated thresholds
      const refreshedCert = await checkAndUpdateCertificate(certificate.id);
      
      return refreshedCert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setIs编辑DialogOpen(false);
      setSelectedCertificate(null);
      toast.success(t('sslCertificateUpdated'));
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('failedToUpdateCertificate'));
    }
  });

  // 删除 certificate mutation
  const deleteMutation = useMutation({
    mutationFn: deleteSSLCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      toast.success(t('sslCertificate删除d'));
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : t('failedTo删除Certificate'));
    }
  });

  // Refresh certificate mutation - Updated to remove individual toast notifications
  const refreshMutation = useMutation({
    mutationFn: checkAndUpdateCertificate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setRefreshingId(null);
      // 移除d individual success toast notification
    },
    onError: (error) => {
      setRefreshingId(null);
      
      // Still refresh the data to show any partial information that was saved
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      // 移除d individual error toast notification
    }
  });
  
  // Refresh all certificates mutation
  const refreshAllMutation = useMutation({
    mutationFn: refreshAllCertificates,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setIsRefreshingAll(false);
      
      if (result.failed === 0) {
        toast.success(t('allCertificatesRefreshed').replace('{count}', result.success.toString()));
      } else {
        toast.info(t('someCertificatesFailed')
          .replace('{success}', result.success.toString())
          .replace('{failed}', result.failed.toString()));
      }
    },
    onError: (error) => {
      toast.error(t('failedToCheckCertificate'));
      setIsRefreshingAll(false);
      
      // Still refresh the data to show any partial information
      queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
    }
  });

  const handle添加Certificate = async (data: 添加SSLCertificateDto) => {
    addMutation.mutate(data);
  };

  const handleRefreshCertificate = (id: string) => {
    if (refreshingId) return; // Prevent multiple refreshes
    setRefreshingId(id);
    refreshMutation.mutate(id);
  };

  const handle编辑Certificate = (certificate: SSLCertificate) => {
    setSelectedCertificate(certificate);
    setIs编辑DialogOpen(true);
  };

  const handleUpdateCertificate = (certificate: SSLCertificate) => {
    editMutation.mutate(certificate);
  };

  const handle删除Certificate = (certificate: SSLCertificate) => {
    deleteMutation.mutate(certificate.id);
  };

  const handleRefreshAll = async () => {
    if (certificates.length === 0) {
      toast.info(t('noCertificatesToRefresh'));
      return;
    }
    
    setIsRefreshingAll(true);
    toast.info(t('startingRefreshAll').replace('{count}', certificates.length.toString()));
    refreshAllMutation.mutate();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div class名称="flex flex-col items-center justify-center h-full gap-4 text-foreground">
        <p>{t('failedToLoadCertificates')}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] })}>
          {t('check')}
        </Button>
      </div>
    );
  }

  return (
    <main class名称="flex-1 flex flex-col overflow-auto bg-background p-6 pb-0">
      <div class名称="flex flex-col flex-1">
        <div class名称="flex justify-between items-center mb-6">
          <div>
            <h2 class名称="text-2xl font-bold text-foreground">{t('sslDomainManagement')}</h2>
            <p class名称="text-sm text-muted-foreground mt-1">{t('monitorSSLCertificates')}</p>
          </div>
          <div class名称="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleRefreshAll}
              disabled={isRefreshingAll || refreshingId !== null}
              class名称="relative"
            >
              <RefreshCw class名称={`w-4 h-4 mr-2 ${isRefreshingAll ? 'animate-spin' : ''}`} /> 
              {t('refreshAll')}
              {isRefreshingAll && (
                <span class名称="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  ...
                </span>
              )}
            </Button>
            <Button 
              class名称="text-primary-foreground"
              onClick={() => setIs添加DialogOpen(true)}
            >
              <Plus class名称="w-4 h-4 mr-2" /> {t('addDomain')}
            </Button>
          </div>
        </div>
        
        <SSLCertificate状态Cards certificates={certificates} />
        
        <div class名称="mt-6 flex-1 flex flex-col pb-6">
          <SSLCertificatesTable />
        </div>
      </div>

      <Dialog open={is添加DialogOpen} onOpenChange={setIs添加DialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('addSSLCertificate')}</DialogTitle>
          </DialogHeader>
          <添加SSLCertificateForm 
            on提交={handle添加Certificate} 
            on取消={() => setIs添加DialogOpen(false)} 
            isPending={addMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {selectedCertificate && (
        <Dialog open={is编辑DialogOpen} onOpenChange={(open) => {
          setIs编辑DialogOpen(open);
          if (!open) setSelectedCertificate(null);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('editSSLCertificate')}</DialogTitle>
            </DialogHeader>
            <编辑SSLCertificateForm 
              certificate={selectedCertificate}
              on提交={handleUpdateCertificate}
              on取消={() => {
                setIs编辑DialogOpen(false);
                setSelectedCertificate(null);
              }}
              isPending={editMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
};