import React from "react"
import { css } from "@emotion/react"
import * as style from "../style/new-timer"
import theme from "../style/theme"
import { Timer, useTimers, useTimerIndex, defaultTimer } from "../state"
import Layout from "../layout"
import { Button } from "reakit/Button"
import { navigate } from "gatsby"
import { FaArrowLeft } from "react-icons/fa"

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
  const timer = isNew ? defaultTimer : timers[timerIndex]
  const form = useFormState({
    values: {
      ...timer,
      workSeconds: Math.floor(timer.workPeriod % 60),
      workMinutes: Math.floor((timer.workPeriod / 60) % 60),
      workHours: Math.floor(timer.workPeriod / 3600),
    },
    onSubmit: (values: any) => {
      const timer: Timer = {
        ...values,
        shortBreak: Number.parseInt(values.shortBreak),
        longBreak: Number.parseInt(values.longBreak),
        workPeriod:
          Number.parseInt(values.workHours) * 3600 +
          Number.parseInt(values.workMinutes) * 60 +
          Number.parseInt(values.workSeconds),
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

  return (
    <Layout>
      <header css={style.row}>
        <Button css={style.iconButton} onClick={() => navigate("/timers")}>
          <FaArrowLeft />
        </Button>
        <h2>{isNew ? "New Timer" : "Edit Timer"}</h2>
      </header>
      <section>
        <Form {...form}>
          <div css={formGroup}>
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
          <div css={formGroup}>
            <FormLabel {...form} name="workPeriod">
              Work Time
            </FormLabel>
            <br />
            <FormLabel>Hours:</FormLabel>
            <FormInput
              {...form}
              name="workHours"
              type="number"
              placeholder="Enter Hours"
            ></FormInput>
            <br />
            <FormLabel>Minutes:</FormLabel>
            <FormInput
              {...form}
              name="workMinutes"
              type="number"
              placeholder="Enter Minutes"
            ></FormInput>
            <br />
            <FormLabel>Seconds:</FormLabel>
            <FormInput
              {...form}
              name="workSeconds"
              type="number"
              placeholder="Enter Seconds"
            ></FormInput>
            <div css={formGroup}>
              <FormLabel {...form} name="workAudio">
                Sound for Work Period:
              </FormLabel>
              <select id="options" name="sound_work_period">
                <option value="None">None</option>
                <option value="A Playlist">A Playlist</option>
                <option value="Our Recommendation">Our Recommendation</option>
              </select>
            </div>
          </div>
          <br />

          <div css={formGroup}>
            <FormLabel {...form} name="shortBreak">
              Rest Time
            </FormLabel>
            <FormLabel>Hours:</FormLabel>
            <FormInput
              {...form}
              name="shortBreak"
              type="number"
              placeholder="Enter Hours"
            ></FormInput>
            <br />
            <FormLabel>Minutes:</FormLabel>
            <FormInput
              {...form}
              name="shortBreak"
              type="number"
              placeholder="Enter Minutes"
            ></FormInput>
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
              Sound for Rest Period:
            </FormLabel>
            <select className={"col"} id="options" name="sound_rest_period">
              <option value="None">None</option>
              <option value="A Playlist">A Playlist</option>
              <option value="Our Recommendation">Our Recommendation</option>
            </select>
          </div>
          <div>
            <FormSubmitButton
              {...form}
              css={{ backgroundColor: theme.colors.confirm }}
            >
              Save
            </FormSubmitButton>
            <Button
              css={{ backgroundColor: theme.colors.cancel }}
              onClick={deleteTimer}
            >
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
