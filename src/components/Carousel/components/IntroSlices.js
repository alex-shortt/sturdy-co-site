import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components/macro"

import { calcGrayscale } from "services/slice"

const GrowX = keyframes`
  from { transform: scaleX(0) scale(1.03) translateZ(-20px) }
  to { transform: scaleX(1) scale(1.03) translateZ(-20px) }
`

const GrowY = keyframes`
  from { transform: scaleY(0) scale(1.03) translateZ(-20px) }
  to { transform: scaleY(1) scale(1.03) translateZ(-20px) }
`

const Slice = styled.div`
  flex: 1;
  transform: scale(0);
  ${props => (props.vertical ? "width: 100%" : "height: 100%")};
  transform-style: preserve-3d;
  animation-delay: ${props => props.delay}ms;
  animation-fill-mode: both;
  animation-name: ${props => (props.vertical ? GrowX : GrowY)};
  animation-duration: ${props => props.duration}ms;
  animation-timing-function: ease-out;
`

export default function IntroSlices(props) {
  const { data, onEnd, vertical, delay = 800, duration = 1300 } = props

  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) {
      setTimeout(onEnd, delay + duration + 50)
    }
  }, [delay, duration, onEnd, started])

  return (
    <>
      {data.map((item, i) => (
        <FakeSlice
          key={item.id}
          pos={i / (data.length - 1)}
          vertical={vertical}
          delay={delay}
          duration={duration}
        />
      ))}
    </>
  )
}

function FakeSlice(props) {
  const { pos, vertical, duration, delay } = props

  const gray = calcGrayscale(pos)
  const containerStyle = { background: `rgb(${gray}, ${gray}, ${gray})` }

  return (
    <Slice
      vertical={vertical}
      delay={delay}
      duration={duration}
      style={containerStyle}
    />
  )
}
