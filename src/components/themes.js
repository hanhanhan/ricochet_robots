// Wall Color
// Tile Color
// Border Color
// Gamepiece Icons
// Dest Tile / Source Tile Icons
// Font
// Font Color
// Page Background Color

const gamepieces = {
  1: { icon: "🤖" },
  2: { icon: "🎱" },
  3: { icon: "🦘" },
}

const themeTemplate = {
  wallStyle: `3px solid thistle`,
  borderColor: `thistle`,
  tiles: {
    tileColor: `aliceblue`,
    tileWinColor: `gold`,
    tileDestColor: `yellow`,
    tileTargetColor: `orange`,
  },
  pageBackgroundColor: "",
  gamepieces,
  font: "",
  fontColor: "",
  destTile: "",
  sourceTile: "",
}

/*******************************************************************************
 * Paul Klee inspired colors.
 *
 */

//  Palette https://www.bowdoin.edu/art-museum/news/2019/object-of-the-month-gefecht-battle-by-paul-klee.html
// #cfc6b1 #dcb	hsl(42,23,75)	rgb(207,198,177)	silver
// #8a5f43 #964	hsl(23,34,40)	rgb(138,95,67)	sienna
// #66442c #643	hsl(24,39,28)	rgb(102,68,44)	darkolivegreen
// #074567 #046	hsl(201,87,21)	rgb(7,69,103)	darkslategray
// #215c74 #267	hsl(197,55,29)	rgb(33,92,116)	darkslategray
// #438a96 #499	hsl(188,38,42)	rgb(67,138,150)	steelblue
// #c48f6e #c97	hsl(23,42,60)	rgb(196,143,110)	rosybrown
// #e7e37a #ee8	hsl(57,69,69)	rgb(231,227,122)	khaki
// #261f18 #222	hsl(30,22,12)	rgb(38,31,24)	black
// #9aa8a6 #aba	hsl(171,7,63)	rgb(154,168,166)	darkgray

// Palette https://www.tate.org.uk/art/artworks/klee-theyre-biting-n05658
// https://www.tate.org.uk/art/images/work/N/N05/N05658_10.jpg
// #7f904f	#895	hsl(75,29,43)	rgb(127,144,79)	olivedrab
// #a38937	#a93	hsl(45,49,42)	rgb(163,137,55)	peru
// #a3ad69	#ab7	hsl(68,29,54)	rgb(163,173,105)	darkkhaki
// #869f60	#8a6	hsl(83,24,50)	rgb(134,159,96)	gray
// #aba037	#ba3	hsl(54,51,44)	rgb(171,160,55)	peru
// #bca03d	#ca4	hsl(46,51,48)	rgb(188,160,61)	peru
// #bda96a	#cb7	hsl(45,38,57)	rgb(189,169,106)	darkkhaki
// #44371c	#432	hsl(40,41,18)	rgb(68,55,28)	darkolivegreen

const klee = {}

/*******************************************************************************
 * Primary and secondary-ish colors.
 *
 */

const wallStyle = "3px solid thistle"
const boardGridStyle = "2px solid snow"

const graphic = {
  ...themeTemplate,
  wallStyle: "3px solid thistle",
  boardGridStyle: "2px solid snow",
  tiles: {
    tileColor: `gray`,
    tileWinColor: `gold`,
    tileDestColor: `yellow`,
    tileTargetColor: `orange`,
  },
  borderColor: `green`, //"#07020F",
  tileColor: "2px solid gray",
  pageBackgroundColor: "#F6F7ED",
  //   font: "",
  //   fontColor: "",
  //   gamepieces,
  //   destTile: "",
  //   sourceTile: "",
}

export { graphic }
