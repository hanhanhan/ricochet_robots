import make_graph from "./basegraph"

describe("Check destination targets based on additional barriers", () => {
  let graph

  beforeEach(() => {
    graph = make_graph()
  })

  test("north destination", () => {
    expect(graph[11][0].north).toEqual([4, 0])
  })
  test("south destination", () => {
    expect(graph[4][0].south).toEqual([11, 0])
  })
  test("east destination", () => {
    expect(graph[1][0].east).toEqual([1, 5])
  })
  test("west destination", () => {
    expect(graph[0][9].west).toEqual([0, 4])
  })
})
