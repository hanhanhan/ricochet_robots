import React from "react"
import { useDrop } from "react-dnd"
import styled from "styled-components"
import { DragTypes } from "./Constants"
import Gamepiece from "./gamepiece"
import { isValidMove } from "../gameLogic/gamepieces"

const wallStyle = "3px solid thistle"
const boardGridStyle = "2px solid snow"

const TileStyle = styled.div`
  background-color: ${(props) => props.bgColor};
  border-top: ${(props) => (props.walls.north ? wallStyle : boardGridStyle)};
  border-right: ${(props) => (props.walls.east ? wallStyle : boardGridStyle)};
  border-bottom: ${(props) => (props.walls.south ? wallStyle : boardGridStyle)};
  border-left: ${(props) => (props.walls.west ? wallStyle : boardGridStyle)};
  padding: 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

function BoardTile({
  col,
  row,
  gamepiecePositions,
  setGamepiecePositions,
  walls,
  gamepieceId,
  target,
  graph,
  setGraph,
}) {
  const [collectedProps, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: (item, monitor) => {
      const id = item.id
      const nextState = {}
      nextState[id] = { col, row }
      setGamepiecePositions({ ...gamepiecePositions, ...nextState })
    },
    canDrop: (item, monitor) => {
      const playerId = item.id
      const destCol = col
      const destRow = row

      return isValidMove({
        playerId,
        gamepiecePositions,
        destCol,
        destRow,
        graph,
      })
    },
    isDragging: (monitor) => {
      monitor.getItem().id
      const { col, row } = gamepiecePositions[id]
      const highlightPositions = graph[row][col]
      return highlightPositions
    },
    collect: (monitor, props) => {
      return {
        validDest: monitor.canDrop(),
      }
    },
  })

  const bgColor = getBackgroundColor(collectedProps.validDest, target)

  return (
    // bool converted to 1/0 due to this issue (becomes string instead of bool):
    // https://github.com/styled-components/styled-components/issues/1198
    <TileStyle
      walls={walls}
      bgColor={bgColor}
      target={target ? 1 : 0}
      ref={drop}
    >
      {gamepieceId ? <Gamepiece id={gamepieceId} /> : null}
    </TileStyle>
  )
}

function getBackgroundColor(validDest, target) {
  if (validDest && target) {
    return `gold`
  }
  if (validDest) {
    return `yellow`
  }
  if (target) {
    return `orange`
  }
  // Regular old tiles
  return `aliceblue`
}

export default BoardTile
