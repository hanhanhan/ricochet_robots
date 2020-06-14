import React from "react"
import { useDrop } from "react-dnd"
import styled from "styled-components"
import { DragTypes } from "./Constants"
import Gamepiece from "./gamepiece"
import {
  isValidMove,
  isEqualLocation,
  sameRowOrCol,
} from "../gameLogic/gamepieces"
import { tiles, dimensions } from "../gameLogic/BoardSetup"
import graph from "../gameLogic/BoardGraph"

const wallStyle = "3px solid thistle"
const boardGridStyle = "2px solid snow"

const TileStyle = styled.div`
  background-color: ${(props) => (props.target ? `orange` : `aliceblue`)};
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
}) {
  const [collectedProps, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: (item, monitor) => {
      const id = item.id
      const nextState = {}
      nextState[id] = { col, row }
      setGamepiecePositions(nextState)
    },
    canDrop: (item, monitor) => {
      return true
      // return isValidMove(gamepiecePositions, col, row)
    },
    end: (item, monitor) => {
      // update graph here
    },
    collect: (monitor) => ({
      id: monitor.getItem(),
    }),
  })
  // if (collectedProps.id) {
  //   // console.log("collectedProps", collectedProps)
  // }
  return (
    // target converted due to this issue (becomes string instead of bool):
    // https://github.com/styled-components/styled-components/issues/1198
    <TileStyle walls={walls} target={target ? 1 : 0} ref={drop}>
      {gamepieceId ? <Gamepiece id={gamepieceId} /> : null}
    </TileStyle>
  )
}

export default BoardTile
