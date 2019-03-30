import React, {useState, createContext} from 'react'

import Board from "./board"


let initialGamepiecePosition = {x: 0, y: 0}

let updatePosition = () => { 
    console.log(`update the location!`)
    // gamepiecePosition.x = 5
    // console.log(`now update the location! ${gamepiecePosition.x}`)
}

const initialGameState = {initialGamepiecePosition, updatePosition}

let GameContext = createContext(initialGameState)

function Game(){
    const [gamepiecePosition, setGamepiecePosition] = useState(initialGamepiecePosition)

    return (
        <GameContext.Provider value={{gamepiecePosition, setGamepiecePosition: setGamepiecePosition}}>
            <Board gamepiecePosition={gamepiecePosition} setGamepiecePosition={setGamepiecePosition}/>
        </GameContext.Provider>)
}


export {Game, GameContext}