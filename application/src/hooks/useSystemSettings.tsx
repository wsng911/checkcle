
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/authService";
import { General设置 } from "@/services/settingsService";

interface ApiResponse {
  success: boolean;
  data?: General设置;
  message?: string;
}

export function useSystem设置() {
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  
  // Check if user is super admin
  const currentUser = authService.getCurrentUser();
  const isSuperAdmin = currentUser?.role === "superadmin";
  
  // Fetch settings from API - only if user is super admin
  const { 
    data: settings,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['general设置'],
    queryFn: async (): Promise<General设置 | null> => {
      try {
      //  console.log('Fetching settings from API...');
        const response = await fetch('/api/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'get设置' })
        });
        
      //  console.log('API response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: ApiResponse = await response.json();
      //  console.log('API response data:', result);
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch settings');
        }
        
        return result.data || null;
      } catch (error) {
      //  console.error('Error fetching settings:', error);
        toast({
          title: t("errorFetching设置", "settings"),
          description: error instanceof Error ? error.message : String(error),
          variant: "destructive",
        });
        return null;
      }
    },
    enabled: isSuperAdmin, // Only run query if user is super admin
  });

  // Update settings mutation
  const update设置Mutation = useMutation({
    mutationFn: async (updated设置: General设置): Promise<General设置> => {
     // console.log('Updating settings:', updated设置);
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'update设置',
          data: updated设置
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.message || 'Failed to update settings');
      }
      
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['general设置'] });
      toast({
        title: t("settingsUpdated", "settings"),
        description: "",
        variant: "default",
      });
    },
    onError: (error) => {
    //  console.error('Error updating settings:', error);
      toast({
        title: t("errorSaving设置", "settings"),
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  });

  // Test email connection
  const test邮箱ConnectionMutation = useMutation({
    mutationFn: async (smtpConfig: any): Promise<{success: boolean, message: string}> => {
     // console.log('Testing email connection:', smtpConfig);
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'test邮箱Connection',
          data: smtpConfig
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return {
        success: result.success,
        message: result.message || ''
      };
    },
    onSuccess: (result) => {
      toast({
        title: result.success ? t("connectionSuccess", "settings") : t("connectionFailed", "settings"),
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    },
    onError: (error) => {
     // console.error('Error testing connection:', error);
      toast({
        title: t("connectionFailed", "settings"),
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  });

  return {
    settings,
    isLoading,
    error,
    refetch,
    update设置: update设置Mutation.mutate,
    isUpdating: update设置Mutation.isPending,
    test邮箱Connection: test邮箱ConnectionMutation.mutate,
    isTestingConnection: test邮箱ConnectionMutation.isPending,
    system名称: settings?.system_name || settings?.meta?.app名称 || 'CheckCle',
  };
}