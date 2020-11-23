import React from "react"
import { Link, navigate } from "gatsby"
import { Button } from "reakit/Button"
import { Group } from "reakit/Group"
import { useTimers, Timer, useTimerIndex } from "../state"
import Layout from "../layout"
import "../style/timer.css"
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  const [currentIndex, setCurrentIndex] = useTimerIndex<number>()
  return (
    <Layout>
      <section className={"ttl-btn"}>
        <div className={"row"}>
          <h2 className={"col-8"}>Your Timers</h2>

          <Button as={Link} to="/new-timer" className={"btn btn-primary col-2"}>
            New Timer
          </Button>
        </div>
      </section>
      <br />
      <div className="box">
        {timers.map((timer, idx) => (
          <Group key={idx} className="row">
            <Button
              className="col-10"
              onClick={() => {
                setCurrentIndex(idx)
                navigate("/timer")
              }}
            >
              {timer.title}
            </Button>
            <Button className="col-2">Edit</Button>
          </Group>
        ))}
      </div>
    </Layout>
  )
}
