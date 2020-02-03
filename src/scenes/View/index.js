import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Carousel from "components/Carousel"
import FooterBase from "components/Footer"
import clients from "assets/data/clients"
import sturdyImg from "assets/images/logo.png"

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img.attrs({ src: sturdyImg })`
  height: calc(70px + 4vw);
  width: 100%;
  object-fit: contain;
  position: absolute;
  top: calc(26% - 6.2vw);
  transform: translateY(-50%);
`

const Footer = styled(FooterBase)`
  position: absolute;
  bottom: 0;
`

export default function View(props) {
  return (
    <Container>
      <Helmet title="Home" />
      <Logo />
      <Carousel data={clients} />
      <Footer />
    </Container>
  )
}
