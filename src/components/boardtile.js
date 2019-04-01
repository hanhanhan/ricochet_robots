import React, {useState} from "react"
import styled from 'styled-components'
import { FaRobot } from "react-icons/fa"

// // Game board dimensions
// const DIMENSIONS = {x: 8, y: 8}

// let tileLocations = []
// for (let iX = 0; iX < DIMENSIONS.x; iX++){
//   for (let iY = 0; iY < DIMENSIONS.y; iY++) {
//     tileLocations.push({x:iX, y:iY})
//   }
// }

// const TileStyle = styled.div`
//   background-color: linen;
//   margin: 2px;
//   padding: 0.5em;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const tileOccupied = {
//   empty: 0,
//   robot: <FaRobot/>
// }

// function GamePiece(props){
//   <FaRobot></FaRobot>
// }

// function Tile(props) {
//   const [tileState, setTileState] = useState(tileOccupied.empty)
//   const handleTileOccupied = () => setTileState(tileOccupied.robot)

//   return <TileStyle onClick={handleTileOccupied}>Tile {tileState}</TileStyle>
// }

// export default Tile

const TileStyle = styled.div`
  background-color: linen;
  margin: 2px;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`



function Tile(props) {
  // const [tileState, setTileState] = useState(
  //   props.occupied ? tileOccupied.robot : tileOccupied.empty
  //   )
  const updateRobotPosition = (e) => {console.log(`update robot position tile ${props.x} ${props.y}`)}

  // const handleTileOccupied = () => setTileState(tileOccupied.robot(props))

  return (
    <TileStyle {...props}>
      {props.occupied ? <Gamepiece updateRobotPosition={updateRobotPosition} /> : null}
    </TileStyle>)
}