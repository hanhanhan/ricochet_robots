import React from "react"
import Header from "./header"
import { render } from "../utils/testUtils"

describe("Header", () => {
  it("renders correctly", () => {
    const header = render(<Header siteTitle="Default Starter" />)
    expect(header).toMatchSnapshot()
  })
})
