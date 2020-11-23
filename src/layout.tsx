import React, { ReactChildren } from "react"
import { Helmet } from "react-helmet"

const Layout = (props: { children: any }) => (
  <main>
    <Helmet>
      <title>Personalized Music Timer</title>
    </Helmet>
    <h1>Personalized Music Timer</h1>
    {props.children}
  </main>
)
export default Layout
