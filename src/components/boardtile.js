import React from 'react'
import { DropTarget } from 'react-dnd'

import { DragTypes } from './Constants'
import Gamepiece from './gamepiece'

// React Drag n Drop Setup
const spec = {
  drop: props => {
    props.setGamepiecePosition({ x: props.x, y: props.y })
  },
  canDrop: props => {
    console.log('can drop?', props)
    return props.x < 3
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

function BoardTile(props) {
  return props.connectDropTarget(
    <div
      style={{
        backgroundColor: 'linen',
        margin: '2px',
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
