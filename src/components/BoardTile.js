import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { DragTypes } from './Constants'
import Gamepiece from './gamepiece'
import { tiles, dimensions } from './BoardSetup'
import graph from './BoardGraph'

const wallStyle = '3px solid thistle'
const boardGridStyle = '2px solid snow'

const TileStyle = styled.div`
  background-color: aliceblue;
  border-top: ${props => (props.walls.north ? wallStyle : boardGridStyle)};
  border-right: ${props => (props.walls.east ? wallStyle : boardGridStyle)};
  border-bottom: ${props => (props.walls.south ? wallStyle : boardGridStyle)};
  border-left: ${props => (props.walls.west ? wallStyle : boardGridStyle)};
  padding: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const isEqualLocation = (A, B) => {
  const [xA, yA] = A
  const [xB, yB] = B
  return xA == xB && yA == yB
}

const sameRowOrCol = (startX, startY, destX, destY) => {
  // Check game piece is in same row or column as drop target location
  // If not, early return!
  if (startX === destX || startY === destY) {
    return true
  }
  return false
}

function BoardTile({
  x,
  y,
  gamepiecePosition,
  setGamepiecePosition,
  walls,
  occupied,
}) {
  const { x: pieceX, y: pieceY } = gamepiecePosition

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: (item, monitor) => {
      setGamepiecePosition({ x, y })
    },
    canDrop: (item, monitor) => {
      // Early return
      if (!sameRowOrCol(pieceX, pieceY, x, y)) {
        return false
      }
      // Get valid locations gamepiece can travel to from current location.
      const { north, south, east, west } = graph[pieceY][pieceX]
      const compareTargetLocation = isEqualLocation.bind(null, [y, x])
      // Check if any of 4 possible travel directions is drop target.
      return [north, south, east, west].some(compareTargetLocation)
    },
    end: (item, monitor) => {
      // update graph here
    }
  })

  return (
    <TileStyle walls={walls} ref={drop}>
      {occupied ? <Gamepiece /> : null}
    </TileStyle>
  )
}

export default BoardTile