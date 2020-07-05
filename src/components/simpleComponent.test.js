import React from "react"
import { render, screen, fireEvent } from "../utils/testUtils"
// import { MouseEvent } from "@testing-library/react"
import SimpleComponent from "./simpleComponent"

test("Simple component renders", () => {
  const view = render(<SimpleComponent />)
  let h = screen.queryByRole("heading")

  fireEvent.dragStart(h)
  // vanilla Jest assertion
  // expect(h.innerHTML).toContain("I'm moving!")
  // extended @testing-library/jest-dom assertion
  expect(h).toHaveTextContent("I'm moving!")

  // Not working: MouseEvent needs to be imported from somewhere
  // https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js
  // Are these not reimported into react-testing-library?
  // fireEvent(
  //   h,
  //   new MouseEvent("click", {
  //     bubbles: true,
  //     cancelable: true,
  //   })
  // )

  // This works too
  // let e = createEvent.dragStart(h)
  // fireEvent(h, e)

  // This doesn't work, though it looks like the sample code to me
  // This part of DOM testing library is not reimported to react testing?
  // https://testing-library.com/docs/dom-testing-library/api-events
  // github.com/testing-library/dom-testing-library/blob/9ae92446762c15259e18ea3a398ddd8cb7afbc97/src/event-map.js#L92
  // fireEvent(h, new DragEvent("dragStart"))
  // screen.debug(h)
  // console.log(simple)

  // console.log(simple.debug())
  // expect(simple).not.toBeNull()
})

/*
const useThing = () => useState("I'm a thing")

const Parent = (props) => {
  const [thing, setThing] = useThing()

  return (
    <div>
      <Child setThing={setThing} />
    </div>
  )
}
const Child = ({ setThing }) => <button onClick={setThing} />
*/

/*
I want to test Child's functionality, including useThing.

I can't pass 'setThing' as a prop directly in my test, since I can't use hooks outside of react components.

Should I:
- Test Child by calling render(Parent), then querying to get the child, then running the test?
- Include 'loose' hooks Provider that's available to all tests via a custom render like in here?
https://testing-library.com/docs/react-testing-library/setup#custom-render
- Something else I'm not thinking of?

This is meant to be a simple stripped down example to illustrate the problem.
The actual code I'm using -- it's with React Drag N Drop and an array of children. 
I want to make sure a child is droppable (or not) based on the right conditions.
*/
