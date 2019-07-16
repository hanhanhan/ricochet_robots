// Game board dimensions
const dimensions = { x: 16, y: 16 }
/*
 Board configuration specific barrier locations are defined here.
 Indices refer to lines between tiles (0 is left edge of board). 
 Barrier locations are taken from page 3 of DriftingDroids user documentation.
*/
const horizontalBarriers = [
  [1, 4], // row, col or y, x
  [3, 1],
  [3, 11],
  [4, 0],
  [4, 6],
  [4, 15],
  [6, 2],
  [7, 7],
  [7, 8],
  [7, 10],
  [7, 13],
  [8, 5],
  [9, 7],
  [9, 8],
  [9, 12],
  [10, 1],
  [10, 15],
  [11, 4],
  [11, 10],
  [12, 0],
  [13, 5],
  [14, 3],
  [14, 9],
  [14, 14],
]

const verticalBarriers = [
  [0, 4], // row, col or y, x
  [0, 10],
  [1, 6],
  [1, 14],
  [2, 1],
  [2, 11],
  [4, 6],
  [6, 3],
  [6, 14],
  [7, 7],
  [7, 9],
  [7, 11],
  [8, 6],
  [8, 7],
  [8, 9],
  [9, 2],
  [9, 13],
  [10, 4],
  [10, 9],
  [13, 6],
  [13, 5],
  [14, 3],
  [14, 9],
  [15, 7],
  [15, 11],
]

/*
Board game - tile has up to 4 walls
tile has occupied state/component: empty, robot a/b/c/d
child component onclick, drag, moves component
*/

const tiles = []
for (let col = 0; col < dimensions.y; col++) {
  const rowLocations = []
  for (let row = 0; row < dimensions.x; row++) {
    rowLocations.push({
      x: row,
      y: col,
      north: false,
      south: false,
      east: false,
      west: false,
    })
  }
  tiles.push(rowLocations)
}

for (const indices of verticalBarriers) {
  const [row, col] = indices
  tiles[row][col - 1].east = true
  tiles[row][col].west = true
}

for (const indices of horizontalBarriers) {
  const [row, col] = indices
  tiles[row - 1][col].south = true
  tiles[row][col].north = true
}

// North Wall
for (let row = 0, col = 0; col < dimensions.x; col++) {
  tiles[row][col].north = true
}

// South Wall
for (let row = dimensions.y - 1, col = 0; col < dimensions.x; col++) {
  tiles[row][col].south = true
}

// East Wall
for (let row = 0, col = dimensions.x - 1; row < dimensions.y; row++) {
  tiles[row][col].east = true
}

// West Wall
for (let row = 0, col = 0; row < dimensions.y; row++) {
  tiles[row][col].west = true
}

const tileLocations = tiles.flat()

export { dimensions, tileLocations, tiles }
