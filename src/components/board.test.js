import React from "react"
import { render, screen, cleanup, fireEvent, act } from "../utils/testUtils"
import Board from "./board"
import { isValidMove } from "../gameLogic/gamepieces"
import { initialGamepiecePositions } from "../gameLogic/boardSetup"
import basegraph from "../gameLogic/basegraph"

// https://spectrum.chat/testing-library/help/testing-react-dnd~def83ae5-cbbd-4d30-9769-9000e55f95a6
// https://github.com/react-dnd/react-dnd/blob/760cef336a18da3156e62f6c9ac7b78ae2399ea0/packages/documentation-examples/src/01%20Dustbin/Single%20Target/__tests__/integration.spec.tsx#L23
// https://www.freecodecamp.org/news/how-to-write-better-tests-for-drag-and-drop-operations-in-the-browser-f9a131f0b281/
// https://html.spec.whatwg.org/multipage/dnd.html#dnd

// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect

afterEach(cleanup)

const createBubbledEvent = (type, props = {}) => {
  // if (type == "dragstart") {
  //   // JSDOM DataTransfer is not defined
  //   let dataTransfer = {}
  //   dataTransfer.setData("application/json", "1")
  //   dataTransfer.dropEffect = "move"
  //   props["dataTransfer"] = dataTransfer
  // }
  // DragEvent is not defined for JSDOM
  const event = new Event(type, { bubbles: true })
  Object.assign(event, props)
  return event
}
// monitorEvents(document.body, ['dragstart','dragenter', 'drop'])
describe("Board", () => {
  // it("renders correctly", () => {
  //   const board = render(<Board />).baseElement
  //   expect(board).toMatchSnapshot()
  // })
  it("drags and drops", () => {
    console.log("valid move????")
    const args = {
      playerId: 1,
      myTurn: false,
      gamepiecePositions: initialGamepiecePositions,
      destCol: 0,
      destRow: 0,
      isTarget: false,
      graph: basegraph(),
    }
    const isValid = isValidMove(args)
    console.log(isValid)

    render(<Board />)
    let tiles = screen.getAllByRole("gridcell")
    let dropTile = tiles[0]
    let dragItem = tiles[1].firstChild //ball at col: 0 row: 3
    let fromTile = tiles[1]
    console.log("drop tile at 0 0")
    screen.debug(dropTile)
    console.log("drag tile at row: 0 col: 1")
    screen.debug(fromTile)

    // monitorEvents(document.body, ['dragstart','drop'])
    // monitorEvents(document.body, 'drag')

    // https://www.freecodecamp.org/news/how-to-write-better-tests-for-drag-and-drop-operations-in-the-browser-f9a131f0b281/

    act(() => {
      dragItem.dispatchEvent(createBubbledEvent("dragstart"))

      dropTile.dispatchEvent(createBubbledEvent("dragenter"))

      dropTile.dispatchEvent(createBubbledEvent("dragover"))

      dropTile.dispatchEvent(createBubbledEvent("drop"))
    })

    // screen.debug(dragItem)

    // fireEvent.dragStart(dragItem, { clientX: 0, clientY: 1 })
    // // console.log("from:")
    // // screen.debug(fromTile)
    // fireEvent.dragEnter(dropTile)
    // fireEvent.dragOver(dropTile)
    // fireEvent.drop(dragItem, { clientX: 0, clientY: 0 })
    // // console.log("from:")
    // // screen.debug(fromTile)
    // console.log("to:")
    screen.debug(screen.getAllByRole("gridcell")[0])

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
