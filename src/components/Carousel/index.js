import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InteractionSlice = styled.div`
  flex: 1;
  height: 100%;
  cursor: pointer;
  transition: 0.25s linear;
  ${props => `background: hsl(0, 0%, ${props.pos * 100}%)`};
`

export default function Carousel(props) {
  const { data } = props

  const [dims, setDims] = useState(null)

  useEffect(() => {
    if (!dims) {
      setDims(getSlicesDims())
      window.addEventListener("resize", () => setDims(getSlicesDims()))
    }
  }, [dims])

  return (
    <Container style={dims}>
      {data.map((item, i) => (
        <InteractionSlice id={item.name} pos={i / data.length} />
      ))}
    </Container>
  )
}

const getSlicesDims = () => {
  const ratio = 9 / 16
  const width = Math.min(window.innerWidth * 0.7, 900)
  return { width, height: width * ratio }
}
