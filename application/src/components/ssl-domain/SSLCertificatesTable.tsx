
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialog取消,
  AlertDialogContent,
  AlertDialog描述,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SSL状态Badge } from "./SSL状态Badge";
import { 添加SSLCertificateForm } from "./添加SSLCertificateForm";
import { 编辑SSLCertificateForm } from "./编辑SSLCertificateForm";
import { SSLCertificate操作 } from "./SSLCertificate操作";
import { SSLCertificateDetailDialog } from "./SSLCertificateDetailDialog";
import { SSLPagination } from "./SSLPagination";
import { fetchSSLCertificates, addSSLCertificate, deleteSSLCertificate } from "@/services/sslCertificateService";
import { pb } from "@/lib/pocketbase";
import { SSLCertificate } from "@/types/ssl.types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useSSLPagination } from "@/hooks/useSSLPagination";
import { toast } from "sonner";

export const SSLCertificatesTable = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [show添加Dialog, setShow添加Dialog] = useState(false);
  const [show编辑Dialog, setShow编辑Dialog] = useState(false);
  const [show删除Dialog, setShow删除Dialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<SSLCertificate | null>(null);
  const [is提交ting, setIs提交ting] = useState(false);

  const { data: certificates = [], isLoading, isError } = useQuery({
    queryKey: ['ssl-certificates'],
    queryFn: fetchSSLCertificates,
  });

  const {
    paginatedCertificates,
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    handlePageChange,
    handlePageSizeChange,
  } = useSSLPagination({ certificates });

  if (isLoading) return <div>加载中...</div>;
  if (isError) return <div>Error loading certificates</div>;

  const handle添加Certificate = async (data: any) => {
    setIs提交ting(true);
    try {
      await addSSLCertificate(data);
      await queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setShow添加Dialog(false);
      toast.success(t('certificate添加ed'));
    } catch (error) {
      toast.error(t('failedTo添加Certificate'));
    } finally {
      setIs提交ting(false);
    }
  };

  const handle编辑Certificate = async (updatedCertificate: SSLCertificate) => {
    setIs提交ting(true);
    try {
      await pb.collection('ssl_certificates').update(updatedCertificate.id, {
        warning_threshold: updatedCertificate.warning_threshold,
        expiry_threshold: updatedCertificate.expiry_threshold,
        notification_channel: updatedCertificate.notification_channel,
        notification_id: updatedCertificate.notification_id,
        template_id: updatedCertificate.template_id,
        check_interval: updatedCertificate.check_interval,
      });
      
      await queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setShow编辑Dialog(false);
      setSelectedCertificate(null);
      toast.success(t('certificateUpdated'));
    } catch (error) {
      toast.error(t('failedToUpdateCertificate'));
    } finally {
      setIs提交ting(false);
    }
  };

  const handle删除Certificate = async () => {
    if (!selectedCertificate) return;
    
    setIs提交ting(true);
    try {
      await deleteSSLCertificate(selectedCertificate.id);
      await queryClient.invalidateQueries({ queryKey: ['ssl-certificates'] });
      setShow删除Dialog(false);
      setSelectedCertificate(null);
      toast.success(t('certificate删除d'));
    } catch (error) {
      toast.error(t('failedTo删除Certificate'));
    } finally {
      setIs提交ting(false);
    }
  };

  const openViewDialog = (certificate: SSLCertificate) => {
    setSelectedCertificate(certificate);
    setShowViewDialog(true);
  };

  const open编辑Dialog = (certificate: SSLCertificate) => {
    setSelectedCertificate(certificate);
    setShow编辑Dialog(true);
  };

  const open删除Dialog = (certificate: SSLCertificate) => {
    setSelectedCertificate(certificate);
    setShow删除Dialog(true);
  };

  return (
    <div class名称="flex-1 flex flex-col h-full">
      {certificates.length === 0 ? (
        <div class名称="text-center py-8 text-muted-foreground">
          {t('noCertificatesFound')}
        </div>
      ) : (
        <>
          <div class名称={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg border border-border shadow-sm`}>
            <Table>
              <TableHeader class名称={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <TableRow class名称={`${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('domain')}</TableHead>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('status')}</TableHead>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('issuer')}</TableHead>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('validUntil')}</TableHead>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('daysLeft')}</TableHead>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>Check Interval</TableHead>
                  <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4 text-right w-[50px]`}>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCertificates.map((certificate) => (
                  <TableRow 
                    key={certificate.id} 
                    class名称="hover:bg-muted/50 cursor-pointer"
                    onClick={() => openViewDialog(certificate)}
                  >
                    <TableCell class名称="font-medium">
                      {certificate.domain}
                    </TableCell>
                    <TableCell>
                      <SSL状态Badge status={certificate.status} />
                    </TableCell>
                    <TableCell>{certificate.issuer_o || certificate.issuer_cn || 'Unknown'}</TableCell>
                    <TableCell>
                      {certificate.valid_till ? new Date(certificate.valid_till).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <span class名称={certificate.days_left <= 7 ? 'text-red-600 font-semibold' : certificate.days_left <= 30 ? 'text-yellow-600 font-semibold' : 'text-green-600'}>
                        {certificate.days_left} {t('days')}
                      </span>
                    </TableCell>
                    <TableCell>
                      {certificate.check_interval || 1} {t('days')}
                    </TableCell>
                    <TableCell class名称="text-right" onClick={(e) => e.stopPropagation()}>
                      <SSLCertificate操作
                        certificate={certificate}
                        onView={openViewDialog}
                        on编辑={open编辑Dialog}
                        on删除={open删除Dialog}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <SSLPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      {/* View Certificate Dialog */}
      <SSLCertificateDetailDialog
        certificate={selectedCertificate}
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      />

      {/* 添加 Certificate Dialog */}
      <Dialog open={show添加Dialog} onOpenChange={setShow添加Dialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('addSSLCertificate')}</DialogTitle>
            <Dialog描述>
              {t('addCertificate描述')}
            </Dialog描述>
          </DialogHeader>
          <添加SSLCertificateForm
            on提交={handle添加Certificate}
            on取消={() => setShow添加Dialog(false)}
            isPending={is提交ting}
          />
        </DialogContent>
      </Dialog>

      {/* 编辑 Certificate Dialog */}
      <Dialog open={show编辑Dialog} onOpenChange={setShow编辑Dialog}>
        <DialogContent class名称="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('editSSLCertificate')}</DialogTitle>
            <Dialog描述>
              {t('editCertificate描述')}
            </Dialog描述>
          </DialogHeader>
          {selectedCertificate && (
            <编辑SSLCertificateForm
              certificate={selectedCertificate}
              on提交={handle编辑Certificate}
              on取消={() => setShow编辑Dialog(false)}
              isPending={is提交ting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 删除 Certificate Dialog */}
      <AlertDialog open={show删除Dialog} onOpenChange={setShow删除Dialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteCertificate')}</AlertDialogTitle>
            <AlertDialog描述>
              {t('deleteCertificate确认ation')} {selectedCertificate?.domain}?
            </AlertDialog描述>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialog取消>{t('cancel')}</AlertDialog取消>
            <AlertDialogAction
              onClick={handle删除Certificate}
              disabled={is提交ting}
              class名称="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {is提交ting ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};