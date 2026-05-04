import { pb } from "@/lib/pocketbase";
import { 
  serverNotificationTemplateService, 
  ServerNotificationTemplate,
  创建UpdateServerNotificationTemplateData 
} from "./serverNotificationTemplateService";
import { 
  serviceNotificationTemplateService, 
  ServiceNotificationTemplate,
  创建UpdateServiceNotificationTemplateData 
} from "./serviceNotificationTemplateService";
import { 
  sslNotificationTemplateService, 
  SslNotificationTemplate,
  创建UpdateSslNotificationTemplateData 
} from "./sslNotificationTemplateService";
import { 
  serverThresholdService, 
  ServerThreshold,
  创建UpdateServerThresholdData 
} from "./serverThresholdService";

export type TemplateType = 'server' | 'service' | 'ssl' | 'server_threshold';

export type AnyTemplate = ServerNotificationTemplate | ServiceNotificationTemplate | SslNotificationTemplate | ServerThreshold;
export type AnyTemplateData = 创建UpdateServerNotificationTemplateData | 创建UpdateServiceNotificationTemplateData | 创建UpdateSslNotificationTemplateData | 创建UpdateServerThresholdData;

// Export individual template types
export type { ServerNotificationTemplate, ServiceNotificationTemplate, SslNotificationTemplate, ServerThreshold };
export type { 创建UpdateServerNotificationTemplateData, 创建UpdateServiceNotificationTemplateData, 创建UpdateSslNotificationTemplateData, 创建UpdateServerThresholdData };

export const templateService = {
  async getTemplates(type: TemplateType): Promise<AnyTemplate[]> {
    switch (type) {
      case 'server':
        return serverNotificationTemplateService.getTemplates();
      case 'service':
        return serviceNotificationTemplateService.getTemplates();
      case 'ssl':
        return sslNotificationTemplateService.getTemplates();
      case 'server_threshold':
        return serverThresholdService.getServerThresholds();
      default:
        throw new Error(`Unknown template type: ${type}`);
    }
  },

  async getTemplate(id: string, type: TemplateType): Promise<AnyTemplate> {
    switch (type) {
      case 'server':
        return serverNotificationTemplateService.getTemplate(id);
      case 'service':
        return serviceNotificationTemplateService.getTemplate(id);
      case 'ssl':
        return sslNotificationTemplateService.getTemplate(id);
      case 'server_threshold':
        return serverThresholdService.getServerThreshold(id);
      default:
        throw new Error(`Unknown template type: ${type}`);
    }
  },

  async createTemplate(data: AnyTemplateData, type: TemplateType): Promise<AnyTemplate> {
    switch (type) {
      case 'server':
        return serverNotificationTemplateService.createTemplate(data as 创建UpdateServerNotificationTemplateData);
      case 'service':
        return serviceNotificationTemplateService.createTemplate(data as 创建UpdateServiceNotificationTemplateData);
      case 'ssl':
        return sslNotificationTemplateService.createTemplate(data as 创建UpdateSslNotificationTemplateData);
      case 'server_threshold':
        return serverThresholdService.createServerThreshold(data as 创建UpdateServerThresholdData);
      default:
        throw new Error(`Unknown template type: ${type}`);
    }
  },

  async updateTemplate(id: string, data: Partial<AnyTemplateData>, type: TemplateType): Promise<AnyTemplate> {
    switch (type) {
      case 'server':
        return serverNotificationTemplateService.updateTemplate(id, data as Partial<创建UpdateServerNotificationTemplateData>);
      case 'service':
        return serviceNotificationTemplateService.updateTemplate(id, data as Partial<创建UpdateServiceNotificationTemplateData>);
      case 'ssl':
        return sslNotificationTemplateService.updateTemplate(id, data as Partial<创建UpdateSslNotificationTemplateData>);
      case 'server_threshold':
        return serverThresholdService.updateServerThreshold(id, data as Partial<创建UpdateServerThresholdData>);
      default:
        throw new Error(`Unknown template type: ${type}`);
    }
  },

  async deleteTemplate(id: string, type: TemplateType): Promise<boolean> {
    switch (type) {
      case 'server':
        return serverNotificationTemplateService.deleteTemplate(id);
      case 'service':
        return serviceNotificationTemplateService.deleteTemplate(id);
      case 'ssl':
        return sslNotificationTemplateService.deleteTemplate(id);
      case 'server_threshold':
        return serverThresholdService.deleteServerThreshold(id);
      default:
        throw new Error(`Unknown template type: ${type}`);
    }
  }
};

// Template type configurations
export const templateTypeConfigs = {
  server: {
    label: 'Server 监控ing',
    description: 'Templates for server resource monitoring alerts',
    placeholders: [
      '${server_name}', '${cpu_usage}', '${ram_usage}', '${disk_usage}', 
      '${network_usage}', '${cpu_temp}', '${disk_io}', '${threshold}', '${time}'
    ]
  },
  service: {
    label: 'Service Uptime',
    description: 'Templates for service uptime monitoring alerts',
    placeholders: [
      '${service_name}', '${status}', '${response_time}', '${url}', 
      '${host}', '${service_type}', '${port}', '${domain}', 
      '${region_name}', '${agent_id}', '${uptime}', '${time}'
    ]
  },
  ssl: {
    label: 'SSL Certificate',
    description: 'Templates for SSL certificate monitoring alerts',
    placeholders: [
      '${domain}', '${certificate_name}', '${expiry_date}', '${days_left}', 
      '${issuer}', '${serial_number}', '${time}'
    ]
  },
  server_threshold: {
    label: 'Server Threshold',
    description: 'Templates for server resource threshold configurations',
    placeholders: [
      '${name}', '${cpu_threshold}', '${ram_threshold}', '${disk_threshold}', '${network_threshold}'
    ]
  }
};