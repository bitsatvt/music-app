import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  Music, 
  Headphones, 
  FileMusic, 
  Mic, 
  TrendingUp, 
  Award,
  Target,
  Clock,
  Users,
  Trophy,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router';
import { currentUser, quizHistory, friendsList, leaderboardData } from '../lib/mockData';

export function Dashboard() {
  const recentQuizzes = quizHistory.slice(0, 3);
  const topFriends = friendsList.filter(f => f.status === 'online').slice(0, 3);
  const userRank = leaderboardData.findIndex(u => u.isCurrentUser) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl mb-2">Welcome back, {currentUser.name}! 👋</h1>
              <p className="text-muted-foreground">
                Ready to practice and improve your musical skills?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="font-semibold">{currentUser.level}</p>
              </div>
              <Avatar className="size-12">
                <AvatarFallback className="bg-purple-600 text-white">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl mt-1">{currentUser.totalQuizzes}</p>
                </div>
                <Target className="size-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl mt-1">{currentUser.averageScore}%</p>
                </div>
                <TrendingUp className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                  <p className="text-2xl mt-1">{currentUser.bestStreak}</p>
                </div>
                <Zap className="size-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Leaderboard</p>
                  <p className="text-2xl mt-1">#{userRank}</p>
                </div>
                <Trophy className="size-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Games Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Featured Quizzes</h2>
            <Button asChild variant="ghost">
              <Link to="/quizzes">
                View All
                <ChevronRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Perfect Pitch Quiz */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1620360642994-974f7fd8e9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmZWN0JTIwcGl0Y2glMjBsaXN0ZW5pbmclMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc3NTc1NzMzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Perfect Pitch"
                  className="w-full h-full object-cover opacity-60"
                />
                <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                  Most Popular
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Headphones className="size-5 text-purple-600" />
                    <CardTitle>Perfect Pitch Practice</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Listen to notes and identify them by ear. Develop your perfect pitch skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Your Progress</span>
                  <span className="text-sm">67%</span>
                </div>
                <Progress value={67} className="mb-4" />
                <Button asChild className="w-full">
                  <Link to="/quiz/perfect-pitch">Start Quiz</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notation Reading Quiz */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-600 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1775043731291-3b0a6cd009ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwbm90YXRpb24lMjBzaGVldHxlbnwxfHx8fDE3NzU3NTczMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Music Notation"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileMusic className="size-5 text-blue-600" />
                  <CardTitle>Notation Reading</CardTitle>
                </div>
                <CardDescription>
                  Read sheet music and identify notes. Perfect for improving sight-reading.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Your Progress</span>
                  <span className="text-sm">82%</span>
                </div>
                <Progress value={82} className="mb-4" />
                <Button asChild variant="outline" className="w-full">
                  <Link to="/quiz/notation">Start Quiz</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Friends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5" />
                  Recent Activity
                </CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/profile">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="font-medium">{quiz.type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {quiz.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(quiz.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{quiz.score}%</p>
                      <p className="text-xs text-muted-foreground">{quiz.responseTime}s avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Online Friends */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" />
                  Friends Online
                </CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/friends">
                    View All
                    <ChevronRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">Level {friend.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{friend.totalScore.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">total score</p>
                    </div>
                  </div>
                ))}
                {topFriends.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="size-12 mx-auto mb-2 opacity-50" />
                    <p>No friends online</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}