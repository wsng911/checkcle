
export interface General设置 {
  id?: string;
  created?: string;
  updated?: string;
  system_name?: string;
  system_name_kh?: string;
  logo_url?: string;
  system_description?: string;
  appearance?: string;
  language?: string;
  timezone?: string;
  date_format?: string;
  time_format?: string;
  retention_days?: number;
  server_retention_days?: number;
  uptime_retention_days?: number;
  notification_email?: string;
  session_timeout?: number;
  enable_public_stats?: boolean;
  enable_email_notifications?: boolean;
  enable_sms_notifications?: boolean;
  enable_two_factor?: boolean;
  enable_audit_logs?: boolean;
  
  // New fields for additional settings
  meta?: {
    app名称?: string;
    appURL?: string;
    sender名称?: string;
    sender添加ress?: string;
    hideControls?: boolean;
  };
  smtp?: {
    enabled?: boolean;
    port?: number;
    host?: string;
    username?: string;
    password?: string;
    authMethod?: string;
    tls?: boolean;
    local名称?: string;
  };
}

export const settingsService = {
  async getGeneral设置(): Promise<General设置 | null> {
    try {
      console.log('Fetching settings from /api/settings endpoint...');
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'get设置' })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('设置 API response:', result);
      
      return result.success ? result.data : null;
    } catch (error) {
      console.error("Failed to fetch general settings:", error);
      return null;
    }
  },
  
  async updateGeneral设置(data: Partial<General设置>): Promise<General设置 | null> {
    try {
      console.log('Updating settings via /api/settings:', data);
      
      // 移除 id and timestamp fields for settings update
      const { id, created, updated, ...updateData } = data;
      
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          action: 'update设置',
          data: updateData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('设置 update response:', result);
      
      return result.success ? result.data : null;
    } catch (error) {
      console.error("Failed to update general settings:", error);
      return null;
    }
  },
  
  async test邮箱Connection(smtpConfig: any): Promise<boolean> {
    try {
      console.log('Testing email connection via /api/settings:', smtpConfig);
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          action: 'test邮箱Connection',
          data: smtpConfig
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.success || false;
    } catch (error) {
      console.error("Failed to test email connection:", error);
      return false;
    }
  }
};