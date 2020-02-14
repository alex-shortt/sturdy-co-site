import React from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link as LinkBase } from "react-router-dom"

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const Tag = styled.h4`
  line-height: 1.5em;

  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }
`

const Info = styled.h4`
  color: #666;
  margin-left: 1.3em;
  margin-right: 1.3em;
  line-height: 1.4em;

  @media screen and (max-width: 700px) {
    font-size: 0.8rem;
  }
`

const IG = styled(FontAwesomeIcon).attrs({ icon: ["fab", "instagram"] })`
  font-size: 1.4em;
  vertical-align: text-bottom;
`

const Spacer = styled.span`
  margin: 0 15px;
`

const FinalSpacer = styled(Spacer)`
  @media screen and (max-width: 700px) {
    display: none;
  }
`

const FinalBreak = styled.br`
  display: none;
  @media screen and (max-width: 700px) {
    display: initial;
  }
`

const linkStyles = css`
  cursor: pointer;
  color: inherit !important;
  transition: 150ms linear;
  text-decoration: none;

  &:hover {
    color: white !important;
  }
`
const Anchor = styled.a`
  ${linkStyles}
`

const Link = styled(LinkBase)`
  ${linkStyles}
`

export default function Footer(props) {
  const { ...restProps } = props

  return (
    <Container {...restProps}>
      <Tag>
        CREATIVE HOUSE & DIGITAL DELVE
        <br />
        EST. 2018
      </Tag>
      <Info>
        <Anchor href="https://instagram.com/sturdy.co" about="_blank">
          <IG />
        </Anchor>
        <Spacer>|</Spacer>
        <Anchor href="mailto:contact@sturdy.co">CONTACT</Anchor>
        <Spacer>|</Spacer>
        <Link to="/privacy">PRIVACY POLICY</Link>
        <FinalSpacer>|</FinalSpacer>
        <FinalBreak />
        &copy; STURDY 2020 - ALL RIGHTS RESERVED
      </Info>
    </Container>
  )
}
