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
    drop: dropProp => {
      console.log(graph)
      setGamepiecePosition({ x, y })
    },
    canDrop: () => {
      if (!sameRowOrCol(pieceX, pieceY, x, y)) {
        return false
      }
      // check walls to East
      // if (tileX > pieceX && tileY === pieceY){
      // checkEast(pieceX, pieceY, tileX, tileY)
      // }
      return true
    },
  })

  return (
    <TileStyle walls={walls} ref={drop}>
      {occupied ? <Gamepiece /> : null}
    </TileStyle>
  )
}

export default BoardTile
