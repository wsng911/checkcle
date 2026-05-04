import React from "react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface SSL状态BadgeProps {
  status: string;
}

export const SSL状态Badge: React.FC<SSL状态BadgeProps> = ({ status }) => {
  const { t } = useLanguage();
  let variant = "";
  let label = "";

  switch (status) {
    case "valid":
      variant = "bg-green-500 hover:bg-green-600";
      label = t('valid');
      break;
    case "expiring_soon":
      variant = "bg-yellow-500 hover:bg-yellow-600";
      label = t('expiringSoon');
      break;
    case "expired":
      variant = "bg-red-500 hover:bg-red-600";
      label = t('expired');
      break;
    case "pending":
      variant = "bg-blue-500 hover:bg-blue-600";
      label = t('pending');
      break;
    default:
      variant = "bg-gray-500 hover:bg-gray-600";
      label = status.charAt(0).toUpperCase() + status.slice(1);
  }

  return (
    <Badge class名称={`${variant} text-white`}>
      {label}
    </Badge>
  );
};