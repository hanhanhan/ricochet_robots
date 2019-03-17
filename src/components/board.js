import React, {useState} from "react"
import styled from 'styled-components'
import { FaRobot } from "react-icons/fa"

// Game board dimensions
const DIMENSIONS = {x: 8, y: 8}


/*
Board game - tile has up to 4 walls
tile has occupied state/component: empty, robot a/b/c/d
child component onclick, drag, moves component
*/

let tileLocations = []
for (let iX = 0; iX < DIMENSIONS.x; iX++){
  for (let iY = 0; iY < DIMENSIONS.y; iY++) {
    tileLocations.push({x:iX, y:iY})
  }
}

const TileStyle = styled.div`
  background-color: linen;
  margin: 2px;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`

function GamePiece(props){
  return <FaRobot color="blue" />
}

const tileOccupied = {
  empty: () => <h1>N</h1>,
  robot: () => GamePiece,
}

// const tileOccupied = {
//     empty: 0,
//     robot: <FaRobot />,
//   }

function Tile(props) {
  const [tileState, setTileState] = useState(tileOccupied.empty())
  const handleTileOccupied = () => setTileState(tileOccupied.robot(props))

  return <TileStyle onClick={handleTileOccupied}>Tile {tileState}</TileStyle>
}

const BoardStyle = styled.div`
  height: 80vh;
  display: grid; 
  grid-template-columns: repeat(${DIMENSIONS.x}, 1fr);
  grid-template-rows: repeat(${DIMENSIONS.y}, 1fr);
`

function Board(){
    
    return (
    <BoardStyle>
        {tileLocations.map(({x,y}, i) => <Tile key={i} x={x} y={y}>{i}</Tile>)}
    </BoardStyle>
    )
}

export default Board