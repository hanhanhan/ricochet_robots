import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import BoardTile from "./BoardTile"
import { dimensions, target, tiles } from "./BoardSetup"

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
    .map(({ x, y, north, south, east, west }, i) => {
      const occupied = x === gamepiecePosition.x && y === gamepiecePosition.y
      const isTarget = x === target.x && y === target.y
      return (
        <BoardTile
          key={`${x} ${y} ${occupied}`}
          isTarget={isTarget}
          x={x}
          y={y}
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
