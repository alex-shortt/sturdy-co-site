import React from "react"
import styled from "styled-components/macro"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  top: 50%;
  left: ${props => props.pos * 100}%;
  transform: translateY(-50%);
  position: absolute;
  overflow: hidden;
  ${props => `background: hsl(0, 0%, ${props.pos * 100 * 0.9 + 10}%)`};
  pointer-events: none;
  transition: ease-in-out 750ms;
`

const Content = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  transition: ease-in-out 750ms;
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export default function ActiveSlice(props) {
  const {
    data,
    item: { i },
    parentDims: { width: WIDTH, height: HEIGHT },
    activeIndex,
    children
  } = props

  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const wrapperDims = {
    width: WIDTH / data.length,
    height: HEIGHT,
    transform: [
      "translateY(-50%)",
      `translateX(-${pos * 100}%)`,
      "scale(1.02)",
      "translateZ(0px)"
    ],
    filter: []
  }

  if (active) {
    // this one is active
    wrapperDims.transform.push("translateZ(200px)")
    wrapperDims.width = HEIGHT * 1.1
    wrapperDims.filter.push("blur(0px)")
  } else if (activeIndex !== null) {
    // another one is active

    const dist = Math.abs(activeIndex - i)
    const adjustDist = Math.max(dist + 2, 2)
    const sizePerc = 2 / adjustDist

    wrapperDims.height = HEIGHT
    wrapperDims.transform.push(`translateZ(${200 * sizePerc}px)`)
    wrapperDims.filter.push(`blur(${2 * (1 - sizePerc)}px)`)
  }

  wrapperDims.transform = wrapperDims.transform.join(" ")
  wrapperDims.filter = wrapperDims.filter.join(" ")

  return (
    <Wrapper style={wrapperDims} pos={pos}>
      <Content active={active}>{children}</Content>
    </Wrapper>
  )
}
