import React, { ReactChildren } from "react"
import { Helmet } from "react-helmet"

const Layout = (props: { children: any; title?: string }) => (
  <>
    <Helmet title={props.title ?? "Personalized Music Timer"} />
    <header>
      <h1>Personalized Music Timer</h1>
    </header>
    <main>{props.children}</main>
  </>
)
export default Layout
