
import { get设置 } from './actions/get设置';
import { update设置 } from './actions/update设置';
import { test邮箱Connection } from './actions/test邮箱Connection';
import { test邮箱 } from './actions/test邮箱';

/**
 * 设置 API handler
 */
const settingsApi = async (body: any, path?: string) => {
 // console.log('设置 API called with path:', path, 'body:', body);
  
  // Handle test email endpoint specifically
  if (path === '/api/settings/test/email') {
    console.log('Handling test email request');
    return await test邮箱(body);
  }
  
  // Handle regular settings API with action-based routing
  const action = body?.action;
 // console.log('设置 API called with action:', action, 'data:', body?.data);

  switch (action) {
    case 'get设置':
      return await get设置();
    
    case 'update设置':
      return await update设置(body.data);
    
    case 'test邮箱Connection':
      return await test邮箱Connection(body.data);
    
    default:
      console.error('Unknown action:', action);
      return {
        status: 400,
        json: { success: false, message: 'Unknown action' },
      };
  }
};

export default settingsApi;