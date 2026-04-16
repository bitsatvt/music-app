// Mock user data
export const currentUser = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatarUrl: '',
  level: 12,
  totalQuizzes: 247,
  averageScore: 87.5,
  bestStreak: 23,
  joinedDate: '2025-09-15',
};

// Mock quiz history
export const quizHistory = [
  {
    id: '1',
    type: 'Perfect Pitch',
    score: 92,
    difficulty: 'Medium',
    date: '2026-04-09T10:30:00',
    responseTime: 1.2,
  },
  {
    id: '2',
    type: 'Interval Recognition',
    score: 88,
    difficulty: 'Hard',
    date: '2026-04-08T15:45:00',
    responseTime: 1.8,
  },
  {
    id: '3',
    type: 'Notation Reading',
    score: 95,
    difficulty: 'Easy',
    date: '2026-04-08T14:20:00',
    responseTime: 0.9,
  },
  {
    id: '4',
    type: 'Perfect Pitch',
    score: 85,
    difficulty: 'Hard',
    date: '2026-04-07T09:15:00',
    responseTime: 2.1,
  },
  {
    id: '5',
    type: 'Sing Note',
    score: 78,
    difficulty: 'Medium',
    date: '2026-04-06T16:30:00',
    responseTime: 2.5,
  },
];

// Mock leaderboard data
export const leaderboardData = [
  {
    id: '1',
    name: 'Alex Chen',
    score: 21637,
    quizzesTaken: 247,
    averageScore: 87.5,
    isFriend: false,
    isCurrentUser: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    score: 24891,
    quizzesTaken: 312,
    averageScore: 89.2,
    isFriend: true,
    isCurrentUser: false,
  },
  {
    id: '3',
    name: 'Michael Torres',
    score: 23456,
    quizzesTaken: 289,
    averageScore: 88.1,
    isFriend: true,
    isCurrentUser: false,
  },
  {
    id: '4',
    name: 'Emily Zhang',
    score: 22103,
    quizzesTaken: 267,
    averageScore: 86.9,
    isFriend: false,
    isCurrentUser: false,
  },
  {
    id: '5',
    name: 'David Kim',
    score: 20984,
    quizzesTaken: 245,
    averageScore: 85.6,
    isFriend: true,
    isCurrentUser: false,
  },
  {
    id: '6',
    name: 'Jessica Martinez',
    score: 19876,
    quizzesTaken: 231,
    averageScore: 84.3,
    isFriend: false,
    isCurrentUser: false,
  },
  {
    id: '7',
    name: 'Ryan Patel',
    score: 18543,
    quizzesTaken: 218,
    averageScore: 83.1,
    isFriend: true,
    isCurrentUser: false,
  },
  {
    id: '8',
    name: 'Olivia Brown',
    score: 17234,
    quizzesTaken: 201,
    averageScore: 81.7,
    isFriend: false,
    isCurrentUser: false,
  },
];

// Mock friends data
export const friendsList = [
  {
    id: '2',
    name: 'Sarah Johnson',
    status: 'online',
    lastActive: 'now',
    totalScore: 24891,
    level: 15,
  },
  {
    id: '3',
    name: 'Michael Torres',
    status: 'offline',
    lastActive: '2 hours ago',
    totalScore: 23456,
    level: 14,
  },
  {
    id: '5',
    name: 'David Kim',
    status: 'online',
    lastActive: 'now',
    totalScore: 20984,
    level: 13,
  },
  {
    id: '7',
    name: 'Ryan Patel',
    status: 'offline',
    lastActive: '1 day ago',
    totalScore: 18543,
    level: 11,
  },
];

// Mock friend requests
export const friendRequests = [
  {
    id: '9',
    name: 'Sophie Anderson',
    mutualFriends: 3,
    requestDate: '2026-04-08',
  },
  {
    id: '10',
    name: 'Lucas Wright',
    mutualFriends: 1,
    requestDate: '2026-04-07',
  },
];
