
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, 编辑, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { templateService, AnyTemplate, TemplateType } from "@/services/templateService";

interface TemplateListProps {
  templates: AnyTemplate[];
  isLoading: boolean;
  on编辑: (id: string) => void;
  refetchTemplates: () => void;
  templateType: TemplateType;
}

export const TemplateList: React.FC<TemplateListProps> = ({ 
  templates, 
  isLoading, 
  on编辑, 
  refetchTemplates,
  templateType 
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteTemplateId, set删除TemplateId] = useState<string | null>(null);

  // 删除 mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => templateService.deleteTemplate(id, templateType),
    onSuccess: () => {
      toast({
        title: "Template deleted",
        description: "The template has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['notification_templates', templateType] });
      refetchTemplates();
    },
    onError: (error) => {
     // console.error("Error deleting template:", error);
      toast({
        title: "Error",
        description: "Failed to delete template. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handle删除 = (id: string) => {
    set删除TemplateId(id);
  };

  const confirm删除 = () => {
    if (deleteTemplateId) {
      deleteMutation.mutate(deleteTemplateId);
      set删除TemplateId(null);
    }
  };

  if (isLoading) {
    return (
      <div class名称="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} class名称="flex items-center justify-between p-4 border border-border rounded-lg">
            <div class名称="space-y-2">
              <div class名称="h-4 bg-muted animate-pulse rounded w-32"></div>
              <div class名称="h-3 bg-muted animate-pulse rounded w-48"></div>
            </div>
            <div class名称="flex space-x-2">
              <div class名称="h-8 w-8 bg-muted animate-pulse rounded"></div>
              <div class名称="h-8 w-8 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div class名称="text-center py-8">
        <p class名称="text-muted-foreground">No templates found. 创建 your first template to get started.</p>
      </div>
    );
  }

  const getTemplateTypeLabel = (type: TemplateType) => {
    switch (type) {
      case 'server': return 'Server';
      case 'service': return 'Service';
      case 'ssl': return 'SSL';
      default: return 'Unknown';
    }
  };

  return (
    <>
      <div class名称="space-y-4">
        {templates.map((template) => (
          <div key={template.id} class名称="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div class名称="space-y-1">
              <div class名称="flex items-center gap-2">
                <h3 class名称="font-medium">{template.name}</h3>
                <Badge variant="outline">{getTemplateTypeLabel(templateType)}</Badge>
              </div>
              <p class名称="text-sm text-muted-foreground">
                创建d: {new Date(template.created).toLocaleDateString()}
                {template.updated !== template.created && 
                  ` • Updated: ${new Date(template.updated).toLocaleDateString()}`
                }
              </p>
            </div>
            <div class名称="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => on编辑(template.id)}
              >
                <编辑 class名称="h-4 w-4 mr-1" />
                编辑
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical class名称="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handle删除(template.id)}
                    class名称="text-destructive focus:text-destructive"
                  >
                    <Trash2 class名称="h-4 w-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteTemplateId} onOpenChange={() => set删除TemplateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialog描述>
              This action cannot be undone. This will permanently delete the template.
            </AlertDialog描述>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialog取消>取消</AlertDialog取消>
            <AlertDialogAction
              onClick={confirm删除}
              class名称="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};