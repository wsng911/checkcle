
import React from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { UserTextField } from "./";
import { UserToggleField } from "./";
import { UserRoleField } from "./";
import { DialogFooter } from "@/components/ui/dialog";

interface 添加UserFormProps {
  form: UseFormReturn<any>;
  on提交: (data: any) => void;
  is提交ting: boolean;
}

const 添加UserForm = ({ form, on提交, is提交ting }: 添加UserFormProps) => {
  return (
    <Form {...form}>
      <form on提交={form.handle提交(on提交)} class名称="space-y-4">
        
        <div class名称="grid grid-cols-2 gap-4">
          <UserTextField
            control={form.control}
            name="full_name"
            label="Full 名称"
            placeholder="Enter full name"
          />
          
          <UserTextField
            control={form.control}
            name="email"
            label="邮箱"
            placeholder="Enter email"
            type="email"
          />
          
          <UserTextField
            control={form.control}
            name="username"
            label="用户名"
            placeholder="Enter username"
          />
          
          <UserRoleField
            control={form.control}
            name="role"
            label="Role"
          />
          
          <UserTextField
            control={form.control}
            name="password"
            label="密码"
            placeholder="Enter password"
            type="password"
          />
          
          <UserTextField
            control={form.control}
            name="password确认"
            label="确认 密码"
            placeholder="确认 password"
            type="password"
          />
        </div>
        
        <UserToggleField
          control={form.control}
          name="isActive"
          label="Active 状态"
          description="User will be able to access the system"
        />

        <DialogFooter class名称="pt-4">
          <Button type="submit" disabled={is提交ting}>
            {is提交ting ? (
              <>
                <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "创建 User"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default 添加UserForm;