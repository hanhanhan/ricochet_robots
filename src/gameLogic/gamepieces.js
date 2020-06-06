import graph from "../gameLogic/BoardGraph"
import { tiles, target } from "./BoardSetup"

// Move your player to this tile location to win!
// const getTarget = () => ({ col: 3, row: 1 })
// const target = getTarget()
const { col: targetCol, row: targetRow } = target

let gamepieces = {
  gamepieceA: { col: 0, row: 0 },
  gamepieceB: { col: 0, row: 0 },
  gamepieceC: { col: 0, row: 0 },
}

// -----------------------------------------------------------
// Gamepiece movement

// ----------------------------------------------------------
// Movement related to landing on winning target
// Note: Only the active player can land on the target
// Other gamepieces pass through.

/**
 * Check whether gamepiece can reach the target.
 *
 * @param {number} startRow
 * @param {number} startCol
 * @returns {boolean}
 */
function canReachTarget(startRow, startCol) {
  // dependency inject target? tiles?

  const destinations = graph[startRow][startCol]

  // check if gamepiece can travel to target in same row
  if (startRow === targetRow) {
    // get col of tile that defines east boundary of travel
    const east = destinations.east[1]

    // look right - make sure target isn't past another boundary
    if (startCol <= targetCol && east >= targetCol) {
      return true
    }
    const west = destinations.west[1]

    if (startCol >= targetCol && west <= targetCol) {
      return true
    }
  }

  // check if gamepiece can travel to target in same column
  if (startCol === targetCol) {
    // get row of tile that defines north boundary of travel
    const north = destinations.north[0]

    // look north - make sure target isn't past a boundary
    if (startRow >= targetRow && north <= targetRow) {
      return true
    }
    // get row of tile that defines south boundary of travel
    const south = destinations.south[0]

    // look south
    if (startRow <= targetRow && south >= targetRow) {
      return true
    }
  }
  return false
}

// ----------------------------------------------------------
// Helpers

/**
 * Check if 2D coordinates / board position are same between two locations.
 *
 * @param {Array.<number>} A
 * @param {Array.<number>} B
 * @returns {boolean}
 */
function isEqualLocation(A, B) {
  const [colA, rowA] = A
  const [colB, rowB] = B
  return colA === colB && rowA === rowB
}

/**
 * Check game piece is in same row or column as drop target location
 * If not, early return!
 *
 * @param {number} startCol
 * @param {number} startRow
 * @param {number} destCol
 * @param {number} destRow
 * @returns {boolean}
 */
function sameRowOrCol(startCol, startRow, destCol, destRow) {
  if (startCol === destCol || startRow === destRow) {
    return true
  }
  return false
}

// ----------------------------------------------------------

/**
 * Can you move the gamepiece to that other board tile?
 * used with React Drag N Drop's canDrop
 * @param {Object} gamepiece
 * @param {number} destCol
 * @param {number} destRow
 * @returns {boolean}
 */
function isValidMove(gamepiecePosition, destCol, destRow) {
  const { col: pieceCol, row: pieceRow } = gamepiecePosition

  // Early return
  // if in the same row or col -> false
  if (!sameRowOrCol(pieceCol, pieceRow, destCol, destRow)) {
    return false
  }

  // if (gamepiece.isPlayer && isEqualLocation({ destCol, destRow }, target)) {
  if (isEqualLocation([destCol, destRow], [targetCol, targetRow])) {
    return canReachTarget(pieceRow, pieceCol)
  }

  // Get valid locations gamepiece can travel to from current location.
  const { north, south, east, west } = graph[pieceRow][pieceCol]
  const compareDestLocation = isEqualLocation.bind(null, [destRow, destCol])
  // Check if any of 4 possible travel directions is a valid drop.
  return [north, south, east, west].some(compareDestLocation)
}

export { gamepieces, sameRowOrCol, isValidMove, isEqualLocation, target }
