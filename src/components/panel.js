import React from "react"
import styled from "styled-components"

import { usePanelContext } from "./providers"
// import Gamepiece from "./gamepiece"
import { gamepieces } from "../gameLogic/gamepieces"

const StyledPanel = styled.div``
const PanelItem = styled.li``

function Panel(props) {
  // const { myTurn, gamestate, dispatch } = React.useContext(GamePlayContext)
  const { turnPlayerId, score, scoreHistory, moves } = usePanelContext()
  return (
    <StyledPanel>
      Panel
      <ul>
        <PanelItem>Turn: {gamepieces[turnPlayerId].icon}</PanelItem>
        <PanelItem>Score: {score}</PanelItem>
        {/* <PanelItem>Moves: {JSON.stringify(moves)}</PanelItem> */}
      </ul>
    </StyledPanel>
  )
}

export default Panel
