import React, { useRef } from "react"
import { Timer, useTimers, defaultTimer } from "../state"
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
  const [timers, setTimers] = useTimers<Timer[]>([])
  const form = useFormState({
    values: defaultTimer,
    onSubmit: (timer) => {
      setTimers([...timers, timer])
      navigate("/timers")
    },
  })

  return (
    <Layout>
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
            <form className="row">
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
            </form>
          </div>
          <FormSubmitButton {...form} className="btn btn-primary">
            Create Timer
          </FormSubmitButton>
        </Form>
      </section>
    </Layout>
  )
}
