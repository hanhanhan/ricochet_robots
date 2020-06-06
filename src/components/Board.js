import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import BoardTile from "./BoardTile"
import { dimensions, tiles } from "../gameLogic/BoardSetup"

const BoardStyle = styled.div`
  width: 95vmin;
  height: 95vmin;
  display: grid;
  border: 5px solid thistle;
  gap: 0;
  grid-template-columns: repeat(${dimensions.x}, 1fr);
  grid-template-rows: repeat(${dimensions.y}, 1fr);
`

export default function Board(props) {
  const { gamepiecePosition, setGamepiecePosition } = props
  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west, target }, i) => {
      const occupied =
        col === gamepiecePosition.col && row === gamepiecePosition.row
      return (
        <BoardTile
          key={`${col} ${row} ${occupied}`}
          col={col}
          row={row}
          target={target}
          walls={{ north, east, south, west }}
          occupied={occupied}
          setGamepiecePosition={setGamepiecePosition}
          gamepiecePosition={gamepiecePosition}
        />
      )
    })

  return <BoardStyle>{tileComponents}</BoardStyle>
}

Board.propTypes = {
  gamepiecePosition: PropTypes.object.isRequired,
  setGamepiecePosition: PropTypes.func.isRequired,
}
