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
  ${props => props.vertical && "flex-direction: column"};
`

export default function Carousel(props) {
  const { data, history } = props

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
  }, [data, dims])

  return (
    <Container style={dims} ref={containerRef} vertical={dims && dims.vertical}>
      {data.map((item, i) => (
        <Slice
          onHover={() => setActiveIndex(i)}
          onClick={() => {
            history.push(`/${item.id}`)
            setActiveIndex(null)
          }}
          item={{ ...item, i }}
          parentDims={dims || getSlicesDims()}
          vertical={dims && dims.vertical}
          data={data}
          activeIndex={activeIndex}
        />
      ))}
    </Container>
  )
}

const getSlicesDims = () => {
  const ratio = 5 / 16
  const windowWidth = window.innerWidth
  const width = Math.min(window.innerWidth * 0.7, 900)

  if (windowWidth < 750) {
    const height = window.innerHeight - 400
    return {
      width: Math.min(width, (height * ratio * 3) / 2),
      height,
      vertical: true
    }
  }

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
