import React, {useState} from "react"
import styled from 'styled-components'
import { FaRobot } from "react-icons/fa"

// Game board dimensions
const DIMENSIONS = {x: 6, y: 6}


/*
Board game - tile has up to 4 walls
tile has occupied state/component: empty, robot a/b/c/d
child component onclick, drag, moves component
*/

let tileLocations = []

let initialGamePieceLocation = {
  x: Math.floor(Math.random() * (DIMENSIONS.x+1)),
  y: Math.floor(Math.random() * (DIMENSIONS.y+1))
}

for (let iX = 0; iX < DIMENSIONS.x; iX++){
  
  for (let iY = 0; iY < DIMENSIONS.y; iY++) {
    tileLocations.push({
      x:iX, 
      y:iY, 
      occupied: iX === initialGamePieceLocation.x && iY === initialGamePieceLocation.y
    })
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
  // const robotEventHandler = (e) => { console.log(e) }
  console.log(`gamepiece ${props}`)
  // return <FaRobot color="blue" onClick={props.updateRobotPosition} />
  return <FaRobot color="blue"  />
}

// const tileOccupied = {
//   empty: () => <h1>N</h1>,
//   robot: (props) => GamePiece(props),
// }

let tileOccupied = {
  empty: <h1>N</h1>,
  robot: (props) => <GamePiece {...props} />,
}


function Tile(props) {
  const [tileState, setTileState] = useState(
    props.occupied ? tileOccupied.robot : tileOccupied.empty
    )

  const updateRobotPosition = (e) => {console.log(`update robot position tile ${props.x} ${props.y}`)}

  // const handleTileOccupied = () => setTileState(tileOccupied.robot(props))

  return (<TileStyle updateRobotPosition={updateRobotPosition}>
    {props.occupied ? <GamePiece updateRobotPosition={updateRobotPosition} /> : <p>nope</p>}
    </TileStyle>)
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
        {tileLocations.map(({x,y, occupied}, i) => (
          <Tile key={i} x={x} y={y} occupied={occupied}>
          </Tile>))}
    </BoardStyle>
    )
}

export default Board