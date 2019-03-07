import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

// Game board dimensions
const DIMENSIONS = {x: 8, y: 8}

let tileLocations = []
for (let iX = 0; iX < DIMENSIONS.x; iX++){
  for (let iY = 0; iY < DIMENSIONS.y; iY++) {
    tileLocations.push({x:iX, y:iY})
  }
}

const TileStyle = styled.div`
  background-color: linen;
  margin: 2px;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Tile(props) {
  return <TileStyle>Tile {props.x} {props.y}</TileStyle>
}


const Board = styled.div`
  height: 80vh;
  display: grid; 
  grid-template-columns: repeat(${DIMENSIONS.x}, 1fr);
  grid-template-rows: repeat(${DIMENSIONS.y}, 1fr);
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <Board>
      {tileLocations.map(({x,y}, i) => <Tile key={i} x={x} y={y}>{i}</Tile>)}
    </Board>
    
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
