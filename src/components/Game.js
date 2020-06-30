import React, { useReducer, useState, createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Board from "./board"
// Required ? deleting this makes dnd not work -- no errors -- why?
import gamepieces from "../gameLogic/gamepieces"
import { func } from "prop-types"

const PlayerContext = createContext()

function Game(props) {
  // Gamepiece id for current main player
  const [myTurn, setMyTurn] = React.useState(1)
  return (
    <DndProvider backend={HTML5Backend}>
      <PlayerContext.Provider value={{ myTurn, setMyTurn }}>
        <Board />
      </PlayerContext.Provider>
    </DndProvider>
  )
}

// export default Game
export { Game, PlayerContext }
