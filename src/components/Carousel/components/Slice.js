import React from "react"
import styled from "styled-components/macro"

import ActiveSlice from "./ActiveSlice"

const Hit = styled.div`
  flex: 1;
  height: 100%;
  cursor: pointer;
  transition: 0.25s linear;
  position: relative;
`

const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 2px;
`

const Subtitle = styled.h5`
  font-weight: 100;
  margin: 2px 0 0;
  color: white;
  font-size: 0.75rem;
`

export default function Slice(props) {
  const {
    item: { i, title, subtitle },
    onHover,
    activeIndex,
    onClick
  } = props

  const handleClick = () => i === activeIndex && onClick()

  return (
    <>
      <Hit onMouseMove={onHover} onClick={handleClick} />
      <ActiveSlice {...props}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </ActiveSlice>
    </>
  )
}
