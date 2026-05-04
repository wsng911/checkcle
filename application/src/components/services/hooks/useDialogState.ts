
import { useState } from "react";

export function useDialogState() {
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [is删除DialogOpen, setIs删除DialogOpen] = useState(false);
  const [is编辑DialogOpen, setIs编辑DialogOpen] = useState(false);

  const handle编辑DialogChange = (open: boolean) => {
    setIs编辑DialogOpen(open);
  };
  
  const handle删除DialogChange = (open: boolean, isDeleting: boolean = false) => {
    // Only allow closing if not currently deleting
    if (!isDeleting || !open) {
      setIs删除DialogOpen(open);
    }
  };

  return {
    isHistoryDialogOpen,
    is删除DialogOpen,
    is编辑DialogOpen,
    setIsHistoryDialogOpen,
    setIs删除DialogOpen,
    setIs编辑DialogOpen,
    handle编辑DialogChange,
    handle删除DialogChange
  };
}
