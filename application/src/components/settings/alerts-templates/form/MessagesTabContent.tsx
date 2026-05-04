
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form描述 } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";

interface MessagesTabContentProps {
  control: Control<any>;
}

export const MessagesTabContent: React.FC<MessagesTabContentProps> = ({ control }) => {
  return (
    <div class名称="space-y-6">
      <Card>
        <CardContent class名称="pt-6">
          <div class名称="space-y-4">
            <FormField
              control={control}
              name="up_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Up Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Service ${service_name} is UP. Response time: ${response_time}ms" 
                      class名称="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <Form描述>
                    Message sent when a service returns to UP status
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="down_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Down Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Service ${service_name} is DOWN. 状态: ${status}" 
                      class名称="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <Form描述>
                    Message sent when a service goes DOWN
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class名称="pt-6">
          <div class名称="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="maintenance_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Service ${service_name} is under maintenance" 
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
              name="incident_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Warning: Service ${service_name} has an incident" 
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
              name="resolved_message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolved Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Issue with service ${service_name} has been resolved" 
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
