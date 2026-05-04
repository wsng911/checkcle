
import React from 'react';

export const UptimeLoadingState = () => {
  return (
    <div class名称="flex flex-col w-full gap-1">
      <div class名称="flex items-center space-x-0.5 w-full h-6">
        {Array(20).fill(0).map((_, index) => (
          <div 
            key={`skeleton-${index}`}
            class名称={`h-5 w-1.5 rounded-sm bg-muted animate-pulse`}
          />
        ))}
      </div>
      <div class名称="flex items-center justify-between text-xs">
        <span class名称="text-muted-foreground w-16 h-4 bg-muted animate-pulse rounded"></span>
        <span class名称="text-muted-foreground w-24 h-4 bg-muted animate-pulse rounded"></span>
      </div>
    </div>
  );
};