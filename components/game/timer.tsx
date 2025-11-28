"use client"

import { motion } from "framer-motion"

interface TimerProps {
  time: number
  isRunning: boolean
}

export default function Timer({ time, isRunning }: TimerProps) {
  const displayTime = time.toFixed(2)

  return (
      <div className="text-center">
        <motion.div
            className={`text-7xl md:text-8xl font-bold led-display tracking-wider ${isRunning ? "digital-flicker" : ""}`}
            style={{
              color: "#FF2E2E",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.15em",
            }}
            animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
            transition={isRunning ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
        >
          {displayTime}
        </motion.div>
        <motion.p
            className="text-lg text-muted-foreground uppercase tracking-widest mt-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {isRunning ? "⚡ RUNNING" : "READY"}
        </motion.p>
      </div>
  )
}
