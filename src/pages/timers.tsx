import React from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/react"
import { Button } from "reakit/Button"
import { Group } from "reakit/Group"
import { useTimers, Timer, useTimerIndex } from "../state"
import Layout from "../layout"
import * as style from "../style/new-timer"
import { FaPlus, FaEdit, FaPlusCircle, FaPlusSquare, FaRegPlusSquare } from "react-icons/fa"

export default () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  const [currentIndex, setCurrentIndex] = useTimerIndex<number>()
  return (
    <Layout>
      <header css={[style.row, { justifyContent: "space-between" }]}>
        <h1>Your Timers</h1>
          <FaRegPlusSquare size={30}
            onClick={() => {
              setCurrentIndex(null)
              navigate("/edit")
            }}/>
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

            <Button
              css={style.iconButton}
              onClick={() => {
                setCurrentIndex(idx)
                navigate("/edit")
              }}
            >
              <FaEdit size={24} />
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
