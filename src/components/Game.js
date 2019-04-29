import React, { useState } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Board from './board'

const initialGamepiecePosition = { x: 0, y: 0 }

function Game(props) {
  const [gamepiecePosition, setGamepiecePosition] = useState(
    initialGamepiecePosition
  )

  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <Board
        gamepiecePosition={gamepiecePosition}
        setGamepiecePosition={() => {
          setGamepiecePosition({ x: 5, y: 4 })
        }}
      />
    </DragDropContextProvider>
  )
}

export { Game }
