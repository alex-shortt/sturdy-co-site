import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import { useGesture } from "services/gesture"

import Slice from "./components/Slice"
import IntroSlices from "./components/IntroSlices"

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
  const { data, id, shiftPos, history } = props

  const [showCarouselIntro, setShowCarouselIntro] = useState(true)
  const [dims, setDims] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (!dims) {
      setDims(getSlicesDims())
      window.addEventListener("resize", () => setDims(getSlicesDims()))
    }
  }, [data, dims, id])

  const { dragBind, moveBind, onClick } = useGesture(
    dims,
    data.length,
    activeIndex,
    setActiveIndex
  )
  if (!dragBind || !moveBind || !onClick) {
    return <></>
  }

  if (id && activeIndex !== null) {
    setActiveIndex(null)
  }

  if (showCarouselIntro && shiftPos === 1) {
    return (
      <DragLocation>
        <Container style={dims} vertical={dims && dims.vertical}>
          <IntroSlices
            delay={750}
            data={data}
            parentDims={dims || getSlicesDims()}
            onEnd={() => setShowCarouselIntro(false)}
            vertical={dims && dims.vertical}
          />
        </Container>
      </DragLocation>
    )
  }

  return (
    <DragLocation {...dragBind()} onClick={onClick}>
      <Container style={dims} vertical={dims && dims.vertical} {...moveBind()}>
        {data.map((item, i) => (
          <Slice
            key={item.id}
            onClick={() => history.push(`/${item.id}`)}
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
  const width = Math.min(window.innerWidth * 0.65, 900)

  if (windowWidth < 750) {
    const height = window.innerHeight - 70 - 50 - 100 - 60 // logo, header, footer, padding
    return {
      width: Math.min(width, (height * ratio * 3) / 2),
      height,
      vertical: true
    }
  }

  return { width, height: width * ratio }
}
