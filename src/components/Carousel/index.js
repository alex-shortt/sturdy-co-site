import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import Slice from "./components/Slice"

const Container = styled.div`
  background: red;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export default function Carousel(props) {
  const { data } = props

  const [dims, setDims] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (!dims) {
      setDims(getSlicesDims())
      window.addEventListener("resize", () => setDims(getSlicesDims()))
    }
  }, [dims])

  return (
    <Container
      style={dims}
      onClick={() => setActiveIndex(Math.floor(Math.random() * data.length))}
    >
      {data.map((item, i) => (
        <Slice
          item={{ ...item, i }}
          parentDims={dims || getSlicesDims()}
          data={data}
          activeIndex={activeIndex}
        />
      ))}
    </Container>
  )
}

const getSlicesDims = () => {
  const ratio = 7 / 16
  const width = Math.min(window.innerWidth * 0.7, 900)
  return { width, height: width * ratio }
}
