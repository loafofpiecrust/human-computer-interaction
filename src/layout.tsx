import React from "react"
import { Helmet } from "react-helmet"
import { Global, css } from "@emotion/react"
import theme, { fullWidth } from "./style/theme"
import { rhythm, options } from "./style/typography"
import logo from "./assets/logo.png"
import {} from "@emotion/react/types/css-prop.d"

const Layout = (props: { children?: any; title?: string }) => (
  <>
    <Global styles={styles} />
    <Helmet title={props.title ?? "Personalized Music Timer"} />
    <header css={[topLevel, bright]}>
      <div css={logoBox}>
        <img src={logo} css={{ width: 70 }} />
        <span>Personalized Music Timer</span>
      </div>
    </header>
    <main>{props.children}</main>
  </>
)
export default Layout

const bright = css({
  backgroundColor: theme.colors.header,
  color: "white",
  paddingTop: rhythm(0.5),
  paddingBottom: rhythm(0.5),
  textAlign: "center",
  fontSize: "1.5rem",
  fontFamily: options.headerFontFamily.join(","),
  fontWeight: "bold",
})

const logoBox = css(fullWidth, {
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
  img: { marginBottom: 0, marginRight: 24 },
})

const topLevel = css({
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  "& > *": fullWidth,
})

const styles = css({
  main: [
    topLevel,
    {
      width: "100%",
      padding: rhythm(1),
    },
  ],
  input: {
    // marginLeft: "15%",
    maxWidth: 500,
    "&.fn, &.ln": {
      // marginLeft: "20%",
    },
  },
  label: {
    fontWeight: "bold",
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
