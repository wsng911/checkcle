
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form描述 } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholdersTabContentProps {
  control: Control<any>;
}

export const PlaceholdersTabContent: React.FC<PlaceholdersTabContentProps> = ({ control }) => {
  return (
    <div class名称="space-y-6">
      <Card>
        <CardHeader class名称="pb-3">
          <CardTitle class名称="text-sm font-medium">Template Placeholders</CardTitle>
        </CardHeader>
        <CardContent>
          <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="service_name_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service 名称 Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${service_name}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service name in messages
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="response_time_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response Time Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${response_time}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for response time in milliseconds
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <FormField
              control={control}
              name="status_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态 Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${status}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service status (UP, DOWN, etc.)
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="url_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${url}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service URL
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="host_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host/IP Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${host}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service host or IP address
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="service_type_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${service_type}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service type (HTTP, PING, TCP, DNS)
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="port_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${port}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service port number
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="domain_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${domain}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for domain name (DNS services)
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="region_name_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region 名称 Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${region_name}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for regional agent name
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="agent_id_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent ID Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${agent_id}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for regional agent ID
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="uptime_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uptime Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${uptime}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for service uptime percentage
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="time_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${time}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for current date and time
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="error_message_placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Error Message Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="${error_message}" {...field} />
                  </FormControl>
                  <Form描述 class名称="text-xs">
                    Used for error details when service is down
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class名称="pb-3">
          <CardTitle class名称="text-sm font-medium">Placeholder Usage Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p class名称="text-sm text-muted-foreground mb-3">
            These placeholders will be replaced with actual values when notifications are sent:
          </p>
          <div class名称="space-y-2 text-sm">
            <div class名称="grid grid-cols-2 gap-2">
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{service_name}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">The name of the service</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{response_time}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Response time in milliseconds</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{status}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Service status (UP, DOWN)</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{url}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Service URL</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{host}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Service host or IP address</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{service_type}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Service type (HTTP, PING, TCP, DNS)</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{port}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Service port number</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{domain}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Domain name (DNS services)</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{region_name}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Regional agent name</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{agent_id}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Regional agent ID</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{uptime}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Service uptime percentage</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{time}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Current date and time</p>
              </div>
              <div class名称="bg-muted/30 p-2 rounded">
                <code class名称="text-xs">${"{error_message}"}</code>
                <p class名称="text-xs text-muted-foreground mt-1">Error details when service is down</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};