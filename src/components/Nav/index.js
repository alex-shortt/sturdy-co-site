import React from "react"
import styled, { css } from "styled-components/macro"
import { Route, Link as LinkBase } from "react-router-dom"

const Container = styled.div`
  position: absolute;
  margin-top: 40px;
  margin-left: 40px;
  top: 0;
  left: 0;
  background: black;
  padding: 20px 0 0 20px;
  z-index: 4;

  @media screen and (max-width: 700px) {
    margin-left: 20px;
  }

  @media screen and (max-width: 575px) {
    margin: 0;
    padding: 5px 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    border-bottom: 1px solid white;
  }
`

const NavStyle = css`
  display: block;
  color: white;
  text-transform: uppercase;
  ${props => props.match && "color: #595959"};
  margin: 1.1rem 0;
  font-size: 1.25rem;
  text-decoration: none;
  position: relative;
  transition: color 150ms linear;

  &:first-of-type {
    margin-top: 0;
  }

  &:hover {
    ${props => !props.match && "color: #acacac;"};
  }

  @media screen and (max-width: 700px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 575px) {
    margin: 0;
    padding: 10px 15px;
  }
`

const StyledLink = styled(LinkBase)`
  ${NavStyle}
`
const StyledAnchor = styled.a`
  ${NavStyle}
`

const Indicator = styled.span`
  position: absolute;
  transform: translateX(-120%);
`

function NavLink(props) {
  const { to, children } = props
  return (
    <Route exact path={to}>
      {({ match }) => (
        <StyledLink match={match} to={to}>
          {match && <Indicator>+</Indicator>}
          {children}
        </StyledLink>
      )}
    </Route>
  )
}

export default function Nav(props) {
  return (
    <Container>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <StyledAnchor href="https://shopify.com" target="_blank">
        Merch
      </StyledAnchor>
    </Container>
  )
}
