import React, { useState } from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"

const Wrapper = styled(animated.div)`
  position: absolute;
  pointer-events: none;
  transform-style: preserve-3d;
  top: 50%;
  left: ${props => props.pos * 100}%;
  transition: width 350ms ease-out, height 350ms ease-out;
`

const Container = styled(animated.div)`
  width: 100%;
  height: 100%;
  //transition: all linear 300ms;
`

const Content = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  transition: ${props => (props.active ? "ease-out 300ms" : "ease-out 200ms")};
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  position: relative;
  text-transform: uppercase;
`

export default function ActiveSlice(props) {
  const {
    data,
    item: { i },
    parentDims: { width: WIDTH, height: HEIGHT },
    activeIndex,
    children
  } = props

  const [currIndex, setCurrIndex] = useState(activeIndex)

  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const [wrapperPos, setWrapperPos] = useSpring(() => ({
    wh: [WIDTH / data.length, HEIGHT],
    xrYz: [0, 0, 0],
    config: { mass: 2, tension: 400, friction: 60 }
  }))

  const containerStyle = calcContainerStyle(props)
  if (currIndex !== activeIndex) {
    const newWrapperStyle = calcWrapperPos(props)
    setWrapperPos(newWrapperStyle)
    setCurrIndex(activeIndex)
  }

  // interpolate wrapper style
  const wrapperStyle = {}
  wrapperStyle.transform = wrapperPos.xrYz.interpolate(
    (x, ry, z) =>
      "translateY(-50%)" +
      `translateX(-${pos * 100}%)` +
      "scale(1.03)" +
      `translate3d(${x}px, 0, ${z}px)` +
      `rotateY(${ry}deg)`
  )
  wrapperStyle.width = active ? HEIGHT * 1.1 : WIDTH / data.length // wrapperPos.wh.interpolate((w, h) => `${w}px`)
  wrapperStyle.height = active ? HEIGHT * 1.1 : HEIGHT // wrapperPos.wh.interpolate((w, h) => `${h}px`)

  return (
    <Wrapper style={wrapperStyle} pos={pos}>
      <Container style={containerStyle}>
        <Content active={active}>{children}</Content>
      </Container>
    </Wrapper>
  )
}

const calcWrapperPos = props => {
  const {
    data,
    item: { i },
    parentDims: { width: WIDTH, height: HEIGHT },
    activeIndex
  } = props

  const active = activeIndex === i
  const pos = i / (data.length - 1)
  const activePos = activeIndex / (data.length - 1)

  const MAX_DEPTH = 300
  const THETA = 45 // 0-90 in deg

  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  // -x/n + 1 -- linear interpolation from 0 to 1, given dist
  const linear = -dist / maxDist + 1

  const newWrapperPos = {
    wh: [WIDTH / data.length, HEIGHT], // px
    xrYz: [0, 0, 0] // px deg px
  }

  if (active) {
    newWrapperPos.xrYz[2] = MAX_DEPTH + 40
    newWrapperPos.wh = [HEIGHT * 1.1, HEIGHT * 1.1]
  } else if (activeIndex !== null) {
    // line up slices for when it rotates
    const wPrime = newWrapperPos.wh[0] * Math.cos((THETA * Math.PI) / 180)
    const space = newWrapperPos.wh[0] - wPrime
    const shift = (i < activeIndex ? 1 : -1) * space * dist
    newWrapperPos.xrYz[0] += shift * 1.08 // 1.08 to fill up holes

    // line up first slice with middle of active slice
    newWrapperPos.xrYz[0] += (activePos - 0.5) * -HEIGHT

    // push to edges of active slice, do it less for the outer ones
    newWrapperPos.xrYz[0] +=
      (HEIGHT / 2) *
      (0.8 - Math.abs(activePos - 0.5)) *
      (i < activeIndex ? -1 : 1)

    newWrapperPos.xrYz[2] = MAX_DEPTH * linear // move in 3d
    newWrapperPos.xrYz[1] = THETA * (i < activeIndex ? -1 : 1) // rotate
  }

  return newWrapperPos
}

const calcContainerStyle = props => {
  const {
    data,
    item: { i },
    activeIndex,
    hue
  } = props

  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  // -x/n + 1 -- linear interpolation from 0 to 1, given dist
  const linear = -dist / maxDist + 1

  const containerStyle = {
    background: `hsl(${hue}, 100%, ${pos * 50 + 20}%)`,
    filter: []
  }

  if (active) {
    // this one is active
    containerStyle.filter.push("grayscale(0)")
    containerStyle.filter.push("blur(0px)")
  } else if (activeIndex !== null) {
    // effects
    containerStyle.filter.push(`blur(${2 * (1 - linear)}px)`)
    containerStyle.filter.push("grayscale(1)")
  } else {
    containerStyle.filter.push("grayscale(1)")
  }

  containerStyle.filter = containerStyle.filter.join(" ")

  return containerStyle
}
