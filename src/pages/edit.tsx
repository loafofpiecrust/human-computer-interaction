import React, { useState } from "react"
import { css } from "@emotion/react"
import { Button } from "reakit/Button"
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogProps,
} from "reakit/Dialog"
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form"
import { navigate } from "gatsby"
import { FaArrowLeft } from "react-icons/fa"
import { Timer, useTimers, useTimerIndex, defaultTimer } from "../state"
import Layout from "../layout"
import * as style from "../style/new-timer"
import theme from "../style/theme"
import { rhythm } from "../style/typography"
import PlaylistDialog, { Playlist } from "../playlist"

const breakdown = (seconds: number) => ({
  seconds: Math.floor(seconds % 60),
  minutes: Math.floor((seconds / 60) % 60),
  hours: Math.floor(seconds / 3600),
})

const recompose = (
  hours: number | string,
  minutes: number | string,
  seconds: number | string
) =>
  Number.parseInt(hours as string) * 3600 +
  Number.parseInt(minutes as string) * 60 +
  Number.parseInt(seconds as string)

export default () => {
  const [timerIndex] = useTimerIndex(null)
  const isNew = timerIndex === null
  const [timers, setTimers] = useTimers<Timer[]>([])
  const timer = isNew ? defaultTimer : timers[timerIndex]
  const work = breakdown(timer.workPeriod)
  const shortBreak = breakdown(timer.shortBreak)
  const [playlist, setPlaylist] = useState(timer.playlist)
  const playlistDialog = useDialogState()
  const form = useFormState({
    values: {
      ...timer,
      // Break down work period length.
      workSeconds: work.seconds,
      workMinutes: work.minutes,
      workHours: work.hours,
      // Break down break period length.
      shortBreakSeconds: shortBreak.seconds,
      shortBreakMinutes: shortBreak.minutes,
      shortBreakHours: shortBreak.hours,
    },
    onSubmit: (values: any) => {
      const timer: Timer = {
        ...values,
        shortBreak: recompose(
          values.shortBreakHours,
          values.shortBreakMinutes,
          values.shortBreakSeconds
        ),
        longBreak: Number.parseInt(values.longBreak),
        workPeriod: recompose(
          values.workHours,
          values.workMinutes,
          values.workSeconds
        ),
        intervals: Number.parseInt(values.intervals),
        playlist,
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
      <header css={[style.row, { alignItems: "baseline" }]}>
        <Button css={style.iconButton} onClick={() => navigate("/timers")}>
          <FaArrowLeft size={24} />
        </Button>
        <h1>{isNew ? "New Timer" : "Edit Timer"}</h1>
      </header>
      <section>
        <Form {...form}>
          <div css={formGroup}>
            <FormLabel {...form} name="title" css={{ marginRight: 33 }}>
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
            <FormInput
              {...form}
              name="workHours"
              type="number"
              min={0}
              placeholder="Enter Hours"
              css={narrow}
            ></FormInput>
            <FormLabel {...form} name="workHours">
              h
            </FormLabel>
            <FormInput
              {...form}
              name="workMinutes"
              type="number"
              min={0}
              placeholder="Enter Minutes"
              css={narrow}
            ></FormInput>
            <FormLabel {...form} name="workMinutes">
              m
            </FormLabel>
            <FormInput
              {...form}
              name="workSeconds"
              type="number"
              min={0}
              placeholder="Enter Seconds"
              css={narrow}
            ></FormInput>
            <FormLabel {...form} name="workSeconds">
              s
            </FormLabel>
            <p>How long to work before taking a break</p>
          </div>

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

          <div css={formGroup}>
            <FormLabel {...form}>Rest Time</FormLabel>
            <FormInput
              {...form}
              name="shortBreakHours"
              type="number"
              min={0}
              placeholder="Enter Hours"
              css={narrow}
            ></FormInput>
            <FormLabel {...form} name="shortBreakHours">
              h
            </FormLabel>
            <FormInput
              {...form}
              name="shortBreakMinutes"
              type="number"
              min={0}
              max={120}
              placeholder="Enter Minutes"
              css={narrow}
            ></FormInput>
            <FormLabel {...form} name="shortBreakMinutes">
              m
            </FormLabel>
            <FormInput
              {...form}
              name="shortBreakSeconds"
              type="number"
              min={0}
              max={120}
              placeholder="Enter Seconds"
              css={narrow}
            ></FormInput>
            <FormLabel {...form} name="shortBreakSeconds">
              s
            </FormLabel>
            <p>Length of your short break following every work period</p>
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

          <div css={formGroup}>
            <span>{playlist ? playlist.title : null}</span>
            <DialogDisclosure {...playlistDialog}>
              Choose a Playlist
            </DialogDisclosure>
            <PlaylistDialog
              {...playlistDialog}
              onChoose={(playlist) => setPlaylist(playlist)}
            />
          </div>

          <div>
            <FormSubmitButton
              {...form}
              css={{
                backgroundColor: theme.colors.confirm,
                marginLeft: 100,
                width: 250,
              }}
            >
              Save
            </FormSubmitButton>
            <Button
              css={{
                backgroundColor: theme.colors.cancel,
                marginLeft: 250,
                width: 260,
              }}
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
  marginBottom: rhythm(0.5),
})

const narrow = css({
  maxWidth: "5ch",
  fontFamily: theme.fonts.monospace,
  marginLeft: "1rem",
  marginRight: 4,
})
