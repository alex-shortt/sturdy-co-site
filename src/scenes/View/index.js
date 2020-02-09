import React, { useState } from "react"
import styled, { css } from "styled-components/macro"

import Helmet from "components/Helmet"
import Carousel from "components/Carousel"
import FooterBase from "components/Footer"
import clients from "assets/data/clients"
import sturdyImg from "assets/images/logo.png"
import ClientBase from "components/Client"

const shiftAnimation = css`
  transition: transform 1250ms ease-in-out;
`

const Container = styled.div`
  max-width: 1400px;
  padding: 0 180px;
  margin: 0 auto;
  box-sizing: border-box;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transform: translateY(${props => (props.shiftUp ? "-100%" : "0")});
  ${shiftAnimation};
`

const Logo = styled.img.attrs({ src: sturdyImg })`
  height: calc(70px + 3vw);
  width: 100%;
  object-fit: contain;
  position: absolute;
  top: 60px;
`

const Footer = styled(FooterBase)`
  position: absolute;
  bottom: 0;
`

const Client = styled(ClientBase)`
  transform: translateY(${props => (props.shiftUp ? "-100%" : "0")});
  ${shiftAnimation};
`

const DATA = clients

export default function View(props) {
  const {
    match: {
      params: { id }
    }
  } = props

  const [data, setData] = useState(null)

  if (!data) {
    const fixedData = assignColors(DATA)
    setData(fixedData)

    return <></>
  }

  return (
    <>
      <Container shiftUp={id !== undefined}>
        <Helmet title="Home" />
        <Logo />
        <Carousel data={data} {...props} />
        <Footer />
      </Container>
      <Client id={id} data={data} shiftUp={id !== undefined} />
    </>
  )
}

const assignColors = data => {
  for (const card of data) {
    const hue = Math.random() * 360
    const sat = Math.random() * 20 + 80
    const lit = Math.random() * 20 + 50

    card.color = `hsl(${hue}, ${sat}%, ${lit}%)`
  }

  return data
}
