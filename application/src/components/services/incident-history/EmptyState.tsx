
interface EmptyStateProps {
  statusFilter: string;
}

export function EmptyState({ statusFilter }: EmptyStateProps) {
  return (
    <div class名称="text-center py-8 text-muted-foreground">
      {statusFilter === "all"
        ? "No incidents recorded in selected time period"
        : `No ${
            statusFilter === "up" ? "uptime" : 
            statusFilter === "down" ? "downtime" : 
            statusFilter === "warning" ? "warning" : 
            "paused"
          } incidents recorded in selected time period`}
    </div>
  );
}
