import React from "react"
import { Timer, useTimers, useTimerIndex } from "../state"
import Layout from "../layout"
import { Button } from "reakit/Button"
import { navigate } from "gatsby"
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form"
import "../style/edit.css"
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => {
  const [timerIndex] = useTimerIndex()
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

  function multiply() {
    var num1 = 60;
    var num2 = document.getElementById("num_2");
    // @ts-ignore
    var result = num1 * num2;
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <Layout>
      <main>
      <section>
        <br/>
          <h2>Edit Timer</h2> *(at the moment time must be inputted in as seconds).
      </section>
        <hr/>
      <section className={"ttl-btn"}>
        <br/>
        <Form {...form}>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <FormLabel {...form} name="title" className="col">
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
                <FormLabel {...form} className="col" name="workAudio">
                  <h4>Sound for Work Period </h4>
                </FormLabel>
                <select className={"col"} id="options" name="sound_work_period">
                  <option value="None">None</option>
                  <option value="A Playlist">A Playlist</option>
                  <option value="Our Recommendation">Our Recommendation</option>
                </select>
              </div>
            </div>
          </div>
          <br/>
          <div className={"row"}>
            <FormSubmitButton {...form} className="btn btn-primary col-4 save">
              Save
            </FormSubmitButton>
            <p className="col"></p>
            <Button className="btn btn-primary col-4 del" onClick={deleteTimer}>
              Delete
            </Button>
          </div>
        </Form>
      </section>
      </main>
    </Layout>
  )
}
