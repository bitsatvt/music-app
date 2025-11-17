"use client"

import React, { useEffect, useState } from "react"
import * as Tone from "tone"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function QuizCard() {
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
  const [hint, setHint] = useState("")
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]

  useEffect(() => {
    const s = new Tone.Synth().toDestination()
    setSynth(s)
  }, [])

  // Generates a new question
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
    setHint("")
    setAnsweredCorrectly(false)
  }

  // Play note
  const playNote = async () => {
    await Tone.start()
    if (!synth || !currentNote) return
    synth.triggerAttackRelease(currentNote, "8n")
  }

  // When user clicks an answer
  const checkAnswer = (choice: string) => {
    if (choice === currentNote) {
      if (wrong === true) {
        setFeedback("Correct!")
        setAnsweredCorrectly(true)
        setWrong(false)
      } else {
        setFeedback("Correct!")
        setAnsweredCorrectly(true)
        setTotalCorrect((prev) => prev + 1)
      }
    } else {
      setFeedback("Try again")
      setWrong(true)
    }
  }

  // Hint button
  const showHint = () => {
    setHint(`Hint: The note starts with "${currentNote.charAt(0)}"`)
  }

  // Move to next question or finish quiz
  const nextQuestion = () => {
    if (currentQuestion === 10) {
      setFinished(true)
      return
    }

    setCurrentQuestion((prev) => prev + 1)
    generateQuiz()
  }

  // Start quiz
  const startQuiz = () => {
    setStarted(true)
    setCurrentQuestion(1)
    setTotalCorrect(0)
    setFinished(false)
    generateQuiz()
  }

  // Restart quiz
  const restart = () => {
    setStarted(false)
    setFinished(false)
    setTotalCorrect(0)
    setCurrentQuestion(1)
  }

  // ---------------------------
  //      RENDER LOGIC
  // ---------------------------

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen w-full bg-white text-black">
        <div className="min-h-screen w-full bg-white">
          <Card className="w-full max-w-2xl mx-auto mt-24 text-center p-10 bg-white border border-gray-300 shadow">
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-4 text-black">
                Note Recognition Quiz
              </CardTitle>
              <CardDescription className="text-xl text-gray-700">
                10 questions — see how many you can get right!
              </CardDescription>
            </CardHeader>

            <CardFooter className="mt-10 flex justify-center">
              <Button
                size="lg"
                className="text-2xl px-10 py-5"
                onClick={startQuiz}
              >
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // Final results screen
  if (finished) {
    return (
      <div className="min-h-screen w-full bg-white">
        <Card className="w-full max-w-2xl mx-auto mt-24 text-center p-10 bg-white border border-gray-300 shadow">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-black">
              Quiz Complete!
            </CardTitle>
            <CardDescription className="text-xl mt-3 text-gray-700">
              You answered <span className="font-bold">{totalCorrect}</span> out
              of <span className="font-bold">10</span> correctly.
            </CardDescription>
          </CardHeader>

          <CardFooter className="mt-10 flex justify-center">
            <Button size="lg" className="text-2xl px-10 py-5" onClick={restart}>
              Restart Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Active quiz screen
  return (
    <div className="min-h-screen w-full bg-white">
      <Card className="w-full max-w-2xl mx-auto mt-24 text-center bg-white shadow-lg border border-gray-300 p-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-2 text-black">
            Question {currentQuestion} of 10
          </CardTitle>
          <CardDescription className="text-lg text-gray-700">
            Listen and guess the note
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-10 mt-4">
          <Button
            onClick={playNote}
            size="lg"
            className="text-2xl px-10 py-5 rounded-xl"
          >
            Play Note
          </Button>

          {feedback && (
            <p
              className={`text-2xl font-semibold ${feedback.includes("Correct") ? "text-green-600" : "text-red-600"
                }`}
            >
              {feedback}
            </p>
          )}

          {hint && (
            <p className="text-lg text-gray-600 italic mt-2">{hint}</p>
          )}
        </CardContent>

        {/* Answer choices */}
        <CardFooter className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          {choices.map((note, i) => (
            <Button
              key={i}
              variant="outline"
              onClick={() => checkAnswer(note)}
              className="text-2xl py-5 rounded-lg border-gray-400 text-black"
              disabled={answeredCorrectly}
            >
              {note}
            </Button>
          ))}
        </CardFooter>

        {/* Footer controls */}
        <CardFooter className="w-full flex justify-between items-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={showHint}
            className="text-lg px-5 py-3 border-gray-400 text-black"
          >
            Hint
          </Button>

          <Button
            onClick={nextQuestion}
            variant="secondary"
            disabled={!answeredCorrectly}
            className={`text-lg px-6 py-3 rounded-lg ${!answeredCorrectly
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
              }`}
          >
            Next Question
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
