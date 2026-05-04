export interface Service {
  id: string;
  name: string;
  url?: string;
  host?: string; // Make host optional since it's not always required
  port?: number;
  domain?: string; // 添加 domain field for DNS services
  type: "http" | "https" | "tcp" | "ping" | "icmp" | "dns";
  status: "up" | "down" | "paused" | "warning";
  responseTime: number;
  uptime?: number;
  lastChecked: string;
  interval: number;
  timeout?: number;
  retries: number;
  created?: string;
  updated?: string;
  notification_channel?: string;
  notificationChannel?: string; // Keep for backward compatibility
  notification_status?: "enabled" | "disabled"; // 添加 notification_status field
  alertTemplate?: string;
  alerts?: "muted" | "unmuted"; // Make sure alerts is properly typed as union
  muteAlerts?: boolean; // Keep this to avoid breaking existing code
  muteChangedAt?: string;
  follow_redirects?: boolean;
  verify_ssl?: boolean;
  expected_status_code?: number;
  keyword_check?: string;
  keyword_check_type?: "contains" | "not_contains";
  dns_record_type?: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS";
  dns_expected_value?: string;
  headers?: string;
  body?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
  // Regional monitoring fields
  region_name?: string;
  agent_id?: string;
  regional_status?: "enabled" | "disabled"; // 添加 regional_status field
  regional_monitoring_enabled?: boolean;
}

export interface 创建ServiceParams {
  name: string;
  url?: string;
  host?: string; // 添加 host field for PING and TCP services
  port?: number; // 添加 port field for TCP services
  domain?: string; // 添加 domain field for DNS services
  type: string;
  interval: number;
  retries: number;
  notificationChannel?: string;
  alertTemplate?: string;
  // Regional monitoring params
  regional监控ingEnabled?: boolean;
  regional状态?: "enabled" | "disabled"; // 添加 regional状态 field
  region名称?: string;
  agentId?: string;
}

export interface UptimeData {
  id?: string;
  service_id?: string; // Make service_id optional for backward compatibility
  serviceId?: string; // Keep for backward compatibility
  timestamp: string;
  status: "up" | "down" | "paused" | "warning";
  responseTime: number;
  error_message?: string;
  details?: string;
  created?: string;
  updated?: string;
  date?: string; // Keep for backward compatibility
  uptime?: number; // Keep for backward compatibility
  // Regional monitoring fields
  region_name?: string;
  agent_id?: string | number;
  // Source identifier for multi-source display
  source?: string;
}

export interface PingData {
  id?: string;
  service_id: string;
  timestamp: string;
  status: "up" | "down" | "paused" | "warning";
  responseTime: number;
  packet_loss?: number;
  error_message?: string;
  details?: string;
  created?: string;
  updated?: string;
}

export interface DNSData {
  id?: string;
  service_id: string;
  timestamp: string;
  status: "up" | "down" | "paused" | "warning";
  responseTime: number;
  resolved_ip?: string;
  error_message?: string;
  details?: string;
  created?: string;
  updated?: string;
}

export interface TCPData {
  id?: string;
  service_id: string;
  timestamp: string;
  status: "up" | "down" | "paused" | "warning";
  responseTime: number;
  error_message?: string;
  details?: string;
  created?: string;
  updated?: string;
}