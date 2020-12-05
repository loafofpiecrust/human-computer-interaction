import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import { Button } from "reakit/Button"
import { Group } from "reakit/Group"
import { useTimers, Timer, useTimerIndex } from "../state"
import Layout from "../layout"
import * as style from "../style/new-timer"
import { FaArrowLeft, FaEdit } from "react-icons/fa"

export default () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  const [currentIndex, setCurrentIndex] = useTimerIndex<number>()
  return (
    <Layout>
      <header css={[style.row, { justifyContent: "space-between" }]}>
        <h1>Your Timers</h1>
        <Button
          onClick={() => {
            setCurrentIndex(null)
            navigate("/edit")
          }}
        >
          New Timer
        </Button>
      </header>
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
              <FaEdit css={timerEdit}
                      onClick={() => {
                        setCurrentIndex(idx)
                        navigate("/edit")
                      }}/>
          </Group>
        ))}
      </div>
    </Layout>
  )
}

const timerItem = css({
  flexGrow: 5,
})

const timerEdit = css({
  width: "50px",
  backgroundColor:"white",
  fontSize:"30px",
})
