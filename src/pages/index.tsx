import React from "react"
import { Link } from "gatsby"
import Layout from "../layout"

export default () => (
  <Layout>
    <Link to="/timers">Link to Project</Link>
    <section>
      <h2>Authors</h2>
      <p>Taylor Snead</p>
      <p>Jada Letts</p>
    </section>
    <section>
      <h2>Requirement Analysis</h2>
      <a href="/requirement-analysis.pdf">Download PDF</a>
    </section>
    <section>
      <h2>Prototype Version 1</h2>
      <p>
        We drafted our first prototype on paper, then translated that prototype
        into a Google Slides document with some interactivity. If you click
        "Present," you can click the buttons on each screen to navigate around
        the interface
      </p>
      <a href="https://docs.google.com/presentation/d/14BN51xecmJ5L1wbAWgIBcUD4nZO7_D8wTgoHc6qnwhs/edit?usp=sharing">
        View Google Slides
      </a>
    </section>
    <section>
      <h2>Prototype Version 2</h2>
      <p>
        Based on the feedback that we received from our usability testing, we
        revised the prototype within Google Slides
      </p>
      <a href="https://docs.google.com/presentation/d/1MYrczgZWEjlRhtHVc-dgmNAizb4WE9VR5nP_wZ0nsJI/edit?usp=sharing">
        View Google Slides
      </a>
    </section>
  </Layout>
)
