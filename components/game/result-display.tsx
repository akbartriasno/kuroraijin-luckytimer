"use client"

import { Card, CardBody, Progress } from "@heroui/react"
import { motion } from "framer-motion"

interface ResultDisplayProps {
  time: number
  isPerfect: boolean
}

export default function ResultDisplay({ time, isPerfect }: ResultDisplayProps) {
  const diff = Math.abs(time - 10)
  const accuracy = Math.max(0, 100 - diff * 10)

  return (
      <motion.div
          className="text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <Card className="bg-secondary/50 border border-accent/30 backdrop-blur-sm">
          <CardBody className="gap-4 w-full">
            {isPerfect ? (
                <>
                  <motion.p
                      className="text-3xl text-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🎉
                  </motion.p>
                  <p className="text-xl font-bold text-accent text-center">PERFECT 10.00!</p>
                  <p className="text-sm text-foreground/80 text-center">Flawless execution!</p>
                </>
            ) : (
                <>
                  <p className="text-sm text-muted-foreground">Result</p>
                  <motion.p
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                  >
                    {time.toFixed(2)}s
                  </motion.p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-accent font-bold">{accuracy.toFixed(0)}%</span>
                    </div>
                    <Progress
                        value={accuracy}
                        className="w-full"
                        color="danger"
                        classNames={{
                          indicator: "bg-accent",
                        }}
                    />
                  </div>
                </>
            )}
          </CardBody>
        </Card>
      </motion.div>
  )
}
