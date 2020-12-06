import React from "react"
import { css } from "@emotion/react"
import { fullWidth } from "./style/theme"
import { rhythm } from "./style/typography"
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogProps,
  DialogBackdrop,
} from "reakit/Dialog"
import { Button } from "reakit/Button"

export default (props: DialogProps & { onChoose: (x: Playlist) => void }) => {
  const { onChoose, ...dialog } = props
  return (
    <DialogBackdrop
      {...dialog}
      css={{ background: "rgba(0,0,0,0.5)", inset: 0, position: "fixed" }}
    >
      <Dialog {...dialog} aria-label="Choose a Playlist" css={container}>
        <h1>Choose a Playlist</h1>
        <ul>
          {playlists.map((playlist) => (
            <Button
              role="listitem"
              onClick={() => {
                onChoose(playlist)
                dialog.hide()
              }}
            >
              {playlist.title}
            </Button>
          ))}
        </ul>
      </Dialog>
    </DialogBackdrop>
  )
}

const container = css(fullWidth, {
  position: "fixed",
  background: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: rhythm(0.5),
  border: "1px solid black",
  minHeight: "60vh",
})

interface Song {
  title: string
  artist: string
  duration: number
}

export interface Playlist {
  title: string
  songs: Song[]
}

const playlists: Playlist[] = [
  {
    title: "My Favorites",
    songs: [
      {
        title: "All Along The Watchtower",
        artist: "Jimi Hendrix",
        duration: 150,
      },
      {
        title: "Old Jacket",
        artist: "Regina Spektor",
        duration: 125,
      },

      {
        title: "Sailor Song",
        artist: "Regina Spektor",
        duration: 195,
      },
      {
        title: "You Are So Beautiful",
        artist: "Billy Preston",
        duration: 292,
      },
      {
        title: "Tayna - A Secret",
        artist: "Romashka",
        duration: 185,
      },
    ],
  },
]

export const currentSong = (playlist: Playlist, time: number) => {
  if (playlist) {
    let total = 0
    for (const song of playlist.songs) {
      total += song.duration
      if (time <= total) {
        return { song, timeLeft: total - time }
      }
    }
  }
  return { song: null, timeLeft: null }
}
