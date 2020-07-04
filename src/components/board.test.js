import React from "react"
import { render } from "../utils/testUtils"
import Board from "./board"

describe("Board", () => {
  it("renders correctly", () => {
    const board = render(<Board />)
    expect(board).toMatchSnapshot()
  })
})
