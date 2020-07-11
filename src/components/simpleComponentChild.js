import React, { useState } from "react"
import { useDrag } from "react-dnd"
import { DragTypes } from "./constants"

function SimpleComponentDragItem(props) {
  const [collectedProps, drag] = useDrag({
    item: { id: 1, type: DragTypes.GAMEPIECE },
    begin: (monitor) => {
      setWhatsHappening("I'm moving!")
    },
  })

  return <div>Child {props.hi}</div>
}

export { SimpleComponentDragItem }
