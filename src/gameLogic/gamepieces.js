import basegraph from "../gameLogic/basegraph"
import { tiles, target, dimensions } from "./BoardSetup"

const { col: targetCol, row: targetRow } = target

let gamepieces = {
  1: { id: 1, icon: "🤖", col: 0, row: 0 },
  2: { id: 2, icon: "🎱", col: 1, row: 0 },
  3: { id: 3, icon: "🦘", col: 2, row: 0 },
}

/**
 * Update base graph based on gamepiece positions.
 *
 * @param {Object} gamepiecePositions
 * @returns {Object}
 */
function getUpdatedGraph(gamepiecePositions) {
  // Create a 'fresh' graph object to mutate
  const graph = basegraph()

  for (let [id, { col: gamepieceCol, row: gamepieceRow }] of Object.entries(
    gamepiecePositions
  )) {
    // Update South destinations for tiles north of gamepiece
    for (let row = 0; row < gamepieceRow; row++) {
      let [destRow, destCol] = graph[gamepieceCol][row].south
      if (destRow >= gamepieceRow) {
        graph[row][gamepieceCol].south = [gamepieceRow - 1, destCol]
      }
    }

    // Update North destinations for tiles south of gamepiece
    for (let row = gamepieceRow + 1; row < dimensions.y; row++) {
      let [destRow, destCol] = graph[gamepieceCol][row].north
      if (destRow <= gamepieceRow) {
        graph[row][gamepieceCol].south = [gamepieceRow + 1, destCol]
      }
    }

    // Update East destinations for tiles west of gamepiece
    for (let col = 0; col < gamepieceCol; col++) {
      let [destRow, destCol] = graph[col][gamepieceRow].east
      if (destCol >= gamepieceCol) {
        graph[gamepieceRow][col] = [destRow, gamepieceCol - 1]
      }
    }

    // Update West destinations
    for (let col = gamepieceCol + 1; col < dimensions.x; col++) {
      let [destRow, destCol] = graph[col][gamepieceRow].east
      if (destCol <= gamepieceCol) {
        graph[gamepieceRow][col] = [destRow, gamepieceCol + 1]
      }
    }
  }
  return graph
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
 *
 * @param {Object} gamepiece
 * @param {number} destCol
 * @param {number} destRow
 * @returns {boolean}
 *
 * Options:
 * Create 3 graphs based on base graph.
 * Update each one.
 *
 * Create special rules to check each gamepiece position.
 * Check target is same row or col, and no walls or other gamepieces between
 * Check wall is same row or col, and no gamepieces between
 * Check gamepiece is acting as wall
 *
 */
function isValidMove({
  playerId,
  gamepiecePositions,
  setGamepiecePositions,
  getGamepieceAtLocation,
  getOtherGamepiecesInCol,
  getOtherGamepiecesInRow,
  destCol,
  destRow,
  graph,
}) {
  const { col: pieceCol, row: pieceRow } = gamepiecePositions[playerId]

  const inSameCol = pieceCol === destCol
  const inSameRow = pieceRow === destRow

  // Early return
  // Gamepiece must travel in same column or row (North/South East/West)
  if (!(inSameCol || inSameRow) || (inSameCol && inSameRow)) {
    return false
  }

  // get valid locations a gamepiece can travel to from destination
  // build stateful graph for each gamepiece based on walls graph
  //
  // look in direction of travel for:
  // other gamepieces
  // walls
  // target

  if (inSameCol) {
    const otherPlayersInCol = getOtherGamepiecesInCol(destCol)
    const { north, south } = graph[pieceRow][pieceCol]
    const sameTargetCol = targetCol === destCol

    const locations = new Map()

    if (!otherPlayersInCol.size === 0) {
    }
  }

  const otherPlayersInRow = getOtherGamepiecesInRow(destRow)

  //
  //
  // Check if can reach target
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
  getUpdatedGraph,
  sameRowOrCol,
  isValidMove,
  isEqualLocation,
  target,
  gamepieceLocationKey,
  lookupGamepieceFromPosition,
}
