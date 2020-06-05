import graph from "../gameLogic/BoardGraph"
import { tiles, target } from "./BoardSetup"

// Move your player to this tile location to win!
// const getTarget = () => ({ col: 3, row: 1 })
// const target = getTarget()
const { col: targetCol, row: targetRow } = target

let gamepieces = {
  gamepieceA: { x: 0, y: 0 },
  gamepieceB: { x: 0, y: 0 },
  gamepieceC: { x: 0, y: 0 },
}

// -----------------------------------------------------------
// Gamepiece movement

// ----------------------------------------------------------
// Movement related to landing on winning target
// Note: Only the active player can land on the target
// Other gamepieces pass through.

function canReachTarget(startRow, startCol) {
  // dependency inject target? tiles?

  const tile = tiles[startRow][startCol]

  // check if gamepiece can travel to target in same row
  if (startRow === targetRow) {
    if (startCol <= destCol && tile.east >= targetCol) {
      return true
    }
    if (startCol >= destCol && tile.west <= targetCol) {
      return true
    }
  }

  // check if gamepiece can travel to target in same column
  if (startCol === targetCol) {
    if (startRow <= destRow && tile.north >= targetRow) {
      return true
    }
    if (startRow >= destRow && tile.south <= targetRow) {
      return true
    }
  }

  return false
}

// ----------------------------------------------------------
// Helpers

/**
 *
 * Check if 2D coordinates / board position are same.
 * @param {Array.<int>} A
 * @param {Array.<int>} B
 * @returns boolean
 */
function isEqualLocation(A, B) {
  const [xA, yA] = A
  const [xB, yB] = B
  return xA === xB && yA === yB
}

// function sameRowOrCol(startX, startY, destX, destY) {
//   // Check game piece is in same row or column as drop target location
//   // If not, early return!
//   if (startX === destX || startY === destY) {
//     return true
//   }
//   return false
// }

const sameRowOrCol = (startX, startY, destX, destY) => {
  // Check game piece is in same row or column as drop target location
  // If not, early return!
  if (startX === destX || startY === destY) {
    return true
  }
  return false
}

// ----------------------------------------------------------

/**
 * Can you move the gamepiece to that other board tile?
 * used with React Drag N Drop's canDrop
 * @param {Object} gamepiece
 * @param {numer} destX
 * @param {number} destY
 * @returns boolean
 */
function isValidMove(gamepiecePosition, destX, destY) {
  const { x: pieceX, y: pieceY } = gamepiecePosition

  // Early return
  // if in the same row or col -> false
  if (!sameRowOrCol(pieceX, pieceY, destX, destY)) {
    return false
  }

  // if (gamepiece.isPlayer && isEqualLocation({ destX, destY }, target)) {
  if (isEqualLocation([destX, destY], [targetCol, targetRow])) {
    return canReachTarget(pieceX, pieceY)
  }

  // Get valid locations gamepiece can travel to from current location.
  const { north, south, east, west } = graph[pieceY][pieceX]
  const compareDestLocation = isEqualLocation.bind(null, [destY, destX])
  // Check if any of 4 possible travel directions is a valid drop.
  return [north, south, east, west].some(compareDestLocation)
}

export { gamepieces, sameRowOrCol, isValidMove, isEqualLocation, target }
