import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  top: 0;
  z-index: 3;
  padding-top: 60px;
  box-sizing: border-box;
`

const Wrapper = styled.div`
  max-width: 1400px;
  padding: 0 180px;
  margin: 0 auto;
  box-sizing: border-box;
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
  const { id, data, ...restProps } = props

  const thisClient = data.find(dat => dat.id === id)
  const [client, setClient] = useState(thisClient)

  useEffect(() => {
    if (thisClient && client !== thisClient) {
      setClient(thisClient)
    }
  }, [client, thisClient])

  const { title, subtitle, credits, images } = client || {}

  return (
    <Container {...restProps}>
      {client && (
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
      )}
    </Container>
  )
}
