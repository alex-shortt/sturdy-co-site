import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

import { useGesture } from "services/gesture"

import Slice from "./components/Slice"

const DragLocation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
    }
  }, [data, dims])

  const { dragBind, moveBind, onClick } = useGesture(
    dims,
    data.length,
    setActiveIndex
  )
  if (!dragBind || !moveBind || !onClick) {
    return <></>
  }

  return (
    <DragLocation {...dragBind()} onClick={onClick}>
      <Container
        style={dims}
        ref={containerRef}
        vertical={dims && dims.vertical}
        {...moveBind()}
      >
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
    </DragLocation>
  )
}

const getSlicesDims = () => {
  const ratio = 5 / 16
  const windowWidth = window.innerWidth
  const width = Math.min(window.innerWidth * 0.7, 900)

  if (windowWidth < 750) {
    const height = window.innerHeight - 75 - 55 - 135 - 60 // logo, header, footer, padding
    return {
      width: Math.min(width, (height * ratio * 3) / 2),
      height,
      vertical: true
    }
  }

  return { width, height: width * ratio }
}
