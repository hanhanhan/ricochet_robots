import React, { useReducer, createContext } from "react"
import { initialGamepiecePositions } from "../gameLogic/boardSetup"
import { gamepieces } from "../gameLogic/gamepieces"

const GamePlayContext = createContext()
const GamepiecePositionsContext = createContext()
const PanelContext = createContext()

/**
 *
 * Sort and give gamepieces scores.
 * Low is "winning" so start with a large number that won't be displayed.
 * @returns Map
 */
function getInitialGampieceScores() {
  const sortedIdPairs = Object.keys(gamepieces)
    .sort()
    .map(
      (id) => [id, Number.MAX_SAFE_INTEGER] // big enough and a few less bits
    )
  return new Map(sortedIdPairs)
}

const initialGamestate = {
  moves: [],
  turnPlayerId: 1,
  score: 0,
  scoreHistory: getInitialGampieceScores(), //from gamepieces to Number.MAX_VALUE
  gamepiecePositions: initialGamepiecePositions,
}

function moveReducer(state, action) {
  const { moves, turnPlayerId, score, scoreHistory } = state
  switch (action.type) {
    case "move": {
      // Track moves
      let { gamepiecePositions } = action
      if (!gamepiecePositions) {
        throw Error("Move should be called with gamepiece positions.")
      }
      const length = moves.length

      if (length > 0) {
        isMoveBack = areSameGamepieceLocations(
          gamepiecePositions,
          moves[length - 1]
        )
      } else {
        var isMoveBack = false
      }

      // Note: Not a deep copy (even though this is not Redux) per:
      // https://twitter.com/dan_abramov/status/688087202312491008
      // https://stackoverflow.com/questions/43151622/in-redux-is-it-necessary-to-do-deep-copy
      if (isMoveBack) {
        var nextMoves = moves.slice(0, length - 1)
        var nextScore = score - 1
      } else {
        var nextMoves = [...moves, gamepiecePositions]
        var nextScore = score + 1
      }

      return {
        ...state,
        score: nextScore,
        gamepiecePositions: action.gamepiecePositions,
        moves: nextMoves,
      }
    }

    case "win": {
      let nextPlayerId = rotatePlayer(turnPlayerId)
      let nextScoreHistory = updateBestScores(
        scoreHistory,
        turnPlayerId,
        score + 1
      )
      // TODO: add gamepiecePositions -- send winning piece back to start position
      return {
        ...state,
        moves: [],
        score: 0,
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

function usePanelContext() {
  const context = React.useContext(PanelContext)
  if (context === undefined) {
    throw new Error(
      "usePanelContext must be used within a PanelContextProvider"
    )
  }
  return context
}

function useGamePlayContext() {
  const context = React.useContext(GamePlayContext)
  if (context === undefined) {
    throw new Error("useGamePlay must be used within a GamePlayProvider")
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
    // Todo: possibly combine providers if state overlaps enough
    <PanelContext.Provider value={{ turnPlayerId, score, scoreHistory, moves }}>
      <GamePlayContext.Provider
        value={{ turnPlayerId, gamepiecePositions, gamestate, dispatch }}
      >
        <GamepiecePositionsContext.Provider value={{ gamepiecePositions }}>
          {children}
        </GamepiecePositionsContext.Provider>
      </GamePlayContext.Provider>
    </PanelContext.Provider>
  )
}

/*******************************************************************************
 * Helper functions
 */

/**
 *
 * Next player -- cycles back to first player.
 * @param {Number} id
 * @returns Number
 */
function rotatePlayer(id) {
  let playerCount = 3
  const next = id + 1
  return next > playerCount ? 1 : next
}

/**
 *
 * Check if row and column of two gamepiece locations are equal.
 * @param {Object} loc1
 * @param {Object} loc2
 * @returns boolean
 */
function areSameGamepieceLocations(loc1, loc2) {
  // Stringify won't work if order is different
  // There's a lodash isEqual function or I could write my own
  // Compare as two hashes stored in moves array? Two strings?
  // JSON.stringify(loc1) === JSON.stringify(loc2)
  for (let [id, [row1, col1]] of Object.entries(loc1)) {
    let [row2, col2] = loc2[id]

    if (!(row2 == row1 && col2 == col1)) {
      return false
    }
    return true
  }
}

/**
 *
 * Help keep track of each player's lowest score for all rounds.
 * @param {Map} scoreHistory
 * @param {Object} newScore
 * returns Map
 */
function updateBestScores(scoreHistory, id, newScore) {
  let oldScore = scoreHistory.get(`${id}`)
  console.log(oldScore, "oldscore")
  console.log(newScore, "newscore")
  if (oldScore > newScore) {
    console.log("updating score history")
    const nextScoreHistory = new Map(scoreHistory).set(id, newScore)
    return nextScoreHistory
  } else {
    return scoreHistory
  }
}

/******************************************************************************/

export {
  GamePlayProvider,
  useGamePlayContext,
  useGamepiecePositionsContext,
  usePanelContext,
}
