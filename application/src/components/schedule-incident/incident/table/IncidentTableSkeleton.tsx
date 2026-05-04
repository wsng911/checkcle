
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const IncidentTableRowSkeleton = () => (
  <TableRow>
    <TableCell><Skeleton class名称="h-5 w-[180px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[100px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[80px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[120px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[150px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[80px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[100px]" /></TableCell>
    <TableCell><Skeleton class名称="h-5 w-[60px]" /></TableCell>
  </TableRow>
);

export const IncidentTableSkeleton = () => (
  <div class名称="overflow-x-auto">
    <TableRow>
      {Array(3).fill(0).map((_, index) => (
        <IncidentTableRowSkeleton key={`skeleton-${index}`} />
      ))}
    </TableRow>
  </div>
);
