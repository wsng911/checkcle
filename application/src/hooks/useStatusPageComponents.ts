
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { statusPageComponentsService } from '@/services/statusPageComponentsService';
import { 状态PageComponentRecord } from '@/types/statusPageComponents.types';
import { toast } from '@/hooks/use-toast';

export const use状态PageComponents = () => {
  return useQuery({
    queryKey: ['status-page-components'],
    queryFn: statusPageComponentsService.get状态PageComponents,
    staleTime: 30000,
  });
};

export const use状态PageComponentsByOperationalId = (operational状态Id: string) => {
  return useQuery({
    queryKey: ['status-page-components', operational状态Id],
    queryFn: () => statusPageComponentsService.get状态PageComponentsByOperationalId(operational状态Id),
    enabled: !!operational状态Id,
    staleTime: 30000,
  });
};

export const use创建状态PageComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: statusPageComponentsService.create状态PageComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status-page-components'] });
      toast({
        title: 'Success',
        description: '状态 page component created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create status page component',
        variant: 'destructive',
      });
    },
  });
};

export const use删除状态PageComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: statusPageComponentsService.delete状态PageComponent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status-page-components'] });
      toast({
        title: 'Success',
        description: '状态 page component deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete status page component',
        variant: 'destructive',
      });
    },
  });
};