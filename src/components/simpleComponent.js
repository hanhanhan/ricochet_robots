import React from "react"
import { useDrop } from "react-dnd"
import { DragTypes } from "./constants"

import { SimpleComponentDragItem } from "./SimpleComponentChild"
/**
 * This component is to get tests running.
 *
 * No error thrown:
 * Just passing a non-existent prop
 *
 * Error thrown:
 * Iterating over non-existent prop
 *
 * @param {*} { items, ...props }
 * @returns
 */
function SimpleComponent({ items, ...props }) {
  const [whatsHappening, setWhatsHappening] = React.useState("I'm not moving")

  const [collectedProps, drag] = useDrop({
    accept: DragTypes.GAMEPIECE,
  })

  // const a = items.forEach((b) => b)
  return (
    <div>
      <h1 ref={drag}>
        Hello {props.name} {whatsHappening}
        <SimpleComponentDragItem />
      </h1>
    </div>
  )
}

export default SimpleComponent
