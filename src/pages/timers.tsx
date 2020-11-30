import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import { Button } from "reakit/Button"
import { Group } from "reakit/Group"
import { useTimers, Timer, useTimerIndex } from "../state"
import Layout from "../layout"
import * as style from "../style/new-timer"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  const [currentIndex, setCurrentIndex] = useTimerIndex<number>()
  return (
    <Layout>
      <header css={[style.row, { justifyContent: "space-between" }]}>
        <h2>Your Timers</h2>
        <Button
          onClick={() => {
            setCurrentIndex(null)
            navigate("/edit")
          }}
        >
          New Timer
        </Button>
      </header>
      <br />
      <div css={style.box}>
        {timers.map((timer, idx) => (
          <Group key={idx} css={style.row}>
            <Button
              css={timerItem}
              onClick={() => {
                setCurrentIndex(idx)
                navigate("/timer")
              }}
            >
              {timer.title}
            </Button>
            <Button
              css={timerEdit}
              onClick={() => {
                setCurrentIndex(idx)
                navigate("/edit")
              }}
            >
              Edit
            </Button>
          </Group>
        ))}
      </div>
    </Layout>
  )
}

const timerItem = css({
  flexGrow: 10,
})

const timerEdit = css({
  width: "max-content",
})
