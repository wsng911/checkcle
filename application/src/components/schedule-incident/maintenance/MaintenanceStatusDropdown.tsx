
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarClock, Clock, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { maintenanceService } from '@/services/maintenance';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Maintenance状态Badge } from './Maintenance状态Badge';

interface Maintenance状态DropdownProps {
  status: string;
  id: string;
  on状态Updated: () => void;
  disabled?: boolean;
}

export const Maintenance状态Dropdown = ({
  status,
  id,
  on状态Updated,
  disabled = false
}: Maintenance状态DropdownProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const statusOptions = [
    { value: 'scheduled', label: t('scheduled'), icon: <CalendarClock class名称="h-4 w-4 mr-2" /> },
    { value: 'in_progress', label: t('inProgress'), icon: <Clock class名称="h-4 w-4 mr-2" /> },
    { value: 'completed', label: t('completed'), icon: <CheckCircle class名称="h-4 w-4 mr-2" /> },
    { value: 'cancelled', label: t('cancelled'), icon: <X class名称="h-4 w-4 mr-2" /> },
  ];

  const handle状态Change = async (new状态: string) => {
    // Don't update if the status is the same
    if (status.toLowerCase() === new状态) return;
    
    try {
      await maintenanceService.updateMaintenance状态(id, new状态);
      
      toast({
        title: t('statusUpdated'),
        description: t('maintenance状态Updated'),
      });
      
      on状态Updated();
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      
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
        <Maintenance状态Badge status={status} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" class名称="bg-popover border border-border shadow-md">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            class名称="flex items-center cursor-pointer"
            onClick={() => handle状态Change(option.value)}
          >
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

