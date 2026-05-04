
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialog取消,
  AlertDialogContent,
  AlertDialog描述,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/services/userService";
import { Loader2 } from "lucide-react";

interface 删除UserDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
  on删除: () => void;
  isDeleting?: boolean;
}

const 删除UserDialog = ({
  isOpen,
  setIsOpen,
  user,
  on删除,
  isDeleting = false,
}: 删除UserDialogProps) => {
  if (!user) return null;

  const handle取消 = () => {
    if (!isDeleting) {
      setIsOpen(false);
    }
  };

  const handle确认 = () => {
    if (!isDeleting) {
      on删除();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(newOpen) => {
      // Only allow closing if not currently deleting
      if (!isDeleting || !newOpen) {
        setIsOpen(newOpen);
      }
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>删除 user</AlertDialogTitle>
          <AlertDialog描述>
            Are you sure you want to delete {user.full_name || user.username}? This action cannot be undone.
          </AlertDialog描述>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialog取消 onClick={handle取消} disabled={isDeleting}>取消</AlertDialog取消>
          <AlertDialogAction
            onClick={handle确认}
            disabled={isDeleting}
            class名称="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 class名称="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              '删除'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default 删除UserDialog;
