import React from "react"
import styled, { keyframes } from "styled-components/macro"

const revealText = keyframes`
   0%, 50% {
    transform: scaleX(1);
    transform-origin: 100% 50%;
  }
  
  60% {
    transform: scaleX(1);
  }
  
  100% {
    transform-origin: 100% 50%;
    transform: scaleX(0);
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Text = styled.div`
  opacity: 0;
  animation-iteration-count: 1;
  animation-duration: 50ms;
  animation-delay: 200ms;
  animation-fill-mode: both;
  animation-name: ${fadeIn};

  & span {
    position: relative;
    z-index: 2;
    display: block;
    user-select: none;
    cursor: default;
    white-space: normal;
    margin: 0 5px;
  }

  & span,
  & span:before,
  & span:after {
    animation-iteration-count: 1;
    animation-duration: 650ms;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  & span:before,
  & span:after {
    content: "";
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0.999;
  }

  & span:before {
    background-color: ${props => props.color};
    animation-name: ${revealText};
    transform: scaleX(1);
    transform-origin: 0 100%;
  }

  & span:after {
    background-color: white;
    animation-name: ${revealerText};
    transform: scaleX(0);
    transform-origin: 0 50%;
  }

  & span:first-child:before {
    animation-delay: 0.25s;
  }

  & span:first-child:after {
    animation-delay: 0.25s;
    // background-color: #bd2243;
  }

  & span:nth-child(2):before {
    animation-delay: 0.7s;
  }

  & span:nth-child(2):after {
    animation-delay: 0.7s;
    //background-color: #fde42f;
  }
`

const Title = styled.span`
  text-transform: uppercase;
  color: white;
  margin: 0;
  font-size: 1.75rem;
  letter-spacing: 2px;
  font-weight: 900;

  @media screen and (max-width: 1100px) {
    font-size: 1.4rem;
    letter-spacing: 1.5px;
  }

  @media screen and (max-width: 850px) {
    font-size: 1.25rem;
    letter-spacing: 1px;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.9rem;
  }
`

const Subtitle = styled.span`
  text-transform: uppercase;
  font-weight: 100;
  color: white;
  font-size: 1rem;
  padding: 0.25em 0;

  @media screen and (max-width: 1100px) {
    font-size: 0.75rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
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
