
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Wifi, Server, Globe2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./types";
import { useLanguage } from "@/contexts/LanguageContext.tsx";

interface ServiceTypeFieldProps {
  form: UseFormReturn<ServiceFormData>;
}

export function ServiceTypeField({ form }: ServiceTypeFieldProps) {
	const { t } = useLanguage();
  const getServiceIcon = (type: string) => {
    switch (type) {
      case "http":
        return <Globe class名称="w-4 h-4" />;
      case "ping":
        return <Wifi class名称="w-4 h-4" />;
      case "tcp":
        return <Server class名称="w-4 h-4" />;
      case "dns":
        return <Globe2 class名称="w-4 h-4" />;
      default:
        return <Globe class名称="w-4 h-4" />;
    }
  };

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("serviceType")}</FormLabel>
          <FormControl>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue>
                  {field.value && (
                    <div class名称="flex items-center gap-2">
                      {getServiceIcon(field.value)}
                      <span>{field.value.toUpperCase()}</span>
                    </div>
                  )}
                  {!field.value && "Select a service type"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="http">
                  <div class名称="flex flex-col">
                    <div class名称="flex items-center gap-2">
                      <Globe class名称="w-4 h-4" />
                      <span>HTTP/S</span>
                    </div>
                    <p class名称="text-xs text-muted-foreground mt-1">
	                    {t("serviceTypeHTTPDesc")}
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="ping">
                  <div class名称="flex flex-col">
                    <div class名称="flex items-center gap-2">
                      <Wifi class名称="w-4 h-4" />
                      <span>PING</span>
                    </div>
                    <p class名称="text-xs text-muted-foreground mt-1">
	                    {t("serviceTypePINGDesc")}
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="tcp">
                  <div class名称="flex flex-col">
                    <div class名称="flex items-center gap-2">
                      <Server class名称="w-4 h-4" />
                      <span>TCP</span>
                    </div>
                    <p class名称="text-xs text-muted-foreground mt-1">
	                    {t("serviceTypeTCPDesc")}
                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="dns">
                  <div class名称="flex flex-col">
                    <div class名称="flex items-center gap-2">
                      <Globe2 class名称="w-4 h-4" />
                      <span>DNS</span>
                    </div>
                    <p class名称="text-xs text-muted-foreground mt-1">
	                    {t("serviceTypeDNSDesc")}
                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}