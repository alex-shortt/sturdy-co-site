import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components/macro"

import clients from "assets/data/clients"
import ClientBase from "components/Client"
import IntroVideoBase from "components/IntroVideo"
import HomeBase from "components/Home"
import { useData } from "services/data"
import Helmet from "components/Helmet"

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
    skipIntro, // whether to show the intro on route /
    onLoad,
    hideIntro // function to hide the intro on a specific page load
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
      {shiftPos !== 2 && <Helmet title="Sturdy" />}
      <IntroVideo shiftAmount={shiftPos} onClick={hideIntro} />
      <Home
        shiftAmount={shiftPos}
        shiftPos={shiftPos}
        data={data}
        id={id}
        {...props}
      />
      <Client id={id} data={data} shiftAmount={shiftPos} />
    </>
  )
}
