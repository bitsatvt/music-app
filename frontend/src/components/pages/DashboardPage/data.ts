export type DashboardUserSummary = {
  id: string
  name: string
  email: string
  level: number
  totalQuizzes: number
  averageScore: number
  bestStreak: number
}

export type DashboardQuizHistoryItem = {
  id: string
  type: string
  score: number
  difficulty: string
  date: string
  responseTime: number
}

export type DashboardFriend = {
  id: string
  name: string
  status: "online" | "offline"
  totalScore: number
  level: number
}

export type DashboardLeaderboardEntry = {
  id: string
  name: string
  score: number
  quizzesTaken: number
  averageScore: number
  isCurrentUser: boolean
}

export type DashboardFeature = {
  id: string
  title: string
  description: string
  progress: number
  cta: string
  accent: string
  badge?: string
}

export const dashboardUser: DashboardUserSummary = {
  id: "1",
  name: "Alex Chen",
  email: "alex.chen@example.com",
  level: 12,
  totalQuizzes: 247,
  averageScore: 87.5,
  bestStreak: 23,
}

export const dashboardQuizHistory: DashboardQuizHistoryItem[] = [
  {
    id: "1",
    type: "Perfect Pitch",
    score: 92,
    difficulty: "Medium",
    date: "2026-04-09T10:30:00",
    responseTime: 1.2,
  },
  {
    id: "2",
    type: "Interval Recognition",
    score: 88,
    difficulty: "Hard",
    date: "2026-04-08T15:45:00",
    responseTime: 1.8,
  },
  {
    id: "3",
    type: "Notation Reading",
    score: 95,
    difficulty: "Easy",
    date: "2026-04-08T14:20:00",
    responseTime: 0.9,
  },
  {
    id: "4",
    type: "Sing Note",
    score: 78,
    difficulty: "Medium",
    date: "2026-04-06T16:30:00",
    responseTime: 2.5,
  },
]

export const dashboardFriends: DashboardFriend[] = [
  {
    id: "2",
    name: "Sarah Johnson",
    status: "online",
    totalScore: 24891,
    level: 15,
  },
  {
    id: "3",
    name: "Michael Torres",
    status: "offline",
    totalScore: 23456,
    level: 14,
  },
  {
    id: "5",
    name: "David Kim",
    status: "online",
    totalScore: 20984,
    level: 13,
  },
  {
    id: "7",
    name: "Ryan Patel",
    status: "online",
    totalScore: 18543,
    level: 11,
  },
]

export const dashboardLeaderboard: DashboardLeaderboardEntry[] = [
  {
    id: "2",
    name: "Sarah Johnson",
    score: 24891,
    quizzesTaken: 312,
    averageScore: 89.2,
    isCurrentUser: false,
  },
  {
    id: "3",
    name: "Michael Torres",
    score: 23456,
    quizzesTaken: 289,
    averageScore: 88.1,
    isCurrentUser: false,
  },
  {
    id: "1",
    name: "Alex Chen",
    score: 21637,
    quizzesTaken: 247,
    averageScore: 87.5,
    isCurrentUser: true,
  },
]

export const dashboardFeatures: DashboardFeature[] = [
  {
    id: "perfect-pitch",
    title: "Perfect Pitch Practice",
    description: "Listen closely, identify the note, and sharpen your ear with fast recognition drills.",
    progress: 67,
    cta: "Start practice",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    badge: "Most popular",
  },
  {
    id: "notation",
    title: "Notation Reading",
    description: "Read notes from the staff and build confidence with musical literacy and timing cues.",
    progress: 82,
    cta: "Continue lesson",
    accent: "from-sky-500 via-cyan-500 to-teal-500",
  },
]
