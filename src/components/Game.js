import React, { useState, createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Board from "./board"

const initialGamepiecePosition = { x: 0, y: 0 }
const BoardStateContext = createContext({
  gamepieceA: { x: 0, y: 0 },
  gamepieceB: { x: 0, y: 0 },
  gamepieceC: { x: 0, y: 0 },
})

// Positions of each of 4  robots
// Locations robots can be moved to in one direction of travel
// Locations robots can be moved to in multiple directions of travel

function Game(props) {
  const [gamepiecePosition, setGamepiecePosition] = useState(
    initialGamepiecePosition
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Board
        gamepiecePosition={gamepiecePosition}
        setGamepiecePosition={setGamepiecePosition}
      />
    </DndProvider>
  )
}

export default Game
