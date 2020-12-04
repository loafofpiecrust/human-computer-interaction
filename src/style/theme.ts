import { css } from "@emotion/react"

const theme = {
  colors: {
    header: "firebrick",
    confirm: "darkseagreen",
    cancel: "indianred",
  },
  fonts: {
    monospace: "Courier New",
    sans: `"Open Sans", "Arial", sans`,
  },
  mediaQueries: {
    small: "@media (min-width: 40em)",
    medium: "@media (min-width: 52em)",
    large: "@media (min-width: 64em)",
  },
}

export const fullWidth = css({
  width: "100%",
  [theme.mediaQueries.medium]: {
    width: "44rem",
  },
  [theme.mediaQueries.large]: {
    width: "54rem",
  },
})

export const marginY = (value: string | number) =>
  css({ marginTop: value, marginBottom: value })

export const marginX = (value: string | number) =>
  css({ marginLeft: value, marginRight: value })

export const timespan = css({ fontFamily: theme.fonts.monospace })

export default theme
