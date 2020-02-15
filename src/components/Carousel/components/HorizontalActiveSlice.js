import React from "react"
import styled from "styled-components/macro"
import { useSpring } from "react-spring"

import RevealText from "components/RevealText"
import { calcHorizontalWrapperPos, calcContainerStyle } from "services/slice"

import { Container, Content, WrapperBase } from "./SliceCommon"

const Wrapper = styled(WrapperBase)`
  top: 50%;
  left: ${props => props.pos * 100}%;
`

export default function HorizontalActiveSlice(props) {
  const { data, item, parentDims, activeIndex, onMouseDown } = props
  const { i, title, subtitle, color } = item
  const { width: WIDTH, height: HEIGHT } = parentDims

  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const [wrapperPos, setWrapperPos] = useSpring(() => ({
    wh: [WIDTH / data.length, HEIGHT],
    xrYz: [0, 0, 0],
    config: { mass: 2, tension: 400, friction: 60 }
  }))

  // update styles
  const containerStyle = calcContainerStyle(props)
  const newWrapperStyle = calcHorizontalWrapperPos(props)
  setWrapperPos(newWrapperStyle)

  // interpolate values
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
  wrapperStyle.transform = wrapperPos.xrYz.interpolate(
    (x, ry, z) =>
      "translateY(-50%)" +
      `translateX(-${pos * 100}%)` +
      "scale(1.03)" +
      "translateZ(-20px)" +
      `translate3d(${x}px, 0, ${z}px)` +
      `rotateY(${ry}deg)`
  )
  wrapperStyle.width = active ? HEIGHT * 1.1 : WIDTH / data.length
  wrapperStyle.height = active ? HEIGHT * 1.1 : HEIGHT

  return wrapperStyle
}
