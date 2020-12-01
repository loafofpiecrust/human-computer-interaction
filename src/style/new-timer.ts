import { css } from "@emotion/react"
import { rhythm } from "./typography"

export const row = css({
  display: "flex",
  flexFlow: "row",
})

export const box = css({
  border: "3px solid black",
  borderRadius: 3,
  minHeight: "200px",
  marginTop: rhythm(0.5),
})
