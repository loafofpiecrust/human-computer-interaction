import React from "react"
import { Link } from "gatsby"
import { Button } from "reakit/Button"
import { useTimers, Timer } from "../state"
import "../style/timer.css"
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  return (
    <main>
      <h1>Personalized Music Timer</h1>

      <section className={"ttl-btn"}>
        <div className={"row"}>
          <h2 className={"col-8"}>Your Timers</h2>

          <Button as={Link} to="/new-timer" className={"btn btn-primary col-2"}>
            New Timer
          </Button>
        </div>
      </section>
      <br />
      <div>
        {timers.map((timer, idx) => (
          <p className={"box"} key={idx}>
            {timer.title}
          </p>
        ))}
      </div>
    </main>
  )
}
