import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Mic, Volume2, RotateCcw, Home, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export function SingQuiz() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [targetNote, setTargetNote] = useState('');
  const [recording, setRecording] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const totalQuestions = 10;

  const startQuiz = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    generateQuestion();
  };

  const generateQuestion = () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    setTargetNote(randomNote);
    setAnswered(false);
    setRecording(false);
  };

  const playTargetNote = () => {
    toast.info(`🎵 Playing ${targetNote}... (Audio simulation)`);
  };

  const startRecording = () => {
    setRecording(true);
    toast.info('🎤 Recording... (Microphone simulation)');
    
    // Simulate recording for 2 seconds
    setTimeout(() => {
      stopRecording();
    }, 2000);
  };

  const stopRecording = () => {
    setRecording(false);
    setAnswered(true);

    // Simulate pitch detection accuracy (random for demo)
    const simulatedAccuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
    setAccuracy(simulatedAccuracy);

    if (simulatedAccuracy >= 85) {
      setScore(score + 1);
      toast.success(`Perfect! ${simulatedAccuracy}% accuracy 🎉`);
    } else if (simulatedAccuracy >= 70) {
      toast.info(`Good attempt! ${simulatedAccuracy}% accuracy`);
    } else {
      toast.error(`Try again! ${simulatedAccuracy}% accuracy`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      generateQuestion();
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
                <Mic className="size-6 text-pink-600" />
                <CardTitle>Sing the Note Quiz</CardTitle>
              </div>
              <CardDescription>
                Sing the prompted note accurately. This quiz helps train your vocal pitch accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> This quiz requires microphone access. Make sure you're in a quiet environment for best results.
                  </p>
                </div>

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
                      Natural notes (C-B)
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('medium')}
                  >
                    <span>Medium</span>
                    <span className="text-xs text-muted-foreground">
                      Higher accuracy required
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('hard')}
                  >
                    <span>Hard</span>
                    <span className="text-xs text-muted-foreground">
                      Perfect pitch required
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
                    {score} out of {totalQuestions} accurate
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
                <Mic className="size-6 text-pink-600" />
                <CardTitle>Sing the Note Quiz</CardTitle>
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

              {/* Target Note Display */}
              <div className="text-center py-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Target Note</p>
                <p className="text-8xl font-bold text-purple-900">{targetNote}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playTargetNote}
                  className="mt-4"
                >
                  <Volume2 className="size-4 mr-2" />
                  Play Reference
                </Button>
              </div>

              {/* Recording Controls */}
              <div className="text-center py-6">
                {!answered ? (
                  <Button
                    size="lg"
                    onClick={startRecording}
                    disabled={recording}
                    className={`h-32 w-32 rounded-full ${
                      recording ? 'bg-red-600 hover:bg-red-700 animate-pulse' : ''
                    }`}
                  >
                    <Mic className="size-12" />
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
                      <p className="text-5xl font-bold">{accuracy}%</p>
                    </div>
                    <Progress value={accuracy} className="h-3" />
                  </div>
                )}
                <p className="mt-4 text-muted-foreground">
                  {recording ? 'Recording... Sing the note!' : answered ? 'Recording complete' : 'Click to start recording'}
                </p>
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
