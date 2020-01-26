import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Carousel from "components/Carousel"
import clients from "assets/data/clients"

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function View(props) {
  return (
    <Container>
      <Helmet title="Home" />
      <Carousel data={clients} />
    </Container>
  )
}
