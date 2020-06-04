import { tiles, target, dimensions } from "./BoardSetup"

const { x: targetCol, y: targetRow } = target

// const checkTarget = (startRow, startCol, destRow = 0, destCol) => {
//   if (startCol === destCol && startCol <= destCol) {

//   }
// }

// target north

// target south
// target east
// target west

const checkNorth = (startRow, startCol, destRow = 0, destCol) => {
  for (let row = startRow; row >= destRow; row -= 1) {
    const tile = tiles[row][startCol]
    if (tile.north) {
      return [row, startCol]
    }
  }
  return [startRow, startCol]
}

const checkSouth = (startRow, startCol, destRow = dimensions.y, destCol) => {
  for (let row = startRow; row <= destRow; row += 1) {
    const tile = tiles[row][startCol]
    if (tile.south) {
      return [row, startCol]
    }
  }
}

const checkEast = (startRow, startCol, destRow, destCol = dimensions.x) => {
  for (let col = startCol; col <= destCol; col += 1) {
    const tile = tiles[startRow][col]
    if (tile.east) {
      return [startRow, col]
    }
  }
  return [startRow, startCol]
}

const checkWest = (startRow, startCol, destRow, destCol = 0) => {
  for (let col = startCol; col >= destCol; col -= 1) {
    const tile = tiles[startRow][col]
    if (tile.west) {
      return [startRow, col]
    }
  }
  return [startRow, startCol]
}

// Build directional adjacency object to represent graph
const buildAdjacency = (tiles) => {
  const adjacency = []
  for (let row = 0; row < dimensions.x; row += 1) {
    adjacency.push([])
    for (let col = 0; col < dimensions.y; col += 1) {
      adjacency[row].push({
        north: checkNorth(row, col),
        south: checkSouth(row, col),
        east: checkEast(row, col),
        west: checkWest(row, col),
      })
    }
  }
  return adjacency
}

export default buildAdjacency(tiles)
