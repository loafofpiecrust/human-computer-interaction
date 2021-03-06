import { css } from "@emotion/react"
import { rhythm } from "./typography"
import theme from "./theme"

export const row = css({
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
})

export const box = css({
  border: "3px solid black",
  borderRadius: 3,
  minHeight: "200px",
  marginTop: rhythm(0.5),
})

export const iconButton = css({
  border: "none",
  background: "none",
  "&:hover": { color: theme.colors.header },
})
