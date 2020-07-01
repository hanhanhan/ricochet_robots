import React from "react"
import { useDrag } from "react-dnd"
import { DragTypes } from "./constants"
/**
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
  const [collectedProps, drag] = useDrag({
    item: { id: 1, type: DragTypes.GAMEPIECE },
  })
  // const a = items.forEach((b) => b)
  return <div ref={drag}>Hello {props.name}</div>
}

export default SimpleComponent
