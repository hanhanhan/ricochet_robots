import React from "react"
import { render } from "@testing-library/react"

// React DND test contexts
// https://react-dnd.github.io/react-dnd/docs/testing
// import { wrapInTestContext } from "react-dnd-test-utils"
import { HTML5Backend } from "react-dnd-html5-backend"
import { wrapInTestContext } from "react-dnd-test-backend"
import { DragDropContext } from "react-dnd"
import { PlayerContext, usePlayerTurn } from "../components/game"

const AllTheProviders = ({ children }) => {
  const { myTurn, setMyTurn } = usePlayerTurn()
  //   return (
  //     <DragDropContext backend={HTML5Backend}>
  //       <PlayerContext value={{ myTurn, setMyTurn }}>{children}</PlayerContext>
  //     </DragDropContext>
  //   )
  return <>{children}</>
}

// const customRender = (ui, options) =>
//   render(ui, { wrapper: AllTheProviders, ...options })

const customRender = render

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
