import { Home, Music, FileText, Trophy, Users, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationHeaderProps {
  isDarkMode: boolean;
}

export function NavigationHeader({ isDarkMode }: NavigationHeaderProps) {
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
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
            <Home className="size-4" />
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
            <FileText className="size-4" />
            Quizzes
          </Button>
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
            <Trophy className="size-4" />
            Leaderboard
          </Button>
          <Button size="sm" className={`gap-2 ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
            <Users className="size-4" />
            Friends
          </Button>
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
            <User className="size-4" />
            Profile
          </Button>
          <Button variant="ghost" size="sm" className={`gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
            <Settings className="size-4" />
            Settings
          </Button>
        </nav>
      </div>
    </header>
  );
}