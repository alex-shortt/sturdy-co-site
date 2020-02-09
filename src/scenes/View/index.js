import React, { useState } from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Carousel from "components/Carousel"
import FooterBase from "components/Footer"
import clients from "assets/data/clients"
import sturdyImg from "assets/images/logo.png"
import Client from "components/Client"

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transform-style: flat;
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

const DATA = clients

export default function View(props) {
  const {
    match: {
      params: { id }
    },
    ...restProps
  } = props

  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(DATA)

  if (!loaded) {
    const newClients = assignColors(data)
    setLoaded(true)
    setData(newClients)
  }

  return (
    <>
      <Client id={id} data={data} />
      <Container>
        <Helmet title="Home" />
        <Logo />
        <Carousel data={data} {...restProps} />
        <Footer />
      </Container>
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
