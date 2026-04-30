"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value = 0,
  ...props
}: React.ComponentProps<"div"> & {
  value?: number
}) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div
      data-slot="progress"
      className={cn("bg-primary/15 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="bg-primary h-full rounded-full transition-all"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}

export { Progress }
