import React from "react"
import { FaRobot } from "react-icons/fa"
import { useDrag } from "react-dnd"
import { DragTypes } from "./Constants"
// NOTE: CSS issue for dragging
// http://react-dnd.github.io/react-dnd/docs/api/drag-source

const gamepieceSource = {
  beginDrag(props) {
    return {}
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
  }
}

function Gamepiece(props) {
  const id = 1
  const [collectedProps, drag] = useDrag({
    item: { id, type: DragTypes.GAMEPIECE },
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
      🤖
    </div>
  )
}

export default Gamepiece
