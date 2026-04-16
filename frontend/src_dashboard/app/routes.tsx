import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Quizzes } from "./pages/Quizzes";
import { PerfectPitchQuiz } from "./pages/PerfectPitchQuiz";
import { NotationQuiz } from "./pages/NotationQuiz";
import { IntervalQuiz } from "./pages/IntervalQuiz";
import { SingQuiz } from "./pages/SingQuiz";
import { Leaderboard } from "./pages/Leaderboard";
import { Friends } from "./pages/Friends";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/quizzes",
    Component: Quizzes,
  },
  {
    path: "/quiz/perfect-pitch",
    Component: PerfectPitchQuiz,
  },
  {
    path: "/quiz/notation",
    Component: NotationQuiz,
  },
  {
    path: "/quiz/interval",
    Component: IntervalQuiz,
  },
  {
    path: "/quiz/sing",
    Component: SingQuiz,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
  },
  {
    path: "/friends",
    Component: Friends,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);