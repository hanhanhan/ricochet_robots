import React from "react"
import { FaRobot } from "react-icons/fa"
import { useDrag } from "react-dnd"
import { DragTypes } from "./Constants"
import { gamepieces } from "../gameLogic/gamepieces"
// NOTE: CSS issue for dragging
// http://react-dnd.github.io/react-dnd/docs/api/drag-source

const gamepieceSource = {
  beginDrag(props) {
    return { hopskotch: "mole" }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

function Gamepiece({ id, ...props }) {
  const [collectedProps, drag] = useDrag({
    item: { id, type: DragTypes.GAMEPIECE },
    collect: (monitor, props) => ({
      exampley: "moledcollectgamepiece",
      mon: monitor.getItem(),
      collProps: props,
    }),
  })

  return (
    <div
      ref={drag}
      style={{
        boxShadow: "0 0 10px 5px #0ff",
        fontSize: "1em",
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      {gamepieces[id].icon}
    </div>
  )
}

export default Gamepiece
