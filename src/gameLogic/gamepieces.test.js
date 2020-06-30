import { isValidMove, getUpdatedGraph, target } from "./gamepieces"
import make_graph from "./basegraph"

describe(`
Test 'getUpdatedGraph':
For neighboring gamepieces, show that the nearer gamepiece is blocked,
and further gamepiece can travel to`, () => {
  test("north destination", () => {
    let gamepiecePositions = {
      1: { row: 2, col: 0 },
      2: { row: 3, col: 0 },
    }
    let graph = getUpdatedGraph(gamepiecePositions)
    let north = graph[2][0].north
    expect(north).toEqual([0, 0])
    let trappedNorth = graph[3][0].north
    expect(trappedNorth).toEqual([3, 0])
  })
  test("south destination", () => {
    let gamepiecePositions = {
      1: { row: 2, col: 2 },
      2: { row: 3, col: 2 },
    }
    let graph = getUpdatedGraph(gamepiecePositions)
    let south = graph[3][2].south
    expect(south).toEqual([5, 2])
    let trappedSouth = graph[2][2].south
    expect(trappedSouth).toEqual([2, 2])
  })
  test("east destination", () => {
    let gamepiecePositions = {
      1: { row: 2, col: 2 },
      2: { row: 2, col: 3 },
    }
    let graph = getUpdatedGraph(gamepiecePositions)
    let east = graph[2][3].east
    expect(east).toEqual([2, 10])
    let trappedEast = graph[2][2].east
    expect(trappedEast).toEqual([2, 2])
  })
  test("west destination", () => {
    let gamepiecePositions = {
      1: { row: 1, col: 4 },
      2: { row: 1, col: 5 },
    }
    let graph = getUpdatedGraph(gamepiecePositions)
    let west = graph[1][4].west
    expect(west).toEqual([1, 0])
    let trappedWest = graph[1][5].west
    expect(trappedWest).toEqual([1, 5])
  })
})

describe(`Test 'isValidMove':
Show that the gamepiece can travel an open path to target
on the gamepiece player's turn`, () => {
  const setup = (target, gamepiecePositions, overrides) => {
    return {
      playerId: 1, // gamepiece being moved
      myTurn: 1, // player ID whose turn it is
      gamepiecePositions,
      destCol: target.col,
      destRow: target.row,
      graph: make_graph(),
      ...overrides,
    }
  }

  test("to north", () => {
    const gamepiecePositions = { 1: { row: 3, col: 0 } }
    const target = { row: 1, col: 0 }
    const moveToTarget = setup(target, gamepiecePositions)
    debugger
    const is_valid = isValidMove(moveToTarget)
    expect(is_valid).toEqual(true)
  })
})
