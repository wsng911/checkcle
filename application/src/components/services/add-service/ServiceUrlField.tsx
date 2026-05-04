
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form描述 } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ServiceFormData } from "./types";
import { useLanguage } from "@/contexts/LanguageContext.tsx";

interface ServiceUrlFieldProps {
  form: UseFormReturn<ServiceFormData>;
}

export function ServiceUrlField({ form }: ServiceUrlFieldProps) {
	const { t } = useLanguage();
  const serviceType = form.watch("type");
  
  const getPlaceholder = () => {
    switch (serviceType) {
      case "http":
        return "https://example.com";
      case "ping":
        return "example.com or 192.168.1.1";
      case "tcp":
        return "example.com or 192.168.1.1";
      case "dns":
        return "example.com";
      default:
        return t("targetDefaultPlaceholder");
    }
  };

  const get描述 = () => {
    switch (serviceType) {
      case "http":
        return t("targetHTTPDesc");
      case "ping":
        return t("targetPINGDesc");
      case "tcp":
        return t("targetTCPDesc");
      case "dns":
        return t("targetDNSDesc");
      default:
        return t("targetDefaultDesc");
    }
  };

  const getFieldLabel = () => {
    switch (serviceType) {
      case "dns":
        return t("targetDNS");
      case "ping":
        return "Hostname/IP";
      case "tcp":
        return "Hostname/IP";
      default:
        return t("targetDefault");
    }
  };

  return (
    <div class名称="space-y-4">
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getFieldLabel()}</FormLabel>
            <FormControl>
              <Input 
                placeholder={getPlaceholder()}
                {...field}
                onChange={(e) => {
                //  console.log(`${serviceType === "dns" ? "Domain" : serviceType === "tcp" ? "Host" : "URL"} field changed:`, e.target.value);
                  field.onChange(e);
                }}
              />
            </FormControl>
            <Form描述 class名称="text-xs">
              {get描述()}
            </Form描述>
            <FormMessage />
          </FormItem>
        )}
      />

      {serviceType === "tcp" && (
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port</FormLabel>
              <FormControl>
                <Input 
                  placeholder="8080"
                  type="number"
                  {...field}
                  onChange={(e) => {
                   // console.log("Port field changed:", e.target.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <Form描述 class名称="text-xs">
	              {t("targetTCPPortDesc")}
              </Form描述>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}