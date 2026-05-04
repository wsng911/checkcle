import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ class名称, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    class名称={cn("mx-auto flex w-full justify-center", class名称)}
    {...props}
  />
)
Pagination.display名称 = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ class名称, ...props }, ref) => (
  <ul
    ref={ref}
    class名称={cn("flex flex-row items-center gap-1", class名称)}
    {...props}
  />
))
PaginationContent.display名称 = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ class名称, ...props }, ref) => (
  <li ref={ref} class名称={cn("", class名称)} {...props} />
))
PaginationItem.display名称 = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  class名称,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    class名称={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      class名称
    )}
    {...props}
  />
)
PaginationLink.display名称 = "PaginationLink"

const PaginationPrevious = ({
  class名称,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    class名称={cn("gap-1 pl-2.5", class名称)}
    {...props}
  >
    <ChevronLeft class名称="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.display名称 = "PaginationPrevious"

const PaginationNext = ({
  class名称,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    class名称={cn("gap-1 pr-2.5", class名称)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight class名称="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.display名称 = "PaginationNext"

const PaginationEllipsis = ({
  class名称,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    class名称={cn("flex h-9 w-9 items-center justify-center", class名称)}
    {...props}
  >
    <MoreHorizontal class名称="h-4 w-4" />
    <span class名称="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.display名称 = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
