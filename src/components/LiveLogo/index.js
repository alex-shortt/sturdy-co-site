import React, { useRef, useCallback } from "react"
import styled from "styled-components/macro"
import { useSpring, animated } from "react-spring"

import sturdyImg from "assets/images/logo.png"

const Container = styled(animated.div)`
  height: calc(50px + 5vw);
  width: 100%;
  top: 60px;
  position: absolute;
  display: flex;

  @media screen and (max-width: 750px) {
    height: 60px;
  }

  @media screen and (max-width: 575px) {
    height: 50px;
  }
`

const Image = styled.img.attrs({ src: sturdyImg })`
  margin: 0 auto;
  height: 100%;
  object-fit: contain;
`

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function LiveLogo(props) {
  const [springProps, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }))

  const imageRef = useRef()

  const calc = useCallback(
    (x, y) => {
      let nx
      let ny
      const ns = 1.05

      const magnitude = 10
      const image = imageRef.current

      if (image) {
        nx = (magnitude * 2 * (x - window.innerWidth / 2)) / image.offsetWidth
        ny = magnitude * -2 * ((y - 60) / image.offsetHeight - 0.5)
      } else {
        nx = (x - window.innerWidth / 2) / 20
        ny = -(y - window.innerHeight / 2) / 20
      }

      return [ny, nx, ns]
    },
    [imageRef]
  )

  return (
    <Container
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: springProps.xys.interpolate(trans) }}
    >
      <Image ref={imageRef} />
    </Container>
  )
}
