import React from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  top: 50%;
  left: ${props => props.pos * 100}%;
  transform: translateY(-50%);
  position: absolute;
  overflow: hidden;
  pointer-events: none;
  transition: ease-out 300ms;
`

const Content = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  transition: ${props => (props.active ? "ease-out 300ms" : "ease-out 200ms")};
  color: black;
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

  const wrapperStyle = {
    width: WIDTH / data.length,
    height: HEIGHT,
    background: `hsl(${hue}, 100%, ${pos * 60 + 25}%)`,
    transform: [
      "translateY(-50%)",
      `translateX(-${pos * 100}%)`,
      "scale(1.02)",
      "translateZ(-50px)"
    ],
    filter: []
  }

  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  // 2n / (x + n) - 1
  // nonlinear interpolation from 0 to 1, given dist
  const ease = Math.max((2 * maxDist) / (dist + maxDist) - 1, 0)

  // -x/n + 1
  // linear interpolation from 0 to 1, given dist
  const linear = Math.max(-dist / maxDist + 1, 0)

  if (active) {
    // this one is active
    wrapperStyle.transform.push("translateZ(200px)")
    wrapperStyle.width = HEIGHT * 1.1 + HEIGHT * 0.1
    wrapperStyle.height = HEIGHT * 1.1 + HEIGHT * 0.1
    wrapperStyle.filter.push("blur(0px)")
    wrapperStyle.filter.push("grayscale(0)")
  } else if (activeIndex !== null) {
    // another one is active

    // wrapperStyle.width = HEIGHT * 1.1 + HEIGHT * 0.1
    wrapperStyle.width += ease * HEIGHT * 0.05
    wrapperStyle.transform.push(`translateZ(${200 * ease}px)`)
    // wrapperStyle.transform.push(`scale(${1 + 0.15 * (1 - linear)})`)
    wrapperStyle.filter.push(`blur(${1 - ease}px)`)
    wrapperStyle.filter.push(`grayscale(${1 - ease})`)
    wrapperStyle.transition = `ease-out ${(1 - ease) * 200 + 300}ms`
  } else {
    wrapperStyle.filter.push("grayscale(1)")
  }

  wrapperStyle.transform = wrapperStyle.transform.join(" ")
  wrapperStyle.filter = wrapperStyle.filter.join(" ")

  // const anim = useSpring(wrapperDims)

  return (
    <Wrapper as={animated.div} style={wrapperStyle} pos={pos}>
      <Content active={active}>{children}</Content>
    </Wrapper>
  )
}
