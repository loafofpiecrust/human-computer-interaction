import createPersistedState from "use-persisted-state"
import { Playlist } from "./playlist"

export interface Timer {
  title: string
  /** Length of the work period in seconds */
  workPeriod: number
  /** Length of short breaks in seconds */
  shortBreak: number
  /** Length of long breaks in seconds */
  longBreak: number
  intervalCount: number
  workAudio: string
  playlist: Playlist | null
}

export enum Period {
  Work = "Work",
  ShortBreak = "Short Break",
  LongBreak = "Long Break",
}

export const defaultTimer: Timer = {
  title: "",
  workPeriod: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 50 * 60,
  intervalCount: 4,
  workAudio: "",
  playlist: null,
}

export const useTimers = createPersistedState("timers")
export const useTimerIndex = createPersistedState("currentTimer")
export const useCurrentTimer: () => [Timer, (newTimer: Timer) => void] = () => {
  const [timers, setTimers] = useTimers<Timer[]>([])
  const [index, setIndex] = useTimerIndex<number>(0)

  return [
    timers && timers![index!],
    (newTimer: Timer) => {
      const newList = [...timers!]
      newList[index] = newTimer
      setTimers(newList!)
    },
  ]
}
