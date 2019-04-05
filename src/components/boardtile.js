import React, {useState} from "react"
import styled from 'styled-components'
import { DropTarget } from "react-dnd"

import { DragTypes } from "./Constants"
import Gamepiece from "./gamepiece"

// React Drag n Drop Setup

const spec = {
    drop: (props) => {
        console.log(props)
        props.setGamepiecePosition({x:3,y:3})
        console.log("drop called")
    },
  }
  
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

const TileStyle = styled.div`
  background-color: linen;
  margin: 2px;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`

function BoardTile(props) {

  return props.connectDropTarget(
    <div>
        <TileStyle {...props}>
            {props.occupied ? <Gamepiece /> : null}
        </TileStyle>
    </div>
    )
}

export default DropTarget(DragTypes.GAMEPIECE, spec, collect)(BoardTile)