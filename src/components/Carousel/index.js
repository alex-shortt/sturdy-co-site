import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

import Slice from "./components/Slice"

const Container = styled.div`
  //background: red;
  //border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  perspective: 2000px;
`

export default function Carousel(props) {
  const { data } = props

  const [dims, setDims] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (!dims) {
      setDims(getSlicesDims())
      window.addEventListener("resize", () => setDims(getSlicesDims()))
      window.addEventListener("mousemove", e => {
        if (!isDescendant(containerRef.current, e.target)) {
          setActiveIndex(null)
        }
      })
    }
  }, [dims])

  return (
    <Container style={dims} ref={containerRef}>
      {data.map((item, i) => (
        <Slice
          onHover={() => setActiveIndex(i)}
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

const isDescendant = (parent, child) => {
  let node = child.parentNode
  while (node != null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}
