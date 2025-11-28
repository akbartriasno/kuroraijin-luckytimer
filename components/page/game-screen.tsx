"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardBody } from "@heroui/react"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import Timer from "@/components/game/timer"
import ResultDisplay from "@/components/game/result-display"

interface GameScreenProps {
  onBack: () => void
}

export default function GameScreen({ onBack }: GameScreenProps) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const MAX_ATTEMPTS = 1
  const IS_ADMIN = false
  const IS_ATTEMPT_HISTORY = false

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 0.01
          if (newTime >= 60) {
            setIsRunning(false)
            return 60
          }
          return newTime
        })
      }, 10)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const handleStart = () => {
    setTime(0)
    setResult(null)
    setAttempt(attempt + 1)
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
    const roundedTime = Math.round(time * 100) / 100
    setResult(roundedTime)
    setHistory([...history, roundedTime])
  }

  const handleReset = () => {
    setTime(0)
    setResult(null)
    setIsRunning(false)
    setAttempt(1)
    setHistory([])
  }

  const handleBackHome = () => {
    handleReset()
    onBack()
  }

  const buttonRetryOrStop = (att: number) => {
    if (att >= MAX_ATTEMPTS) {
      return (
          <motion.button
              className="px-8 py-3 border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 46, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={true}
          >
            <span className="text-lg font-bold text-accent uppercase tracking-wider">credit has run out</span>
          </motion.button>
      )
    }

    return (
        <motion.button
            onClick={handleStart}
            className="px-8 py-3 border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 46, 0.5)" }}
            whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg font-bold text-accent uppercase tracking-wider">retry</span>
        </motion.button>
    )
  }

  const isPerfect = result !== null && Number(result.toFixed(2)) === 10.00;

  return (
      <div className="h-auto flex flex-col items-center w-full px-4 py-8 relative radial-gradient-bg">
        <motion.button
            onClick={handleBackHome}
            className="absolute top-6 left-6 p-3 border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300 text-accent"
            aria-label="Back to home"
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.div
            className="absolute top-6 right-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Attempt</p>
          <motion.p
              className="text-2xl font-bold text-accent"
              key={attempt}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
          >
            {attempt} <span className="text-muted-foreground text-lg">/ {MAX_ATTEMPTS}</span>
          </motion.p>
        </motion.div>

        {/* Main Game Area */}
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md mt-24 md:mt-0">
          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
          >
            <Timer time={time} isRunning={isRunning} />
          </motion.div>

          <div className="flex flex-col gap-4 w-full items-center">
            {!isRunning && result === null ? (
                <motion.button
                    onClick={handleStart}
                    className="px-8 py-3 border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 46, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-bold text-accent uppercase tracking-wider">START</span>
                </motion.button>
            ) : isRunning ? (
                <motion.button
                    onClick={handleStop}
                    className="px-8 py-3 border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 46, 46, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-bold text-accent uppercase tracking-wider">STOP</span>
                </motion.button>
            ) : buttonRetryOrStop(attempt)}

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-[50%]"
              >
                <ResultDisplay time={result} isPerfect={isPerfect} />
              </motion.div>
            )}

            {result !== null && attempt >= MAX_ATTEMPTS && IS_ADMIN && (
                <motion.button
                    onClick={handleReset}
                    className="px-6 py-2 border-2 border-accent rounded-lg hover:bg-accent/10 transition-all duration-300 text-accent text-sm font-bold uppercase tracking-wider"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  Reset All
                </motion.button>
            )}
          </div>

          {history.length > 0 && IS_ATTEMPT_HISTORY && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
              >
                <Card className="bg-secondary/50 border border-accent/30 backdrop-blur-sm">
                  <CardBody className="gap-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Attempt History</p>
                    <div className="grid grid-cols-5 gap-2">
                      {history.map((h, i) => (
                          <motion.div
                              key={i}
                              className={`text-center p-2 rounded text-xs font-bold ${
                                  Math.abs(h - 10) < 0.05 ? "bg-accent/30 text-accent" : "bg-muted text-foreground"
                              }`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                          >
                            {h.toFixed(2)}
                          </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
          )}
        </div>
      </div>
  )
}
