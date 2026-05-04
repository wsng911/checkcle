
import { pb } from '@/lib/pocketbase';
import { formatCurrentTime } from './httpUtils';

/**
 * Records a mute status change for a service in the database
 * @param serviceId The ID of the service
 * @param service名称 The name of the service
 * @param mute状态 The new mute status (true = muted, false = unmuted)
 * @param userId Optional user ID who performed the action
 */
export async function recordMute状态Change(
  serviceId: string, 
  service名称: string, 
  mute状态: boolean,
  userId?: string
): Promise<void> {
  try {
    const timestamp = new Date().toISOString();
    const formattedTime = formatCurrentTime();
    
    console.log(`Recording ${mute状态 ? "mute" : "unmute"} status change for service ${service名称} at ${formattedTime}`);
    
    // Update the service record with the correct alerts field value
    // Use both mute_alerts and alerts fields for backward compatibility
    const updateData = {
      mute_changed_at: timestamp,
      mute_alerts: mute状态,
      alerts: mute状态 ? "muted" : "unmuted"  // Use the correct field name as per DB schema
    };
    
    console.log(`Updating service with data: ${JSON.stringify(updateData)}`);
    
    await pb.collection('services').update(serviceId, updateData);
    
    console.log(`Mute status change recorded for ${service名称}: ${mute状态 ? "Muted" : "Unmuted"}`);
  } catch (error) {
    console.error("Error recording mute status change:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
