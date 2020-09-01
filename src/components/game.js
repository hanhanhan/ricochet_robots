import React from "react"

import { DndProvider } from "react-dnd-multi-backend"
import HTML5ToTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch"
import styled, { ThemeProvider } from "styled-components"

import { GamePlayProvider } from "./providers"
import { graphic } from "../css.themes"
import Board from "./board"
import Panel from "./panel"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row;
  }
`

function Game(props) {
  return (
    <ThemeProvider theme={graphic}>
      <GamePlayProvider>
        <Layout>
          <DndProvider options={HTML5ToTouch}>
            <Board />
            <Panel />
          </DndProvider>
        </Layout>
      </GamePlayProvider>
    </ThemeProvider>
  )
}

export default Game
