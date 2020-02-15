import React from "react"

import HorizontalActiveSlice from "./HorizontalActiveSlice"
import VerticalActiveSlice from "./VerticalActiveSlice"

export default function Slice(props) {
  const {
    item: { i },
    activeIndex,
    onClick,
    vertical
  } = props

  const handleClick = i === activeIndex ? onClick : undefined

  if (vertical) {
    return <VerticalActiveSlice onMouseDown={handleClick} {...props} />
  }

  return <HorizontalActiveSlice onMouseDown={handleClick} {...props} />
}
