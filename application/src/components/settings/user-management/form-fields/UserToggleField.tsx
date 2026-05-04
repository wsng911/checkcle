
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form描述 } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";

interface UserToggleFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  description: string;
}

const UserToggleField = ({ control, name, label, description }: UserToggleFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem class名称="flex flex-row items-center justify-between rounded-lg border p-3">
          <div class名称="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <Form描述>
              {description}
            </Form描述>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default UserToggleField;
