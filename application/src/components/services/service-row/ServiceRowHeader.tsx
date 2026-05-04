
import React from "react";
import { BellOff } from "lucide-react";
import { Service } from "@/types/service.types";

interface ServiceRowHeaderProps {
  service: Service;
}

export const ServiceRowHeader = ({ service }: ServiceRowHeaderProps) => {
  // Check alerts status - check both fields for backward compatibility
  const alertsMuted = service.alerts === "muted" || service.muteAlerts === true;
  
  // Determine what to display based on service type
  const getServiceSubtitle = () => {
    const serviceType = service.type.toLowerCase();
    
    if (serviceType === "dns" && service.domain) {
      return service.domain;
    }
    
    if ((serviceType === "ping" || serviceType === "tcp") && service.host) {
      if (serviceType === "tcp" && service.port) {
        return `${service.host}:${service.port}`;
      }
      return service.host;
    }
    
    if (service.url) {
      try {
        // If the URL doesn't start with http:// or https://, add https:// prefix
        const formattedUrl = (!service.url.startsWith('http://') && !service.url.startsWith('https://')) 
          ? `https://${service.url}` 
          : service.url;

        try {
          // Try to parse it as a URL
          const urlObj = new URL(formattedUrl);
          // For HTTP services, show full URL; for others show hostname
          return serviceType === "http" ? formattedUrl : urlObj.hostname;
        } catch (urlError) {
          // If URL parsing fails, just show the original URL
          return service.url;
        }
      } catch (e) {
        // If any other error occurs, just show the original URL
        return service.url;
      }
    }
    
    return "";
  };

  const serviceSubtitle = getServiceSubtitle();

  return (
    <div class名称="flex items-center gap-2">
      <div>
        <div class名称="text-base font-medium">{service.name}</div>
        {serviceSubtitle && (
          <div class名称="text-sm text-gray-500 mt-1">{serviceSubtitle}</div>
        )}
      </div>
      {/* 添加 a visual indicator if alerts are muted for this service */}
      {alertsMuted && (
        <div class名称="ml-1" title="Alerts muted">
          <BellOff class名称="h-4 w-4 text-gray-400" />
        </div>
      )}
    </div>
  );
};