import React from "react"
import styled from "styled-components/macro"
import { animated } from "react-spring"

export const Container = styled(animated.div)`
  width: 100%;
  height: 100%;
  transition: background-color 350ms ease-out;
`

export const Content = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  transition: 100ms;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  transform-style: flat;
  user-select: none;
  pointer-events: ${props => (props.active ? "all" : "none")};
  cursor: pointer;
`

export const WrapperBase = styled(animated.div)`
  position: absolute;
  transform-style: preserve-3d;
  transition: width 350ms ease-out, height 350ms ease-out;
  pointer-events: all;
`
