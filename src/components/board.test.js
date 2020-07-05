import React from "react"
import { render, screen, cleanup, fireEvent } from "../utils/testUtils"
import Board from "./board"

afterEach(cleanup)

const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, { bubbles: true })
  Object.assign(event, props)
  return event
}

describe("Board", () => {
  // it("renders correctly", () => {
  //   const board = render(<Board />).baseElement
  //   expect(board).toMatchSnapshot()
  // })
  it("drags and drops", () => {
    render(<Board />)
    let tiles = screen.getAllByRole("gridcell")
    // screen.debug(tiles)
    let dropTile = tiles[0]
    // screen.debug(dropTile)
    let dragItem = tiles[48] //ball at col: 0 row: 3

    // monitorEvents(document.body, ['dragstart','drop'])
    // monitorEvents(document.body, 'drag')

    // https://www.freecodecamp.org/news/how-to-write-better-tests-for-drag-and-drop-operations-in-the-browser-f9a131f0b281/
    dragItem.dispatchEvent(
      createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
    )
    dragItem.dispatchEvent(
      createBubbledEvent("drop", { clientX: 0, clientY: 1 })
    )

    // screen.debug(dragItem)
    // fireEvent.dragStart(dragItem, { datatransfer: { id: `2` } })
    // fireEvent.drop(dragItem, {
    //   datatransfer: { srcElement: dropTile, target: dropTile },
    // })
    // fireEvent.dragEnd(dragItem)

    // fireEvent.drop()
    // fireEvent.drop(tile, { dataTransfer: {} })
    // const board = render(<Board />).baseElement
    expect(true).toBeFalsy()
    // expect(board).toMatchSnapshot()
  })
})
