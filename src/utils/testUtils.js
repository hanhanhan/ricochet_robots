import React from "react"
import { render } from "@testing-library/react"

// React DND test contexts
// https://react-dnd.github.io/react-dnd/docs/testing
import { wrapInTestContext } from "react-dnd-test-utils"
import { DragDropContext } from "react-dnd"

const AllTheProviders = ({ children }) => {
  return <DragDropContext>{children}</DragDropContext>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// const customRender = render

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
