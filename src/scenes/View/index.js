import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components/macro"

import Helmet from "components/Helmet"
import clients from "assets/data/clients"
import ClientBase from "components/Client"
import IntroVideoBase from "components/IntroVideo"
import HomeBase from "components/Home"
import { useData } from "services/data"

const shiftAnimation = css`
  transition: transform 1250ms ease-in-out;
`

const Home = styled(HomeBase)`
  transform: translateY(${props => props.shiftAmount * -100}%);
  ${shiftAnimation};
`

const Client = styled(ClientBase)`
  transform: translateY(${props => props.shiftAmount * -100}%);
  ${shiftAnimation};
`

const IntroVideo = styled(IntroVideoBase)`
  transform: translateY(${props => props.shiftAmount * -100}%);
  ${shiftAnimation};
`

const DATA = clients

export default function View(props) {
  const {
    match: {
      params: { id }
    },
    skipIntro,
    onLoad,
    hideIntro
  } = props

  if (onLoad) {
    onLoad()
  }

  // eslint-disable-next-line no-nested-ternary
  const initPos = id === undefined ? (skipIntro ? 1 : 0) : 2
  const [shiftPos, setShiftPos] = useState(initPos)
  const data = useData(DATA)

  useEffect(() => {
    if (id !== undefined) {
      setShiftPos(2)
    } else if (skipIntro) {
      setShiftPos(1)
    }
  }, [id, skipIntro])

  return (
    <>
      <IntroVideo shiftAmount={shiftPos} onClick={hideIntro} />
      <Home shiftAmount={shiftPos} data={data} {...props} />
      <Client id={id} data={data} shiftAmount={shiftPos} />
    </>
  )
}
