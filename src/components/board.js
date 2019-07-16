import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import BoardTile from './BoardTile'
import { dimensions, tileLocations, tileArray } from './BoardSetup'

const BoardStyle = styled.div`
  width: 80vh;
  height: 80vh;
  display: grid;
  border: 5px solid thistle;
  gap: 0;
  grid-template-columns: repeat(${dimensions.x}, 1fr);
  grid-template-rows: repeat(${dimensions.y}, 1fr);
`

export default function Board(props) {
  const { gamepiecePosition, setGamepiecePosition } = props
  const tiles = tileLocations.map(({ x, y, north, south, east, west }, i) => {
    const occupied = x === gamepiecePosition.x && y === gamepiecePosition.y
    return (
      <BoardTile
        key={`${x} ${y} ${occupied}`}
        x={x}
        y={y}
        walls={{ north, east, south, west }}
        occupied={occupied}
        setGamepiecePosition={setGamepiecePosition}
        gamepiecePosition={gamepiecePosition}
      />
    )
  })

  return <BoardStyle>{tiles}</BoardStyle>
}

Board.propTypes = {
  gamepiecePosition: PropTypes.object.isRequired,
  setGamepiecePosition: PropTypes.func.isRequired,
}
