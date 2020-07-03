import { tiles, dimensions } from "./boardSetup"
// Define the basic board graph depending on wall locations and dimensions

// --------------------------------------------------------------------
// Find indices that can be reached from each tile, in each direction.
// Doesn't include target or other gamepieces

const checkNorth = (startRow, startCol, destRow = 0, destCol) => {
  for (let row = startRow; row >= destRow; row -= 1) {
    const tile = tiles[row][startCol]
    if (tile.north) {
      return [row, startCol]
    }
  }
  return [startRow, startCol]
}

const checkSouth = (startRow, startCol, destRow = dimensions.row, destCol) => {
  for (let row = startRow; row <= destRow; row += 1) {
    const tile = tiles[row][startCol]
    if (tile.south) {
      return [row, startCol]
    }
  }
}

const checkEast = (startRow, startCol, destRow, destCol = dimensions.col) => {
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
// --------------------------------------------------------------------
// Build directional adjacency object to represent graph
// Doesn't include target or other gamepieces

const buildAdjacency = (tiles) => {
  const adjacency = []
  for (let row = 0; row < dimensions.col; row += 1) {
    adjacency.push([])
    for (let col = 0; col < dimensions.row; col += 1) {
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

const graph = buildAdjacency.bind(null, tiles)
export default graph
