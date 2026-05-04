
interface NetworkTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const NetworkTooltipContent = ({ active, payload, label }: NetworkTooltipContentProps) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload;

  return (
    <div class名称="bg-popover/95 border border-border backdrop-blur-sm rounded-lg p-3 shadow-lg">
      <p class名称="font-medium text-popover-foreground mb-2">{label}</p>
      {data?.fullTimestamp && (
        <p class名称="text-xs text-muted-foreground mb-2">
          {new Date(data.fullTimestamp).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </p>
      )}
      {payload.map((entry: any, index: number) => (
        <div key={index} class名称="flex items-center gap-2 mb-1">
          <div 
            class名称="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span class名称="text-sm font-medium">
            {entry.name}: {entry.dataKey.includes('Speed') ? `${entry.value} KB/s` : entry.value}
          </span>
        </div>
      ))}
      {data && (
        <div class名称="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
          <div>Total RX: {data.networkRx}</div>
          <div>Total TX: {data.networkTx}</div>
        </div>
      )}
    </div>
  );
};