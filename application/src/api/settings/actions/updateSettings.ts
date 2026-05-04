
import { getAuthHeaders, getBaseUrl } from '../utils';
import { 设置ApiResponse } from '../types';

export const update设置 = async (data: any): Promise<设置ApiResponse> => {
  try {
    const headers = getAuthHeaders();
    const baseUrl = getBaseUrl();

    let response = await fetch(`${baseUrl}/api/settings`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok && (response.status === 404 || response.status === 405)) {
      response = await fetch(`${baseUrl}/api/settings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
    }

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const updated设置 = await response.json();
    return {
      status: 200,
      json: { success: true, data: updated设置 },
    };
  } catch (error) {
    console.error('Error updating settings:', error);
    return {
      status: 500,
      json: { success: false, message: 'Failed to update settings' },
    };
  }
};