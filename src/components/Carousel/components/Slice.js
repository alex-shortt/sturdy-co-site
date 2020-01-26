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
    item: { title, subtitle },
    onHover
  } = props

  return (
    <>
      <Hit onMouseMove={onHover} />
      <ActiveSlice {...props}>
        {title}
        <br />
        {subtitle}
      </ActiveSlice>
    </>
  )
}
