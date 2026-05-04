
import { useState, useMemo } from 'react';
import { Service } from '@/types/service.types';

export type PageSize = 10 | 30 | 50;

interface Use服务PaginationProps {
  services: Service[];
  initialPageSize?: PageSize;
}

export const use服务Pagination = ({ 
  services, 
  initialPageSize = 10 
}: Use服务PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(initialPageSize);

  const { paginated服务, totalPages } = useMemo(() => {
    const totalItems = services.length;
    const pages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      paginated服务: services.slice(startIndex, endIndex),
      totalPages: Math.max(1, pages)
    };
  }, [services, currentPage, pageSize]);

  // Reset to first page when page size changes or services change
  const handlePageSizeChange = (newPageSize: PageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  // Reset to first page if current page exceeds total pages
  const handlePageChange = (page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };

  return {
    paginated服务,
    currentPage,
    totalPages,
    pageSize,
    totalItems: services.length,
    handlePageChange,
    handlePageSizeChange,
  };
};