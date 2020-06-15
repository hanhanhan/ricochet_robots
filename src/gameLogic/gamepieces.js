import graph from "../gameLogic/BoardGraph"
import { tiles, target } from "./BoardSetup"

const { col: targetCol, row: targetRow } = target

let gamepieces = {
  1: { id: 1, icon: "🤖", col: 0, row: 0 },
  2: { id: 2, icon: "🎱", col: 1, row: 0 },
  3: { id: 3, icon: "🦘", col: 2, row: 0 },
}

// ----------------------------------------------------------
// Logic Helpers

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
// React State Helpers

/**
 * I should possibly turn this into an actual hash.
 *
 * @param {number} col
 * @param {number} row
 * @returns {string} Use as key to lookup gamepiece occupation
 */
function gamepieceLocationKey(col, row) {
  return `${col} ${row}`
}

/**
 * Convenience function to lookup gamepiece id from tile position.
 * Yes, the data's there, but this is faster than making each tile location
 * iterate through all of each object.
 *
 * @param {Object} gamepiecePositions
 * @returns {Map}
 */
function lookupGamepieceFromPosition(gamepiecePositions) {
  const positions = new Map()

  for (const id in gamepiecePositions) {
    const { col, row } = gamepiecePositions[id]
    positions.set(gamepieceLocationKey(col, row), id)
  }
  return positions
}

// -----------------------------------------------------------
// Gamepiece movement

// ----------------------------------------------------------

/**
 * Check whether gamepiece can reach the target.
 * Note: Only the active player can land on the target
 * Other gamepieces pass through.
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

export {
  gamepieces,
  sameRowOrCol,
  isValidMove,
  isEqualLocation,
  target,
  gamepieceLocationKey,
  lookupGamepieceFromPosition,
}
