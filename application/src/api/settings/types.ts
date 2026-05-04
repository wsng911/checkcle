
export interface 设置ApiRequest {
  action: string;
  data?: any;
}

export interface 设置ApiResponse {
  status: number;
  json: {
    success: boolean;
    data?: any;
    message?: string;
  };
}

export interface Smtp设置 {
  enabled?: boolean;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  authMethod?: string;
  tls?: boolean;
  local名称?: string;
}