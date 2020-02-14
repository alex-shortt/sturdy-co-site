import React from "react"
import styled from "styled-components/macro"

import ActiveSlice from "./ActiveSlice"
import VerticalActiveSlice from "./VerticalActiveSlice"

const Hit = styled.div`
  flex: 1;
  ${props => (props.vertical ? "width: 100%" : "height: 100%")};
  cursor: pointer;
  transition: 0.25s linear;
  position: relative;
`

export default function Slice(props) {
  const {
    item: { i },
    onHover,
    activeIndex,
    onClick,
    vertical
  } = props

  const handleClick = () => i === activeIndex && onClick()

  return (
    <>
      <Hit onMouseMove={onHover} onClick={handleClick} vertical={vertical} />
      {vertical ? (
        <VerticalActiveSlice {...props} />
      ) : (
        <ActiveSlice {...props} />
      )}
    </>
  )
}
