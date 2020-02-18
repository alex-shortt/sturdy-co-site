import React from "react"
import styled from "styled-components/macro"

import Carousel from "components/Carousel"
import FooterBase from "components/Footer"
import LiveLogo from "components/LiveLogo"

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Footer = styled(FooterBase)`
  position: absolute;
  bottom: 0;
`

export default function Home(props) {
  const { data, id, ...restProps } = props

  return (
    <Container {...restProps}>
      <LiveLogo />
      <Carousel data={data} id={id} {...restProps} />
      <Footer />
    </Container>
  )
}
