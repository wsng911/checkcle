
import React from "react";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SSLCertificate } from "@/types/ssl.types";
import { SSL状态Badge } from "./SSL状态Badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface SSLCertificateDetailDialogProps {
  certificate: SSLCertificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SSLCertificateDetailDialog = ({
  certificate,
  open,
  onOpenChange,
}: SSLCertificateDetailDialogProps) => {
  const { t } = useLanguage();

  if (!certificate) return null;

  // Parse Subject Alternative 名称s for better display
  const formatSANs = (sans: string): string[] => {
    if (!sans) return [];
    
    // Split by common delimiters and clean up
    const sansList = sans
      .split(/[,;\n]/)
      .map(san => san.trim())
      .filter(san => san.length > 0);
    
    return sansList;
  };

  const sansList = certificate.cert_sans ? formatSANs(certificate.cert_sans) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle class名称="text-xl font-bold">{t('sslCertificateDetails')}</DialogTitle>
          <Dialog描述 class名称="text-sm text-muted-foreground">
            {t('viewDetailedInformation')} {certificate.domain}
          </Dialog描述>
        </DialogHeader>
        
        <div class名称="space-y-6">
          {/* Domain & 状态 概览 */}
          <Card>
            <CardHeader>
              <CardTitle class名称="text-lg flex items-center justify-between">
                <span>{certificate.domain}</span>
                <SSL状态Badge status={certificate.status} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class名称="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class名称="space-y-3">
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('status')}</p>
                    <SSL状态Badge status={certificate.status} />
                  </div>
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('daysLeft')}</p>
                    <Badge variant={certificate.days_left <= 7 ? 'destructive' : certificate.days_left <= 30 ? 'secondary' : 'default'}>
                      {certificate.days_left} {t('days')}
                    </Badge>
                  </div>
                </div>
                <div class名称="space-y-3">
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('validFrom')}</p>
                    <p class名称="text-sm">
                      {certificate.valid_from ? new Date(certificate.valid_from).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('validUntil')}</p>
                    <p class名称="text-sm">
                      {certificate.valid_till ? new Date(certificate.valid_till).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <div class名称="space-y-3">
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('validityPeriod')}</p>
                    <p class名称="text-sm">{certificate.validity_days || 0} {t('days')}</p>
                  </div>
                  {certificate.resolved_ip && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">{t('resolvedIP')}</p>
                      <p class名称="text-sm font-mono bg-muted px-2 py-1 rounded">{certificate.resolved_ip}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Information */}
          <Card>
            <CardHeader>
              <CardTitle class名称="text-lg">{t('certificateDetails')}</CardTitle>
            </CardHeader>
            <CardContent class名称="space-y-4">
              <div class名称="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class名称="space-y-4">
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('issuedTo')}</p>
                    <p class名称="text-sm bg-muted px-3 py-2 rounded">{certificate.issued_to || 'N/A'}</p>
                  </div>
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">{t('issuer')}</p>
                    <p class名称="text-sm bg-muted px-3 py-2 rounded">{certificate.issuer_o || certificate.issuer_cn || 'N/A'}</p>
                  </div>
                  {certificate.issuer_cn && certificate.issuer_cn !== certificate.issuer_o && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">Issuer Common 名称</p>
                      <p class名称="text-sm bg-muted px-3 py-2 rounded">{certificate.issuer_cn}</p>
                    </div>
                  )}
                </div>
                <div class名称="space-y-4">
                  {certificate.serial_number && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">{t('serialNumber')}</p>
                      <p class名称="text-xs font-mono bg-muted px-3 py-2 rounded break-all">{certificate.serial_number}</p>
                    </div>
                  )}
                  {certificate.cert_alg && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">{t('algorithm')}</p>
                      <p class名称="text-sm bg-muted px-3 py-2 rounded">{certificate.cert_alg}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {certificate.cert_sans && (
                <div class名称="mt-4">
                  <p class名称="text-sm font-medium text-muted-foreground mb-2">{t('subjectAlternative名称s')}</p>
                  <div class名称="bg-muted px-3 py-2 rounded">
                    {sansList.length > 0 ? (
                      <div class名称="space-y-1">
                        {sansList.map((san, index) => (
                          <div key={index} class名称="text-sm font-mono break-all">
                            {san}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p class名称="text-sm">N/A</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 监控ing Configuration */}
          <Card>
            <CardHeader>
              <CardTitle class名称="text-lg">{t('monitoringConfiguration')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class名称="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class名称="bg-muted px-3 py-2 rounded">
                  <p class名称="text-sm font-medium text-muted-foreground">{t('warningThreshold')}</p>
                  <p class名称="text-sm font-semibold">{certificate.warning_threshold} {t('days')}</p>
                </div>
                <div class名称="bg-muted px-3 py-2 rounded">
                  <p class名称="text-sm font-medium text-muted-foreground">{t('expiryThreshold')}</p>
                  <p class名称="text-sm font-semibold">{certificate.expiry_threshold} {t('days')}</p>
                </div>
                <div class名称="bg-muted px-3 py-2 rounded">
                  <p class名称="text-sm font-medium text-muted-foreground">Check Interval</p>
                  <p class名称="text-sm font-semibold">{certificate.check_interval || 1} {t('days')}</p>
                </div>
                <div class名称="bg-muted px-3 py-2 rounded">
                  <p class名称="text-sm font-medium text-muted-foreground">{t('notificationChannel')}</p>
                  <p class名称="text-sm font-semibold">{certificate.notification_channel || 'N/A'}</p>
                </div>
              </div>
              
              {certificate.last_notified && (
                <div class名称="mt-4">
                  <p class名称="text-sm font-medium text-muted-foreground">{t('lastNotified')}</p>
                  <p class名称="text-sm bg-muted px-3 py-2 rounded">{new Date(certificate.last_notified).toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle class名称="text-lg">{t('technicalInformation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class名称="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class名称="space-y-3">
                  {certificate.check_at && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">Next Check</p>
                      <p class名称="text-sm bg-muted px-3 py-2 rounded">{new Date(certificate.check_at).toLocaleString()}</p>
                    </div>
                  )}
                  {certificate.created && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">{t('created')}</p>
                      <p class名称="text-sm bg-muted px-3 py-2 rounded">{new Date(certificate.created).toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <div class名称="space-y-3">
                  {certificate.updated && (
                    <div>
                      <p class名称="text-sm font-medium text-muted-foreground">{t('lastUpdated')}</p>
                      <p class名称="text-sm bg-muted px-3 py-2 rounded">{new Date(certificate.updated).toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <p class名称="text-sm font-medium text-muted-foreground">Certificate ID</p>
                    <p class名称="text-xs font-mono bg-muted px-3 py-2 rounded break-all">{certificate.id}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};