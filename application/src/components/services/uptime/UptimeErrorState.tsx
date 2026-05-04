
import React from 'react';
import { X, RefreshCcw } from 'lucide-react';

interface UptimeErrorStateProps {
  uptime: number;
  onRetry: () => void;
}

export const UptimeErrorState = ({ uptime, onRetry }: UptimeErrorStateProps) => {
  return (
    <div class名称="flex flex-col w-full gap-1">
      <div class名称="flex items-center space-x-0.5 w-full h-6">
        {Array(20).fill(0).map((_, index) => (
          <div 
            key={`error-${index}`}
            class名称={`h-5 w-1.5 rounded-sm bg-gray-700 opacity-40`}
          />
        ))}
      </div>
      <div class名称="flex items-center justify-between text-xs">
        <span class名称="text-muted-foreground">{Math.round(uptime)}% uptime</span>
        <button 
          onClick={onRetry} 
          class名称="text-xs text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors"
        >
          <X class名称="h-3 w-3" /> Connection error 
          <RefreshCcw class名称="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};