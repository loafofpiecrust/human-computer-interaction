import React from "react"
import { Helmet } from "react-helmet"
import { Global, css } from "@emotion/react"
import theme, { fullWidth } from "./style/theme"
import { rhythm } from "./style/typography"
import {} from "@emotion/react/types/css-prop.d"

const Layout = (props: { children: any; title?: string }) => (
  <>
    <Global styles={styles} />
    <Helmet title={props.title ?? "Personalized Music Timer"} />
    <header css={bright}>
      <h1>Personalized Music Timer</h1>
    </header>
    <main>{props.children}</main>
  </>
)
export default Layout

const bright = css({
  backgroundColor: theme.colors.header,
  paddingTop: rhythm(1),
  paddingBottom: 1,
  textAlign: "center",
})

const styles = css({
  main: {
    width: "100%",
    padding: rhythm(1),
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    "& > *": fullWidth,
  },
  input: {
    marginLeft: "15%",
    maxWidth: 500,
    "&.fn, &.ln": {
      marginLeft: "20%",
    },
  },
  label: {
    "&.fn, &.ln": {
      marginLeft: "40%",
    },
  },

  select: {
    height: 40,
  },

  ".title": {
    backgroundColor: "cornflowerblue",
    borderColor: "cornflowerblue",
  },

  button: {
    cursor: "pointer",
    color: "black",
    padding: `${rhythm(0.25)} ${rhythm(0.5)}`,
    border: "none",
    borderRadius: 10,
    fontFamily: theme.fonts.sans,
  },
  h2: {
    textAlign: "center",
  },
  Countdown: {
    textAlign: "center",
  },
  ".cancel": {
    border: "2px solid black",
  },
  ".pause": {
    backgroundColor: "grey",
    borderStyle: "none",
  },
  ".pause:hover": {
    backgroundColor: "grey",
    borderStyle: "none",
  },
  ".pause:active": {
    backgroundColor: "grey",
    borderStyle: "none",
  },
})
