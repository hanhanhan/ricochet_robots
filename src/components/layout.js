/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
// import Header from "./header"
import "./css/layout.css"
import "./css/reset.css"
import { fullWidthGameBreakpoint } from "./css/shared"

const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
  @media (min-width: ${fullWidthGameBreakpoint}) {
    margin: calc(3rem + 1vw);
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <Container>
          <main>{children}</main>
        </Container>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
