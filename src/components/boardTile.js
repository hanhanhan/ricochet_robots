import React from "react"
import { useDrop } from "react-dnd"
import styled from "styled-components"

import { DragTypes } from "./Constants"
import Gamepiece from "./gamepiece"
import { isValidMove } from "../gameLogic/gamepieces"
import { useGamePlayContext, useTheme } from "./providers"

const TileStyle = styled.div`
  background-color: ${(props) => props.bgColor};
  border-top: ${(props) =>
    props.walls.north ? props.theme.wallStyle : props.theme.boardGridStyle};
  border-right: ${(props) =>
    props.walls.east ? props.theme.wallStyle : props.theme.boardGridStyle};
  border-bottom: ${(props) =>
    props.walls.south ? props.theme.wallStyle : props.theme.boardGridStyle};
  border-left: ${(props) =>
    props.walls.west ? props.theme.wallStyle : props.theme.boardGridStyle};
  padding: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

function BoardTile({ row, col, walls, gamepieceId, isTarget, graph }) {
  const { turnPlayerId, dispatch, gamepiecePositions } = useGamePlayContext()
  const { tiles: tileStyles } = useTheme()

  const [collectedProps, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: (item, monitor) => {
      const id = item.id
      const nextState = {}
      nextState[id] = { row, col }
      const nextGamepiecePositions = { ...gamepiecePositions, ...nextState }
      if (isTarget) {
        dispatch({ type: "win" })
      } else {
        dispatch({ type: "move", gamepiecePositions: nextGamepiecePositions })
      }
    },
    canDrop: (item, monitor) => {
      const playerId = item.id
      const destRow = row
      const destCol = col

      return isValidMove({
        playerId,
        turnPlayerId,
        gamepiecePositions,
        destCol,
        destRow,
        isTarget,
        graph,
      })
    },
    isDragging: (monitor) => {
      monitor.getItem().id
      const { row, col } = gamepiecePositions[id]
      const highlightPositions = graph[row][col]
      return highlightPositions
    },
    collect: (monitor, props) => {
      return {
        validDest: monitor.canDrop(),
      }
    },
  })

  const bgColor = getBackgroundColor(
    collectedProps.validDest,
    isTarget,
    tileStyles
  )

  return (
    // bool converted to 1/0 due to this issue (becomes string instead of bool):
    // https://github.com/styled-components/styled-components/issues/1198
    <TileStyle
      walls={walls}
      bgColor={bgColor}
      isTarget={isTarget ? 1 : 0}
      ref={drop}
      role="gridcell"
    >
      {gamepieceId ? <Gamepiece id={gamepieceId} /> : null}
    </TileStyle>
  )
}

function getBackgroundColor(validDest, isTarget, tileColors) {
  const { tileColor, tileDestColor, tileWinColor, tileTargetColor } = tileColors

  if (validDest && isTarget) {
    return tileWinColor
  }
  if (validDest) {
    return tileDestColor
  }
  if (isTarget) {
    return tileTargetColor
  }
  // Regular old tiles
  return tileColor
}

export default BoardTile
