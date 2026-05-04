
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form描述 } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServerThresholdFieldsProps {
  control: Control<any>;
}

export const ServerThresholdFields: React.FC<ServerThresholdFieldsProps> = ({ control }) => {
  return (
    <div class名称="space-y-6">
      <Card>
        <CardHeader class名称="pb-3">
          <CardTitle class名称="text-sm font-medium">Server Resource Thresholds</CardTitle>
        </CardHeader>
        <CardContent>
          <div class名称="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="cpu_threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPU Threshold (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="100"
                      placeholder="85"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <Form描述>
                    CPU usage percentage that triggers an alert
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="ram_threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM Threshold (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="100"
                      placeholder="80"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <Form描述>
                    Memory usage percentage that triggers an alert
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="disk_threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disk Threshold (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="100"
                      placeholder="90"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <Form描述>
                    Disk usage percentage that triggers an alert
                  </Form描述>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="network_threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network Threshold (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="100"
                      placeholder="75"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <Form描述>
                    Network usage percentage that triggers an alert
                  </Form描述>
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