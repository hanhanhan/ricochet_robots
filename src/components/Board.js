/** @module Board */

import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import BoardTile from "./BoardTile"
import {
  dimensions,
  tiles,
  initialGamepiecePositions,
} from "../gameLogic/BoardSetup"
import {
  lookupGamepieceFromPosition,
  gamepieceLocationKey,
  getUpdatedGraph,
} from "../gameLogic/gamepieces"
import { set } from "core-js/fn/dict"

const BoardStyle = styled.div`
  width: 95vmin;
  height: 95vmin;
  display: grid;
  border: 5px solid thistle;
  gap: 0;
  grid-template-columns: repeat(${dimensions.x}, 1fr);
  grid-template-rows: repeat(${dimensions.y}, 1fr);
`

/**
 * Hook to get + update gamepiece positions.
 * Use location to look up gamepiece
 * Or use gamepiece to lookup location
 *
 * @param {Object} [initialGamepiecePositions]
 * @returns {Object}
 */
function useGamepiecePositions(
  initialGamepiecePositions = initialGamepiecePositions
) {
  const [gamepiecePositions, setGamepiecePositions] = useState(
    initialGamepiecePositions
  )

  // Helpers based on gamepiece state follow
  // The data is already there, these just provide a way to look it up.

  // Create a map of (row, col) -> gamepiece ids
  // Keys are "row col" strings
  const positionToId = lookupGamepieceFromPosition(gamepiecePositions)

  // Function to lookup (row, col) -> gamepiece id
  const getGamepieceAtLocation = (col, row) => {
    const key = gamepieceLocationKey(col, row)
    return positionToId.get(key)
  }

  /**
   * @func getOtherGamepiecesInRow
   *
   * Lookup other gamepieces that might be in North South travel path.
   *
   * @param {Number} destRow
   * @param {Number} playerId
   * @returns {Set} Gamepiece ids that are not the player, and are in same col
   */
  const getOtherGamepiecesInRow = (destRow, playerId) => {
    const sameRowGamepieces = new Set()

    for (const id in gamepiecePositions) {
      if (id == playerId) {
        continue
      }

      const { row } = gamepiecePositions[id]
      if (row === destRow) {
        sameRowGamepieces.add(id)
      }
    }
    return sameRowGamepieces
  }

  /**
   * @func getOtherGamepiecesInCol
   *
   * Lookup other gamepieces that might be in North South travel path.
   *
   * @param {Number} destCol
   * @param {Number} playerId
   * @returns {Set} Gamepiece ids that are not the player, and are in same col
   */
  const getOtherGamepiecesInCol = (destCol, playerId) => {
    const sameColGamepieces = new Set()

    for (const id in gamepiecePositions) {
      if (id == playerId) {
        continue
      }

      const { col } = gamepiecePositions[id]
      if (col === colRow) {
        sameColGamepieces.add(id)
      }
    }
    return sameColGamepieces
  }

  return {
    gamepiecePositions,
    setGamepiecePositions,
    getGamepieceAtLocation,
    getOtherGamepiecesInCol,
    getOtherGamepiecesInRow,
  }
}

/**
 * Hook to update graph.
 * Not part of hook to update gamepiece positions
 * because it is instead managed by React DND lifecycle.
 *
 * @returns {Array<Object, func>}
 */
function useGraph() {
  const [graph, setGraph] = useState(getUpdatedGraph(initialGamepiecePositions))
  return [graph, setGraph]
}

export default function Board(props) {
  const { getGamepieceAtLocation, ...gamepieceInfo } = useGamepiecePositions(
    initialGamepiecePositions
  )

  const [graph, setGraph] = useGamepiecePositions()

  const tileComponents = tiles
    .flat()
    .map(({ col, row, north, south, east, west, target }, i) => {
      const gamepieceId = getGamepieceAtLocation(col, row)
      return (
        <BoardTile
          key={`${col} ${row} ${gamepieceId}`}
          col={col}
          row={row}
          target={target}
          walls={{ north, east, south, west }}
          gamepieceId={gamepieceId}
          gamepieceInfo={gamepieceInfo}
          graph={graph}
          setGraph={setGraph}
        />
      )
    })

  return <BoardStyle>{tileComponents}</BoardStyle>
}
