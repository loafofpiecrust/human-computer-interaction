import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Group } from "reakit/Group"
import { Button } from "reakit/Button"
import { useCurrentTimer, Timer, Period } from "../state"
import Layout from "../layout"
import * as style from "../style/new-timer"
import { rhythm } from "../style/typography"

export default () => {
  const [timer, setTimer] = useCurrentTimer()
  const [periodType, setPeriodType] = useState(Period.Work)
  const [intervalIndex, setInterval] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [paused, setPaused] = useState(false)

  function progressInterval() {
    setInterval(intervalIndex + 1)
    if (periodType === Period.Work) {
      setPeriodType(Period.ShortBreak)
      setTotalTime(totalTime + timer.workPeriod)
    } else {
      setPeriodType(Period.Work)

      if (periodType === Period.ShortBreak) {
        setTotalTime(totalTime + timer.shortBreak)
      } else if (periodType === Period.LongBreak) {
        setTotalTime(totalTime + timer.longBreak)
      }
    }
  }

  return (
    <Layout>
      <header css={style.row}>
        <div
          css={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <h2>{timer.title}</h2>
          <span>{periodType} Period</span>
        </div>
        <div>
          <div>{displaySeconds(timer.workPeriod)} work</div>
          <div>{displaySeconds(timer.shortBreak)} rest</div>
          <div>{timer.intervalCount} intervals</div>
          <div>{displaySeconds(totalTime)} passed</div>
        </div>
      </header>
      <PeriodTimeline
        intervalCount={4}
        workPeriod={timer.workPeriod}
        shortBreakPeriod={timer.shortBreak}
      />
      <Countdown
        totalSeconds={
          periodType === Period.Work ? timer.workPeriod : timer.shortBreak
        }
        onComplete={progressInterval}
        isPaused={paused}
      />
      <Button onClick={() => setPaused(!paused)}>
        {paused ? "Continue" : "Pause"}
      </Button>
      <Button onClick={() => navigate("/timers")}>Cancel</Button>
    </Layout>
  )
}

function displaySeconds(time: number) {
  var minutes = "0" + Math.floor(time / 60)
  var seconds = "0" + Math.floor(time % 60)
  return `${minutes.substr(-2)}:${seconds.substr(-2)}`
}

const Countdown = (props: {
  totalSeconds: number
  onComplete: () => void
  isPaused?: boolean
}) => {
  const [seconds, setSeconds] = useState(props.totalSeconds)

  // If the total changes, start the timer over.
  useEffect(() => {
    setSeconds(props.totalSeconds)
  }, [props.totalSeconds])

  useEffect(() => {
    if (seconds > 0 && !props.isPaused) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (!props.isPaused) {
      props.onComplete()
    }
  }, [seconds, props.isPaused])

  return (
    <>
      <div css={{ fontSize: "2rem" }}>
        {displaySeconds(seconds)} / {displaySeconds(props.totalSeconds)}
      </div>
    </>
  )
}

const PeriodTimeline = (props: {
  intervalCount: number
  workPeriod: number
  shortBreakPeriod: number
}) => {
  const periods = []
  for (let i = 0; i < props.intervalCount; i++) {
    periods.push(
      <div
        key={(i + 1) * 2}
        css={{
          flexGrow: props.workPeriod,
          backgroundColor: "firebrick",
          height: 16,
        }}
      ></div>
    )
    if (i < props.intervalCount - 1) {
      periods.push(
        <div
          key={(i + 1) * 2 + 1}
          css={{
            flexGrow: props.shortBreakPeriod,
            backgroundColor: "aquamarine",
            height: 16,
          }}
        ></div>
      )
    }
  }
  return <Group css={[style.row, { marginTop: rhythm(0.5) }]}>{periods}</Group>
}
