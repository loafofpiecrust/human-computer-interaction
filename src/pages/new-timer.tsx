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
        <Form {...form}>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <FormLabel {...form} name="title">
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
                <FormLabel {...form} className="col" name="workAudio">
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

          <FormSubmitButton {...form} className="col-4 btn btn-primary ctimer">
            Create Timer
          </FormSubmitButton>
          <a href={"/timers"} className={"col-4 btn btn-primary cancel"}>
            Cancel
          </a>
        </Form>
      </section>
    </Layout>
  )
}
