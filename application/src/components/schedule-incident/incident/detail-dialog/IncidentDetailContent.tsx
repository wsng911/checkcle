
import React from 'react';
import { IncidentItem } from '@/services/incident/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IncidentDetailHeader } from './IncidentDetailHeader';
import { Separator } from '@/components/ui/separator';
import { 
  BasicInfoSection, 
  TimelineSection, 
  AffectedSystemsSection,
  ResolutionSection
} from './sections';
import { IncidentDetailFooter } from './IncidentDetailFooter';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

interface IncidentDetailContentProps {
  incident: IncidentItem;
  on关闭: () => void;
  assignedUser: any | null;
}

export const IncidentDetailContent = ({ 
  incident, 
  on关闭, 
  assignedUser 
}: IncidentDetailContentProps) => {
  // Fetch assigned user details if none was provided; prefer server field
  const assigneeId = incident?.assigned_users || incident?.assigned_to;
  const { data: fetchedUser } = useQuery({
    queryKey: ['user', assigneeId],
    queryFn: async () => {
      if (!assigneeId) return null;
      try {
        return await userService.getUser(assigneeId);
      } catch (error) {
        console.error("Failed to fetch assigned user:", error);
        return null;
      }
    },
    enabled: !!assigneeId && !assignedUser,
    staleTime: 300000 // Cache for 5 minutes
  });

  // Use the provided assignedUser or the one we fetched
  const userToDisplay = assignedUser || fetchedUser;

  return (
    <ScrollArea class名称="h-[80vh] print:h-auto print:overflow-visible">
      <div class名称="px-6 py-6">
        <div class名称="print-section header-print">
          <IncidentDetailHeader incident={incident} />
        </div>

        <div class名称="space-y-8 print-compact-spacing">
          <div class名称="print-section">
            <BasicInfoSection incident={incident} assignedUser={userToDisplay} />
          </div>
          <Separator class名称="print:border-blue-200" />
          <div class名称="print-section">
            <TimelineSection incident={incident} assignedUser={userToDisplay} />
          </div>
          <Separator class名称="print:border-blue-200" />
          <div class名称="print-section">
            <AffectedSystemsSection incident={incident} assignedUser={userToDisplay} />
          </div>
          <Separator class名称="print:border-blue-200" />
          <div class名称="print-section">
            <ResolutionSection incident={incident} assignedUser={userToDisplay} />
          </div>

          <IncidentDetailFooter on关闭={on关闭} incident={incident} />
        </div>
      </div>
    </ScrollArea>
  );
};
