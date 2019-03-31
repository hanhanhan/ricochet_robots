import React from 'react'
import { FaRobot } from "react-icons/fa"
import { DragSource } from 'react-dnd'

export const gamepieceTypes = {
    ROBOT: 'robot',
  }

const gamepieceSource = {
    beginDrag(props) {
      return {}
    },
  }
  
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function Gamepiece({ connectDragSource, isDragging, ...props }){
    // const robotEventHandler = (e) => { console.log(e) }
    // return <FaRobot color="blue" onClick={props.updateRobotPosition} />
    return connectDragSource(
    <div
    style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
      <FaRobot color="blue" size={62} />
    </div>,
    )
}

export default DragSource(gamepieceTypes.ROBOT, gamepieceSource, collect)(Gamepiece)