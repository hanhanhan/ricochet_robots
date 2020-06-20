import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import BoardTile from "./BoardTile"
import {
  dimensions,
  tiles,
  initialGamepiecePositions,
} from "../gameLogic/BoardSetup"
import {
  getUpdatedGraph,
  getGamepieceAtLocation as gamepieceLocationLookup,
} from "../gameLogic/gamepieces"

const BoardStyle = styled.div`
  width: 95vmin;
  height: 95vmin;
  display: grid;
  border: 5px solid thistle;
  gap: 0;
  grid-template-columns: repeat(${dimensions.x}, 1fr);
  grid-template-rows: repeat(${dimensions.y}, 1fr);
`

/**
 * Hook to get + update gamepiece positions.
 *
 * @param {Object} [initialGamepiecePositions]
 * @returns {Array}
 */
function useGamepiecePositions(
  initialGamepiecePositions = initialGamepiecePositions
) {
  console.log("useGamepiecePositions hook called")
  const [gamepiecePositions, setGamepiecePositions] = useState(
    initialGamepiecePositions
  )

  return [gamepiecePositions, setGamepiecePositions]
}

/**
 * Hook to update graph.
 * Not part of hook to update gamepiece positions
 * because it is instead managed by React DND lifecycle.
 *
 * @returns {Array<Object, func>}
 */
function useGraph() {
  console.log("useGraph hook called")
  const [graph, setGraph] = useState(getUpdatedGraph(initialGamepiecePositions))
  return [graph, setGraph]
}

export default function Board(props) {
  const [graph, setGraph] = useGraph()
  const [gamepiecePositions, setGamepiecePositions] = useGamepiecePositions()
  // const getGamepieceAtLocation = gamepieceLocationLookup.bind(
  //   gamepiecePositions
  // )
  // const tileComponents = tiles
  //   .flat()
  //   .map(({ col, row, north, south, east, west, target }, i) => {
  //     const gamepieceId = getGamepieceAtLocation(col, row)
  //     return (
  //       <BoardTile
  //         key={`${col} ${row} ${gamepieceId}`}
  //         col={col}
  //         row={row}
  //         target={target}
  //         walls={{ north, east, south, west }}
  //         gamepieceId={gamepieceId}
  //         gamepiecePositions={gamepiecePositions}
  //         setGamepiecePositions={setGamepiecePositions}
  //         graph={graph}
  //         setGraph={setGraph}
  //       />
  //     )
  //   })
  return <div>hi</div>
  // return <BoardStyle>{tileComponents}</BoardStyle>
}
