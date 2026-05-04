
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle, CheckCircle, Gauge, 搜索, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateIncident状态 } from '@/services/incident/incidentOperations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Incident状态Badge } from './Incident状态Badge';

interface Incident状态DropdownProps {
  status: string;
  id: string;
  on状态Updated: () => void;
  disabled?: boolean;
}

export const Incident状态Dropdown = ({
  status,
  id,
  on状态Updated,
  disabled = false
}: Incident状态DropdownProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [local状态, setLocal状态] = React.useState(status);

  // Update local status when prop changes
  React.useEffect(() => {
    setLocal状态(status);
  }, [status]);

  const statusOptions = [
    { value: 'investigating', label: t('investigating'), icon: <搜索 class名称="h-4 w-4 mr-2" /> },
    { value: 'identified', label: t('identified'), icon: <AlertCircle class名称="h-4 w-4 mr-2" /> },
    { value: 'found_root_cause', label: t('foundRootCause'), icon: <AlertCircle class名称="h-4 w-4 mr-2" /> },
    { value: 'in_progress', label: t('inProgress'), icon: <Wrench class名称="h-4 w-4 mr-2" /> },
    { value: 'monitoring', label: t('monitoring'), icon: <Gauge class名称="h-4 w-4 mr-2" /> },
    { value: 'resolved', label: t('resolved'), icon: <CheckCircle class名称="h-4 w-4 mr-2" /> },
  ];

  const handle状态Change = async (new状态: string) => {
    try {
      // Don't update if the status is the same
      if (local状态 === new状态) {
        return;
      }
      
      console.log(`Changing incident status from ${local状态} to ${new状态}`);
      
      // Optimistically update the UI immediately
      setLocal状态(new状态);
      
      // Make the API call in the background
      await updateIncident状态(id, new状态);
      
      toast({
        title: t('statusUpdated'),
        description: t('incident状态Updated'),
      });
      
      // Notify parent components about the status change
      on状态Updated();
      console.log('状态 update complete, UI refresh triggered');
    } catch (error) {
      console.error('Error updating incident status:', error);
      
      // Revert to the original status on error
      setLocal状态(status);
      
      toast({
        title: t('error'),
        description: t('failedToUpdate状态'),
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} class名称="w-full cursor-pointer">
        <Incident状态Badge status={local状态} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" class名称="bg-background border border-border shadow-md z-50">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            class名称="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling to table row click
              handle状态Change(option.value);
            }}
          >
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
