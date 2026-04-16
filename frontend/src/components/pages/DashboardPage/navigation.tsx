"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  FileMusic,
  Home,
  Music,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Dashboard",
    description: "Overview",
    enabled: true,
  },
  {
    href: "",
    icon: FileMusic,
    label: "Quizzes",
    description: "Coming soon",
    enabled: false,
  },
  {
    href: "",
    icon: Trophy,
    label: "Leaderboard",
    description: "Coming soon",
    enabled: false,
  },
  {
    href: "",
    icon: Users,
    label: "Friends",
    description: "Coming soon",
    enabled: false,
  },
  {
    href: "",
    icon: User,
    label: "Profile",
    description: "Coming soon",
    enabled: false,
  },
  {
    href: "",
    icon: Settings,
    label: "Settings",
    description: "Coming soon",
    enabled: false,
  },
]

export function DashboardNavigation() {
  const pathname = usePathname()

  return (
    <aside className="border-border/70 bg-card/95 sticky top-0 hidden h-screen w-72 shrink-0 border-r backdrop-blur xl:flex">
      <div className="flex w-full flex-col p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="from-primary to-chart-1 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br text-primary-foreground shadow-lg">
            <Music className="size-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">musiq</p>
            <p className="text-muted-foreground text-sm">Practice hub</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.enabled && pathname === item.href

            if (!item.enabled) {
              return (
                <div
                  key={item.label}
                  className="text-muted-foreground/80 flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 opacity-80"
                >
                  <div className="bg-muted flex size-10 items-center justify-center rounded-xl">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all",
                  isActive
                    ? "border-primary/15 bg-primary/8 text-foreground shadow-sm"
                    : "border-transparent hover:border-border/70 hover:bg-muted/60"
                )}
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-muted-foreground text-xs">{item.description}</p>
                </div>
                <ChevronRight
                  className={cn(
                    "size-4 transition-transform",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:translate-x-0.5"
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="from-primary/12 via-chart-1/8 to-transparent mt-auto rounded-3xl border p-5">
          <Badge variant="secondary" className="mb-3">
            First pass
          </Badge>
          <h2 className="mb-2 text-lg font-semibold">Dashboard shell ready</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            This sidebar is set up for future dashboard pages while keeping today&apos;s build focused on the overview screen.
          </p>
          <Button asChild className="w-full justify-between">
            <Link href="/dashboard">
              View overview
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}
