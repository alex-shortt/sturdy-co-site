import React from "react"
import styled from "styled-components/macro"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  top: 50%;
  left: ${props => props.pos * 100}%;
  transform: translateY(-50%);
  position: absolute;
  pointer-events: none;
  transition: ease-out 300ms;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  transition: all linear 300ms;
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

  //&::before {
  //  pointer-events: none;
  //  position: absolute;
  //  content: "";
  //  top: 99%;
  //  left: 0%;
  //  height: 60px;
  //  width: 100%;
  //  background: linear-gradient(
  //    180deg,
  //    rgba(255, 110, 202, 0.4) 0%,
  //    transparent 80%
  //  );
  //}
`

export default function ActiveSlice(props) {
  const {
    data,
    item: { i },
    parentDims: { width: WIDTH, height: HEIGHT },
    activeIndex,
    children,
    hue
  } = props

  const active = activeIndex === i
  const pos = i / (data.length - 1)
  const activePos = activeIndex / (data.length - 1)

  // positioning / sizing
  const wrapperStyle = {
    width: WIDTH / data.length,
    height: HEIGHT,
    transform: [
      "translateY(-50%)",
      `translateX(-${pos * 100}%)`,
      "scale(1.03)"
    ],
    filter: []
  }

  // styling
  const containerStyle = {
    background: `hsl(${hue}, 100%, ${pos * 50 + 20}%)`,
    filter: []
  }

  const MAX_DEPTH = 300
  const THETA = 45 // 0-90 in deg

  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  // -x/n + 1 -- linear interpolation from 0 to 1, given dist
  const linear = -dist / maxDist + 1

  if (active) {
    // this one is active
    wrapperStyle.transform.push(`translateZ(${MAX_DEPTH + 20}px)`)
    wrapperStyle.width = HEIGHT * 1.1
    wrapperStyle.height = HEIGHT * 1.1
    containerStyle.filter.push("grayscale(0)")
    containerStyle.filter.push("blur(0px)")
  } else if (activeIndex !== null) {
    // another one is active

    // line up slices for when it rotates
    const wPrime = wrapperStyle.width * Math.cos((THETA * Math.PI) / 180)
    const space = wrapperStyle.width - wPrime
    const shift = (i < activeIndex ? 1 : -1) * space * dist
    wrapperStyle.transform.push(`translateX(${shift * 1.08}px)`) // 1.08 to fill up holes

    // line up first slice with middle of active slice
    wrapperStyle.transform.push(`translateX(${(activePos - 0.5) * -HEIGHT}px)`)

    // push to edges of active slice, do it less for the outer ones
    wrapperStyle.transform.push(
      `translateX(${(HEIGHT / 2) *
        (0.8 - Math.abs(activePos - 0.5)) *
        (i < activeIndex ? -1 : 1)}px)`
    )

    // move in 3d
    wrapperStyle.transform.push(`translateZ(${MAX_DEPTH * linear}px)`)

    // rotate
    wrapperStyle.transform.push(
      `rotateY(${THETA * (i < activeIndex ? -1 : 1)}deg)`
    )

    // effects
    containerStyle.filter.push(`blur(${2 * (1 - linear)}px)`)
    containerStyle.filter.push(`grayscale(${1 - linear})`)
    wrapperStyle.transition = `ease-out ${(1 - linear) * 200 + 200}ms`
    containerStyle.transition = `ease-out ${(1 - linear) * 200 + 200}ms`
  } else {
    containerStyle.filter.push("grayscale(1)")
  }

  wrapperStyle.transform = wrapperStyle.transform.join(" ")
  wrapperStyle.filter = wrapperStyle.filter.join(" ")
  containerStyle.filter = containerStyle.filter.join(" ")

  return (
    <Wrapper style={wrapperStyle} pos={pos}>
      <Container style={containerStyle}>
        <Content active={active}>{children}</Content>
      </Container>
    </Wrapper>
  )
}
