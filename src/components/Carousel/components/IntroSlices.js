import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import { animated, useTrail } from "react-spring"

import { calcGrayscale } from "services/slice"

const Slice = styled(animated.div)`
  flex: 1;
  transform: ${props => (props.vertical ? "scaleX(0)" : "scaleY(0)")};
  ${props => (props.vertical ? "width: 100%" : "height: 100%")};
  transform-style: preserve-3d;
`

const config = { mass: 7, tension: 2000, friction: 250 }

export default function IntroSlices(props) {
  const { data, onEnd, vertical, delay = 750 } = props

  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) {
      setTimeout(onEnd, delay + 2000)
      setStarted(true)
    }
  }, [delay, onEnd, started])

  const trail = useTrail(data.length, {
    config,
    delay,
    scale: 1,
    from: { scale: 0 }
  })

  return (
    <>
      {trail.map(({ scale }, i) => (
        <FakeSlice
          key={data[i].id}
          pos={i / (data.length - 1)}
          style={{
            transform: scale.interpolate(sc =>
              vertical
                ? `scaleX(${sc}) scale(1.04) translateZ(-20px)`
                : `scaleY(${sc}) scale(1.04) translateZ(-20px)`
            )
          }}
          vertical={vertical}
        />
      ))}
    </>
  )
}

function FakeSlice(props) {
  const { pos, vertical, style } = props

  const gray = calcGrayscale(pos)
  const containerStyle = { background: `rgb(${gray}, ${gray}, ${gray})` }

  return <Slice vertical={vertical} style={{ ...containerStyle, ...style }} />
}
