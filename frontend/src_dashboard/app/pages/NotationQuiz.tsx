import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { FileMusic, RotateCcw, Home, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export function NotationQuiz() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctNote, setCorrectNote] = useState('');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [notePosition, setNotePosition] = useState(0);

  const totalQuestions = 10;

  const startQuiz = (diff: 'easy' | 'medium' | 'hard') => {
    setDifficulty(diff);
    generateQuestion();
  };

  const generateQuestion = () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    const randomPosition = Math.floor(Math.random() * 7);
    setCorrectNote(randomNote);
    setNotePosition(randomPosition);
    setSelectedNote(null);
    setAnswered(false);
  };

  const handleNoteSelection = (note: string) => {
    if (answered) return;

    setSelectedNote(note);
    setAnswered(true);

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
                <FileMusic className="size-6 text-blue-600" />
                <CardTitle>Notation Reading Quiz</CardTitle>
              </div>
              <CardDescription>
                Read sheet music notation and identify the notes. Improve your sight-reading skills.
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
                      Treble clef only
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('medium')}
                  >
                    <span>Medium</span>
                    <span className="text-xs text-muted-foreground">
                      Treble & bass clef
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2"
                    onClick={() => startQuiz('hard')}
                  >
                    <span>Hard</span>
                    <span className="text-xs text-muted-foreground">
                      Multiple clefs, ledger lines
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
                <FileMusic className="size-6 text-blue-600" />
                <CardTitle>Notation Reading Quiz</CardTitle>
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

              {/* Musical Staff Visualization */}
              <div className="bg-white rounded-lg p-8 border-2">
                <div className="relative h-48 flex items-center justify-center">
                  {/* Staff lines */}
                  <div className="absolute inset-0 flex flex-col justify-center gap-3">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div key={line} className="h-0.5 bg-black" />
                    ))}
                  </div>
                  
                  {/* Treble clef symbol */}
                  <div className="absolute left-4 text-6xl">
                    𝄞
                  </div>

                  {/* Note */}
                  <div
                    className="absolute text-6xl"
                    style={{
                      top: `${25 + (notePosition * 12)}%`,
                    }}
                  >
                    ●
                  </div>
                </div>
              </div>

              {/* Note Selection */}
              <div>
                <p className="text-center mb-4">What note is shown?</p>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {NOTES.map((note) => {
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
