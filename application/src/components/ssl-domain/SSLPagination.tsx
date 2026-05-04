
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SSLPageSize } from "@/hooks/useSSLPagination";
import { useLanguage } from "@/contexts/LanguageContext";

interface SSLPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: SSLPageSize;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: SSLPageSize) => void;
}

export function SSLPagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: SSLPaginationProps) {
  const { t } = useLanguage();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we don't have enough pages at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div class名称="flex items-center justify-between py-4 px-4 border-t border-border">
      <div class名称="flex items-center space-x-2">
        <span class名称="text-sm text-muted-foreground">
          {t("rowsPerPage") || "Rows per page"}:
        </span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(parseInt(value) as SSLPageSize)}
        >
          <SelectTrigger class名称="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span class名称="text-sm text-muted-foreground">
          {totalItems > 0 
            ? `${startItem}-${endItem} of ${totalItems} ${t("certificates") || "certificates"}`
            : `0 ${t("certificates") || "certificates"}`
          }
        </span>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                class名称={
                  currentPage === 1 
                    ? "pointer-events-none opacity-50" 
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            
            {getPageNumbers().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page)}
                  class名称="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                class名称={
                  currentPage === totalPages 
                    ? "pointer-events-none opacity-50" 
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}