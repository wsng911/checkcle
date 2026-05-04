import React from "react";
import {
  Dialog,
  DialogContent,
  Dialog描述,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/utils/copyUtils";

interface ImpersonationTokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string | null;
  impersonatedUserLabel?: string;
}

const ImpersonationTokenDialog = ({
  open,
  onOpenChange,
  token,
  impersonatedUserLabel,
}: ImpersonationTokenDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-[650px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Impersonation token</DialogTitle>
          <Dialog描述>
            {impersonatedUserLabel
              ? `Use this token to impersonate ${impersonatedUserLabel}. Keep it secret.`
              : "Use this token to impersonate the selected user. Keep it secret."}
          </Dialog描述>
        </DialogHeader>

        <div class名称="space-y-2">
          <div class名称="rounded-md border bg-muted p-3">
            <pre class名称="text-sm overflow-x-auto whitespace-pre-wrap break-all">
              <code>{token ?? ""}</code>
            </pre>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (token) copyToClipboard(token);
            }}
            disabled={!token}
          >
            Copy token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImpersonationTokenDialog;
