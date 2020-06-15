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

function useGamepiecePositions(
  initialGamepiecePositions = initialGamepiecePositions
) {
  const [gamepiecePositions, setGamepiecePositions] = useState(
    initialGamepiecePositions
  )

  return [gamepiecePositions, setGamepiecePositions]
}

export default function Board(props) {
  const [gamepiecePositions, setGamepiecePositions] = useGamepiecePositions(
    initialGamepiecePositions
  )
  const positionToId = lookupGamepieceFromPosition(gamepiecePositions)
  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west, target }, i) => {
      const key = gamepieceLocationKey(col, row)
      const positionToId = lookupGamepieceFromPosition(gamepiecePositions)
      const gamepieceId = positionToId.get(key)
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
