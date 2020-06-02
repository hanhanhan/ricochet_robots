import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Game from "../components/Game"

const IndexPage = () => (
  <Layout>
    {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
    <Game />
  </Layout>
)

export default IndexPage
