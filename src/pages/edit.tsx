import React from "react"
import { css } from "@emotion/react"
import * as style from "../style/new-timer"
import { Timer, useTimers, useTimerIndex, defaultTimer } from "../state"
import Layout from "../layout"
import { Button } from "reakit/Button"
import { navigate } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form"


export default () => {
  const [timerIndex] = useTimerIndex(null)
  const isNew = timerIndex === null
  const [timers, setTimers] = useTimers<Timer[]>([])
  const form = useFormState({
    values: isNew ? defaultTimer : timers[timerIndex],
    onSubmit: (values: any) => {
      const timer: Timer = {
        ...values,
        shortBreak: Number.parseInt(values.shortBreak),
        longBreak: Number.parseInt(values.longBreak),
        workPeriod: Number.parseInt(values.workPeriod),
        intervals: Number.parseInt(values.intervals),
      }
      if (isNew) {
        setTimers([...timers, timer])
      } else {
        const newList = [...timers]
        newList[timerIndex!] = timer
        setTimers(newList)
      }
      navigate("/timers")
    },
  })

  function deleteTimer() {
    const newList = [...timers]
    newList.splice(timerIndex!, 1)
    setTimers(newList)
    navigate("/timers")
  }

  function x(){
    navigate("/timers")
  }

  return (
    <Layout>
      <header>
        <div>
          <button  className={"btn btn-primary"} onClick={x}>
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </button>
          <h2  className={"col"}>{isNew ? "New Timer" : "Edit Timer"}</h2>
        </div>
      </header>
      <section>
        <Form {...form}>
          <div css={formGroup}>
            <br/>
            <FormLabel {...form} name="title" className="">
              Title
            </FormLabel>
            <FormInput
              {...form}
              name="title"
              type="text"
              placeholder="Enter Timer Title"
            ></FormInput>
          </div>
          <br/>
          <div css={formGroup}>
            <FormLabel {...form} className="col" name="workPeriod">
              Work Time
            </FormLabel>
            <br/>
            <FormLabel>Hours:&nbsp;&nbsp;&nbsp;</FormLabel>
            <FormInput
              {...form}
              name="workPeriod"
              type="number"
              placeholder="Enter Hours"
            ></FormInput>
            <br/>
            <FormLabel>Minutes:</FormLabel>
            <FormInput
              {...form}
              name="workPeriod"
              type="number"
              placeholder="Enter Minutes"
            ></FormInput>
            <br/>
            <FormLabel>Seconds:</FormLabel>
            <FormInput
              {...form}
              name="workPeriod"
              type="number"
              placeholder="Enter Seconds"
            ></FormInput>
            <br/>
            <div css={formGroup}>
              <FormLabel {...form} className="col" name="workAudio">
                Sound for Work Period: &nbsp;
              </FormLabel>
              <select className={"col"} id="options" name="sound_work_period">
                <option value="None">None</option>
                <option value="A Playlist">A Playlist</option>
                <option value="Our Recommendation">Our Recommendation</option>
              </select>
            </div>
          </div>
            <br/>

          <div css={formGroup}>
            <FormLabel {...form} className="col" name="shortBreak">
              Rest Time
            </FormLabel>
            <br/>
            <FormLabel>Hours:&nbsp;&nbsp;&nbsp;</FormLabel>
            <FormInput
              {...form}
              name="shortBreak"
              type="number"
              placeholder="Enter Hours"
            ></FormInput>
            <br/>
            <FormLabel>Minutes:</FormLabel>
            <FormInput
              {...form}
              name="shortBreak"
              type="number"
              placeholder="Enter Minutes"
            ></FormInput>
            <br/>
            <FormLabel>Seconds:</FormLabel>
            <FormInput
              {...form}
              name="shortBreak"
              type="number"
              placeholder="Enter Seconds"
            ></FormInput>
          </div>
          <div css={formGroup}>
            <FormLabel {...form} className="col" name="restAudio">
              Sound for Rest Period: &nbsp;
            </FormLabel>
            <select className={"col"} id="options" name="sound_rest_period">
              <option value="None">None</option>
              <option value="A Playlist">A Playlist</option>
              <option value="Our Recommendation">Our Recommendation</option>
            </select>
          </div>
          <br/>
          <div>
            <FormSubmitButton {...form} className="btn btn-primary save col-4">
              Save
            </FormSubmitButton>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="btn btn-primary del col-4" onClick={deleteTimer}>
              Delete
            </Button>
          </div>
        </Form>
      </section>
    </Layout>
  )
}

const formGroup = css({
  alignItems: "center",
  textAlign: "center",
})
