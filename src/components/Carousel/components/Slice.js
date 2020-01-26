import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

const Hit = styled.div`
  height: 100%;
  cursor: pointer;
  transition: 0.25s linear;
  position: relative;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  top: 50%;
  left: ${props => props.pos * 100}%;
  transform: translateY(-50%);
  position: absolute;
  overflow: hidden;
  ${props => `background: hsl(0, 0%, ${props.pos * 100}%)`};
  pointer-events: none;
  transition: cubic-bezier(0.86, 0, 0.07, 1) 1440ms;
`

const Content = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  transition: cubic-bezier(0.86, 0, 0.07, 1) 1440ms;
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export default function Slice(props) {
  const {
    item: { title, subtitle, i },
    activeIndex,
    parentDims: { width: WIDTH, height: HEIGHT },
    data
  } = props

  const dims = { width: WIDTH / data.length, height: HEIGHT }
  const active = activeIndex === i
  const pos = i / (data.length - 1)

  const wrapperDims = {
    ...dims,
    transform: ["translateY(-50%)", `translateX(-${pos * 100}%)`, "scale(1.02)"]
  }
  const hitDims = { ...dims }

  if (active) {
    // this one is active
    wrapperDims.transform.push("translate3D(0px, 0, 0)")
    wrapperDims.width = HEIGHT * 1.1
  } else if (activeIndex) {
    // another one is active

    const dist = Math.abs(activeIndex - i)
    const adjustDist = Math.max(dist + 2, 2)

    wrapperDims.height = HEIGHT * 1.1 * (2 / adjustDist)
    // wrapperDims.width = HEIGHT * 1.1 * (2 / adjustDist)
  }

  wrapperDims.transform = wrapperDims.transform.join(" ")

  return (
    <>
      <Hit style={hitDims} />
      <Wrapper style={wrapperDims} pos={pos}>
        <Content active={active}>{title}</Content>
      </Wrapper>
    </>
  )
}
