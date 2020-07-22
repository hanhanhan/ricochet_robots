import React from "react"
import styled from "styled-components"

import { GameStateContext, useGameStateContext } from "./providers"
import { usePlayerState } from "./boardTile"
// import Gamepiece from "./gamepiece"
import { gamepieces } from "../gameLogic/gamepieces"

const Display = styled.li``

function Panel(props) {
  // const { myTurn, gamestate, dispatch } = React.useContext(GameStateContext)
  const { turnPlayerId, gamestate, dispatch } = useGameStateContext()
  console.log("gamestate")
  console.log(gamestate)
  const { score } = gamestate
  return (
    <div>
      Panel
      <ul>
        <Display>Turn: {gamepieces[turnPlayerId].icon}</Display>
        <Display>Score: {gamestate.score}</Display>
        <Display>Moves: </Display>
      </ul>
    </div>
  )
}

export default Panel
