import React from "react"
import styled, { keyframes } from "styled-components/macro"

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const bounceAnim = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0) rotate(45deg);
  }
  40% {
    transform: translateX(-50%) translateY(-30px) rotate(45deg);
  }
  60% {
    transform: translateX(-50%) translateY(-15px) rotate(45deg);
  }
`

const AngleDown = styled.div`
  position: absolute;
  bottom: 15vh;
  width: 25px;
  height: 25px;
  border: 5px solid white;
  border-left: 0;
  border-top: 0;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  animation: ${bounceAnim} 3.5s infinite;
  pointer-events: none;
`

export default function IntroVideo(props) {
  const { onClick } = props

  window.addEventListener("scroll", onClick)

  return (
    <Container onClick={onClick} {...props}>
      <Video autoPlay playsInline muted loop>
        <source
          src="https://quick-site-test.s3-us-west-1.amazonaws.com/SturdyIntro.mp4"
          type="video/mp4"
        />
      </Video>
      <AngleDown />
    </Container>
  )
}
