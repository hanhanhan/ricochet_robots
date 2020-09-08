import React from "react"
import styled from "styled-components"
import { fullWidthGameBreakpoint } from "./css/shared"
import { usePanelContext } from "./providers"
import { gamepieces } from "../gameLogic/gamepieces"

const StyledPanel = styled.dl`
  margin-top: 1em;
  @media (min-width: ${fullWidthGameBreakpoint}) {
    margin: 0rem;
    margin-left: 1rem;
  }
`
// Using a div here is controversial but best solution to me.
// https://github.com/whatwg/html/issues/1937
const PanelItem = styled.div`
  margin: 0.2rem;
`
const Description = styled.dt`
  display: inline;
`
const Value = styled.dd`
  display: inline;
`

function Panel(props) {
  const { turnPlayerId, score, scoreHistory, moves } = usePanelContext()
  const best = Object.entries(scoreHistory)
    // Best score listed first
    .sort(([_, score1], [__, score2]) => score1 < score2)
    .map(([id, score]) => {
      const hasValue = score < Number.MAX_SAFE_INTEGER && score
      return (
        <li key={id}>
          {gamepieces[id].icon} {hasValue ? score : "-"}
        </li>
      )
    })

  return (
    <StyledPanel>
      <PanelItem>
        <Description>Turn: </Description>
        <Value>{gamepieces[turnPlayerId].icon}</Value>
      </PanelItem>
      <PanelItem>
        <Description>Moves So Far: </Description>
        <Value>{score}</Value>
      </PanelItem>
      <PanelItem>
        <Description>Best Score: </Description>
        <Value>
          <ul>{best}</ul>
        </Value>
      </PanelItem>
    </StyledPanel>
  )
}

export default Panel
