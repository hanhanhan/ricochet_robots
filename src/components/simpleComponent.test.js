import React from "react"
import { render } from "../utils/testUtils"

import SimpleComponent from "./simpleComponent"

test("Simple component renders", () => {
  const simple = render(<SimpleComponent />)
  console.log("simple component")
  console.log(simple)
  expect(simple).not.toBeNull()
})
