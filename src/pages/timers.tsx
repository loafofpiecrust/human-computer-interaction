import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import { Button } from "reakit/Button"
import { Group } from "reakit/Group"
import { useTimers, Timer, useTimerIndex } from "../state"
import Layout from "../layout"
import { row, iconButton, box } from "../style/new-timer"
import { FaEdit, FaRegPlusSquare } from "react-icons/fa"
import { rhythm } from "../style/typography"

export default () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  const [currentIndex, setCurrentIndex] = useTimerIndex<number>()
  return (
    <Layout>
      <header
        css={[row, { justifyContent: "space-between", alignItems: "baseline" }]}
      >
        <h1>Your Timers</h1>
        <Button
          css={iconButton}
          onClick={() => {
            setCurrentIndex(null)
            navigate("/edit")
          }}
        >
          <FaRegPlusSquare size={24} />
        </Button>
      </header>
      <div css={box}>
        {timers.length ? (
          timers.map((timer, idx) => (
            <Group key={idx} css={row}>
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
                css={iconButton}
                onClick={() => {
                  setCurrentIndex(idx)
                  navigate("/edit")
                }}
              >
                <FaEdit size={24} />
              </Button>
            </Group>
          ))
        ) : (
          <p css={{ padding: rhythm(1) }}>
            No timers yet. Press the plus button to get started.
          </p>
        )}
      </div>
    </Layout>
  )
}

const timerItem = css({
  flexGrow: 10,
})
