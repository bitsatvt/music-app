import type { ReactNode } from "react"

import { DashboardNavigation } from "@/components/pages/DashboardPage/navigation"
import { ModeToggle } from "@/components/shared/ModeToggle"

export default function QuizzesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="from-background via-background to-muted/40 min-h-screen bg-gradient-to-br">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <DashboardNavigation />
        <div className="flex min-h-screen flex-1 flex-col">{children}</div>
      </div>
      <ModeToggle />
    </div>
  )
}
