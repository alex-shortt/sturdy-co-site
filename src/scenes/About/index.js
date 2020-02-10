import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 180px;
  margin: 60px auto 0;
  height: 100%;
  box-sizing: border-box;
`

export default function About(props) {
  const { onLoad } = props

  onLoad()

  return (
    <Container>
      <Helmet title="About" />
      <h1>ABOUT</h1>
      <br />
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </h3>
    </Container>
  )
}
