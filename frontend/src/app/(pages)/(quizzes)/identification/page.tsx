"use client"

import React, { useEffect, useState } from "react"
import * as Tone from "tone"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NavigationHeader } from "@/components/shared/NavigationHeader"

export default function ToneRecognitionQuiz() {
  const [synth, setSynth] = useState<Tone.Synth | null>(null)

  // Quiz flow states
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const [wrong, setWrong] = useState(false)

  // Question states
  const [currentNote, setCurrentNote] = useState("")
  const [choices, setChoices] = useState<string[]>([])
  const [feedback, setFeedback] = useState("")
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]

  useEffect(() => {
    const s = new Tone.Synth().toDestination()
    setSynth(s)
  }, [])

  const generateQuiz = () => {
    const correct = notes[Math.floor(Math.random() * notes.length)]
    const incorrect = notes
      .filter((n) => n !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const allChoices = [...incorrect, correct].sort(() => 0.5 - Math.random())

    setCurrentNote(correct)
    setChoices(allChoices)
    setFeedback("")
    setAnsweredCorrectly(false)
  }

  const playNote = async () => {
    await Tone.start()
    if (!synth || !currentNote) return

    setIsPlaying(true)
    synth.triggerAttackRelease(currentNote, "4n")

    setTimeout(() => setIsPlaying(false), 500)
  }

  const checkAnswer = (choice: string) => {
    if (choice === currentNote) {
      setFeedback("Correct!")
      setAnsweredCorrectly(true)
      if (!wrong) setTotalCorrect((prev) => prev + 1)
      setWrong(false)
    } else {
      setFeedback("Try again")
      setWrong(true)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion === 10) {
      setFinished(true)
      return
    }
    setCurrentQuestion((prev) => prev + 1)
    generateQuiz()
  }

  const startQuiz = () => {
    setStarted(true)
    setCurrentQuestion(1)
    setTotalCorrect(0)
    setFinished(false)
    generateQuiz()
  }

const QuizWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full bg-[#F3F4F9] flex flex-col relative overflow-hidden font-sans">
    <NavigationHeader isDarkMode={false} />

    {/* Background Staff motif */}
    <div className="absolute top-20 inset-x-0 bottom-0 opacity-15 pointer-events-none select-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="staff" width="400" height="240" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
            <g stroke="#6D52A3" strokeWidth="1">
              <path d="M0 60 H400 M0 80 H400 M0 100 H400 M0 120 H400 M0 140 H400" />
            </g>
            
            <text x="20" y="135" fontSize="80" fill="#6D52A3" opacity="0.4" fontFamily="serif">𝄞</text>
            
            <circle cx="160" cy="110" r="6" fill="#6D52A3" opacity="0.3" />
            <path d="M166 110 V70" stroke="#6D52A3" strokeWidth="2" opacity="0.3" />
            
            <circle cx="300" cy="130" r="6" fill="#6D52A3" opacity="0.3" />
            <path d="M306 130 V90" stroke="#6D52A3" strokeWidth="2" opacity="0.3" />
          </pattern>
          
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.1" stopColor="white" stopOpacity="1" />
            <stop offset="0.8" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="staff-mask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#staff)" mask="url(#staff-mask)" />
      </svg>
    </div>

    {/* Centered Content Container */}
    <div className="relative z-10 w-full flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  </div>
)

  if (!started) {
    return (
      <QuizWrapper>
        <Card className="text-center p-12 bg-white rounded-3xl shadow-xl border-none">
          <CardHeader>
            <CardTitle className="text-5xl font-extrabold mb-4 text-[#1A1A1A] tracking-tight font-montserrat">
              Tone Recognition Quiz
            </CardTitle>
            <CardDescription className="text-xl text-gray-500 font-inter">
              Master your perfect pitch. 10 questions to test your ears.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-8 flex justify-center">
            <Button 
              onClick={startQuiz}
              className="bg-[#6D52A3] hover:bg-[#5A4389] text-white text-xl px-12 py-7 rounded-2xl transition-all shadow-lg font-inter font-bold"
            >
              Start Learning
            </Button>
          </CardFooter>
        </Card>
      </QuizWrapper>
    )
  }

  if (finished) {
    return (
      <QuizWrapper>
        <Card className="text-center p-12 bg-white rounded-3xl shadow-xl border-none">
          <CardHeader>
            <CardTitle className="text-5xl font-extrabold text-[#1A1A1A] font-montserrat">
              Quiz Complete!
            </CardTitle>
            <CardDescription className="text-2xl mt-6 text-gray-600 font-inter">
              Score: <span className="text-[#6D52A3] font-bold">{totalCorrect}/10</span>
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-10 flex justify-center">
            <Button 
              onClick={() => setStarted(false)}
              className="bg-[#6D52A3] hover:bg-[#5A4389] text-white text-xl px-10 py-6 rounded-xl font-bold font-inter"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </QuizWrapper>
    )
  }

  return (
    <QuizWrapper>
      <Card className="bg-white rounded-3xl shadow-2xl border-none p-6 md:p-12 transition-all">
        <CardHeader className="text-center p-0">
          <CardTitle className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-wider font-montserrat mb-2">
            Tone Recognition Quiz
          </CardTitle>
          <p className="text-sm font-bold text-gray-500 font-inter tracking-[0.2em]">
            Question {currentQuestion} of 10
          </p>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-[#6D52A3] transition-all duration-500" 
              style={{ width: `${(currentQuestion / 10) * 100}%` }}
            />
          </div>

          <CardDescription className="text-xl text-gray-800 mt-6 font-medium font-inter">
            Listen and guess the note.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8 mt-8">
          <Button
            onClick={playNote}
            disabled={isPlaying}
            className={`bg-[#6D52A3] hover:bg-[#5A4389] text-white text-2xl px-14 py-10 rounded-2xl shadow-lg transition-all font-inter font-bold tracking-wide
              ${isPlaying ? "animate-pulse ring-purple-300 scale-105" : "active:scale-95"}
            `}
          >
            <Play className={`mr-3 h-8 w-8 fill-current ${isPlaying ? "text-purple-200" : ""}`} />
            {isPlaying ? "Playing..." : "Play Note"}
          </Button>

          <div className="h-8">
            {feedback && (
              <p className={`text-sm font-bold tracking-widest uppercase font-inter ${
                feedback.includes("Correct!") ? "text-green-500" : "text-red-500"
              }`}>
                {feedback}
              </p>
            )}
          </div>
        </CardContent>

        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {choices.map((note, i) => (
            <Button
              key={i}
              variant="outline"
              onClick={() => checkAnswer(note)}
              disabled={answeredCorrectly}
              className={`text-xl font-bold py-8 rounded-xl border-2 transition-all font-inter
                ${answeredCorrectly && note === currentNote ? 'border-[#6D52A3] bg-purple-50 text-[#6D52A3]' : 'border-gray-200 text-gray-700 hover:border-[#6D52A3] hover:text-[#6D52A3]'}
              `}
            >
              {note}
            </Button>
          ))}
        </CardContent>

        <CardFooter className="flex justify-end items-center mt-12 px-4">

          <Button
            onClick={nextQuestion}
            disabled={!answeredCorrectly}
            className={`text-lg font-bold px-8 py-6 rounded-xl transition-all font-inter
              ${answeredCorrectly 
                ? "bg-white border-2 border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"}
            `}
          >
            Next Question
          </Button>
        </CardFooter>
      </Card>
    </QuizWrapper>
  )
}