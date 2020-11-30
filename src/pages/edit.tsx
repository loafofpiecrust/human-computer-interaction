import React from "react"
import { css } from "@emotion/react"
import * as style from "../style/new-timer"
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

  return (
    <Layout>
      <header>
        <h2>Edit Timer</h2>
      </header>
      <section>
        <Form {...form}>
          <div css={formGroup}>
            <FormLabel {...form} name="title" className="col">
              Title
            </FormLabel>
            <FormInput
              {...form}
              name="title"
              type="text"
              className="col-8 form-control"
              placeholder="Enter Timer Title"
            ></FormInput>
          </div>

          <div css={formGroup}>
            <FormLabel {...form} className="col" name="workPeriod">
              Work Time
            </FormLabel>
            <FormInput
              {...form}
              name="workPeriod"
              type="text"
              className="col-8 form-control"
              placeholder="Enter Work Time"
            ></FormInput>
          </div>
          <div css={formGroup}>
            <FormLabel {...form} className="col" name="shortBreak">
              Rest Time
            </FormLabel>
            <FormInput
              {...form}
              name="shortBreak"
              type="text"
              className="col-8 form-control"
              placeholder="Enter Rest Time"
            ></FormInput>
          </div>
          <div css={formGroup}>
            <FormLabel {...form} className="col" name="workAudio">
              Sound for Work Period
            </FormLabel>
            <select className={"col"} id="options" name="sound_work_period">
              <option value="None">None</option>
              <option value="A Playlist">A Playlist</option>
              <option value="Our Recommendation">Our Recommendation</option>
            </select>
          </div>
          <div css={style.row}>
            <FormSubmitButton {...form} className="btn btn-primary col-4 save">
              Save
            </FormSubmitButton>
            <Button className="btn btn-primary col-4 del" onClick={deleteTimer}>
              Delete
            </Button>
          </div>
        </Form>
      </section>
    </Layout>
  )
}

const formGroup = css({
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
})
