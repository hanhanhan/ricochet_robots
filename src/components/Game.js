import React, { useReducer, useState, createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Board from "./board"
// Required ? deleting this makes dnd not work -- no errors -- why?
import gamepieces from "../gameLogic/gamepieces"
import { func } from "prop-types"

function Game(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  )
}

export default Game
