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

export default function Slice(props) {
  const {
    item: { i },
    onHover,
    activeIndex,
    onClick
  } = props

  const handleClick = () => i === activeIndex && onClick()

  return (
    <>
      <Hit onMouseMove={onHover} onClick={handleClick} />
      <ActiveSlice {...props} />
    </>
  )
}
