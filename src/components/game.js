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
  scoreHistory: [],
}

function rotatePlayer(id) {
  let playerCount = 3
  const next = id + 1
  return next > playerCount ? 1 : next
}

function moveReducer(state, action) {
  const { moves, turnPlayerId, score, scoreHistory } = state
  switch (action.type) {
    case "move": {
      // push move onto list of moves - then check it's not undoing and pop operation
      // moves.push({id: [position]})
      return { ...state, score: score + 1 }
    }
    case "win": {
      let nextScore = 0
      let nextMoves = []
      let nextPlayerId = rotatePlayer(turnPlayerId)
      let nextScoreHistory = [...scoreHistory, { turnPlayerId: score + 1 }]
      return {
        ...state,
        moves: nextMoves,
        score: nextScore,
        scoreHistory: nextScoreHistory,
        turnPlayerId: nextPlayerId,
      }
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
  const [gamestate, dispatch] = useReducer(moveReducer, initialGamestate)
  const { moves, turnPlayerId, score, scoreHistory } = gamestate

  return (
    <PlayerContext.Provider value={{ turnPlayerId, dispatch }}>
      <GameStateContext.Provider value={{ turnPlayerId, gamestate, dispatch }}>
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
