import React from "react";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UseFormReturn } from "react-hook-form";
import { User } from "@/services/userService";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, Alert描述 } from "@/components/ui/alert";
import UserTextField from "./form-fields/UserTextField";
import UserToggleField from "./form-fields/UserToggleField";
import UserRoleField from "./form-fields/UserRoleField";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface 编辑UserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  form: UseFormReturn<any>;
  user: User | null;
  on提交: (data: any) => void;
  onImpersonate: (data: any) => void;
  is提交ting?: boolean;
  error?: string | null;
}

const 编辑UserDialog = ({ 
  isOpen, 
  setIsOpen, 
  form, 
  user, 
  on提交,
  onImpersonate,
  is提交ting = false,
  error = null
}: 编辑UserDialogProps) => {
  if (!user) return null;

  const [impersonationDurationSeconds, setImpersonationDurationSeconds] = React.useState<number>(3600);

  const handleImpersonateClick = () => {
    // Impersonation should not depend on edit form validation.
    onImpersonate({ user, durationSeconds: impersonationDurationSeconds });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent class名称="sm:max-w-[700px] w-[95vw] max-h-[95vh] flex flex-col">
        <DialogHeader class名称="flex-shrink-0">
          <DialogTitle>编辑 User</DialogTitle>
          <Dialog描述>
            Update user information
          </Dialog描述>
        </DialogHeader>
        
        <ScrollArea class名称="flex-1 overflow-auto">
          <div class名称="p-1">
            {error && (
              <Alert variant="destructive" class名称="mb-4">
                <AlertCircle class名称="h-4 w-4" />
                <Alert描述>{error}</Alert描述>
              </Alert>
            )}
            
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
                </div>
                
                <UserToggleField
                  control={form.control}
                  name="isActive"
                  label="Active 状态"
                  description="User will be able to access the system"
                />
              </form>
            </Form>

            {/* Impersonation settings are not part of the form to avoid validation */}
            <div class名称="mt-6 space-y-2">
              <Label htmlFor="impersonation-duration">Impersonation token duration (seconds)</Label>
              <Input
                id="impersonation-duration"
                type="number"
                inputMode="numeric"
                min={60}
                step={60}
                value={impersonationDurationSeconds}
                onChange={(e) => setImpersonationDurationSeconds(Number(e.target.value || 0))}
              />
              <p class名称="text-xs text-muted-foreground">
                Default is 3600 (1 hour). Minimum 60 seconds.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter class名称="flex-shrink-0 pt-4 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={is提交ting}
          >
            取消
          </Button>
          <Button 
            onClick={form.handle提交(on提交)} 
            disabled={is提交ting}
          >
            {is提交ting ? (
              <>
                <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update User"
            )}
          </Button>
          <Button 
            type="button"
            onClick={handleImpersonateClick}
            disabled={is提交ting}
          >
            {is提交ting ? (
              <>
                <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
                Impersonating...
              </>
            ) : (
              "Impersonate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default 编辑UserDialog;