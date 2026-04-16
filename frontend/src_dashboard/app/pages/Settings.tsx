import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { 
  User, 
  Bell, 
  Volume2, 
  Palette,
  Shield,
  LogOut,
  Save
} from 'lucide-react';
import { currentUser } from '../lib/mockData';
import { toast } from 'sonner';

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    friendRequests: true,
    quizReminders: true,
    leaderboardUpdates: false,
  });

  const [audioSettings, setAudioSettings] = useState({
    volume: 80,
    playbackSpeed: 'normal',
    autoplay: true,
  });

  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: '',
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const handleSaveAudio = () => {
    toast.success('Audio settings saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Settings ⚙️</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your profile details and public information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="size-20">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Tell others about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile (optional)
                  </p>
                </div>

                {/* Level & Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-semibold">{currentUser.level}</p>
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">{currentUser.totalQuizzes}</p>
                    <p className="text-xs text-muted-foreground">Quizzes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold">{currentUser.averageScore}%</p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="w-full">
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="size-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, push: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Friend Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone sends you a friend request
                    </p>
                  </div>
                  <Switch
                    checked={notifications.friendRequests}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, friendRequests: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quiz Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Remind me to practice daily
                    </p>
                  </div>
                  <Switch
                    checked={notifications.quizReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, quizReminders: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Leaderboard Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about your rank changes
                    </p>
                  </div>
                  <Switch
                    checked={notifications.leaderboardUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, leaderboardUpdates: checked })
                    }
                  />
                </div>

                <Button onClick={handleSaveNotifications} className="w-full">
                  <Save className="size-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="size-5" />
                  Audio Settings
                </CardTitle>
                <CardDescription>
                  Configure audio playback for quizzes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume: {audioSettings.volume}%</Label>
                  <input
                    id="volume"
                    type="range"
                    min="0"
                    max="100"
                    value={audioSettings.volume}
                    onChange={(e) =>
                      setAudioSettings({ ...audioSettings, volume: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="playback">Playback Speed</Label>
                  <Select
                    value={audioSettings.playbackSpeed}
                    onValueChange={(value) =>
                      setAudioSettings({ ...audioSettings, playbackSpeed: value })
                    }
                  >
                    <SelectTrigger id="playback">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow (0.75x)</SelectItem>
                      <SelectItem value="normal">Normal (1.0x)</SelectItem>
                      <SelectItem value="fast">Fast (1.25x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-play Notes</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically play notes when quiz starts
                    </p>
                  </div>
                  <Switch
                    checked={audioSettings.autoplay}
                    onCheckedChange={(checked) =>
                      setAudioSettings({ ...audioSettings, autoplay: checked })
                    }
                  />
                </div>

                <Button onClick={handleSaveAudio} className="w-full">
                  <Save className="size-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="size-5" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="size-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize how musiq looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger id="theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible account actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="size-4 mr-2" />
                    Log Out
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
