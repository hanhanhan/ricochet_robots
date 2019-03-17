import React from "react"
import { Link } from "gatsby"
// import styled from 'styled-components'

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Board from "../components/board"





const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <Board>

    </Board>
    

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
