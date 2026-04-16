import { Link, useLocation } from 'react-router';
import { Home, Trophy, Users, User, Music, FileMusic, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/quizzes', icon: FileMusic, label: 'Quizzes' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/friends', icon: Users, label: 'Friends' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Music className="size-6 text-purple-600" />
            <span className="font-semibold text-xl">musiq</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                >
                  <Link to={item.path} className="gap-2">
                    <Icon className="size-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}