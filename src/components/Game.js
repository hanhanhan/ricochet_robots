import React, { useReducer, useState, createContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styled from "styled-components"
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
  // console.log("state")
  // console.log(state)
  // console.log("action:")
  // console.log(action)
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

function useGameState() {
  const context = React.useContext(GameStateContext)
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider")
  }
  return context
}

const GamePlayProvider = ({ children }) => {
  const { myTurn, setMyTurn } = usePlayerTurn()
  const [gamestate, dispatch] = useReducer(moveReducer, initialGamestate)

  return (
    <PlayerContext.Provider value={{ myTurn, setMyTurn, gamestate, dispatch }}>
      <GameStateContext.Provider value={{ myTurn, gamestate, dispatch }}>
        {children}
      </GameStateContext.Provider>
    </PlayerContext.Provider>
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

const Layout = styled.div`
  display: flex;
`

function Game(props) {
  // Gamepiece id for current main player
  return (
    <DndProvider backend={HTML5Backend}>
      <GamePlayProvider>
        <Layout>
          <Panel />
          <Board />
        </Layout>
      </GamePlayProvider>
    </DndProvider>
  )
}

// export default Game
export { Game, PlayerContext, GameStateContext, useGameState }
