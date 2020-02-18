import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  width: 300px;
  padding: 20px;
  border: 2px solid white;
  border-radius: 5px;
  margin: 20px;
  min-width: calc(50% - 40px);
  max-width: 100%;
  box-sizing: border-box;
`

export default function Card(props) {
  const { title, children } = props

  return (
    <Container>
      <h2>{title}</h2>
      <p>{children}</p>
    </Container>
  )
}
