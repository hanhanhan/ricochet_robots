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
  lookupGamepieceFromPosition,
  gamepieceLocationKey,
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
 * Use location to look up gamepiece
 * Or use gamepiece to lookup location
 *
 * @param {Object} [initialGamepiecePositions]
 * @returns {Object}
 */
function useGamepiecePositions(
  initialGamepiecePositions = initialGamepiecePositions
) {
  const [gamepiecePositions, setGamepiecePositions] = useState(
    initialGamepiecePositions
  )

  // Create a map of (row, col) -> gamepiece ids
  // Keys are "row col" strings
  const positionToId = lookupGamepieceFromPosition(gamepiecePositions)

  // Function to lookup (row, col) -> gamepiece id
  const getGamepieceAtLocation = (col, row) => {
    const key = gamepieceLocationKey(col, row)
    return positionToId.get(key)
  }

  return { gamepiecePositions, getGamepieceAtLocation, setGamepiecePositions }
}

export default function Board(props) {
  const {
    gamepiecePositions,
    getGamepieceAtLocation,
    setGamepiecePositions,
  } = useGamepiecePositions(initialGamepiecePositions)
  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west, target }, i) => {
      const gamepieceId = getGamepieceAtLocation(col, row)
      return (
        <BoardTile
          key={`${col} ${row} ${gamepieceId}`}
          col={col}
          row={row}
          target={target}
          walls={{ north, east, south, west }}
          gamepieceId={gamepieceId}
          setGamepiecePositions={setGamepiecePositions}
          gamepiecePositions={gamepiecePositions}
        />
      )
    })

  return <BoardStyle>{tileComponents}</BoardStyle>
}

// Board.propTypes = {
//   gamepiecePositions: PropTypes.object.isRequired,
//   setGamepiecePositions: PropTypes.func.isRequired,
// }
