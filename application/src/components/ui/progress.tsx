
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClass名称?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ class名称, indicatorClass名称, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    class名称={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      class名称
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      class名称={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClass名称)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.display名称 = ProgressPrimitive.Root.display名称

export { Progress }
