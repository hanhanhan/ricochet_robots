import React, { useState } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './board'

const initialGamepiecePosition = { x: 0, y: 0 }

function Game(props) {
  const [gamepiecePosition, setGamepiecePosition] = useState(
    initialGamepiecePosition
  )

  return (
    <Board
      gamepiecePosition={gamepiecePosition}
      setGamepiecePosition={setGamepiecePosition}
    />
  )
}

export default DragDropContext(HTML5Backend)(Game)
