import React from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"
import pSBC from "shade-blend-color"

import RevealText from "components/RevealText"

const Wrapper = styled(animated.div)`
  position: absolute;
  transform-style: preserve-3d;
  left: 50%;
  top: ${props => props.pos * 100}%;
  transition: width 350ms ease-out, height 350ms ease-out;
  //overflow: hidden;
  pointer-events: all;
`

const Container = styled(animated.div)`
  width: 100%;
  height: 100%;
  transition: background-color 350ms ease-out;
`

const Content = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  transition: 100ms;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  transform-style: flat;
  user-select: none;
  pointer-events: ${props => (props.active ? "all" : "none")};
  cursor: pointer;
`

export default function VerticalActiveSlice(props) {
  const { data, item, parentDims, activeIndex, onMouseDown } = props

  const { i, title, subtitle, color } = item
  const { width: WIDTH, height: HEIGHT } = parentDims

  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const [wrapperPos, setWrapperPos] = useSpring(() => ({
    wh: [WIDTH, HEIGHT / data.length],
    yrXz: [0, 0, 0],
    config: { mass: 2, tension: 400, friction: 60 }
  }))

  const containerStyle = calcContainerStyle(props)
  const newWrapperStyle = calcWrapperPos(props)
  setWrapperPos(newWrapperStyle)

  // interpolate wrapper style
  const wrapperStyle = {}
  wrapperStyle.transform = wrapperPos.yrXz.interpolate(
    (y, rx, z) =>
      "translateX(-50%)" +
      `translateY(-${pos * 100}%)` +
      "scale(1.03)" +
      "translateZ(-20px)" +
      `translate3d(0, ${y}px, ${z}px)` +
      `rotateX(${rx}deg)`
  )
  wrapperStyle.width = active ? WIDTH * 1.05 : WIDTH
  wrapperStyle.height = active
    ? (HEIGHT * 3) / data.length
    : HEIGHT / data.length

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

const calcWrapperPos = props => {
  const { data, item, parentDims, activeIndex } = props

  const { width: WIDTH, height: HEIGHT } = parentDims
  const { i } = item

  const MAX_DEPTH = 300
  const THETA = 55 // 0-90 in deg

  const active = activeIndex === i
  const activePos = activeIndex / (data.length - 1)
  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  const newWrapperPos = {
    wh: [WIDTH, HEIGHT / data.length], // px
    yrXz: [0, 0, 0] // px deg px
  }

  if (active) {
    newWrapperPos.yrXz[2] = MAX_DEPTH + 30

    // move away from edge
    newWrapperPos.yrXz[0] += (((activePos - 0.5) / 0.5) * -HEIGHT) / data.length
  } else if (activeIndex !== null) {
    // line up slices for when it rotates
    const wPrime = newWrapperPos.wh[1] * Math.cos((THETA * Math.PI) / 180)
    const space = newWrapperPos.wh[1] - wPrime

    // move as a whole to get in line
    newWrapperPos.yrXz[0] += (i < activeIndex ? 1 : -1) * space * dist
    // push to edges of active slice
    newWrapperPos.yrXz[0] += (HEIGHT / data.length) * (i < activeIndex ? -1 : 1)
    // line up first slice with middle of active slice
    newWrapperPos.yrXz[0] += (activePos - 0.5) * ((-HEIGHT * 4) / data.length)

    // move in 3d, use   G O D  C O N S T A N T
    newWrapperPos.yrXz[2] +=
      MAX_DEPTH * ((-dist * (HEIGHT / 650)) / maxDist + 1)
    // give breathing room for edges clipping
    newWrapperPos.yrXz[2] += Math.abs(activePos - 0.5) * -WIDTH

    // rotate
    newWrapperPos.yrXz[1] = THETA * (i < activeIndex ? 1 : -1)
  }

  return newWrapperPos
}

const calcContainerStyle = props => {
  const { data, item, activeIndex } = props

  const { i, color } = item

  const active = activeIndex === i
  const pos = i / (data.length - 1)
  const grayscale = pos * 175 + 40
  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)
  const linear = -dist / maxDist + 1

  const containerStyle = {
    filter: []
  }

  if (active) {
    // this one is active
    containerStyle.backgroundColor = color
    containerStyle.filter.push("blur(0px)")
  } else if (activeIndex !== null) {
    // another one is active
    const activeColor = data[activeIndex].color
    containerStyle.backgroundColor = pSBC(1 - Math.max(linear, 0), activeColor)
    containerStyle.filter.push(`blur(${2 * (1 - linear)}px)`)
  } else {
    // none are active
    containerStyle.backgroundColor = `rgb(${grayscale}, ${grayscale}, ${grayscale})`
  }

  containerStyle.filter = containerStyle.filter.join(" ")

  return containerStyle
}
