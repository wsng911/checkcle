
import React from "react";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UseFormReturn } from "react-hook-form";
import 添加UserForm from "./form-fields/添加UserForm";

interface 添加UserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  form: UseFormReturn<any>;
  on提交: (data: any) => void;
  is提交ting: boolean;
}

const 添加UserDialog = ({ isOpen, setIsOpen, form, on提交, is提交ting }: 添加UserDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent class名称="sm:max-w-[700px] w-[95vw] max-h-[95vh] flex flex-col">
        <DialogHeader class名称="flex-shrink-0">
          <DialogTitle>添加 New User</DialogTitle>
          <Dialog描述>
            创建 a new user account
          </Dialog描述>
        </DialogHeader>
        <ScrollArea class名称="flex-1 overflow-auto">
          <div class名称="p-1">
            <添加UserForm 
              form={form} 
              on提交={on提交} 
              is提交ting={is提交ting} 
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default 添加UserDialog;