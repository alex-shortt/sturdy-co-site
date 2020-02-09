import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  background: black;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 3;
  margin-top: 60px;
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0.5px);
  display: ${props => (props.open ? "initial" : "none")};
`

export default function Client(props) {
  const { id, data } = props

  const client = data.find(dat => dat.id === id) || {}

  const { title, subitle, credits, images } = client

  return (
    <Container open={!!title}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
    </Container>
  )
}
