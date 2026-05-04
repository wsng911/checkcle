import React from "react";
import { SSLCertificate } from "@/types/ssl.types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, ShieldAlert, ShieldX } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SSLCertificate状态CardsProps {
  certificates: SSLCertificate[];
}

export const SSLCertificate状态Cards = ({ certificates }: SSLCertificate状态CardsProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Count certificates by status
  const validCount = certificates.filter(cert => cert.status === "valid").length;
  const expiringCount = certificates.filter(cert => cert.status === "expiring_soon").length;
  const expiredCount = certificates.filter(cert => cert.status === "expired").length;

  return (
    <div class名称="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full">
      {/* Valid Certificates */}
      <Card
        class名称="border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative z-10"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, rgba(65,59,55,0.8) 0%, rgba(34,197,94,0.6) 100%)"
              : "linear-gradient(135deg, rgba(65,59,55,0.8) 0%, #22c55e 100%)",
        }}
      >
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div
            class名称="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px),
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">
            {t("validCertificates")}
          </CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{validCount}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <Shield class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Expiring Soon */}
      <Card
        class名称="border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative z-10"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, rgba(65,59,55,0.8) 0%, rgba(251,191,36,0.6) 100%)"
              : "linear-gradient(135deg, rgba(65,59,55,0.8) 0%, #fbbf24 100%)",
        }}
      >
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div
            class名称="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px),
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">
            {t("expiringSoon")}
          </CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{expiringCount}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <ShieldAlert class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Expired */}
      <Card
        class名称="border-none rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative z-10"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, rgba(65,59,55,0.8) 0%, rgba(239,68,68,0.6) 100%)"
              : "linear-gradient(135deg, rgba(65,59,55,0.8) 0%, #ef4444 100%)",
        }}
      >
        <div class名称="absolute inset-0 z-0 opacity-10">
          <div
            class名称="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px),
                                linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        <CardHeader class名称="pb-2 relative z-10">
          <CardTitle class名称="text-sm font-medium text-white">
            {t("expired")}
          </CardTitle>
        </CardHeader>
        <CardContent class名称="flex items-center justify-between relative z-10">
          <span class名称="text-5xl font-bold text-white">{expiredCount}</span>
          <div class名称="rounded-full p-3 bg-white/25 backdrop-blur-sm">
            <ShieldX class名称="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
