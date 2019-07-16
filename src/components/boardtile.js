import React from 'react'
import { DropTarget } from 'react-dnd'

import { DragTypes } from './Constants'
import Gamepiece from './gamepiece'
import { tileLocations } from './BoardSetup'

const checkEast = () => true

const checkWest = () => true

const checkNorth = () => true

const checkSouth = () => true

// React Drag n Drop Setup
const spec = {
  drop: props => {
    props.setGamepiecePosition({ x: props.x, y: props.y })
  },
  canDrop: props => {
    const [x, y] = props.gamepiecePosition
    // Check game piece is in same row or column as drop target location
    // if (!(x === props.x || y === props.y)) {
    //   console.log('false!')
    //   return false
    // }
    console.log('tile x y', props.x, ' ', props.y)
    console.log(x, y)

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

const wallStyle = '3px solid thistle'
const boardGridStyle = '2px solid snow'

function BoardTile(props) {
  return props.connectDropTarget(
    <div
      // Note: don't use a styled component here -- React DND needs to wrap a native html element
      style={{
        backgroundColor: 'aliceblue',
        borderTop: props.walls.north ? wallStyle : boardGridStyle,
        borderRight: props.walls.east ? wallStyle : boardGridStyle,
        borderBottom: props.walls.south ? wallStyle : boardGridStyle,
        borderLeft: props.walls.west ? wallStyle : boardGridStyle,
        padding: '0.5em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: '1',
      }}
    >
      {props.occupied ? <Gamepiece /> : null}
    </div>
  )
}

export default DropTarget(DragTypes.GAMEPIECE, spec, collect)(BoardTile)
