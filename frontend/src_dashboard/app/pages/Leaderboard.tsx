import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { leaderboardData } from '../lib/mockData';

export function Leaderboard() {
  const [view, setView] = useState<'all' | 'friends'>('all');

  const displayData = view === 'friends' 
    ? leaderboardData.filter(u => u.isFriend || u.isCurrentUser)
    : leaderboardData;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="size-6 text-yellow-500" />;
      case 2:
        return <Medal className="size-6 text-gray-400" />;
      case 3:
        return <Award className="size-6 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Leaderboard 🏆</h1>
          <p className="text-muted-foreground">
            See how you rank against other musicians
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
            <CardDescription>
              Based on total quiz scores and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={view} onValueChange={(v) => setView(v as 'all' | 'friends')}>
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="friends">Friends Only</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2">
                {displayData.map((user, index) => {
                  const rank = leaderboardData.findIndex(u => u.id === user.id) + 1;
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        user.isCurrentUser 
                          ? 'bg-purple-100 border-2 border-purple-600' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="w-12 text-center">
                        {getRankIcon(rank) || (
                          <span className="font-semibold text-lg">#{rank}</span>
                        )}
                      </div>

                      <Avatar className="size-12">
                        <AvatarFallback className={
                          rank === 1 
                            ? 'bg-yellow-500 text-white' 
                            : rank === 2
                            ? 'bg-gray-400 text-white'
                            : rank === 3
                            ? 'bg-orange-600 text-white'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        }>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{user.name}</p>
                          {user.isCurrentUser && (
                            <Badge variant="secondary">You</Badge>
                          )}
                          {user.isFriend && !user.isCurrentUser && (
                            <Badge variant="outline">Friend</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.quizzesTaken} quizzes taken
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {user.score.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <TrendingUp className="size-3" />
                          {user.averageScore}% avg
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="friends" className="space-y-2">
                {displayData.map((user, index) => {
                  const rank = leaderboardData.findIndex(u => u.id === user.id) + 1;
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        user.isCurrentUser 
                          ? 'bg-purple-100 border-2 border-purple-600' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="w-12 text-center">
                        {getRankIcon(rank) || (
                          <span className="font-semibold text-lg">#{rank}</span>
                        )}
                      </div>

                      <Avatar className="size-12">
                        <AvatarFallback className={
                          rank === 1 
                            ? 'bg-yellow-500 text-white' 
                            : rank === 2
                            ? 'bg-gray-400 text-white'
                            : rank === 3
                            ? 'bg-orange-600 text-white'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        }>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{user.name}</p>
                          {user.isCurrentUser && (
                            <Badge variant="secondary">You</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.quizzesTaken} quizzes taken
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {user.score.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <TrendingUp className="size-3" />
                          {user.averageScore}% avg
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
