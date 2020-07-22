import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import ErrorBoundary from "./errorBoundary"
import BoardTile from "./boardTile"
import { useGamepiecePositionsContext } from "./providers"
import { getTarget, dimensions, tiles } from "../gameLogic/boardSetup"
import { getUpdatedGraph, buildLookup } from "../gameLogic/gamepieces"

const BoardStyle = styled.div`
  width: 95vmin;
  height: 95vmin;
  display: grid;
  border: 5px solid thistle;
  gap: 0;
  grid-template-columns: repeat(${dimensions.col}, 1fr);
  grid-template-rows: repeat(${dimensions.row}, 1fr);
`

export default function Board(props) {
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
