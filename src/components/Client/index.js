import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

import sturdyImg from "assets/images/logo.png"

import Gallery from "./components/Gallery"

const Container = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  top: 0;
  z-index: 3;
  padding: 60px 0;
  box-sizing: border-box;
`

const Wrapper = styled.div`
  max-width: 1400px;
  padding: 0 180px;
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (max-width: 900px) {
    padding: 0 60px 0 180px;
  }

  @media screen and (max-width: 700px) {
    padding: 0 40px 0 140px;
  }

  @media screen and (max-width: 575px) {
    padding: 0 30px;
  }
`

const Title = styled.h1`
  display: inline-block;
  margin: 0 0.25em 5px 0;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media screen and (max-width: 700px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  display: inline-block;
  letter-spacing: normal;
  font-weight: 100;
  font-size: 1.25rem;
  margin: 0 0 5px;

  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`

const Credits = styled.h3`
  color: gray;
  font-weight: 100;
  line-height: 1.2;
  font-size: 1.15rem;
  text-transform: uppercase;

  @media screen and (max-width: 700px) {
    font-size: 0.9rem;
  }
`

const TopBox = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
`

const Info = styled.div`
  position: relative;
  box-sizing: border-box;
  flex: 1;
  margin-right: 10px;
  min-width: 60%;
`

const Logo = styled.img.attrs({ src: sturdyImg })`
  margin-bottom: 15px;
  width: 180px;
  height: auto;
  object-fit: contain;
  object-position: top center;

  @media screen and (max-width: 700px) {
    width: 120px;
  }
`

export default function Client(props) {
  const { id, data, ...restProps } = props

  const container = useRef()

  const thisClient = data.find(dat => dat.id === id)
  const [client, setClient] = useState(thisClient)

  useEffect(() => {
    if (thisClient && client !== thisClient) {
      setClient(thisClient)
      container.current.scrollTo(0, 0)
    }
  }, [client, thisClient])

  const { title, subtitle, credits, images } = client || {}

  return (
    <Container {...restProps} ref={container}>
      {client && (
        <Wrapper>
          <TopBox>
            <Info>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
              <Credits>
                {credits.split("\n").map(cred => (
                  <React.Fragment key={cred}>
                    {cred}
                    <br />
                  </React.Fragment>
                ))}
              </Credits>
            </Info>
            <Logo />
          </TopBox>
          <Gallery images={images} />
        </Wrapper>
      )}
    </Container>
  )
}
