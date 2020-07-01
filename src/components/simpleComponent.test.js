import React from "react"
import { render } from "../utils/testUtils"

import SimpleComponent from "./simpleComponent"

test("Simple component renders", () => {
  const simple = render(<SimpleComponent />)
  // simple.debug()

  // console.log(simple.debug())
  expect(simple).not.toBeNull()
})
