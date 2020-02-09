import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

import Slice from "./components/Slice"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1100px;
`

export default function Carousel(props) {
  const { data } = props

  const [dims, setDims] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    if (!dims) {
      setDims(getSlicesDims())
      assignColors(data)
      window.addEventListener("resize", () => setDims(getSlicesDims()))
      window.addEventListener("mousemove", e => {
        if (!isDescendant(containerRef.current, e.target)) {
          setActiveIndex(null)
        }
      })
    }
  }, [data, dims])

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
  const ratio = 5 / 16
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

const assignColors = data => {
  for (const card of data) {
    const hue = Math.random() * 360
    const sat = Math.random() * 20 + 80
    const lit = Math.random() * 20 + 50

    card.color = `hsl(${hue}, ${sat}%, ${lit}%)`
  }
}
