
import { getAuthHeaders, getBaseUrl } from '../utils';
import { 设置ApiResponse } from '../types';

export const get设置 = async (): Promise<设置ApiResponse> => {
  try {
    const response = await fetch(`${getBaseUrl()}/api/settings`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const settings = await response.json();
    return {
      status: 200,
      json: { success: true, data: settings },
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      status: 500,
      json: { success: false, message: 'Failed to fetch settings' },
    };
  }
};