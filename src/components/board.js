import React from "react"
import styled from 'styled-components'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import BoardTile from "./boardtile"
import { GameContext } from "./Game"

// Game board dimensions
const DIMENSIONS = {x: 6, y: 6}


/*
Board game - tile has up to 4 walls
tile has occupied state/component: empty, robot a/b/c/d
child component onclick, drag, moves component
*/

let tileLocations = []
for (let iX = 0; iX < DIMENSIONS.x; iX++){
  for (let iY = 0; iY < DIMENSIONS.y; iY++) {
    tileLocations.push({
      x:iX, 
      y:iY, 
    })
  }

}

const BoardStyle = styled.div`
  width: 80vh;
  height: 80vh;
  display: grid; 
  grid-template-columns: repeat(${DIMENSIONS.x}, 1fr);
  grid-template-rows: repeat(${DIMENSIONS.y}, 1fr);
`

function Board(props){

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <BoardStyle>
          <GameContext.Consumer>
          {
            ({gamepiecePosition, setGamepiecePosition}) => {
            return tileLocations.map(({x,y}, i) => {
              let occupied = x === gamepiecePosition.x && y === gamepiecePosition.y
              return <BoardTile 
                key={i} 
                x={x} 
                y={y}
                occupied={occupied}
                setGamepiecePosition={setGamepiecePosition}
              />})
            }
          }
          </GameContext.Consumer>
        </BoardStyle>
      </DragDropContextProvider>
    )
}

export default Board