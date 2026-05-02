"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { FileText, Home, LogOut, Music, Settings, Trophy, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearAuthSession, useAuthUser } from "@/lib/auth"

export function NavigationHeader() {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const authUser = useAuthUser()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && resolvedTheme === "dark"

  function handleLogout() {
    clearAuthSession()
    router.push("/login")
  }

  return (
    <header className={`${isDarkMode ? 'bg-[#0f0f1e] border-gray-800' : 'bg-white border-gray-200'} border-b px-6 py-3`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Music className={`size-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>musiq</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Button
            asChild
            variant={pathname === "/dashboard" ? "default" : "ghost"}
            size="sm"
            className={`gap-2 ${
              pathname === "/dashboard"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Link href="/dashboard">
              <Home className="size-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/quizzes") ? "default" : "ghost"}
            size="sm"
            className={`gap-2 ${
              pathname.startsWith("/quizzes")
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Link href="/quizzes">
              <FileText className="size-4" />
              Quizzes
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`} disabled>
            <Trophy className="size-4" />
            Leaderboard
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/friends") ? "default" : "ghost"}
            size="sm"
            className={`gap-2 ${
              pathname.startsWith("/friends")
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Link href="/friends">
              <Users className="size-4" />
              Friends
            </Link>
          </Button>
          <Button
            asChild
            variant={pathname.startsWith("/profile") ? "default" : "ghost"}
            size="sm"
            className={`gap-2 ${
              pathname.startsWith("/profile")
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Link href="/profile">
              <User className="size-4" />
              Profile
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Settings className="size-4" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {authUser ? (
                <>
                  <DropdownMenuLabel className="max-w-56">
                    <p className="truncate font-medium">{authUser.username}</p>
                    <p className="text-muted-foreground truncate text-xs">{authUser.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              ) : null}
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
