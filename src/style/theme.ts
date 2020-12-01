import { css } from "@emotion/react"

const theme = {
  colors: {
    header: "cornflowerblue",
  },
  fonts: {
    monospace: "Courier New",
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

export default theme
