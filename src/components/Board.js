import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import BoardTile from "./BoardTile"
import { dimensions, tiles } from "./BoardSetup"

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
    .map(({ x, y, north, south, east, west, target }, i) => {
      const occupied = x === gamepiecePosition.x && y === gamepiecePosition.y
      return (
        <BoardTile
          key={`${x} ${y} ${occupied}`}
          x={x}
          y={y}
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
