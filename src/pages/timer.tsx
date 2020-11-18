import React from "react"
import '../style/timer.css'
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => (
  <main>
    <h1>Personalized Music Timer</h1>

    <section className={"ttl-btn"}>
      <div className={"row"}>
        <h2 className={"col-8"}>Your Timers</h2>

          <a href="/newTimer" className={"btn btn-primary"}>+ New Timer</a>
      </div>
    </section>
    <br/>
    <div >
      <p className={"box"}>hello</p>
    </div>

  </main>
)
