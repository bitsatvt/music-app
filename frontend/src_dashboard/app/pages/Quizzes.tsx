import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Headphones, 
  FileMusic, 
  Music, 
  Mic,
  BarChart3,
  Clock,
  Trophy,
  Target
} from 'lucide-react';
import { Link } from 'react-router';
import { quizHistory } from '../lib/mockData';

export function Quizzes() {
  const quizStats = {
    'Perfect Pitch': {
      icon: Headphones,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1620360642994-974f7fd8e9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmZWN0JTIwcGl0Y2glMjBsaXN0ZW5pbmclMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc3NTc1NzMzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Listen to notes and identify them by ear. Develop your perfect pitch skills.',
      progress: 67,
      totalQuizzes: 89,
      averageScore: 87.2,
      bestScore: 98,
      avgResponseTime: 1.5,
      path: '/quiz/perfect-pitch',
      popular: true,
    },
    'Notation Reading': {
      icon: FileMusic,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1775043731291-3b0a6cd009ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwbm90YXRpb24lMjBzaGVldHxlbnwxfHx8fDE3NzU3NTczMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Read sheet music and identify notes. Perfect for improving sight-reading.',
      progress: 82,
      totalQuizzes: 72,
      averageScore: 91.3,
      bestScore: 100,
      avgResponseTime: 1.1,
      path: '/quiz/notation',
      popular: false,
    },
    'Interval Recognition': {
      icon: Music,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1774384925770-c060e65295f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMG5vdGVzJTIwcHVycGxlJTIwZ3JhZGllbnR8ZW58MXx8fHwxNzc1NzU3MzI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Identify the distance between two notes. Essential for ear training.',
      progress: 54,
      totalQuizzes: 54,
      averageScore: 82.5,
      bestScore: 94,
      avgResponseTime: 2.2,
      path: '/quiz/interval',
      popular: false,
    },
    'Sing Note': {
      icon: Mic,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5naW5nJTIwbWljcm9waG9uZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzU3NTczMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Sing the prompted note accurately. Train your vocal pitch accuracy.',
      progress: 41,
      totalQuizzes: 32,
      averageScore: 75.8,
      bestScore: 89,
      avgResponseTime: 2.8,
      path: '/quiz/sing',
      popular: false,
    },
  };

  const recentQuizzes = quizHistory.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Quiz Library 🎵</h1>
          <p className="text-muted-foreground">
            Practice different aspects of music theory and ear training
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
            <TabsTrigger value="stats">My Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(quizStats).map(([name, quiz]) => {
                const Icon = quiz.icon;
                return (
                  <Card key={name} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-48 bg-gradient-to-br ${quiz.gradient} relative overflow-hidden`}>
                      <img 
                        src={quiz.image}
                        alt={name}
                        className="w-full h-full object-cover opacity-60"
                      />
                      {quiz.popular && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500 text-black">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Icon className={`size-5 text-${quiz.color}-600`} />
                        <CardTitle>{name}</CardTitle>
                      </div>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 text-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-xl font-semibold">{quiz.totalQuizzes}</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                          <div>
                            <p className="text-xl font-semibold">{quiz.averageScore}%</p>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                          </div>
                          <div>
                            <p className="text-xl font-semibold">{quiz.bestScore}%</p>
                            <p className="text-xs text-muted-foreground">Best</p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Your Progress</span>
                            <span className="text-sm font-medium">{quiz.progress}%</span>
                          </div>
                          <Progress value={quiz.progress} />
                        </div>

                        {/* Action Button */}
                        <Button asChild className="w-full">
                          <Link to={quiz.path}>Start Quiz</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Completed</p>
                      <p className="text-2xl mt-1">247</p>
                    </div>
                    <Target className="size-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Avg</p>
                      <p className="text-2xl mt-1">87.5%</p>
                    </div>
                    <BarChart3 className="size-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Best Score</p>
                      <p className="text-2xl mt-1">100%</p>
                    </div>
                    <Trophy className="size-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Time</p>
                      <p className="text-2xl mt-1">1.8s</p>
                    </div>
                    <Clock className="size-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Type Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Quiz Type</CardTitle>
                <CardDescription>Your stats across different quiz categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(quizStats).map(([name, quiz]) => {
                    const Icon = quiz.icon;
                    return (
                      <div key={name}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Icon className={`size-5 text-${quiz.color}-600`} />
                            <div>
                              <p className="font-medium">{name}</p>
                              <p className="text-sm text-muted-foreground">
                                {quiz.totalQuizzes} completed • Best: {quiz.bestScore}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">{quiz.averageScore}%</p>
                            <p className="text-xs text-muted-foreground">{quiz.avgResponseTime}s avg</p>
                          </div>
                        </div>
                        <Progress value={quiz.averageScore} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Quiz History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="size-5" />
                  Recent Quiz History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{quiz.type}</p>
                        <div className="flex items-center gap-2 mt-1">
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
        </Tabs>
      </main>
    </div>
  );
}
