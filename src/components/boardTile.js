import React from "react"
import { useDrop } from "react-dnd"
import styled from "styled-components"
import { DragTypes } from "./Constants"
import Gamepiece from "./gamepiece"
import { isValidMove } from "../gameLogic/gamepieces"
import { PlayerContext } from "./Game"

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
  row,
  col,
  gamepiecePositions,
  setGamepiecePositions,
  walls,
  gamepieceId,
  isTarget,
  graph,
}) {
  const { myTurn, setMyTurn } = React.useContext(PlayerContext)
  const [collectedProps, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: (item, monitor) => {
      console.log("drop called from useDrop hook")
      const id = item.id
      const nextState = {}
      nextState[id] = { row, col }
      setGamepiecePositions({ ...gamepiecePositions, ...nextState })
    },
    canDrop: (item, monitor) => {
      const playerId = item.id
      const destRow = row
      const destCol = col

      return isValidMove({
        playerId,
        myTurn,
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
        m: monitor,
      }
    },
  })

  const bgColor = getBackgroundColor(collectedProps.validDest, isTarget)

  return (
    // bool converted to 1/0 due to this issue (becomes string instead of bool):
    // https://github.com/styled-components/styled-components/issues/1198
    <TileStyle
      walls={walls}
      bgColor={bgColor}
      isTarget={isTarget ? 1 : 0}
      role="gridcell"
      ref={drop}
      // onDrop={(event) => {
      // console.log(event.dataTransfer)
      // console.log(event.dataTransfer.items[0])
      // DataTransferItem
      //   kind: "string"
      //   type: "application/json"
      // console.log(event.dataTransfer.types[0])
      // console.log(JSON.stringify(event.dataTransfer.getData("text")))
      // application/json
      // }}
      className={`row${row} col${col}`}
    >
      {gamepieceId ? <Gamepiece id={gamepieceId} /> : null}
    </TileStyle>
  )
}

function getBackgroundColor(validDest, isTarget) {
  if (validDest && isTarget) {
    return `gold`
  }
  if (validDest) {
    return `yellow`
  }
  if (isTarget) {
    return `orange`
  }
  // Regular old tiles
  return `aliceblue`
}

export default BoardTile
