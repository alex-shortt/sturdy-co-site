import React from "react"
import styled, { keyframes } from "styled-components/macro"

const revealText = keyframes`
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
`

const revealerText = keyframes`
  0%, 50% {
    transform-origin: 0 50%;
  }
  
  60%, 100% {
    transform-origin: 100% 50%;
  }
  

  60% {
    transform: scaleX(1);
  }
  
  100% {
    transform: scaleX(0);
  }
`

const Text = styled.div`
  -webkit-font-smoothing: antialiased;

  & > * {
    -webkit-font-smoothing: antialiased;
  }

  & span {
    position: relative;
    z-index: 2;
    display: block;
    user-select: none;
    animation-name: ${revealText};
    color: white;
    font-size: 2em;

    white-space: nowrap;
    cursor: default;
  }
  & span,
  & span:after {
    animation-iteration-count: 1;
    animation-duration: 750ms;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  & span:after {
    content: "";
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    transform: scaleX(0);
    transform-origin: 0 50%;
    pointer-events: none;
    animation-name: ${revealerText};
  }

  & span:first-child {
    animation-delay: 0.25s;
  }

  & span:first-child:after {
    animation-delay: 0.25s;
    // background-color: #bd2243;
  }

  & span:nth-child(2) {
    animation-delay: 0.75s;
  }

  & span:nth-child(2):after {
    animation-delay: 0.75s;
    //background-color: #fde42f;
  }
`

const Title = styled.span`
  text-transform: uppercase;
  color: white;
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-weight: 900;
`

const Subtitle = styled.span`
  text-transform: uppercase;
  font-weight: 100;
  margin: 2px 0 0;
  color: white;
  font-size: 0.75rem;
`

export default function RevealText(props) {
  const { title = "...", subtitle = "...", color, show } = props

  return (
    <Text color={color}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Text>
  )
}
