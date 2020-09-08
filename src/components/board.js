import React, { useState } from "react"
import styled from "styled-components"

import { fullWidthGameBreakpoint } from "./css/shared"
import ErrorBoundary from "./errorBoundary"
import BoardTile from "./boardTile"
import { useGamepiecePositionsContext } from "./providers"
import { getTarget, dimensions, tiles } from "../gameLogic/boardSetup"
import { getUpdatedGraph, buildLookup } from "../gameLogic/gamepieces"

const BoardStyle = styled.div`
  width: 90vmin;
  height: 90vmin;
  display: grid;
  /* background-color: ${(props) => props.theme.color}; */
  border: ${(props) => props.theme.wallStyle};
  gap: 0;
  grid-template-columns: repeat(${dimensions.col}, 1fr);
  grid-template-rows: repeat(${dimensions.row}, 1fr);
  @media (min-width: ${fullWidthGameBreakpoint}){
    width: 75vmin;
    height: 75vmin;
  }
`

export default function Board() {
  const target = getTarget()
  const { gamepiecePositions } = useGamepiecePositionsContext()
  // Function to lookup id of an occupying gamepiece by tile col, row
  const positionToGamepiece = buildLookup(gamepiecePositions)
  const graph = getUpdatedGraph(gamepiecePositions)

  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west }, i) => {
      const gamepieceId = positionToGamepiece(col, row)
      const isTarget = target.row == row && target.col == col
      return (
        <BoardTile
          key={`${col} ${row} ${gamepieceId}`}
          col={col}
          row={row}
          isTarget={isTarget}
          walls={{ north, east, south, west }}
          gamepieceId={gamepieceId}
          graph={graph}
        />
      )
    })

  return (
    <ErrorBoundary>
      <BoardStyle>{tileComponents}</BoardStyle>
    </ErrorBoundary>
  )
}
