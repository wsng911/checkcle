
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form描述 } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServerTemplateFieldsProps {
  control: Control<any>;
}

export const ServerTemplateFields: React.FC<ServerTemplateFieldsProps> = ({ control }) => {
  return (
    <div class名称="space-y-6">
      <Card>
        <CardHeader class名称="pb-3">
          <CardTitle class名称="text-sm font-medium">System Resource Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="cpu_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU Alert Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="CPU usage on ${server_name} is ${cpu_usage}% (threshold: ${threshold}%)"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="ram_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM Alert Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Memory usage on ${server_name} is ${ram_usage}% (threshold: ${threshold}%)"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="disk_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disk Alert Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Disk usage on ${server_name} is ${disk_usage}% (threshold: ${threshold}%)"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="network_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Alert Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Network usage on ${server_name} is ${network_usage}% (threshold: ${threshold}%)"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class名称="pb-3">
          <CardTitle class名称="text-sm font-medium">System Resource Restore Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="restore_cpu_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU Restore Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="CPU usage on ${server_name} has returned to normal: ${cpu_usage}%"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="restore_ram_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM Restore Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Memory usage on ${server_name} has returned to normal: ${ram_usage}%"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="restore_disk_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disk Restore Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Disk usage on ${server_name} has returned to normal: ${disk_usage}%"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="restore_network_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Restore Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Network usage on ${server_name} has returned to normal: ${network_usage}%"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class名称="pt-6">
          <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="up_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Up Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Server ${server_name} is UP and responding"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="down_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Down Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Server ${server_name} is DOWN"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="warning_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warning Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Warning: Server ${server_name} requires attention"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="paused_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paused Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="监控ing for server ${server_name} is paused"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="cpu_temp_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU Temperature Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="CPU temperature on ${server_name} is ${cpu_temp}°C"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="disk_io_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disk I/O Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Disk I/O on ${server_name} is ${disk_io} MB/s"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="restore_cpu_temp_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU Temperature Restore Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="CPU temperature on ${server_name} has returned to normal: ${cpu_temp}°C"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="restore_disk_io_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disk I/O Restore Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Disk I/O on ${server_name} has returned to normal: ${disk_io} MB/s"
                      class名称="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};