import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { Group } from "reakit/Group"
import { Button } from "reakit/Button"
import Slider from "react-slider"
import { useCurrentTimer, Timer, Period } from "../state"
import Layout from "../layout"
import theme from "../style/theme"
import * as style from "../style/new-timer"
import { rhythm } from "../style/typography"
import { BsDiamond, BsCircleFill } from "react-icons/bs"
import 'bootstrap/dist/css/bootstrap.min.css'

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
      // setTotalTime(totalTime + timer.workPeriod)
    } else {
      setPeriodType(Period.Work)

      // if (periodType === Period.ShortBreak) {
      //   setTotalTime(totalTime + timer.shortBreak)
      // } else if (periodType === Period.LongBreak) {
      //   setTotalTime(totalTime + timer.longBreak)
      // }
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
          <div>
            <span css={{ fontFamily: theme.fonts.monospace }}>
              {displaySeconds(totalTime)}
            </span>{" "}
            passed
          </div>
        </div>
      </header>
      <PeriodTimeline
        intervalCount={4}
        workPeriod={timer.workPeriod}
        shortBreakPeriod={timer.shortBreak}
        currentInterval={intervalIndex}
        totalTime={totalTime}
      />
      <br/>
      <Countdown
        totalSeconds={
          periodType === Period.Work ? timer.workPeriod : timer.shortBreak
        }
        onComplete={progressInterval}
        onChange={() => setTotalTime(totalTime + 1)}
        isPaused={paused}
      />
      <br/>
      <Button onClick={() => setPaused(!paused)} className={"btn btn-primary col pause"}>
        {paused ? "Continue" : "Pause"}
      </Button>
      <br/>
      <Button onClick={() => navigate("/timers")} className={"btn col-2 cancel"}>
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
      <div css={{ fontSize: "2rem", fontFamily: theme.fonts.monospace }}>
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
  const fullLength =
    props.intervalCount * props.workPeriod +
    props.intervalCount * (props.shortBreakPeriod - 1)
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
          <BsCircleFill size={20} />
        </div>
      )}

      renderTrack={(innerProps, state) => {
        return (
          <div
            {...innerProps}
            css={{
              height: 24,
              display: "flex",
              flexFlow: "column",
              justifyContent: "center",
            }}
          >
            <div
              css={{
                borderBottom: "4px solid",
                borderColor: state.index === 0 ? "gray" : "firebrick",
              }}
            />
          </div>
        )
      }}
    />
  )
}
