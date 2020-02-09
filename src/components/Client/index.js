import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  background: black;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  position: absolute;
  top: 0;
  z-index: 3;
  margin-top: 60px;
  padding-top: 60px;
  box-sizing: border-box;
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0.5px);
  display: ${props => (props.open ? "initial" : "none")};
`

const Wrapper = styled.div`
  max-width: 1000px;
  padding: 0 180px;
  margin: 0 auto;
`

const Title = styled.h1`
  margin: 0 0 0.25em;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 3px;
`

const Subtitle = styled.span`
  letter-spacing: normal;
  font-weight: 100;
  font-size: 1.25rem;
  margin-left: 10px;
`

const Credits = styled.h3`
  color: gray;
  font-weight: 100;
  line-height: 1.2;
  font-size: 1.15rem;
  text-transform: uppercase;
`

export default function Client(props) {
  const { id, data } = props

  const client = data.find(dat => dat.id === id)

  if (!client) {
    return <></>
  }

  const { title, subtitle, credits, images } = client

  return (
    <Container open={!!title}>
      <Wrapper>
        <Title>
          {title}
          <Subtitle>{subtitle}</Subtitle>
        </Title>
        <Credits>
          {credits.split("\n").map(cred => (
            <>
              {cred}
              <br />
            </>
          ))}
        </Credits>
      </Wrapper>
    </Container>
  )
}
