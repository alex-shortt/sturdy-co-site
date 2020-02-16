import React, { useCallback } from "react"
import { useDrag, useMove } from "react-use-gesture"

export function useGesture(dims, numSlices, activeIndex, setActiveIndex) {
  const updateActiveIndex = useCallback(
    (x, y) => {
      const newIndex = getIndexFromPos(x, y, numSlices, dims)

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    },
    [activeIndex, dims, numSlices, setActiveIndex]
  )

  const handleDrag = useCallback(
    ({ movement: [mx, my], xy: [x, y], down }) => {
      const moved = mx !== 0 || my !== 0

      if (!moved || !down) {
        return
      }

      updateActiveIndex(x, y)
    },
    [updateActiveIndex]
  )
  const dragBind = useDrag(payload => handleDrag(payload))

  const handleMove = useCallback(
    ({ xy: [x, y] }) => {
      const inCarouselBounds = isInBounds(x, y, dims)

      if (!inCarouselBounds) {
        setActiveIndex(null)
        return
      }

      updateActiveIndex(x, y)
    },
    [dims, setActiveIndex, updateActiveIndex]
  )
  const moveBind = useMove(payload => handleMove(payload))

  const handleClick = useCallback(
    ({ clientX: x, clientY: y }) => {
      const inCarouselBounds = isInBounds(x, y, dims)

      if (!inCarouselBounds) {
        setActiveIndex(null)
        return
      }

      updateActiveIndex(x, y)
    },
    [dims, setActiveIndex, updateActiveIndex]
  )
  const onClick = e => handleClick(e)

  return { dragBind, moveBind, onClick }
}

const getIndexFromPos = (x, y, numSlices, dims) => {
  const { minX, minY, width, height, vertical } = getContainerBounds(dims)

  let yPerc = (y - minY) / height
  if (yPerc < 0) {
    yPerc = 0
  }
  if (yPerc >= 1) {
    yPerc = 0.99
  }

  let xPerc = (x - minX) / width
  if (xPerc < 0) {
    xPerc = 0
  }
  if (xPerc >= 1) {
    xPerc = 0.99
  }

  return Math.floor((vertical ? yPerc : xPerc) * numSlices)
}

const isInBounds = (x, y, dims) => {
  const { minX, maxX, minY, maxY } = getContainerBounds(dims)
  return x > minX && x < maxX && y > minY && y < maxY
}

const getContainerBounds = dims => {
  const { width, height, vertical } = dims
  const minX = window.innerWidth / 2 - width / 2
  const maxX = minX + width

  const minY = window.innerHeight / 2 - height / 2
  const maxY = minY + height

  return { minX, maxX, minY, maxY, width, height, vertical }
}
