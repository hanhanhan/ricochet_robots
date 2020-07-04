import React from "react"
import { render } from "../utils/testUtils"
import BoardTile from "./boardTile"

import basegraph from "../gameLogic/basegraph"

const setup = (overrides = {}) => {
  // No walls by default
  const north = false
  const south = false
  const east = false
  const west = false
  const walls = { north, south, east, west }

  let gamepieceRow = 0
  let gamepieceCol = 1
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

describe("BoardTile", () => {
  it("renders", () => {
    const props = setup()
    const view = render(<BoardTile props={props}></BoardTile>)
    view.debug()
    expect(false).toBeTruthy()
  })
})
