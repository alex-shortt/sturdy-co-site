import React, { useCallback } from "react"
import { useDrag, useMove } from "react-use-gesture"

export function useGesture(dims, numSlices, setActiveIndex) {
  const handleGesture = useCallback(
    ({ movement: [mx, my], xy: [x, y], hover, drag }) => {
      let newIndex = -1

      if ((mx === 0 && my === 0) || hover) {
        if (drag) {
          newIndex = null
        } else if (isInBounds(x, y, dims)) {
          newIndex = getIndexFromPos(x, y, numSlices, dims)
        } else {
          newIndex = null
        }
      } else {
        newIndex = getIndexFromPos(x, y, numSlices, dims)
      }

      if (newIndex !== -1) {
        setActiveIndex(newIndex)
      }
    },
    [dims, numSlices, setActiveIndex]
  )

  const dragBind = useDrag(payload => handleGesture({ drag: true, ...payload }))

  const moveBind = useMove(payload =>
    handleGesture({ hover: true, ...payload })
  )

  const onClick = e =>
    handleGesture({ movement: [0, 0], xy: [e.clientX, e.clientY] })

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
