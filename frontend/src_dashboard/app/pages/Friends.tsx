import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Users, UserPlus, Search, UserMinus, Check, X } from 'lucide-react';
import { friendsList, friendRequests } from '../lib/mockData';
import { toast } from 'sonner';

export function Friends() {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState(friendsList);
  const [requests, setRequests] = useState(friendRequests);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = (id: string, name: string) => {
    setRequests(requests.filter(r => r.id !== id));
    toast.success(`You are now friends with ${name}!`);
  };

  const handleRejectRequest = (id: string, name: string) => {
    setRequests(requests.filter(r => r.id !== id));
    toast.info(`Friend request from ${name} rejected`);
  };

  const handleRemoveFriend = (id: string, name: string) => {
    setFriends(friends.filter(f => f.id !== id));
    toast.info(`Removed ${name} from friends`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Friends 👥</h1>
          <p className="text-muted-foreground">
            Connect with other musicians and compete on the leaderboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Friend Requests */}
          {requests.length > 0 && (
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="size-5" />
                    Friend Requests
                    <Badge variant="secondary">{requests.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {request.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.mutualFriends} mutual friends
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id, request.name)}
                          >
                            <Check className="size-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectRequest(request.id, request.name)}
                          >
                            <X className="size-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Friends List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" />
                  My Friends
                  <Badge variant="secondary">{friends.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Your music learning companions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search friends..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {friend.status === 'online' && (
                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">
                              Level {friend.level}
                            </p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">
                              {friend.lastActive}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {friend.totalScore.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">score</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveFriend(friend.id, friend.name)}
                        >
                          <UserMinus className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredFriends.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="size-12 mx-auto mb-2 opacity-50" />
                      <p>No friends found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Friends */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="size-5" />
                  Add Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input placeholder="Search by username..." />
                    <Button className="w-full mt-2">
                      <Search className="size-4 mr-2" />
                      Search
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">
                      Suggested Friends
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-500 text-white text-xs">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Jane Doe</p>
                            <p className="text-xs text-muted-foreground">Level 9</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <UserPlus className="size-3" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs">
                              BC
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Bob Clark</p>
                            <p className="text-xs text-muted-foreground">Level 11</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <UserPlus className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
