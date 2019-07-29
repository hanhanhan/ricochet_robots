import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { DragTypes } from './Constants'
import Gamepiece from './gamepiece'
import { tiles } from './BoardSetup'

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

const checkEast = () => true

const checkWest = () => true

const checkNorth = (x, y) => true

const checkSouth = () => true

// React Drag n Drop Setup
const spec = {
  drop: props => {
    props.setGamepiecePosition({ x: props.x, y: props.y })
  },
  canDrop: props => {
    // NOTE: props.x and props.y are drop tile positions
    const { x: destX, y: destY } = props.gamepiecePosition

    // Check game piece is in same row or column as drop target location
    // If not, early return!
    if (!(destX === props.x || destY === props.y)) {
      return false
    }

    // find nearest wall to the south,
    // for a drop target to south (in same column)
    if (destX === props.x && props.y > destY) {
      checkNorth(destX, destY)
    }

    console.log('can drop?')
    console.log('tile x y', props.x, ' ', props.y)
    console.log(destX, destY)

    // Check location of wall in same row, col, to north, south, east, west
    return checkWest() && checkEast()
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}


function BoardTile({
  x,y, // tile position
  gamepiecePosition,
  setGamepiecePosition,
  walls,
  occupied,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: dropProp => {
      setGamepiecePosition({x,y})
    },
  })

  return (
    <TileStyle walls={walls} ref={drop}>
      {occupied ? <Gamepiece /> : null}
    </TileStyle>
  )
}

export default BoardTile
