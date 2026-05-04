
export interface 状态PageComponentRecord {
  collectionId: string;
  collection名称: string;
  id: string;
  operational_status_id: string;
  name: string;
  description: string;
  service_id: string;
  server_id: string;
  display_order: number;
  created: string;
  updated: string;
}

export interface 状态PageComponentState {
  data: 状态PageComponentRecord[] | null;
  loading: boolean;
  error: string | null;
}