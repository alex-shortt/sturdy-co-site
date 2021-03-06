import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

import sturdyImg from "assets/images/logo.png"
import Helmet from "components/Helmet"

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
  height: 100%;
  display: flex;
  flex-direction: column;

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

const CreditsContainer = styled.h3`
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
  align-items: flex-end;
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
  object-fit: contain;
  object-position: top center;

  @media screen and (max-width: 700px) {
    width: 120px;
  }
`

function Credits(props) {
  const { credits } = props

  if (!credits) {
    return <></>
  }

  return (
    <CreditsContainer>
      {credits.split("\n").map(cred => (
        <React.Fragment key={cred}>
          {cred}
          <br />
        </React.Fragment>
      ))}
    </CreditsContainer>
  )
}

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
          <Helmet title={`${title} | Sturdy`} />
          <TopBox>
            <Info>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
              <Credits credits={credits} />
            </Info>
            <Logo />
          </TopBox>
          <Gallery media={images} />
        </Wrapper>
      )}
    </Container>
  )
}
