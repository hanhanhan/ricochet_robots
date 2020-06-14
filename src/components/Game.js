import React, { useReducer, useState, createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Board from "./board"
// Required ? deleting this makes dnd not work -- no errors -- why?
import gamepieces from "../gameLogic/gamepieces"
import { func } from "prop-types"

const initialGamepiecePositions = {
  1: { col: 2, row: 0 },
  2: { col: 5, row: 1 },
  3: { col: 8, row: 2 },
}

function reducer(state, action) {
  console.log("reducer called")
  console.log(state)
  console.log(action)
  return state
}

function Game(props) {
  const [gamepiecePositions, setGamepiecePositions] = useReducer(
    reducer,
    initialGamepiecePositions
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Board
        gamepiecePositions={gamepiecePositions}
        setGamepiecePositions={setGamepiecePositions}
      />
    </DndProvider>
  )
}

export default Game
