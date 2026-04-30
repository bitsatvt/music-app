import type { ReactNode } from "react"

import { NavigationHeader } from "@/components/shared/NavigationHeader"
import { ModeToggle } from "@/components/shared/ModeToggle"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="from-background via-background to-muted/40 min-h-screen bg-gradient-to-br">
      <NavigationHeader />
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <div className="flex min-h-screen flex-1 flex-col">{children}</div>
      </div>
      <ModeToggle />
    </div>
  )
}
