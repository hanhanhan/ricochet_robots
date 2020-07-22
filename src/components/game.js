import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import styled from "styled-components"

import { GamePlayProvider } from "./providers"
import Board from "./board"
import Panel from "./panel"
// Required ? deleting this makes dnd not work -- no errors -- why?
import gamepieces from "../gameLogic/gamepieces"
import { func } from "prop-types"
import { turn } from "core-js/fn/dict"

const Layout = styled.div`
  display: flex;
`

function Game(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <GamePlayProvider>
        <Layout>
          <Panel />
          <Board />
        </Layout>
      </GamePlayProvider>
    </DndProvider>
  )
}

export default Game
