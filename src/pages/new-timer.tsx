import React from "react"
import { Timer, useTimers, defaultTimer } from "../state"
import Layout from "../layout"
import { navigate } from "gatsby"
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form"
import "../style/NewTimer.css"
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
      <main>
        <section>
          <br/>
          <h2>Create New Timer</h2>
          *(at the moment time must be inputted in as seconds).
          <br/>
          **(the default is 25 work minutes and 5 rest minutes).
        </section>
        <hr/>
      <section className={"ttl-btn"}>
        <br />
        <Form {...form}>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <FormLabel {...form} name="title" >
                  <h4>Title</h4>
                </FormLabel>
                <FormInput
                  {...form}
                  name="title"
                  type="text"
                  className="col-8 form-control"
                  placeholder="Enter Timer Title"
                ></FormInput>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <label className="col">
                <h4>Calculate Minutes to Seconds</h4>
              </label>
            </div>
            <div className={"row"}>
              <input  type="text"
                      placeholder="Enter Minutes" id={"num_2"}></input>
              &nbsp; &nbsp;
              <h5 > X 60 </h5>
              &nbsp; &nbsp;
              <button >= </button>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <FormLabel {...form} className="col" name="workPeriod">
                  <h4>Work Time</h4>
                </FormLabel>
                <FormInput
                  {...form}
                  name="workPeriod"
                  type="text"
                  className="col-8 form-control"
                  placeholder="Enter Work Time"
                ></FormInput>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <FormLabel {...form} className="col" name="shortBreak">
                  <h4>Rest Time</h4>
                </FormLabel>
                <FormInput
                  {...form}
                  name="shortBreak"
                  type="text"
                  className="col-8 form-control"
                  placeholder="Enter Rest Time"
                ></FormInput>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <FormLabel {...form} className="col" name="workAudio" >
                  <h4>Sound for Work Period</h4>
                </FormLabel>
                <select id="options" name="sound_work_period" className="col">
                  <option value="None">None</option>
                  <option value="A Playlist">A Playlist</option>
                  <option value="Our Recommendation">Our Recommendation</option>
                </select>
              </div>
            </div>
          </div>
          <br/>
          <FormSubmitButton {...form} className="btn btn-primary">
            Create Timer
          </FormSubmitButton>
        </Form>
      </section>
      </main>
    </Layout>
  )
}
