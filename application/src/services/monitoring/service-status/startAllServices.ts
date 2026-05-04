
import { pb } from '@/lib/pocketbase';
import { start监控ingService } from './start监控ing';

/**
 * Start monitoring for all active services
 */
export async function startAllActive服务(): Promise<void> {
  try {
    // Get all services that are not paused
    const result = await pb.collection('services').getList(1, 100, {
      filter: 'status != "paused"'
    });
    
   // console.log(`Starting monitoring for ${result.items.length} active services`);
    
    // Start monitoring each active service
    for (const service of result.items) {
      await start监控ingService(service.id);
    }
  } catch (error) {
  //  console.error("Error starting all active services:", error);
  }
}
