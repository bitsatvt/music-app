import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Music, Volume2, RotateCcw, Home, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const INTERVALS = [
  'Unison',
  'Minor 2nd',
  'Major 2nd',
  'Minor 3rd',
  'Major 3rd',
  'Perfect 4th',
  'Tritone',
  'Perfect 5th',
  'Minor 6th',
  'Major 6th',
  'Minor 7th',
  'Major 7th',
  'Octave',
];

export function IntervalQuiz() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctInterval, setCorrectInterval] = useState('');
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [availableIntervals, setAvailableIntervals] = useState<string[]>([]);

  const totalQuestions = 10;

  const startQuiz = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    
    let intervals: string[] = [];
    if (diff === 'easy') {
      intervals = ['Unison', 'Perfect 4th', 'Perfect 5th', 'Octave'];
    } else if (diff === 'medium') {
      intervals = ['Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Octave'];
    } else {
      intervals = INTERVALS;
    }
    
    setAvailableIntervals(intervals);
    generateQuestion(intervals);
  };

  const generateQuestion = (intervals: string[]) => {
    const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];
    setCorrectInterval(randomInterval);
    setSelectedInterval(null);
    setAnswered(false);
  };

  const playInterval = () => {
    toast.info('🎵 Playing interval... (Audio simulation)');
  };

  const handleIntervalSelection = (interval: string) => {
    if (answered) return;

    setSelectedInterval(interval);
    setAnswered(true);

    if (interval === correctInterval) {
      setScore(score + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error(`Incorrect. The interval was ${correctInterval}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      generateQuestion(availableIntervals);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setDifficulty(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
  };

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Navigation />
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Music className="size-6 text-green-600" />
                <CardTitle>Interval Recognition Quiz</CardTitle>
              </div>
              <CardDescription>
                Identify the distance between two notes. Essential for developing your ear training skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select a difficulty level to begin:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('easy')}
                  >
                    <span>Easy</span>
                    <span className="text-xs text-muted-foreground">
                      Perfect intervals only
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('medium')}
                  >
                    <span>Medium</span>
                    <span className="text-xs text-muted-foreground">
                      Major & minor intervals
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('hard')}
                  >
                    <span>Hard</span>
                    <span className="text-xs text-muted-foreground">
                      All chromatic intervals
                    </span>
                  </Button>
                </div>

                <div className="pt-4">
                  <Button variant="ghost" asChild>
                    <Link to="/">
                      <Home className="size-4 mr-2" />
                      Back to Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Navigation />
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="size-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete! 🎉</CardTitle>
              <CardDescription>Here are your results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-6xl mb-2">{percentage}%</p>
                  <p className="text-muted-foreground">
                    {score} out of {totalQuestions} correct
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={restartQuiz} className="flex-1">
                    <RotateCcw className="size-4 mr-2" />
                    Try Again
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/">
                      <Home className="size-4 mr-2" />
                      Back to Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Music className="size-6 text-green-600" />
                <CardTitle>Interval Recognition Quiz</CardTitle>
              </div>
              <Badge>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Question {currentQuestion + 1} of {totalQuestions}</span>
                  <span className="text-sm">Score: {score}/{currentQuestion + (answered ? 1 : 0)}</span>
                </div>
                <Progress value={progressPercentage} />
              </div>

              {/* Play Interval Button */}
              <div className="text-center py-8">
                <Button
                  size="lg"
                  onClick={playInterval}
                  className="h-32 w-32 rounded-full"
                >
                  <Volume2 className="size-12" />
                </Button>
                <p className="mt-4 text-muted-foreground">
                  Click to play the interval
                </p>
              </div>

              {/* Interval Selection */}
              <div>
                <p className="text-center mb-4">What interval is playing?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableIntervals.map((interval) => {
                    const isSelected = selectedInterval === interval;
                    const isCorrect = answered && interval === correctInterval;
                    const isWrong = answered && isSelected && interval !== correctInterval;

                    return (
                      <Button
                        key={interval}
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => handleIntervalSelection(interval)}
                        disabled={answered}
                        className={`h-14 text-sm ${
                          isCorrect
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : isWrong
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : ''
                        }`}
                      >
                        {interval}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              {answered && (
                <Button onClick={nextQuestion} className="w-full">
                  {currentQuestion + 1 < totalQuestions ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
