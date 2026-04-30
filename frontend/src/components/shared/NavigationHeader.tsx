"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { FileText, Home, Music, Settings, Trophy, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NavigationHeader() {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const isDarkMode = resolvedTheme === "dark"

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
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`} disabled>
            <Users className="size-4" />
            Friends
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
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`} disabled>
            <Settings className="size-4" />
            Settings
          </Button>
        </nav>
      </div>
    </header>
  );
}
