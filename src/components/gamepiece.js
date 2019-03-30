import React from 'react'
import { FaRobot } from "react-icons/fa"
import { ItemTypes } from './Constants'
import { DragSource } from 'react-dnd'

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

function GamePiece({ connectDragSource, isDragging, ...props }){
    // const robotEventHandler = (e) => { console.log(e) }
    // return <FaRobot color="blue" onClick={props.updateRobotPosition} />
    return connectDragSource(<div><FaRobot color="blue" size={62} /></div>,)
  }

  export default DragSource(ItemTypes.ROBOT, gamepieceSource, collect)(GamePiece)