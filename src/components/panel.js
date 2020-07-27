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
  const best = Object.entries(scoreHistory)
    .sort(([id1, score1], [id2, score2]) => score1 < score2)
    .map(([id, score]) => {
      const hasValue = score < Number.MAX_SAFE_INTEGER && score
      return (
        <div key={id}>
          {gamepieces[id].icon} {hasValue ? score : "-"}
        </div>
      )
    })

  return (
    <StyledPanel>
      <Description>Turn: </Description>
      <Value>{gamepieces[turnPlayerId].icon}</Value>
      <Description>Moves So Far: </Description>
      <Value>{score}</Value>
      <Description>Best Score: </Description>
      <Value>{best}</Value>
    </StyledPanel>
  )
}

export default Panel
