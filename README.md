<h1 align="center">
  Ricochet Robots [Work-In-Progress]
</h1>

A [board game](https://en.wikipedia.org/wiki/Ricochet_Robot) designed by Alex Randolph.

It's a graph search puzzle as much as a game.
<br />
<br />

# 🛎 Gameplay

1. A player's turn lasts until they get their gamepiece to the target.
1. A player can move ANY gamepiece.
1. A gamepiece can travel in straight lines until it hits a wall or another gamepiece.
1. Each gamepiece's travel in a straight line is counted as a move.
1. The player who has the lowest numbers of moves for a turn wins.
1. A video is worth thousands of words!

   <a href="https://www.youtube.com/watch?v=fXGoWiZvKR4"><img src="https://img.youtube.com/vi/fXGoWiZvKR4/maxresdefault.jpg" alt="drawing" width="300"/></a>
   <br />
   <br />

# 🧐 Poking Around

- The linchpin component is the [boardTile](https://github.com/hanhanhan/ricochet_robots/blob/master/src/components/boardTile.js). It controls checking whether a gamepiece can be dropped on a tile or not.
- This functionality is [tested one level up](https://github.com/hanhanhan/ricochet_robots/blob/master/src/components/board.test.js), as a set of integration tests.

  Mini Brag: It took a little bit to figure out how to do this testing. [I updated the React DND docs to share what I learned.](https://github.com/react-dnd/react-dnd/pull/2665)

- Game logic flow ->

  - The [game board is built](https://github.com/hanhanhan/ricochet_robots/blob/d4a4c5daec5a833146b7f5e7a07b2cca133c45ff/src/gameLogic/boardSetup.js#L149) based on walls and edges (the stuff that doesn't move during the game).

  - The [graph of the gameboard](https://github.com/hanhanhan/ricochet_robots/blob/d4a4c5daec5a833146b7f5e7a07b2cca133c45ff/src/gameLogic/basegraph.js#L66) is created as an adjacency object, based on walls and edges.

    It's exported as a thunk so that the graph can be created fresh each turn.

  - The graph of the gameboard [is updated](https://github.com/hanhanhan/ricochet_robots/blob/d4a4c5daec5a833146b7f5e7a07b2cca133c45ff/src/gameLogic/gamepieces.js#L88) based on current gamepiece locations.

<br />
<br />

# ⚙️ To Do

### Key

🍓 Do this

✅ Done

---

🍓 draw path with arrows

🍓 move gamepieces with arrow keys in addition to click and drag

🍓 get/set game state in local storage

🍓 animate wobble on land

🍓 add sounds

🍓 constrain [board asect ratio on mobile](https://css-tricks.com/aspect-ratio-boxes/) [maybe by preventing flexbox children stretching](http://dcousineau.com/blog/2011/07/14/flex-box-prevent-children-from-stretching/)

🍓🍓 Try and find a useable way to display / interact on mobile. Touch-drag is there. Smaller gameboard? zoom?

🍓🍓 visual theming

- favicon
- fun svg icons for gamepieces, target/dest
- [toggle theme context for preferred appearance (maybe sounds, animations too)](https://github.com/hanhanhan/ricochet_robots/blob/master/src/components/css/themes.js#L1)

🍓🍓 make solver (WASM!)

🍓 randomize board

🍓 randomize start/destinations

🍓 instructions - tourguide /
hints / tool tips

🍓🍓 add server w/websockets for
shared gameplay

🍓 spiff build process

- lighthouse checklist
- PWA
- check render path
- ci process

🍓 changelog

✅ win sequence:

- save score
- rotate player
- new score

✅ fix - n/s neighboring robots -- the south robot doesn't travel correctly

✅ scoring
Once move is complete, push onto list

- increment move count / len(list)
- win -> rotate player / set turn, update player score

✅ swap click backend for touch on mobile

✅ show valid travel destinations on drag end square by robot

✅ move undo
