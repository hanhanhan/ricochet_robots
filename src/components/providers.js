import React, { useReducer, createContext } from "react"
import { initialGamepiecePositions } from "../gameLogic/boardSetup"

const GameStateContext = createContext()
const GamepiecePositionsContext = createContext()
const PlayerContext = createContext()

const initialGamestate = {
  moves: [],
  turnPlayerId: 1,
  score: 0,
  scoreHistory: [],
  gamepiecePositions: initialGamepiecePositions,
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
      if (!action.gamepiecePositions) {
        throw Error("Move should be called with gamepiece positions.")
      }

      // if move is == second to last move, pop and reduce score
      //

      // Do I need to be careful of state mutation with hooks the same way with class components?
      // const lastMoveAt = moves.length - 1
      // a -> b
      // check if move is to a
      //
      // moves[lastMoveAt] === moves[lastMoveAt - 2]
      // const nextMoves = moves up through moves - 2
      // nextScore = score - 1
      // moves.push(action.nextGamepiecePositions)

      return {
        ...state,
        score: score + 1,
        gamepiecePositions: action.gamepiecePositions,
        moves,
      }
    }
    case "win": {
      let nextScore = 0
      let nextMoves = []
      let nextPlayerId = rotatePlayer(turnPlayerId)
      let nextScoreHistory = [...scoreHistory, { turnPlayerId: score + 1 }]
      // gamepiecePositions -- send winning piece back to start position
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

function usePlayerContext() {
  const context = React.useContext(PlayerContext)
  if (context === undefined) {
    throw new Error(
      "usePlayerContext must be used within a PlayerContextProvider"
    )
  }
  return context
}

function useGameStateContext() {
  const context = React.useContext(GameStateContext)
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider")
  }
  return context
}

function useGamepiecePositionsContext() {
  const context = React.useContext(GamepiecePositionsContext)
  if (context === undefined) {
    throw new Error(
      "useGamepiecePositions must be used within a GamepiecePositionsProvider"
    )
  }
  return context
}

const GamePlayProvider = ({ children }) => {
  const [gamestate, dispatch] = useReducer(moveReducer, initialGamestate)
  const {
    moves,
    turnPlayerId,
    score,
    scoreHistory,
    gamepiecePositions,
  } = gamestate

  return (
    <PlayerContext.Provider value={{ turnPlayerId, dispatch }}>
      {/* This provider is for updating from gamepiece / board / tile actions */}
      <GameStateContext.Provider
        value={{ turnPlayerId, gamepiecePositions, gamestate, dispatch }}
      >
        {/* Todo: Possibly combine gamepiecepositions + gamestate */}
        <GamepiecePositionsContext.Provider value={{ gamepiecePositions }}>
          {children}
        </GamepiecePositionsContext.Provider>
      </GameStateContext.Provider>
    </PlayerContext.Provider>
  )
}

export {
  GamePlayProvider,
  useGameStateContext,
  useGamepiecePositionsContext,
  usePlayerContext,
}
