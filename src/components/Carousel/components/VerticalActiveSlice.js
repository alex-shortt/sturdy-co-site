import React from "react"
import styled from "styled-components/macro"
import { useSpring } from "react-spring"

import RevealText from "components/RevealText"
import { calcVerticalWrapperPos, calcContainerStyle } from "services/slice"

import { Container, Content, WrapperBase } from "./SliceCommon"

const Wrapper = styled(WrapperBase)`
  left: 50%;
  top: ${props => props.pos * 100}%;
`

export default function VerticalActiveSlice(props) {
  const { data, item, parentDims, activeIndex, onMouseDown } = props
  const { i, title, subtitle, color } = item
  const { width: WIDTH, height: HEIGHT } = parentDims

  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const [wrapperPos, setWrapperPos] = useSpring(() => ({
    wh: [WIDTH, (HEIGHT * 3) / data.length],
    yrXz: [0, 0, 0],
    config: { mass: 2, tension: 400, friction: 60 }
  }))

  // update styles
  const containerStyle = calcContainerStyle(props)
  const newWrapperStyle = calcVerticalWrapperPos(props)
  setWrapperPos(newWrapperStyle)

  // interpolate wrapper style
  const wrapperStyle = interpolateWrapperStyle(wrapperPos, props)

  return (
    <Wrapper style={wrapperStyle} pos={pos}>
      <Container style={containerStyle}>
        <Content active={active} onMouseDown={onMouseDown}>
          {active && (
            <RevealText title={title} subtitle={subtitle} color={color} />
          )}
        </Content>
      </Container>
    </Wrapper>
  )
}

const interpolateWrapperStyle = (wrapperPos, props) => {
  const { data, item, parentDims, activeIndex } = props

  const { i } = item
  const { width: WIDTH, height: HEIGHT } = parentDims

  const pos = i / (data.length - 1)
  const active = activeIndex === i

  // interpolate wrapper style
  const wrapperStyle = {}
  wrapperStyle.transform = wrapperPos.yrXz.interpolate(
    (y, rx, z) =>
      "translateX(-50%)" +
      `translateY(-${pos * 100}%)` +
      "scale(1.03)" + // fill in gaps between slices
      "translateZ(-20px)" + // start 20px away, for effect i guess? idk
      `translate3d(0, ${y}px, ${z}px)` + // zoom
      `rotateX(${rx}deg)` // skrt
  )
  wrapperStyle.width = active ? WIDTH * 1.05 : WIDTH
  wrapperStyle.height = active
    ? (HEIGHT * 3) / data.length
    : HEIGHT / data.length

  return wrapperStyle
}
