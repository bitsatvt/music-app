import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  User, 
  Award, 
  TrendingUp, 
  Calendar,
  Target,
  Clock,
  Zap
} from 'lucide-react';
import { currentUser, quizHistory } from '../lib/mockData';

export function Profile() {
  const quizTypeStats = {
    'Perfect Pitch': { total: 89, avgScore: 87.2, bestScore: 98 },
    'Notation Reading': { total: 72, avgScore: 91.3, bestScore: 100 },
    'Interval Recognition': { total: 54, avgScore: 82.5, bestScore: 94 },
    'Sing Note': { total: 32, avgScore: 75.8, bestScore: 89 },
  };

  const achievements = [
    { name: 'First Steps', description: 'Complete your first quiz', unlocked: true },
    { name: 'Perfect Score', description: 'Get 100% on a quiz', unlocked: true },
    { name: 'Hot Streak', description: 'Maintain a 10-day streak', unlocked: true },
    { name: 'Century Club', description: 'Complete 100 quizzes', unlocked: true },
    { name: 'Speed Demon', description: 'Average response time under 1s', unlocked: false },
    { name: 'Master Musician', description: 'Reach level 20', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="size-24">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl mb-2">{currentUser.name}</h1>
                <p className="text-muted-foreground mb-4">{currentUser.email}</p>
                
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge className="bg-purple-600">Level {currentUser.level}</Badge>
                  <Badge variant="outline">
                    <Calendar className="size-3 mr-1" />
                    Joined {new Date(currentUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl">{currentUser.totalQuizzes}</p>
                  <p className="text-xs text-muted-foreground">Quizzes</p>
                </div>
                <div>
                  <p className="text-2xl">{currentUser.averageScore}%</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
                <div>
                  <p className="text-2xl">{currentUser.bestStreak}</p>
                  <p className="text-xs text-muted-foreground">Best Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <p className="text-sm text-muted-foreground">Current Level</p>
                      <p className="text-2xl mt-1">{currentUser.level}</p>
                    </div>
                    <Award className="size-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Type Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(quizTypeStats).map(([type, stats]) => (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{type}</p>
                          <p className="text-sm text-muted-foreground">
                            {stats.total} quizzes • Best: {stats.bestScore}%
                          </p>
                        </div>
                        <p className="text-lg font-semibold">{stats.avgScore}%</p>
                      </div>
                      <Progress value={stats.avgScore} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5" />
                  Quiz History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizHistory.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{quiz.type}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {quiz.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(quiz.date).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{quiz.score}%</p>
                        <p className="text-xs text-muted-foreground">
                          {quiz.responseTime}s avg
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="size-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-500'
                          : 'bg-muted/30 border-muted-foreground/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            achievement.unlocked
                              ? 'bg-yellow-500 text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <Award className="size-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{achievement.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {achievement.description}
                          </p>
                          {achievement.unlocked && (
                            <Badge className="mt-2 bg-green-600">Unlocked</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
