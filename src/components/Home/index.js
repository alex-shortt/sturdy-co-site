import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Carousel from "components/Carousel"
import sturdyImg from "assets/images/logo.png"
import FooterBase from "components/Footer"

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

  @media screen and (max-width: 700px) {
    padding: 0 140px;
  }
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

export default function Home(props) {
  const { data, ...restProps } = props

  return (
    <Container {...restProps}>
      <Logo />
      <Carousel data={data} {...restProps} />
      <Footer />
    </Container>
  )
}
