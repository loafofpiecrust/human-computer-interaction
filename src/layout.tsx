import React from "react"
import { Helmet } from "react-helmet"
import { Global, css } from "@emotion/react"
import theme from "./style/theme"
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

  "Button.save": {
    backgroundColor: "green",
  },

  "Button.del": {
    backgroundColor: "red",
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
  },
})
