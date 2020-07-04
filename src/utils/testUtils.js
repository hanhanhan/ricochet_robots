import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { PlayerContext, usePlayerTurn } from "../components/game"

const AllTheProviders = ({ children }) => {
  const { myTurn, setMyTurn } = usePlayerTurn()
  return (
    <DndProvider backend={HTML5Backend}>
      <PlayerContext.Provider value={{ myTurn, setMyTurn }}>
        {children}
      </PlayerContext.Provider>
    </DndProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
