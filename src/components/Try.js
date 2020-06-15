import React, { useState } from "react"

function useA(b) {
  const [a, setA] = useState(`I'm A are you b? ${b} yes`)
  const bab = `updated based on ${b}`
  return [a, setA, bab]
}

function useB() {
  const [b, setB] = useState(`I'm B`)
  return [b, setB]
}

const TryComponent = () => {
  const [b, setB] = useB()
  const [a, setA, bab] = useA(b)
  return (
    <div style={{ width: `100vw`, backgroundColor: `orange` }}>
      hi <div>{a}</div>
      <div onClick={() => setA("Next A!")}>I set a</div>
      <div onClick={() => setB("Next B!")}>I set b</div>
      <div>{b}</div>
      <div>Does this update?</div>
      <div>{bab}</div>
    </div>
  )
}

export default TryComponent
