import React from "react"
import styled from "styled-components"

import { GameStateContext, useGameState } from "./game"
import { usePlayerState } from "./boardTile"
// import Gamepiece from "./gamepiece"
import { gamepieces } from "../gameLogic/gamepieces"

const Display = styled.li``

function Panel(props) {
  // const { myTurn, gamestate, dispatch } = React.useContext(GameStateContext)
  const { myTurn, gamestate, dispatch } = useGameState()
  console.log("gamestate")
  console.log(gamestate)
  const { score } = useGameState(GameStateContext)
  return (
    <div>
      Panel
      <ul>
        <Display>Turn: {gamepieces[myTurn].icon}</Display>
        <Display>Score: {gamestate.score}</Display>
      </ul>
    </div>
  )
}

export default Panel
