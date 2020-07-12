import React from "react"
import { render, screen, cleanup, fireEvent } from "../utils/testUtils"
import Board from "./board"
import { isValidMove } from "../gameLogic/gamepieces"
import { initialGamepiecePositions } from "../gameLogic/boardSetup"
import basegraph from "../gameLogic/basegraph"

// Todo: Use a test-specified starting configuration of board/walls, gamepiece positions.

afterEach(cleanup)

describe("Board", () => {
  // it("renders correctly", () => {
  //   const board = render(<Board />).baseElement
  //   expect(board).toMatchSnapshot()
  // })

  let tiles, dropTile, dragItem
  const moveSetup = {
    playerId: 1,
    myTurn: false,
    // These positions are also built into how the board is initialized.
    gamepiecePositions: initialGamepiecePositions,
    destCol: 0,
    destRow: 0,
    isTarget: false,
    graph: basegraph(),
  }

  beforeEach(() => {
    render(<Board />)
    tiles = screen.getAllByRole("gridcell")
    dropTile = tiles[0]
    dragItem = tiles[1].firstChild
  })

  it("is setup for a valid move", () => {
    const isValid = isValidMove(moveSetup)
    expect(isValid).toEqual(true)
  })

  it("destination tile is empty", () => {
    expect(dropTile).toBeEmptyDOMElement()
  })

  it("drags and drops for a valid move", () => {
    // Drag and Drop
    fireEvent.dragStart(dragItem)
    fireEvent.dragEnter(dropTile)
    fireEvent.dragOver(dropTile)
    fireEvent.drop(dropTile)
    // React update means element reference has changed.
    dropTile = screen.getAllByRole("gridcell")[0]
    expect(dropTile).toHaveTextContent("🤖")
  })
})
