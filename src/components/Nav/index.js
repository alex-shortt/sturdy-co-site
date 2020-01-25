import React from "react"
import styled from "styled-components/macro"
import { Route, Link as LinkBase } from "react-router-dom"

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 60px;
  background: black;
`

const Link = styled(LinkBase)`
  display: block;
  color: white;
  text-transform: uppercase;
  ${props => props.match && "color: gray"};
  margin: 0.25rem 0;
  font-size: 1.75rem;
  text-decoration: none;
  position: relative;
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
    </Container>
  )
}
