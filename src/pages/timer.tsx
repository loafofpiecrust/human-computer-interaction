import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Group } from "reakit/Group"
import { Button } from "reakit/Button"
import Slider from "react-slider"
import { useCurrentTimer, Timer, Period } from "../state"
import Layout from "../layout"
import theme, { marginY, timespan } from "../style/theme"
import * as style from "../style/new-timer"
import { rhythm } from "../style/typography"
import { BsDiamond, BsCircleFill } from "react-icons/bs"
import { BreakQuiz } from "../break-quiz"

export default () => {
  const [timer, setTimer] = useCurrentTimer()
  const [periodType, setPeriodType] = useState(Period.Work)
  const [intervalIndex, setInterval] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [paused, setPaused] = useState(false)

  function progressInterval() {
    if (intervalIndex >= timer.intervalCount - 1) {
      // Finished the full cycle, now it's time for a long break.
      alert("It's time for a long break!")
      setPaused(true)
    } else {
      if (periodType === Period.Work) {
        setPeriodType(Period.ShortBreak)
      } else {
        setInterval(intervalIndex + 1)
        setPeriodType(Period.Work)
      }
    }
  }

  return (
    <Layout title={timer.title}>
      <header css={style.row}>
        <div
          css={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "start",
            flexGrow: 1,
          }}
        >
          <h1>{timer.title}</h1>
          <span>{periodType} Period</span>
        </div>
        <Group>
          <div>
            <span css={timespan}>{displaySeconds(timer.workPeriod)}</span> work
          </div>
          <div>
            <span css={timespan}>{displaySeconds(timer.shortBreak)}</span> rest
          </div>
          <div>
            <span css={timespan}>{timer.intervalCount}</span> intervals
          </div>
          <div>
            <span css={timespan}>{displaySeconds(totalTime)}</span> passed
          </div>
        </Group>
      </header>
      <PeriodTimeline
        intervalCount={4}
        workPeriod={timer.workPeriod}
        shortBreakPeriod={timer.shortBreak}
        currentInterval={intervalIndex}
        totalTime={totalTime}
      />
      <BreakQuiz
        timer={timer}
        periodType={periodType}
        increaseWorkPeriod={(x) =>
          setTimer({ ...timer, workPeriod: timer.workPeriod + x })
        }
        alternate={() => (
          <>
            <Countdown
              totalSeconds={
                periodType === Period.Work ? timer.workPeriod : timer.shortBreak
              }
              onComplete={progressInterval}
              onChange={() => setTotalTime(totalTime + 1)}
              isPaused={paused}
            />
            <div css={style.row}>
              <Button onClick={() => setPaused(!paused)}>
                {paused ? "Continue" : "Pause"}
              </Button>
              <Button onClick={() => navigate("/timers")}>Cancel</Button>
            </div>
          </>
        )}
      />
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
  onChange: (seconds: number) => void
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
        let newSecs = seconds - 1
        props.onChange(newSecs)
        setSeconds(newSecs)
      }, 1000)
      return () => clearInterval(interval)
    } else if (!props.isPaused) {
      props.onComplete()
    }
  }, [seconds, props.isPaused])

  return (
    <>
      <div
        css={[
          marginY(rhythm(0.5)),
          { fontSize: "2rem", fontFamily: theme.fonts.monospace },
        ]}
      >
        {displaySeconds(seconds)} / {displaySeconds(props.totalSeconds)}
      </div>
    </>
  )
}

const PeriodTimeline = (props: {
  intervalCount: number
  workPeriod: number
  shortBreakPeriod: number
  currentInterval: number
  totalTime: number
}) => {
  const fullLength = Math.floor(
    props.intervalCount * props.workPeriod +
      (props.intervalCount - 1) * props.shortBreakPeriod
  )
  let marks = []
  let total = 0
  for (let i = 0; i < props.intervalCount; i++) {
    marks.push(total)
    total += props.workPeriod
    marks.push(total)
    total += props.shortBreakPeriod
  }

  return (
    <Slider
      css={{ marginTop: rhythm(0.5), marginBottom: rhythm(0.5) }}
      disabled={true}
      value={props.totalTime}
      min={0}
      max={fullLength}
      marks={marks}
      renderMark={(props) => (
        <span
          {...props}
          css={{ position: "absolute", backgroundColor: "white" }}
        >
          <BsDiamond size={16} />
        </span>
      )}
      renderThumb={(props, state) => (
        <div {...props}>
          <BsCircleFill size={16} />
        </div>
      )}
      renderTrack={(innerProps, state) => {
        return (
          <div
            {...innerProps}
            css={{
              height: 28,
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
            }}
          >
            <div
              css={{
                borderBottom: "4px solid",
                borderColor:
                  state.index === 0 ? "lightgray" : theme.colors.header,
              }}
            />
          </div>
        )
      }}
    />
  )
}
