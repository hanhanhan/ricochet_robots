import React from "react"
import styled from "styled-components"

import { usePanelContext } from "./providers"
// import Gamepiece from "./gamepiece"
import { gamepieces } from "../gameLogic/gamepieces"

const StyledPanel = styled.dl`
  border: 1px solid orange;
  margin-right: 1em;
  ul {
    margin: 0;
  }
`

const Description = styled.dt``

const Value = styled.dd``

function Panel(props) {
  const { turnPlayerId, score, scoreHistory, moves } = usePanelContext()
  // const best = Object.keys(scoreHistory).map((id) => (
  //   <div>
  //     {gamepieces[id].icon} {scoreHistory[id] ? scoreHistory[id] : "-"}
  //   </div>
  // ))

  const best = scoreHistory

  console.log(best)
  return (
    <StyledPanel>
      <Description>Turn: </Description>
      <Value>{gamepieces[turnPlayerId].icon}</Value>
      <Description>Moves So Far: </Description>
      <Value>{score}</Value>
      <Description>Best Score: </Description>
      <Value>{}</Value>
    </StyledPanel>
  )
}

export default Panel
