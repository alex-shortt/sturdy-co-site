import React from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"

import RevealText from "components/RevealText"

const Wrapper = styled(animated.div)`
  position: absolute;
  pointer-events: none;
  transform-style: preserve-3d;
  left: 50%;
  top: ${props => props.pos * 100}%;
  transition: width 350ms ease-out, height 350ms ease-out;
  overflow: hidden;
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
`

export default function VerticalActiveSlice(props) {
  const { data, item, parentDims, activeIndex } = props

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
  wrapperStyle.width = active ? WIDTH * 1.1 : WIDTH // wrapperPos.wh.interpolate((w, h) => `${w}px`)
  wrapperStyle.height = active
    ? (HEIGHT * 2) / data.length
    : HEIGHT / data.length // wrapperPos.wh.interpolate((w, h) => `${h}px`)

  return (
    <Wrapper style={wrapperStyle} pos={pos}>
      <Container style={containerStyle}>
        <Content active={active}>
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
  const THETA = 45 // 0-90 in deg

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
    newWrapperPos.wh = [WIDTH * 1.1, (HEIGHT * 1.1) / data.length]
    // move away from edge
    newWrapperPos.yrXz[0] += (((activePos - 0.5) / 0.5) * -HEIGHT) / data.length
  } else if (activeIndex !== null) {
    // line up slices for when it rotates
    const wPrime = newWrapperPos.wh[1] * Math.cos((THETA * Math.PI) / 180)
    const space = newWrapperPos.wh[1] - wPrime
    newWrapperPos.yrXz[0] += (i < activeIndex ? 1 : -1) * space * dist

    // line up first slice with middle of active slice
    newWrapperPos.yrXz[0] += (activePos - 0.5) * -WIDTH

    // push to edges of active slice
    newWrapperPos.yrXz[0] +=
      (WIDTH / 2) *
      (0.6 + 0.6 * Math.abs(activePos - 0.5)) *
      (i < activeIndex ? -1 : 1)

    // move in 3d
    newWrapperPos.yrXz[2] +=
      MAX_DEPTH * ((-dist * (HEIGHT / 800)) / maxDist + 1)

    // give breathing room on edges
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
    // effects
    containerStyle.backgroundColor = `rgb(${grayscale}, ${grayscale}, ${grayscale})`
    containerStyle.filter.push(`blur(${2 * (1 - linear)}px)`)
  } else {
    containerStyle.backgroundColor = `rgb(${grayscale}, ${grayscale}, ${grayscale})`
  }

  containerStyle.filter = containerStyle.filter.join(" ")

  return containerStyle
}
