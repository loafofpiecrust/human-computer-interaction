import React from "react"
import { useCurrentTimer, Timer } from "../state"
import Layout from "../layout"

export default () => {
  const [timer, setTimer] = useCurrentTimer()
  return (
    <Layout>
      <h2>{timer.title}</h2>
    </Layout>
  )
}
