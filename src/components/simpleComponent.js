import React from "react"
import { useDrag } from "react-dnd"
import { DragTypes } from "./constants"

import { SimpleComponentChild } from "./SimpleComponentChild"
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

  const [collectedProps, drag] = useDrag({
    item: { id: 1, type: DragTypes.GAMEPIECE },
    begin: (monitor) => {
      setWhatsHappening("I'm moving!")
    },
  })
  // const a = items.forEach((b) => b)
  return (
    <h1 ref={drag}>
      Hello {props.name} {whatsHappening}
      <SimpleComponentChild />
    </h1>
  )
}

export default SimpleComponent
