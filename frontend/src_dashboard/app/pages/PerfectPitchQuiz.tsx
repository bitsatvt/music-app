import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Headphones, Volume2, RotateCcw, Home, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const DIFFICULTIES = {
  easy: { name: 'Easy', range: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  medium: { name: 'Medium', range: NOTES },
  hard: { name: 'Hard', range: NOTES },
};

export function PerfectPitchQuiz() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctNote, setCorrectNote] = useState('');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  const totalQuestions = 10;

  const startQuiz = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    generateQuestion(diff);
    setStartTime(Date.now());
  };

  const generateQuestion = (diff: 'easy' | 'medium' | 'hard') => {
    const availableNotes = DIFFICULTIES[diff].range;
    const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
    setCorrectNote(randomNote);
    setSelectedNote(null);
    setAnswered(false);
  };

  const playNote = () => {
    toast.info('🎵 Playing note... (Audio simulation)');
  };

  const handleNoteSelection = (note: string) => {
    if (answered) return;

    setSelectedNote(note);
    setAnswered(true);

    const responseTime = (Date.now() - startTime) / 1000;
    setResponseTimes([...responseTimes, responseTime]);

    if (note === correctNote) {
      setScore(score + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error(`Incorrect. The note was ${correctNote}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      if (difficulty) {
        generateQuestion(difficulty);
        setStartTime(Date.now());
      }
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setDifficulty(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setResponseTimes([]);
  };

  const averageResponseTime = responseTimes.length > 0
    ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)
    : '0.00';

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Navigation />
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Headphones className="size-6 text-purple-600" />
                <CardTitle>Perfect Pitch Practice</CardTitle>
              </div>
              <CardDescription>
                Listen to notes and identify them by ear. This quiz will help you develop perfect pitch.
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
                      Natural notes only (C-B)
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('medium')}
                  >
                    <span>Medium</span>
                    <span className="text-xs text-muted-foreground">
                      All 12 chromatic notes
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('hard')}
                  >
                    <span>Hard</span>
                    <span className="text-xs text-muted-foreground">
                      All notes, faster pace
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl">{score}</p>
                    <p className="text-sm text-muted-foreground">Correct Answers</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl">{averageResponseTime}s</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
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

  const availableNotes = difficulty ? DIFFICULTIES[difficulty].range : NOTES;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Headphones className="size-6 text-purple-600" />
                <CardTitle>Perfect Pitch Practice</CardTitle>
              </div>
              <Badge>{DIFFICULTIES[difficulty].name}</Badge>
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

              {/* Play Note Button */}
              <div className="text-center py-8">
                <Button
                  size="lg"
                  onClick={playNote}
                  className="h-32 w-32 rounded-full"
                >
                  <Volume2 className="size-12" />
                </Button>
                <p className="mt-4 text-muted-foreground">
                  Click to play the note
                </p>
              </div>

              {/* Note Selection */}
              <div>
                <p className="text-center mb-4">Which note is playing?</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {availableNotes.map((note) => {
                    const isSelected = selectedNote === note;
                    const isCorrect = answered && note === correctNote;
                    const isWrong = answered && isSelected && note !== correctNote;

                    return (
                      <Button
                        key={note}
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => handleNoteSelection(note)}
                        disabled={answered}
                        className={`h-16 ${
                          isCorrect
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : isWrong
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : ''
                        }`}
                      >
                        {note}
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
