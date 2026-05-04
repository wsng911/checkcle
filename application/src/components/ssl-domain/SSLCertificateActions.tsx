
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw, 编辑, Trash2, Eye } from "lucide-react";
import { SSLCertificate } from "@/types/ssl.types";
import { triggerImmediateCheck } from "@/services/sslCertificateService";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface SSLCertificate操作Props {
  certificate: SSLCertificate;
  onView: (certificate: SSLCertificate) => void;
  on编辑: (certificate: SSLCertificate) => void;
  on删除: (certificate: SSLCertificate) => void;
}

export const SSLCertificate操作 = ({ 
  certificate, 
  onView,
  on编辑, 
  on删除 
}: SSLCertificate操作Props) => {
  const { t } = useLanguage();

  const handleCheck = async () => {
    try {
      await triggerImmediateCheck(certificate.id);
    } catch (error) {
      console.error("Error triggering SSL check:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" class名称="h-8 w-8 p-0">
          <span class名称="sr-only">Open menu</span>
          <MoreHorizontal class名称="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(certificate); }}>
          <Eye class名称="mr-2 h-4 w-4" />
          {t('view')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleCheck(); }}>
          <RefreshCw class名称="mr-2 h-4 w-4" />
          Check
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); on编辑(certificate); }}>
          <编辑 class名称="mr-2 h-4 w-4" />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={(e) => { e.stopPropagation(); on删除(certificate); }}
          class名称="text-destructive"
        >
          <Trash2 class名称="mr-2 h-4 w-4" />
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
