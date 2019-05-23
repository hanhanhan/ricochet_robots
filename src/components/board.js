import React from 'react'
import styled from 'styled-components'

import BoardTile from './boardtile'

// Game board dimensions
const DIMENSIONS = { x: 16, y: 16 }
/*
 Board configuration specific barrier locations are defined here.
 Indices refer to lines between tiles (0 is left edge of board). 
 Barrier locations are taken from page 3 of DriftingDroids user documentation.
*/
const horizontalBarriers = [
  [1, 4],
  [3, 1],
  [3, 11],
  [4, 0],
  [4, 6],
  [4, 15],
  [6, 2],
  [7, 7],
  [7, 8],
  [7, 10],
  [7, 13],
  [8, 5],
  [9, 7],
  [9, 8],
  [9, 12],
  [10, 1],
  [10, 15],
  [11, 4],
  [11, 10],
  [12, 0],
  [13, 5],
  [14, 3],
  [14, 9],
  [14, 14],
]

const verticalBarriers = [
  [0, 4],
  [0, 10],
  [1, 6],
  [1, 14],
  [2, 1],
  [2, 11],
  [4, 6],
  [6, 3],
  [6, 14],
  [7, 7],
  [7, 9],
  [7, 11],
  [8, 6],
  [8, 7],
  [8, 9],
  [9, 2],
  [9, 13],
  [10, 4],
  [10, 9],
  [13, 6],
  [13, 5],
  [14, 3],
  [14, 9],
  [15, 7],
  [15, 11],
]

/*
Board game - tile has up to 4 walls
tile has occupied state/component: empty, robot a/b/c/d
child component onclick, drag, moves component
*/

const tileLocations = []
for (let iY = 0; iY < DIMENSIONS.y; iY++) {
  for (let iX = 0; iX < DIMENSIONS.x; iX++) {
    tileLocations.push({
      x: iX,
      y: iY,
    })
  }
}

// Can travel
// same x or same y and wall

const BoardStyle = styled.div`
  width: 80vh;
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(${DIMENSIONS.x}, 2em);
  grid-template-rows: repeat(${DIMENSIONS.y}, 2em);
`

function Board(props) {
  const { gamepiecePosition, setGamepiecePosition } = props
  const tiles = tileLocations.map(({ x, y }, i) => {
    const occupied = x === gamepiecePosition.x && y === gamepiecePosition.y
    return (
      <BoardTile
        key={i}
        x={x}
        y={y}
        occupied={occupied}
        setGamepiecePosition={setGamepiecePosition}
      />
    )
  })

  return <BoardStyle>{tiles}</BoardStyle>
}

export default Board
