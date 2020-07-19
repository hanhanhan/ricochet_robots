import React, { useReducer, useState, createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Board from "./board"
import Panel from "./panel"
// Required ? deleting this makes dnd not work -- no errors -- why?
import gamepieces from "../gameLogic/gamepieces"
import { func } from "prop-types"
import { turn } from "core-js/fn/dict"

const PlayerContext = createContext()
const GameStateContext = createContext()

const initialGamestate = {
  moves: [],
  turnPlayerId: 1,
  score: 0,
}

function moveReducer(state, action) {
  switch (action.type) {
    case "move": {
      // push move onto list of moves - then check it's not undoing and pop operation
      return { ...state, score: state.score + 1 }
    }
    case "win": {
      return { ...state }
    }
    case "restart": {
      return { ...state }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const usePlayerTurn = () => {
  const [myTurn, setMyTurn] = React.useState(1)
  return { myTurn, setMyTurn }
}

const GamePlayProvider = ({ children }) => {
  const { myTurn, setMyTurn } = usePlayerTurn()
  const [gamestate, dispatch] = useReducer(moveReducer, initialGamestate)

  return (
    <GameStateContext.Provider>
      <PlayerContext.Provider
        value={{ myTurn, setMyTurn, gamestate, dispatch }}
      >
        {children}
      </PlayerContext.Provider>
    </GameStateContext.Provider>
  )
}

/*
update score
win game
next gamepiece turn
reset move history
update history player / score

update score
update move history

history player/score
*/

function Game(props) {
  // Gamepiece id for current main player
  return (
    <DndProvider backend={HTML5Backend}>
      <GamePlayProvider>
        <Board />
        <Panel />
      </GamePlayProvider>
    </DndProvider>
  )
}

// export default Game
export { Game, usePlayerTurn, PlayerContext }
