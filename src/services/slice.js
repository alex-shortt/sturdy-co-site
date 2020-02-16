import pSBC from "shade-blend-color"

export const calcHorizontalWrapperPos = props => {
  const { data, item, parentDims, activeIndex } = props

  const { width: WIDTH, height: HEIGHT } = parentDims
  const { i } = item

  const MAX_DEPTH = 300
  const THETA = 45 // 0-90 in deg

  const active = activeIndex === i
  const activePos = activeIndex / (data.length - 1)
  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  const newWrapperPos = {
    wh: [WIDTH / data.length, HEIGHT], // px
    xrYz: [0, 0, 0] // px deg px
  }

  if (active) {
    newWrapperPos.xrYz[2] = MAX_DEPTH + 30
    newWrapperPos.wh = [HEIGHT * 1.1, HEIGHT * 1.1]
    // move away from edge
    newWrapperPos.xrYz[0] += ((activePos - 0.5) * -WIDTH) / data.length
  } else if (activeIndex !== null) {
    // line up slices for when it rotates
    const wPrime = newWrapperPos.wh[0] * Math.cos((THETA * Math.PI) / 180)
    const space = newWrapperPos.wh[0] - wPrime
    newWrapperPos.xrYz[0] += (i < activeIndex ? 1 : -1) * space * dist

    // line up first slice with middle of active slice
    newWrapperPos.xrYz[0] += (activePos - 0.5) * -HEIGHT

    // push to edges of active slice, do it less for the outer ones
    newWrapperPos.xrYz[0] +=
      (HEIGHT / 2) *
      (0.8 - Math.abs(activePos - 0.5)) *
      (i < activeIndex ? -1 : 1)

    // move in 3d
    newWrapperPos.xrYz[2] += MAX_DEPTH * ((-dist * (WIDTH / 740)) / maxDist + 1)

    // give breathing room on edges
    newWrapperPos.xrYz[2] += Math.abs(activePos - 0.5) * -HEIGHT

    // rotate
    newWrapperPos.xrYz[1] = THETA * (i < activeIndex ? -1 : 1)
  }

  return newWrapperPos
}

export const calcVerticalWrapperPos = props => {
  const { data, item, parentDims, activeIndex } = props

  const { width: WIDTH, height: HEIGHT } = parentDims
  const { i } = item

  const MAX_DEPTH = 300
  const THETA = 55 // 0-90 in deg

  const active = activeIndex === i
  const activePos = activeIndex / (data.length - 1)
  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)

  const newWrapperPos = {
    wh: [WIDTH, HEIGHT / data.length], // px
    yrXz: [0, 0, 0] // px deg px
  }

  if (active) {
    newWrapperPos.yrXz[2] = MAX_DEPTH + 30

    // move away from edge
    newWrapperPos.yrXz[0] +=
      ((activePos - 0.5) / 0.5) * ((-HEIGHT * 3) / data.length)
  } else if (activeIndex !== null) {
    // line up slices for when it rotates
    const wPrime = newWrapperPos.wh[1] * Math.cos((THETA * Math.PI) / 180)
    const space = newWrapperPos.wh[1] - wPrime

    // move as a whole to get in line
    newWrapperPos.yrXz[0] += (i < activeIndex ? 1 : -1) * space * dist
    // push to edges of active slice
    newWrapperPos.yrXz[0] += (HEIGHT / data.length) * (i < activeIndex ? -1 : 1)
    // line up first slice with middle of active slice
    newWrapperPos.yrXz[0] +=
      ((activePos - 0.5) / 0.5) * ((-HEIGHT * 3) / data.length)

    // move in 3d, use   G O D  C O N S T A N T
    newWrapperPos.yrXz[2] +=
      MAX_DEPTH * ((-dist * (HEIGHT / 580)) / maxDist + 1)
    // give breathing room for edges clipping
    newWrapperPos.yrXz[2] += Math.abs(activePos - 0.5) * -WIDTH

    // rotate
    newWrapperPos.yrXz[1] = THETA * (i < activeIndex ? 1 : -1)
  }

  return newWrapperPos
}

export const calcContainerStyle = props => {
  const { data, item, activeIndex } = props

  const { i, color } = item

  const active = activeIndex === i
  const pos = i / (data.length - 1)
  const grayscale = calcGrayscale(pos)
  const dist = Math.abs(activeIndex - i)
  const maxDist = Math.floor(data.length * 0.6)
  const linear = -dist / maxDist + 1

  const containerStyle = {
    filter: []
  }

  if (active) {
    // this one is active
    containerStyle.backgroundColor = color
    containerStyle.filter.push("blur(0px)")
  } else if (activeIndex !== null) {
    // another one is active
    const activeColor = data[activeIndex].color
    containerStyle.backgroundColor = pSBC(1 - Math.max(linear, 0), activeColor)
    containerStyle.filter.push(`blur(${2 * (1 - linear)}px)`)
  } else {
    // none are active
    containerStyle.backgroundColor = `rgb(${grayscale}, ${grayscale}, ${grayscale})`
  }

  containerStyle.filter = containerStyle.filter.join(" ")

  return containerStyle
}

export const calcGrayscale = pos => pos * 175 + 40
