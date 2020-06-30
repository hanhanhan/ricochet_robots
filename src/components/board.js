import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import ErrorBoundary from "./errorBoundary"
import BoardTile from "./boardTile"
import {
  getTarget,
  dimensions,
  tiles,
  initialGamepiecePositions,
} from "../gameLogic/boardSetup"
import { getUpdatedGraph, buildLookup } from "../gameLogic/gamepieces"
import basegraph from "../gameLogic/basegraph"

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
function useGamepiecePositions(initialValue = initialGamepiecePositions) {
  const [gamepiecePositions, setGamepiecePositions] = useState(initialValue)

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
  return React.useMemo(() => basegraph())
}

export default function Board(props) {
  const [gamepiecePositions, setGamepiecePositions] = useGamepiecePositions()
  const target = getTarget()

  // Function to lookup id of an occupying gamepiece by tile col, row
  const positionToGamepiece = buildLookup(gamepiecePositions)
  const graph = getUpdatedGraph(gamepiecePositions)
  console.log(graph)

  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west }, i) => {
      const gamepieceId = positionToGamepiece(col, row)
      const isTarget = target.row == row && target.col == col
      return (
        <BoardTile
          key={`${col} ${row} ${gamepieceId}`}
          col={col}
          row={row}
          isTarget={isTarget}
          walls={{ north, east, south, west }}
          gamepieceId={gamepieceId}
          gamepiecePositions={gamepiecePositions}
          setGamepiecePositions={setGamepiecePositions}
          graph={graph}
        />
      )
    })

  return (
    <ErrorBoundary>
      <BoardStyle>{tileComponents}</BoardStyle>
    </ErrorBoundary>
  )
}