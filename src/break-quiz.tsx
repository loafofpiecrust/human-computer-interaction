import React, { useState, useEffect } from "react"
import { Button } from "reakit/Button"
import { Period, Timer } from "./state"
import { timespan } from "./style/theme"
import { row } from "./style/new-timer"
import { rhythm } from "./style/typography"

export enum QuizType {
  WorkDuration,
  BreakDuration,
}

export const BreakQuiz = (p: {
  alternate: () => any
  periodType: Period
  timer: Timer
  increaseWorkPeriod: (x: number) => void
}) => {
  const [quizType, setQuizType] = useState<QuizType | null>(null)

  useEffect(() => {
    if (p.periodType === Period.ShortBreak && p.timer.shortBreak > 30) {
      setQuizType(QuizType.WorkDuration)
      // Stop the quiz after the timeout.
      const timer = setTimeout(() => {
        setQuizType(null)
      }, p.timer.shortBreak / 2)
      return () => clearTimeout(timer)
    }
  }, [p.periodType, p.timer])

  if (quizType === null) {
    return p.alternate()
  } else if (quizType === QuizType.WorkDuration) {
    return (
      <div css={{ marginTop: rhythm(0.5) }}>
        <div>Do you need more time to work?</div>
        <div css={row}>
          <Button onClick={() => p.increaseWorkPeriod(10 * 60)}>
            <span css={timespan}>10:00</span> more work
          </Button>
          <Button onClick={() => setQuizType(null)}>Start break</Button>
        </div>
      </div>
    )
  }
}
