import React, { useRef } from "react"
import { Timer, useTimers, defaultTimer, useTimerIndex } from "../state"
import Layout from "../layout"
import { Button } from "reakit/Button"
import { navigate } from "gatsby"
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form"
import "../style/timer.css"
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => {
  const [timerIndex, setTimerIndex] = useTimerIndex()
  const [timers, setTimers] = useTimers<Timer[]>([])
  const form = useFormState({
    values: timers[timerIndex!],
    onSubmit: (timer) => {
      const newList = [...timers]
      newList[timerIndex!] = timer
      setTimers(newList)
      navigate("/timers")
    },
  })

  function deleteTimer() {
    const newList = [...timers]
    newList.splice(timerIndex!, 1)
    setTimers(newList)
    navigate("/timers")
  }

  return (
    <Layout>
      <main>
      <section>
        <h3>Edit Timer: </h3>
      </section>
      <section className={"ttl-btn"}>
        <br />
        <Form {...form}>
          <div className="form-group">
            <div className="row">
              <div className="col-5">
                <FormLabel {...form} name="title" className="fn">
                  Title
                </FormLabel>
                <FormInput
                  {...form}
                  name="title"
                  type="text"
                  className="fn form-control"
                  placeholder="Enter Timer Title"
                ></FormInput>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-5">
                <FormLabel {...form} className="fn" name="workPeriod">
                  Work Time
                </FormLabel>
                <FormInput
                  {...form}
                  name="workPeriod"
                  type="text"
                  className="fn form-control"
                  placeholder="Enter Work Time"
                ></FormInput>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-5">
                <FormLabel {...form} className="fn" name="shortBreak">
                  Rest Time
                </FormLabel>
                <FormInput
                  {...form}
                  name="shortBreak"
                  type="text"
                  className="fn form-control"
                  placeholder="Enter Rest Time"
                ></FormInput>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-5">
                <FormLabel {...form} className="fn" name="workAudio">
                  Sound for Work Period
                </FormLabel>
                <select id="options" name="sound_work_period">
                  <option value="None">None</option>
                  <option value="A Playlist">A Playlist</option>
                  <option value="Our Recommendation">Our Recommendation</option>
                </select>
              </div>
            </div>
          </div>
          <div className={"row"}>
            <FormSubmitButton {...form} className="btn btn-primary col-3">
              Save
            </FormSubmitButton>
            <p className="col-3"></p>
            <Button className="btn btn-primary col-3" onClick={deleteTimer}>
              Delete
            </Button>
          </div>
        </Form>
      </section>
      </main>
    </Layout>
  )
}
