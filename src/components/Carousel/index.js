import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components/macro"
import { useDrag } from "react-use-gesture"

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
  //transform: scale(0.5) rotateY(75deg);
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

  const handleDrag = useCallback(
    ({ movement: [mx, my], xy: [x, y] }) => {
      const { width, height } = dims

      const minX = window.innerWidth / 2 - width / 2
      const maxX = minX + width

      const minY = window.innerHeight / 2 - height / 2
      const maxY = minY + height

      const updateIndex = () => {
        let yPerc = (y - minY) / height

        if (yPerc < 0) {
          yPerc = 0
        }
        if (yPerc >= 1) {
          yPerc = 0.9
        }

        const sliceIndex = Math.floor(yPerc * data.length)
        setActiveIndex(sliceIndex)
      }

      // tapped
      if (mx === 0 && my === 0) {
        if (x > minX && x < maxX && y > minY && y < maxY) {
          updateIndex()
        }
        return
      }

      updateIndex()
    },
    [data.length, dims]
  )

  const bind = useDrag(payload => {
    if (payload.movement[0] === 0 && payload.movement[1] === 0) {
      return
    }
    handleDrag(payload)
  })

  const handleClick = e =>
    handleDrag({ movement: [0, 0], xy: [e.clientX, e.clientY] })

  return (
    <DragLocation {...bind()} onClick={handleClick}>
      <Container
        style={dims}
        ref={containerRef}
        vertical={dims && dims.vertical}
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
