
import React from "react";
import { AlertTriangle } from "lucide-react";

interface ServiceRowResponseTimeProps {
  responseTime: number;
}

export const ServiceRowResponseTime = ({ responseTime }: ServiceRowResponseTimeProps) => {
  // Determine if response time is high (≥ 1000ms)
  const isResponseTimeHigh = responseTime >= 1000;

  return (
    <div class名称="font-mono text-base flex items-center gap-1.5">
      {responseTime > 0 ? (
        <>
          <span class名称={isResponseTimeHigh ? "text-amber-500 font-semibold" : ""}>
            {responseTime}ms
          </span>
          {isResponseTimeHigh && (
            <AlertTriangle class名称="h-4 w-4 text-amber-500" />
          )}
        </>
      ) : 'N/A'}
    </div>
  );
};
