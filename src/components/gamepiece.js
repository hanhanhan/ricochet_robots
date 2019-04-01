import React from 'react'
import { FaRobot } from "react-icons/fa"
import { DragSource } from 'react-dnd'
import { DragTypes } from './Constants'
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
    isDragging: monitor.isDragging(),
  }
}

function Gamepiece({ connectDragSource, isDragging, ...props }){
    // const robotEventHandler = (e) => { console.log(e) }
    // return <FaRobot color="blue" onClick={props.updateRobotPosition} />
    return connectDragSource(
    <div
    style={{
        boxShadow: isDragging? "0 0 10px 5px #0ff" : "none", 
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
      <FaRobot color="blue" size={62} />
    </div>,
    )
}

export default DragSource(DragTypes.GAMEPIECE, gamepieceSource, collect)(Gamepiece)