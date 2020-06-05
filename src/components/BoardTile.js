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
  x,
  y,
  gamepiecePosition,
  setGamepiecePosition,
  walls,
  occupied,
  target,
}) {
  const { x: pieceX, y: pieceY } = gamepiecePosition

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DragTypes.GAMEPIECE,
    drop: (item, monitor) => {
      setGamepiecePosition({ x, y })
    },
    canDrop: (item, monitor) => {
      return isValidMove(gamepiecePosition, x, y)
    },
    end: (item, monitor) => {
      // update graph here
    },
  })

  return (
    // target converted due to this issue (becomes string instead of bool):
    // https://github.com/styled-components/styled-components/issues/1198
    <TileStyle walls={walls} target={target ? 1 : 0} ref={drop}>
      {occupied ? <Gamepiece /> : null}
    </TileStyle>
  )
}

export default BoardTile
