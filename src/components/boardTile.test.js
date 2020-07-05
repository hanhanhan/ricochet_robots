import React from "react"
import { render, cleanup, screen, fireEvent } from "../utils/testUtils"
import BoardTile from "./boardTile"

import basegraph from "../gameLogic/basegraph"

const setup = (overrides) => {
  // No walls by default
  const walls = { north: false, south: false, east: false, west: false }

  const gamepieceRow = 0
  const gamepieceCol = 1
  const gamepiecePositions = {
    1: { row: gamepieceRow, col: gamepieceCol },
  }
  let setGamepiecePositions = jest.fn()
  return {
    key: `1`,
    col: 0,
    row: 0,
    isTarget: false,
    walls,
    gamepieceId: `1`,
    gamepiecePositions: {},
    setGamepiecePositions,
    graph: basegraph(),
    ...overrides,
  }
}

afterEach(cleanup)

describe("BoardTile", () => {
  it("renders", () => {
    const props = setup()
    render(<BoardTile {...props}></BoardTile>)

    let tile = screen.getByRole("gridcell")
    // screen.debug(tile)

    // fireEvent.drop()
    // fireEvent.drop(tile, { dataTransfer: {} })

    // drop, candrop, isdragging
    // let tile = screen.queryByRole("")
    // fireEvent.drop()
    expect(true).toBeTruthy()
  })
})
