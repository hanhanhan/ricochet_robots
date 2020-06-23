import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import BoardTile from "./BoardTile"
import {
  dimensions,
  tiles,
  initialGamepiecePositions,
} from "../gameLogic/BoardSetup"
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
function useGamepiecePositions() {
  // Bizarrely not working when passed as default value, and then not passed in hook call
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
  return React.useMemo(() => basegraph())
}

export default function Board(props) {
  const [gamepiecePositions, setGamepiecePositions] = useGamepiecePositions()
  // Function to lookup id of an occupying gamepiece by tile col, row
  const positionToGamepiece = buildLookup(gamepiecePositions)
  const graph = getUpdatedGraph(initialGamepiecePositions)

  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west, target }, i) => {
      const gamepieceId = positionToGamepiece(col, row)
      return (
        <BoardTile
          key={`${col} ${row} ${gamepieceId}`}
          col={col}
          row={row}
          target={target}
          walls={{ north, east, south, west }}
          gamepieceId={gamepieceId}
          gamepiecePositions={gamepiecePositions}
          setGamepiecePositions={setGamepiecePositions}
          graph={graph}
        />
      )
    })

  return <BoardStyle>{tileComponents}</BoardStyle>
}
