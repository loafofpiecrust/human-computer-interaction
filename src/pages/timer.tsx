import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Group } from "reakit/Group"
import { Button } from "reakit/Button"
import { useCurrentTimer, Timer, Period } from "../state"
import Layout from "../layout"

export default () => {
  const [timer, setTimer] = useCurrentTimer()
  const [periodType, setPeriodType] = useState(Period.Work)
  const [intervalIndex, setInterval] = useState(0)
  const [paused, setPaused] = useState(false)

  function progressInterval() {
    setInterval(intervalIndex + 1)
    if (periodType === Period.Work) {
      setPeriodType(Period.ShortBreak)
    } else {
      setPeriodType(Period.Work)
    }
  }

  return (
    <Layout>
      <h2>{timer.title}</h2>
      <h3>{periodType} Period</h3>
      <PeriodTimeline
        intervalCount={4}
        workPeriod={timer.workPeriod}
        shortBreakPeriod={timer.shortBreak}
      />
      <Countdown
        totalSeconds={timer.workPeriod}
        onComplete={progressInterval}
        isPaused={paused}
      />
      <Button onClick={() => setPaused(!paused)} className="btn btn-secondary">
        {paused ? "Continue" : "Pause"}
      </Button>
      <Button onClick={() => navigate("/timers")} className="btn btn-secondary">
        Cancel
      </Button>
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
    <div style={{ fontSize: "2rem" }}>
      {displaySeconds(seconds)} / {displaySeconds(props.totalSeconds)}
    </div>
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
        style={{ flexGrow: props.workPeriod, backgroundColor: "blue" }}
      ></div>
    )
    if (i < props.intervalCount - 1) {
      periods.push(
        <div
          key={(i + 1) * 2 + 1}
          style={{ flexGrow: props.shortBreakPeriod, backgroundColor: "green" }}
        ></div>
      )
    }
  }
  return <Group className="row">{periods}</Group>
}
