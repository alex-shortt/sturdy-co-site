import React from "react"
import styled from "styled-components/macro"
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
`

const Link = styled(LinkBase)`
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
        <Link match={match} to={to}>
          {match && <Indicator>+</Indicator>}
          {children}
        </Link>
      )}
    </Route>
  )
}

export default function Nav(props) {
  return (
    <Container>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </Container>
  )
}
